/**
 * Term Image — Editor Component.
 *
 * Thin orchestrator that composes hooks and components to render
 * the block in the WordPress block editor. All data-fetching,
 * persistence, and presentational logic is delegated to dedicated
 * modules for separation of concerns and testability.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import {
	Placeholder,
	Spinner,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useMemo } from '@wordpress/element';

/**
 * Editor-only styles.
 */
import './editor.scss';

/**
 * Internal dependencies — hooks.
 */
import {
	useIsFSETemplate,
	useTaxonomies,
	useTerms,
	useTermRecord,
	useTermImageUrl,
	useTermImageManager,
} from './hooks';

/**
 * Internal dependencies — components.
 */
import {
	PlaceholderCanvas,
	TermImageFigure,
	FSEInspector,
	StandardInspector,
} from './components';

/**
 * Internal dependencies — utilities.
 */
import { filterPublicTaxonomies } from './utils';
import { TERM_IMAGE_META_KEY } from './constants';

/**
 * Edit component for the Term Image block.
 *
 * Handles both FSE template and standard post/page editing contexts,
 * delegating data retrieval to custom hooks and rendering to
 * focused presentational components.
 *
 * Supports `usesContext` — when a parent block provides `termId`,
 * `taxonomy`, `postId`, or `postType` via block context, those values
 * are used as fallbacks when the block's own attributes are empty.
 *
 * @param {Object}   props               Block edit props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Block attribute setter.
 * @param {Object}   props.context       Block context from parent blocks.
 * @return {Element} Block editor element.
 */
export default function Edit( { attributes, setAttributes, context } ) {
	const { imageSize, aspectRatio, showCaption, customCaption } = attributes;

	/*
	 * Resolve effective termId and taxonomy from attributes,
	 * falling back to block context values when attributes are empty.
	 */
	const contextTermId = context?.termId ? parseInt( context.termId, 10 ) : 0;
	const contextTaxonomy = context?.taxonomy || '';

	/** @type {number} Effective term ID — attribute takes priority over context. */
	const termId = attributes.termId || contextTermId;

	/** @type {string} Effective taxonomy — attribute takes priority over context. */
	const taxonomy = attributes.taxonomy || contextTaxonomy;

	/** @type {boolean} Whether values came from context rather than attributes. */
	const isFromContext =
		( ! attributes.termId && contextTermId > 0 ) ||
		( ! attributes.taxonomy && contextTaxonomy !== '' );

	/* ── Hooks ─────────────────────────────────────────────────── */

	const isInFSETemplate = useIsFSETemplate();
	const { taxonomies, isTaxonomiesLoading } = useTaxonomies();
	const { terms, isTermsLoading } = useTerms( taxonomy, isInFSETemplate );
	const { termRecord, isTermLoading } = useTermRecord(
		termId,
		taxonomy,
		false /* Never skip in editor — we need the record for preview. */
	);

	const {
		saving,
		error,
		success,
		onSelectImage,
		onRemoveImage,
		clearMessages,
	} = useTermImageManager( termId, taxonomy );

	/* ── Derived data ──────────────────────────────────────────── */

	/** @type {Array<Object>} */
	const publicTaxonomies = useMemo(
		() => filterPublicTaxonomies( taxonomies ),
		[ taxonomies ]
	);

	/** @type {number} */
	const termImageId = termRecord?.meta?.[ TERM_IMAGE_META_KEY ] || 0;

	/** @type {string} */
	const termName = termRecord?.name || '';

	/** @type {string} */
	const imageUrl = useTermImageUrl( termImageId, imageSize );

	/** @type {string} */
	const caption = customCaption || termName;

	/** @type {boolean} */
	const loading = isTaxonomiesLoading || isTermsLoading;

	const blockProps = useBlockProps( {
		className: `term-image-block--aspect-ratio-${ aspectRatio }`,
	} );

	/* ── Handlers ──────────────────────────────────────────────── */

	/**
	 * Clear term and taxonomy selection.
	 *
	 * @return {void}
	 */
	const clearSelection = () => {
		setAttributes( { termId: 0, taxonomy: '' } );
		clearMessages();
	};

	/* ── Loading state ─────────────────────────────────────────── */

	if ( loading && ! publicTaxonomies.length ) {
		return (
			<div { ...blockProps }>
				<Placeholder
					icon="format-image"
					label={ __( 'Term Image', 'term-image-block' ) }
				>
					<Spinner />
				</Placeholder>
			</div>
		);
	}

	/* ── FSE Template Context ──────────────────────────────────── */

	if ( isInFSETemplate ) {
		/*
		 * In FSE templates, if we have a resolved term from context,
		 * show the actual image preview instead of a placeholder.
		 */
		if ( termId > 0 && termRecord ) {
			const selectedTaxLabel = taxonomy
				? publicTaxonomies.find( ( t ) => t.slug === taxonomy )?.name ||
				  taxonomy
				: '';

			const contextLabel = isFromContext
				? sprintf(
						/* translators: %1$s: term name, %2$s: taxonomy label */
						__( 'From context: %1$s (%2$s)', 'term-image-block' ),
						termName,
						selectedTaxLabel
				  )
				: '';

			return (
				<>
					<FSEInspector
						attributes={ attributes }
						setAttributes={ setAttributes }
						taxonomy={ attributes.taxonomy }
						publicTaxonomies={ publicTaxonomies }
						contextInfo={ contextLabel }
					/>
					<div { ...blockProps }>
						{ imageUrl ? (
							<TermImageFigure
								imageUrl={ imageUrl }
								termName={ termName }
								showCaption={ showCaption }
								caption={ caption }
							/>
						) : (
							<PlaceholderCanvas
								label={
									termName
										? sprintf(
												/* translators: %s: term name */
												__(
													'Term Image — %s',
													'term-image-block'
												),
												termName
										  )
										: __( 'Term Image', 'term-image-block' )
								}
								hint={ __(
									'No image set for this term',
									'term-image-block'
								) }
								showCaption={ showCaption }
								caption={
									customCaption ||
									termName ||
									__( 'Term name', 'term-image-block' )
								}
							/>
						) }
					</div>
				</>
			);
		}

		const selectedTaxLabel = attributes.taxonomy
			? publicTaxonomies.find( ( t ) => t.slug === attributes.taxonomy )
					?.name || attributes.taxonomy
			: '';

		const badgeLabel = attributes.taxonomy
			? sprintf(
					/* translators: %s: taxonomy label */
					__( 'Term Image — %s', 'term-image-block' ),
					selectedTaxLabel
			  )
			: __( 'Term Image — Auto-detect', 'term-image-block' );

		const badgeHint = attributes.taxonomy
			? __( 'Resolves from current post or archive', 'term-image-block' )
			: __( 'Uses queried term on archive pages', 'term-image-block' );

		return (
			<>
				<FSEInspector
					attributes={ attributes }
					setAttributes={ setAttributes }
					taxonomy={ attributes.taxonomy }
					publicTaxonomies={ publicTaxonomies }
				/>
				<div { ...blockProps }>
					<PlaceholderCanvas
						label={ badgeLabel }
						hint={ badgeHint }
						showCaption={ showCaption }
						caption={
							customCaption ||
							__( 'Term name', 'term-image-block' )
						}
					/>
				</div>
			</>
		);
	}

	/* ── Standard Post / Page Context ──────────────────────────── */

	/** @type {string} */
	const placeholderLabel = termId
		? __( 'No image set', 'term-image-block' )
		: __( 'Term Image', 'term-image-block' );

	/** @type {string} */
	let placeholderHint;

	if ( termId ) {
		placeholderHint = __(
			'Use the Term Image panel to upload one',
			'term-image-block'
		);
	} else if ( isFromContext ) {
		placeholderHint = __(
			'Receiving term from parent block context',
			'term-image-block'
		);
	} else {
		placeholderHint = __(
			'Select a taxonomy and term in the sidebar',
			'term-image-block'
		);
	}

	/** @type {string} */
	const placeholderCaption =
		customCaption || termName || __( 'Term name', 'term-image-block' );

	return (
		<>
			<StandardInspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				taxonomy={ attributes.taxonomy }
				termId={ attributes.termId }
				effectiveTermId={ termId }
				effectiveTaxonomy={ taxonomy }
				isFromContext={ isFromContext }
				publicTaxonomies={ publicTaxonomies }
				terms={ terms }
				isTermsLoading={ isTermsLoading }
				termImageId={ termImageId }
				imageUrl={ imageUrl }
				termName={ termName }
				isTermLoading={ isTermLoading }
				saving={ saving }
				error={ error }
				success={ success }
				onSelectImage={ onSelectImage }
				onRemoveImage={ onRemoveImage }
				onClearMessages={ clearMessages }
			/>

			{ attributes.termId > 0 && (
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							icon="no"
							label={ __(
								'Clear selection',
								'term-image-block'
							) }
							onClick={ clearSelection }
						/>
					</ToolbarGroup>
				</BlockControls>
			) }

			<div { ...blockProps }>
				{ imageUrl ? (
					<TermImageFigure
						imageUrl={ imageUrl }
						termName={ termName }
						showCaption={ showCaption }
						caption={ caption }
					/>
				) : (
					<PlaceholderCanvas
						label={ placeholderLabel }
						hint={ placeholderHint }
						showCaption={ showCaption }
						caption={ placeholderCaption }
					/>
				) }
			</div>
		</>
	);
}
