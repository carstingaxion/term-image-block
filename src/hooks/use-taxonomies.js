/**
 * Term Image — useTaxonomies Hook.
 *
 * Fetches public taxonomies from the core data store.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Fetch all public taxonomies from the core data store.
 *
 * @return {{ taxonomies: Array<Object>, isTaxonomiesLoading: boolean }} Returns an object containing the list of taxonomies and a loading state.
 */
export default function useTaxonomies() {
	return useSelect( ( select ) => {
		const { getTaxonomies, isResolving } = select( coreStore );

		/** @type {Object} */
		const query = { per_page: -1 };

		return {
			taxonomies: getTaxonomies( query ) || [],
			isTaxonomiesLoading: isResolving( 'getTaxonomies', [ query ] ),
		};
	}, [] );
}
