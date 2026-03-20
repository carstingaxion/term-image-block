/**
 * Term Image — TermSelectionPanel Component.
 *
 * Inspector panel for choosing a taxonomy and term in standard
 * post/page editing contexts.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, Spinner } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import { buildTaxonomyOptions, buildTermOptions } from '../utils';

/**
 * Term selection inspector panel.
 *
 * @param {Object}        props                  Component props.
 * @param {string}        props.taxonomy         Current taxonomy slug.
 * @param {number}        props.termId           Current term ID.
 * @param {Array<Object>} props.publicTaxonomies Filtered public taxonomies.
 * @param {Array<Object>} props.terms            Terms for the selected taxonomy.
 * @param {boolean}       props.isTermsLoading   Whether terms are loading.
 * @param {Function}      props.setAttributes    Block attribute setter.
 * @param {Function}      props.onClearMessages  Callback to clear feedback messages.
 * @return {Element} Inspector panel element.
 */
export default function TermSelectionPanel( {
	taxonomy,
	termId,
	publicTaxonomies,
	terms,
	isTermsLoading,
	setAttributes,
	onClearMessages,
} ) {
	/** @type {Array<{label: string, value: string}>} */
	const taxonomyOptions = buildTaxonomyOptions(
		publicTaxonomies,
		__( 'Select a taxonomy', 'term-image-block' )
	);

	/** @type {Array<{label: string, value: number}>} */
	const termOptions = buildTermOptions(
		terms,
		__( 'Select a term', 'term-image-block' )
	);

	return (
		<PanelBody
			title={ __( 'Term Selection', 'term-image-block' ) }
			initialOpen={ true }
		>
			<SelectControl
				label={ __( 'Taxonomy', 'term-image-block' ) }
				value={ taxonomy }
				options={ taxonomyOptions }
				onChange={ ( value ) => {
					setAttributes( { taxonomy: value, termId: 0 } );
					onClearMessages();
				} }
				help={ __(
					'Choose a taxonomy to select terms from',
					'term-image-block'
				) }
			/>
			{ taxonomy && (
				<>
					{ isTermsLoading ? (
						<Spinner />
					) : (
						<SelectControl
							label={ __( 'Term', 'term-image-block' ) }
							value={ termId }
							options={ termOptions }
							onChange={ ( value ) => {
								setAttributes( {
									termId: parseInt( value, 10 ),
								} );
								onClearMessages();
							} }
							help={ __(
								'Leave empty to auto-detect on archive pages',
								'term-image-block'
							) }
						/>
					) }
				</>
			) }
		</PanelBody>
	);
}
