/**
 * Term Image — TermImagePanel Component.
 *
 * Inspector panel for uploading, replacing, and removing term images.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Spinner, Button, Notice } from '@wordpress/components';
import { upload } from '@wordpress/icons';

/**
 * Term image management inspector panel.
 *
 * @param {Object}   props               Component props.
 * @param {number}   props.termImageId   Current image attachment ID.
 * @param {string}   props.imageUrl      Resolved image URL.
 * @param {string}   props.termName      Term name for alt text.
 * @param {boolean}  props.isTermLoading Whether term record is loading.
 * @param {boolean}  props.saving        Whether a save operation is in progress.
 * @param {string}   props.error         Current error message.
 * @param {string}   props.success       Current success message.
 * @param {Function} props.onSelectImage Callback for image selection.
 * @param {Function} props.onRemoveImage Callback for image removal.
 * @return {Element} Inspector panel element.
 */
export default function TermImagePanel( {
	termImageId,
	imageUrl,
	termName,
	isTermLoading,
	saving,
	error,
	success,
	onSelectImage,
	onRemoveImage,
} ) {
	return (
		<PanelBody
			title={ __( 'Term Image', 'term-image-block' ) }
			initialOpen={ true }
		>
			{ error && (
				<Notice status="error" isDismissible={ false }>
					{ error }
				</Notice>
			) }
			{ success && (
				<Notice status="success" isDismissible={ false }>
					{ success }
				</Notice>
			) }
			{ isTermLoading ? (
				<Spinner />
			) : (
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ onSelectImage }
						allowedTypes={ [ 'image' ] }
						value={ termImageId }
						render={ ( { open } ) => (
							<div className="term-image-block__media-controls">
								{ termImageId > 0 && imageUrl ? (
									<div className="term-image-block__preview">
										<img
											src={ imageUrl }
											alt={ termName }
											className="term-image-block__preview-image"
										/>
										<div className="term-image-block__preview-actions">
											<Button
												onClick={ open }
												variant="secondary"
												size="small"
												disabled={ saving }
											>
												{ __(
													'Replace Image',
													'term-image-block'
												) }
											</Button>
											<Button
												onClick={ onRemoveImage }
												variant="tertiary"
												isDestructive
												size="small"
												disabled={ saving }
											>
												{ __(
													'Remove Image',
													'term-image-block'
												) }
											</Button>
										</div>
									</div>
								) : (
									<Button
										onClick={ open }
										variant="secondary"
										icon={ upload }
										disabled={ saving }
									>
										{ __(
											'Upload Image',
											'term-image-block'
										) }
									</Button>
								) }
								{ saving && <Spinner /> }
							</div>
						) }
					/>
				</MediaUploadCheck>
			) }
			<p className="term-image-block__help-text">
				{ __(
					'This image will be saved to the term and available for use throughout your site.',
					'term-image-block'
				) }
			</p>
		</PanelBody>
	);
}
