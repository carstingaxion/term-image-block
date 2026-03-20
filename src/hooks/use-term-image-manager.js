/**
 * Term Image — useTermImageManager Hook.
 *
 * Encapsulates the state and logic for persisting term image
 * changes via the core data store.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { useState, useCallback } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies.
 */
import { TERM_IMAGE_META_KEY } from '../constants';

/**
 * Manage saving and removing term images via the core data store.
 *
 * @param {number} termId   Current term ID.
 * @param {string} taxonomy Current taxonomy slug.
 * @return {{
 *   saving: boolean,
 *   error: string,
 *   success: string,
 *   updateTermImage: Function,
 *   onSelectImage: Function,
 *   onRemoveImage: Function,
 *   clearMessages: Function,
 * }} Manager state and handlers.
 */
export default function useTermImageManager( termId, taxonomy ) {
	/** @type {[boolean, Function]} */
	const [ saving, setSaving ] = useState( false );

	/** @type {[string, Function]} */
	const [ error, setError ] = useState( '' );

	/** @type {[string, Function]} */
	const [ success, setSuccess ] = useState( '' );

	const { saveEntityRecord } = useDispatch( coreStore );

	/**
	 * Clear all feedback messages.
	 *
	 * @return {void}
	 */
	const clearMessages = useCallback( () => {
		setError( '' );
		setSuccess( '' );
	}, [] );

	/**
	 * Persist a new image ID to term meta via the core data store.
	 *
	 * @param {number} newImageId Attachment ID, or 0 to remove.
	 * @return {Promise<void>}
	 */
	const updateTermImage = useCallback(
		async ( newImageId ) => {
			if ( ! termId || ! taxonomy ) {
				return;
			}

			setSaving( true );
			setError( '' );
			setSuccess( '' );

			try {
				await saveEntityRecord( 'taxonomy', taxonomy, {
					id: termId,
					meta: { [ TERM_IMAGE_META_KEY ]: newImageId },
				} );

				const message =
					newImageId > 0
						? __(
								'Term image updated successfully!',
								'term-image-block'
						  )
						: __(
								'Term image removed successfully!',
								'term-image-block'
						  );

				setSuccess( message );
				setTimeout( () => setSuccess( '' ), 3000 );
			} catch ( err ) {
				setError(
					err.message ||
						__( 'Failed to update term image', 'term-image-block' )
				);
			} finally {
				setSaving( false );
			}
		},
		[ termId, taxonomy, saveEntityRecord ]
	);

	/**
	 * Handle image selection from the media library.
	 *
	 * @param {Object} media    Selected media object.
	 * @param {number} media.id Attachment ID.
	 * @return {void}
	 */
	const onSelectImage = useCallback(
		( media ) => {
			if ( media?.id ) {
				updateTermImage( media.id );
			}
		},
		[ updateTermImage ]
	);

	/**
	 * Remove the current term image.
	 *
	 * @return {void}
	 */
	const onRemoveImage = useCallback( () => {
		updateTermImage( 0 );
	}, [ updateTermImage ] );

	return {
		saving,
		error,
		success,
		updateTermImage,
		onSelectImage,
		onRemoveImage,
		clearMessages,
	};
}
