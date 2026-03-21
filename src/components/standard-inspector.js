/**
 * Term Image — StandardInspector Component.
 *
 * Inspector controls for the standard post/page editing context.
 * Composes the term selection, term image management, and display
 * settings panels.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { Notice } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import TermSelectionPanel from './term-selection-panel';
import TermImagePanel from './term-image-panel';
import DisplaySettingsPanel from './display-settings-panel';

/**
 * Standard post/page inspector controls.
 *
 * @param {Object}        props                    Component props.
 * @param {Object}        props.attributes         Block attributes.
 * @param {Function}      props.setAttributes      Block attribute setter.
 * @param {string}        props.taxonomy           Current taxonomy attribute.
 * @param {number}        props.termId             Current term ID attribute.
 * @param {number}        props.effectiveTermId    Resolved term ID (attribute or context).
 * @param {string}        props.effectiveTaxonomy  Resolved taxonomy (attribute or context).
 * @param {boolean}       props.isFromContext       Whether values come from block context.
 * @param {Array<Object>} props.publicTaxonomies   Filtered public taxonomies.
 * @param {Array<Object>} props.terms              Terms for the selected taxonomy.
 * @param {boolean}       props.isTermsLoading     Whether terms are loading.
 * @param {number}        props.termImageId        Current image attachment ID.
 * @param {string}        props.imageUrl           Resolved image URL.
 * @param {string}        props.termName           Term name.
 * @param {boolean}       props.isTermLoading      Whether term record is loading.
 * @param {boolean}       props.saving             Whether a save operation is in progress.
 * @param {string}        props.error              Current error message.
 * @param {string}        props.success            Current success message.
 * @param {Function}      props.onSelectImage      Callback for image selection.
 * @param {Function}      props.onRemoveImage      Callback for image removal.
 * @param {Function}      props.onClearMessages    Callback to clear feedback messages.
 * @return {Element} Inspector controls element.
 */
export default function StandardInspector( {
	attributes,
	setAttributes,
	taxonomy,
	termId,
	effectiveTermId,
	effectiveTaxonomy,
	isFromContext,
	publicTaxonomies,
	terms,
	isTermsLoading,
	termImageId,
	imageUrl,
	termName,
	isTermLoading,
	saving,
	error,
	success,
	onSelectImage,
	onRemoveImage,
	onClearMessages,
} ) {
	return (
		<InspectorControls>
			{ isFromContext && (
				<Notice status="info" isDismissible={ false }>
					{ __(
						'Term data is provided by a parent block. Set taxonomy and term manually to override.',
						'term-image-block'
					) }
				</Notice>
			) }

			<TermSelectionPanel
				taxonomy={ taxonomy }
				termId={ termId }
				publicTaxonomies={ publicTaxonomies }
				terms={ terms }
				isTermsLoading={ isTermsLoading }
				setAttributes={ setAttributes }
				onClearMessages={ onClearMessages }
			/>

			{ effectiveTermId > 0 && (
				<TermImagePanel
					termImageId={ termImageId }
					imageUrl={ imageUrl }
					termName={ termName }
					isTermLoading={ isTermLoading }
					saving={ saving }
					error={ error }
					success={ success }
					onSelectImage={ onSelectImage }
					onRemoveImage={ onRemoveImage }
				/>
			) }

			<DisplaySettingsPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				termName={ termName }
			/>
		</InspectorControls>
	);
}
