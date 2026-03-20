/**
 * Term Image — FSEInspector Component.
 *
 * Inspector controls specific to the FSE template editing context.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import DisplaySettingsPanel from './display-settings-panel';
import { buildTaxonomyOptions } from '../utils';

/**
 * FSE template inspector controls.
 *
 * @param {Object}        props                  Component props.
 * @param {Object}        props.attributes       Block attributes.
 * @param {Function}      props.setAttributes    Block attribute setter.
 * @param {string}        props.taxonomy         Current taxonomy slug.
 * @param {Array<Object>} props.publicTaxonomies Filtered public taxonomies.
 * @return {Element} Inspector controls element.
 */
export default function FSEInspector( {
	attributes,
	setAttributes,
	taxonomy,
	publicTaxonomies,
} ) {
	/** @type {Array<{label: string, value: string}>} */
	const taxonomyOptions = buildTaxonomyOptions(
		publicTaxonomies,
		__( 'Auto-detect (archive pages)', 'term-image-block' )
	);

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Term Detection', 'term-image-block' ) }
				initialOpen={ true }
			>
				<SelectControl
					label={ __( 'Taxonomy', 'term-image-block' ) }
					value={ taxonomy }
					options={ taxonomyOptions }
					onChange={ ( value ) =>
						setAttributes( { taxonomy: value, termId: 0 } )
					}
					help={
						taxonomy
							? __(
									'The block will use the first term from this taxonomy assigned to the current post, or the queried term on archive pages.',
									'term-image-block'
							  )
							: __(
									'Auto-detect uses the queried term on taxonomy archive pages.',
									'term-image-block'
							  )
					}
				/>
			</PanelBody>
			<DisplaySettingsPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				initialOpen={ true }
			/>
		</InspectorControls>
	);
}
