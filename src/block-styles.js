/**
 * Term Image — Block Styles Mirror.
 *
 * Copies all block styles registered for core/image to the
 * carstingaxion/term-image-block block so it inherits visual variants
 * like "Rounded" automatically.
 *
 * Uses wp.data.subscribe to watch the block registry, since our
 * editor script loads before core/image styles are registered.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */
import { registerBlockStyle } from '@wordpress/blocks';
import { subscribe, select } from '@wordpress/data';

/**
 * Self-invoking function that subscribes to the data store and
 * mirrors core/image styles once they become available.
 *
 * @return {void}
 */
( () => {
	/**
	 * Flag to prevent duplicate processing.
	 *
	 * @type {boolean}
	 */
	let copied = false;

	const unsubscribe = subscribe( () => {
		if ( copied ) {
			return;
		}

		/** @type {Object} */
		const blocksStore = select( 'core/blocks' );

		/* Wait until core/image is present in the registry. */
		const imageType = blocksStore.getBlockType( 'core/image' );

		if ( ! imageType ) {
			return;
		}

		/** @type {Array<{name: string, label: string}>|undefined} */
		const styles = blocksStore.getBlockStyles( 'core/image' );

		if ( ! styles || ! styles.length ) {
			return;
		}

		copied = true;
		unsubscribe();

		/** @type {Array<{name: string, label: string}>} */
		const existing =
			blocksStore.getBlockStyles( 'carstingaxion/term-image-block' ) ||
			[];

		/** @type {Set<string>} */
		const existingNames = new Set( existing.map( ( s ) => s.name ) );

		styles.forEach( ( style ) => {
			/* Skip the default style and any already registered. */
			if ( style.name === 'default' || existingNames.has( style.name ) ) {
				return;
			}

			registerBlockStyle( 'carstingaxion/term-image-block', {
				name: style.name,
				label: style.label,
			} );
		} );
	} );
} )();
