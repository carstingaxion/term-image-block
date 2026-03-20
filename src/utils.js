/**
 * Term Image — Utility Functions.
 *
 * Pure helper functions with no side-effects, suitable for
 * unit testing in isolation.
 *
 * @package
 * @since   0.1.0
 */

/**
 * Filter taxonomies to only include those visible to the user.
 *
 * @param {Array<Object>} taxonomies Raw taxonomy objects from the core data store.
 * @return {Array<Object>} Filtered public taxonomies.
 */
export function filterPublicTaxonomies( taxonomies ) {
	return taxonomies.filter(
		( tax ) => tax.visibility?.public_queryable || tax.visibility?.show_ui
	);
}

/**
 * Build taxonomy select options with a placeholder entry.
 *
 * @param {Array<Object>} taxonomies  Filtered public taxonomies.
 * @param {string}        placeholder Label for the empty option.
 * @return {Array<{label: string, value: string}>} Select control options.
 */
export function buildTaxonomyOptions( taxonomies, placeholder ) {
	return [
		{ label: placeholder, value: '' },
		...taxonomies.map( ( tax ) => ( {
			label: tax.name,
			value: tax.slug,
		} ) ),
	];
}

/**
 * Build term select options with a placeholder entry.
 *
 * @param {Array<Object>} terms       Term objects from the core data store.
 * @param {string}        placeholder Label for the empty option.
 * @return {Array<{label: string, value: number}>} Select control options.
 */
export function buildTermOptions( terms, placeholder ) {
	return [
		{ label: placeholder, value: 0 },
		...terms.map( ( term ) => ( {
			label: term.name,
			value: term.id,
		} ) ),
	];
}

/**
 * Resolve the image URL from a media record for a given size.
 *
 * @param {Object|null} media     Media record from the core data store.
 * @param {string}      imageSize Registered image size name.
 * @return {string} Image URL or empty string.
 */
export function resolveImageUrl( media, imageSize ) {
	if ( ! media ) {
		return '';
	}

	/** @type {Object} */
	const sizes = media.media_details?.sizes || {};
	const sizeData = sizes[ imageSize ] || sizes.full || {};

	return sizeData.source_url || media.source_url || '';
}
