/**
 * Term Image — PlaceholderCanvas Component.
 *
 * Flexible canvas placeholder used when no image is assigned.
 * Responds to block styles, aspect ratios, and layout settings.
 *
 * @package
 * @since   0.1.0
 */

/**
 * Placeholder canvas with badge overlay.
 *
 * @param {Object}  props               Component props.
 * @param {string}  props.label         Primary badge label text.
 * @param {string}  props.hint          Secondary badge hint text.
 * @param {boolean} [props.showCaption] Whether to render the caption slot.
 * @param {string}  [props.caption]     Caption text.
 * @return {Element} Placeholder figure element.
 */
export default function PlaceholderCanvas( {
	label,
	hint,
	showCaption = false,
	caption = '',
} ) {
	return (
		<figure className="term-image-block__figure">
			<div className="term-image-block__image-wrapper term-image-block__canvas">
				<div className="term-image-block__badge">
					<span className="term-image-block__badge-icon dashicons dashicons-format-image"></span>
					<span className="term-image-block__badge-label">
						{ label }
					</span>
					<span className="term-image-block__badge-hint">
						{ hint }
					</span>
				</div>
			</div>
			{ showCaption && caption && (
				<figcaption className="term-image-block__caption">
					{ caption }
				</figcaption>
			) }
		</figure>
	);
}
