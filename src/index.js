/**
 * Term Image — Block Registration.
 *
 * Registers the block type with the WordPress block editor using
 * metadata from block.json.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Shared styles applied both in the editor and the frontend.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Copy block styles from core/image to this block.
 */
import './block-styles';

/**
 * Internal dependencies.
 */
import Edit from './edit';
import metadata from './block.json';

/**
 * Register the Term Image block.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * Editor component.
	 *
	 * @see ./edit.js
	 */
	edit: Edit,
} );
