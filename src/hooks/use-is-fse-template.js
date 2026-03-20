/**
 * Term Image — useIsFSETemplate Hook.
 *
 * Determines whether the editor is rendering an FSE template
 * or template part.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */
import { useSelect } from '@wordpress/data';

/**
 * Determine whether the editor is rendering an FSE template.
 *
 * @return {boolean} True when editing a wp_template or wp_template_part.
 */
export default function useIsFSETemplate() {
	return useSelect( ( select ) => {
		const editorStore = select( 'core/editor' );
		const postType = editorStore?.getEditedPostType
			? editorStore.getEditedPostType()
			: '';

		return postType === 'wp_template' || postType === 'wp_template_part';
	}, [] );
}
