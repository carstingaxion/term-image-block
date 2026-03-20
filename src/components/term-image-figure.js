/**
 * Term Image — TermImageFigure Component.
 *
 * Renders the actual term image with optional caption.
 *
 * @package
 * @since   0.1.0
 */

/**
 * Term image figure with optional caption.
 *
 * @param {Object}  props             Component props.
 * @param {string}  props.imageUrl    Resolved image URL.
 * @param {string}  props.termName    Term name for alt text.
 * @param {boolean} props.showCaption Whether to show the caption.
 * @param {string}  props.caption     Caption text to display.
 * @return {Element} Figure element containing the term image.
 */
export default function TermImageFigure( {
	imageUrl,
	termName,
	showCaption,
	caption,
} ) {
	return (
		<figure className="term-image-block__figure">
			<div className="term-image-block__image-wrapper">
				<img
					src={ imageUrl }
					alt={ termName }
					className="term-image-block__image"
				/>
			</div>
			{ showCaption && caption && (
				<figcaption className="term-image-block__caption">
					{ caption }
				</figcaption>
			) }
		</figure>
	);
}
