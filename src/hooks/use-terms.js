/**
 * Term Image — useTerms Hook.
 *
 * Fetches terms for a specific taxonomy from the core data store.
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
 * Fetch terms for a specific taxonomy.
 *
 * Skips resolution when in FSE template context (no term picker shown).
 *
 * @param {string}  taxonomy        Taxonomy slug.
 * @param {boolean} isInFSETemplate Whether the editor is in FSE template context.
 * @return {{ terms: Array<Object>, isTermsLoading: boolean }} Returns an object containing the list of terms and a loading state.
 */
export default function useTerms( taxonomy, isInFSETemplate ) {
	return useSelect(
		( select ) => {
			if ( ! taxonomy || isInFSETemplate ) {
				return { terms: [], isTermsLoading: false };
			}

			const { getEntityRecords, isResolving } = select( coreStore );

			/** @type {Object} */
			const query = { per_page: -1, hide_empty: false };

			return {
				terms: getEntityRecords( 'taxonomy', taxonomy, query ) || [],
				isTermsLoading: isResolving( 'getEntityRecords', [
					'taxonomy',
					taxonomy,
					query,
				] ),
			};
		},
		[ taxonomy, isInFSETemplate ]
	);
}
