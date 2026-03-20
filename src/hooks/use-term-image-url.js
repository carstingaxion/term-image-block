/**
 * Term Image — useTermImageUrl Hook.
 *
 * Fetches a media record and resolves the image URL for a given size.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies.
 */
import { resolveImageUrl } from '../utils';

/**
 * Fetch a media record and resolve the image URL for a specific size.
 *
 * @param {number} imageId   Attachment ID.
 * @param {string} imageSize Registered image size name.
 * @return {string} Resolved image URL or empty string.
 */
export default function useTermImageUrl( imageId, imageSize ) {
	/** @type {Object|null} */
	const termMedia = useSelect(
		( select ) => {
			if ( ! imageId ) {
				return null;
			}

			return select( coreStore ).getMedia( imageId, { context: 'view' } );
		},
		[ imageId ]
	);

	return useMemo(
		() => resolveImageUrl( termMedia, imageSize ),
		[ termMedia, imageSize ]
	);
}
