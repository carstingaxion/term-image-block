/**
 * Term Image — useTermRecord Hook.
 *
 * Fetches a single term record including meta from the core data store.
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
 * Fetch a single term record including meta.
 *
 * @param {number}  termId   Term ID.
 * @param {string}  taxonomy Taxonomy slug.
 * @param {boolean} skip     Whether to skip resolution.
 * @return {{ termRecord: Object|null, isTermLoading: boolean }} Returns an object containing the term record and a loading state.
 */
export default function useTermRecord( termId, taxonomy, skip = false ) {
	return useSelect(
		( select ) => {
			if ( ! termId || ! taxonomy || skip ) {
				return { termRecord: null, isTermLoading: false };
			}

			const { getEntityRecord, isResolving } = select( coreStore );

			return {
				termRecord: getEntityRecord( 'taxonomy', taxonomy, termId ),
				isTermLoading: isResolving( 'getEntityRecord', [
					'taxonomy',
					taxonomy,
					termId,
				] ),
			};
		},
		[ termId, taxonomy, skip ]
	);
}
