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
 * Skips resolution in FSE template context where terms are resolved
 * server-side.
 *
 * @param {number}  termId          Term ID.
 * @param {string}  taxonomy        Taxonomy slug.
 * @param {boolean} isInFSETemplate Whether the editor is in FSE template context.
 * @return {{ termRecord: Object|null, isTermLoading: boolean }} Returns an object containing the term record and a loading state.
 */
export default function useTermRecord( termId, taxonomy, isInFSETemplate ) {
	return useSelect(
		( select ) => {
			if ( ! termId || ! taxonomy || isInFSETemplate ) {
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
		[ termId, taxonomy, isInFSETemplate ]
	);
}
