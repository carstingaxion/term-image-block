/**
 * Term Image — Shared Constants.
 *
 * Centralises option arrays and configuration values used across
 * editor components and hooks.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Available image size options for the select control.
 *
 * @type {Array<{label: string, value: string}>}
 */
export const IMAGE_SIZE_OPTIONS = [
	{ label: __( 'Thumbnail', 'term-image-block' ), value: 'thumbnail' },
	{ label: __( 'Medium', 'term-image-block' ), value: 'medium' },
	{ label: __( 'Large', 'term-image-block' ), value: 'large' },
	{ label: __( 'Full', 'term-image-block' ), value: 'full' },
];

/**
 * Available aspect ratio options for the select control.
 *
 * @type {Array<{label: string, value: string}>}
 */
export const ASPECT_RATIO_OPTIONS = [
	{ label: __( 'Auto', 'term-image-block' ), value: 'auto' },
	{ label: __( 'Square (1:1)', 'term-image-block' ), value: '1-1' },
	{ label: __( 'Landscape (16:9)', 'term-image-block' ), value: '16-9' },
	{ label: __( 'Portrait (9:16)', 'term-image-block' ), value: '9-16' },
	{ label: __( 'Wide (21:9)', 'term-image-block' ), value: '21-9' },
];

/**
 * Term meta key used to store the image attachment ID.
 *
 * Compatible with the "WP Term Images" plugin by JJJ.
 *
 * @type {string}
 */
export const TERM_IMAGE_META_KEY = 'image';
