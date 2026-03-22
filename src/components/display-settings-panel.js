/**
 * Term Image — DisplaySettingsPanel Component.
 *
 * Inspector panel for image size, aspect ratio, link, caption,
 * and visibility settings. Shared between FSE and standard contexts.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import { IMAGE_SIZE_OPTIONS, ASPECT_RATIO_OPTIONS } from '../constants';

/**
 * Display settings inspector panel.
 *
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Block attribute setter.
 * @param {string}   [props.termName]    Term name for caption placeholder.
 * @param {boolean}  [props.initialOpen] Whether panel starts open.
 * @return {Element} Inspector panel element.
 */
export default function DisplaySettingsPanel( {
	attributes,
	setAttributes,
	termName = '',
	initialOpen = false,
} ) {
	const { imageSize, aspectRatio, linkToTerm, showCaption, customCaption } =
		attributes;

	return (
		<PanelBody
			title={ __( 'Display Settings', 'term-image-block' ) }
			initialOpen={ initialOpen }
		>
			<SelectControl
				label={ __( 'Image Size', 'term-image-block' ) }
				value={ imageSize }
				options={ IMAGE_SIZE_OPTIONS }
				onChange={ ( value ) => setAttributes( { imageSize: value } ) }
			/>
			<SelectControl
				label={ __( 'Aspect Ratio', 'term-image-block' ) }
				value={ aspectRatio }
				options={ ASPECT_RATIO_OPTIONS }
				onChange={ ( value ) =>
					setAttributes( { aspectRatio: value } )
				}
			/>
			<ToggleControl
				label={ __( 'Link to term archive', 'term-image-block' ) }
				checked={ linkToTerm }
				onChange={ ( value ) => setAttributes( { linkToTerm: value } ) }
			/>
			<ToggleControl
				label={ __( 'Show caption', 'term-image-block' ) }
				checked={ showCaption }
				onChange={ ( value ) =>
					setAttributes( { showCaption: value } )
				}
			/>
			{ showCaption && (
				<TextControl
					label={ __( 'Custom caption', 'term-image-block' ) }
					value={ customCaption }
					onChange={ ( value ) =>
						setAttributes( { customCaption: value } )
					}
					placeholder={ termName }
					help={ __(
						'Leave empty to use term name',
						'term-image-block'
					) }
				/>
			) }
		</PanelBody>
	);
}
