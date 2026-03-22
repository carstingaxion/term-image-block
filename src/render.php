<?php
/**
 * Server-side rendering for the Term Image block.
 *
 * @package Carstingaxion\TermImageDisplay
 * @since   0.1.0
 *
 * @var array<string, mixed> $attributes Block attributes.
 * @var string               $content    Block content.
 * @var WP_Block             $block      Block instance.
 */

if ( ! class_exists( 'Carstingaxion_Term_Image_Renderer' ) ) {

	/**
	 * Singleton renderer for the Term Image block.
	 *
	 * Encapsulates all front-end rendering logic including auto-detection
	 * of taxonomy terms from the current query context and block context.
	 *
	 * @since 0.1.0
	 */
	class Carstingaxion_Term_Image_Renderer {
	

		/**
		 * Singleton instance.
		 *
		 * @since 0.1.0
		 * @var   Carstingaxion_Term_Image_Renderer|null
		 */
		private static ?Carstingaxion_Term_Image_Renderer $instance = null;

		/**
		 * Retrieve the singleton instance.
		 *
		 * @since 0.1.0
		 *
		 * @return Carstingaxion_Term_Image_Renderer Renderer instance.
		 */
		public static function get_instance(): Carstingaxion_Term_Image_Renderer {
			if ( null === self::$instance ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/**
		 * Private constructor to enforce singleton usage.
		 *
		 * @since 0.1.0
		 */
		private function __construct() {
		}

		/**
		 * Render the block.
		 *
		 * @since 0.1.0
		 *
		 * @param  array<string, mixed> $attributes Block attributes.
		 * @param  array<string, mixed> $context    Block context values.
		 * @return string Rendered HTML or empty string.
		 */
		public function render( array $attributes, array $context = array() ): string {
			$resolved = $this->resolve_term( $attributes, $context );

			if ( ! $resolved['term_id'] ) {
				return '';
			}

			$term = get_term( $resolved['term_id'], $resolved['taxonomy'] );

			if ( ! $term instanceof WP_Term ) {
				return '';
			}

			$image_id = $this->get_term_image_id( $term->term_id );

			return $this->build_output( $attributes, $term, $image_id );
		}

		/**
		 * Resolve taxonomy and term ID from attributes, context, and auto-detection.
		 *
		 * @since 0.1.0
		 *
		 * @param  array<string, mixed> $attributes Block attributes.
		 * @param  array<string, mixed> $context    Block context values.
		 * @return array{taxonomy: string, term_id: int} Resolved values.
		 */
		private function resolve_term( array $attributes, array $context ): array {
			$term_id  = $this->get_int_attribute( $attributes, 'termId' );
			$taxonomy = $this->get_string_attribute( $attributes, 'taxonomy' );

			// Apply context fallbacks.
			$term_id  = $term_id ? $term_id : $this->get_context_int( $context, 'termId' );
			$taxonomy = $taxonomy ? $taxonomy : $this->get_context_string( $context, 'taxonomy' );

			// Rule 3: Skip auto-detection when both are set.
			if ( $taxonomy && $term_id ) {
				return compact( 'taxonomy', 'term_id' );
			}

			return $this->auto_detect_term(
				$taxonomy,
				$term_id,
				$this->get_context_int( $context, 'postId' ),
				$this->get_context_string( $context, 'postType' )
			);
		}

		/**
		 * Build the complete block HTML output.
		 *
		 * Returns an empty string when no image is set, effectively
		 * hiding the block on the frontend.
		 *
		 * @since 0.1.0
		 *
		 * @param  array<string, mixed> $attributes Block attributes.
		 * @param  WP_Term              $term       Resolved term object.
		 * @param  int                  $image_id   Attachment ID or 0.
		 * @return string Rendered HTML or empty string.
		 */
		private function build_output( array $attributes, WP_Term $term, int $image_id ): string {
			if ( ! $image_id ) {
				return '';
			}

			$aspect_ratio       = $this->get_string_attribute( $attributes, 'aspectRatio', 'auto' );
			$wrapper_attributes = get_block_wrapper_attributes(
				array(
					'class' => 'term-image-block--aspect-ratio-' . esc_attr( $aspect_ratio ),
				)
			);

			$image_size = $this->get_string_attribute( $attributes, 'imageSize', 'large' );
			$image_html = $this->build_image_html( $image_id, $image_size, $term->name );

			if ( ! $image_html ) {
				return '';
			}

			$image_html = sprintf(
				'<div class="term-image-block__image-wrapper">%s</div>',
				$image_html
			);

			if ( $this->get_bool_attribute( $attributes, 'linkToTerm' ) ) {
				$image_html = $this->wrap_with_link( $image_html, $term );
			}

			$caption_html = $this->build_caption_html(
				$this->get_bool_attribute( $attributes, 'showCaption' ),
				$this->get_string_attribute( $attributes, 'customCaption' ),
				$term->name
			);

			return sprintf(
				'<div %s><figure class="term-image-block__figure">%s%s</figure></div>',
				$wrapper_attributes,
				$image_html,
				$caption_html
			);
		}

		/**
		 * Auto-detect taxonomy and term ID from the current query context.
		 *
		 * @since 0.1.0
		 *
		 * @param  string $taxonomy          Current taxonomy slug (may be empty).
		 * @param  int    $term_id           Current term ID (may be zero).
		 * @param  int    $context_post_id   Post ID from block context (may be zero).
		 * @param  string $context_post_type Post type from block context (may be empty).
		 * @return array{taxonomy: string, term_id: int} Resolved taxonomy and term ID.
		 */
		private function auto_detect_term(
			string $taxonomy,
			int $term_id,
			int $context_post_id = 0,
			string $context_post_type = ''
		): array {
			// Rule 1: Neither set — resolve from taxonomy archive.
			if ( ! $taxonomy && ! $term_id ) {
				return $this->detect_from_archive();
			}

			// Rule 2: Taxonomy set, no term_id — resolve from post context.
			if ( $taxonomy && ! $term_id ) {
				$term_id = $this->detect_from_post( $taxonomy, $context_post_id, $context_post_type );
			}

			return compact( 'taxonomy', 'term_id' );
		}

		/**
		 * Rule 1: Detect taxonomy and term from the current taxonomy archive.
		 *
		 * @since 0.1.0
		 *
		 * @return array{taxonomy: string, term_id: int} Resolved values, both empty/zero on failure.
		 */
		private function detect_from_archive(): array {
			$taxonomy = '';
			$term_id  = 0;

			if ( ! is_tax() && ! is_category() && ! is_tag() ) {
				return compact( 'taxonomy', 'term_id' );
			}

			$queried_object = get_queried_object();

			if ( $queried_object instanceof WP_Term ) {
				$term_id  = $queried_object->term_id;
				$taxonomy = $queried_object->taxonomy;
			}

			return compact( 'taxonomy', 'term_id' );
		}

		/**
		 * Rule 2: Detect term ID from a post associated with the given taxonomy.
		 *
		 * Checks the block context post first, then falls back to the global
		 * queried object.
		 *
		 * @since 0.1.0
		 *
		 * @param  string $taxonomy          Taxonomy slug.
		 * @param  int    $context_post_id   Post ID from block context.
		 * @param  string $context_post_type Post type from block context.
		 * @return int Resolved term ID, or zero on failure.
		 */
		private function detect_from_post(
			string $taxonomy,
			int $context_post_id,
			string $context_post_type
		): int {
			// Try the context post (e.g. from Query Loop) first.
			$resolved_post_type = $context_post_type;

			if ( ! $resolved_post_type && $context_post_id ) {
				$resolved_post_type = (string) get_post_type( $context_post_id );
			}

			$term_id = $this->get_first_term_for_post(
				$context_post_id,
				$resolved_post_type,
				$taxonomy
			);

			if ( $term_id ) {
				return $term_id;
			}

			// Fall back to the global queried object.
			$queried_object = get_queried_object();

			if ( ! $queried_object instanceof WP_Post ) {
				return 0;
			}

			return $this->get_first_term_for_post(
				$queried_object->ID,
				$queried_object->post_type,
				$taxonomy
			);
		}

		/**
		 * Get the first term ID assigned to a post for a given taxonomy.
		 *
		 * @since 0.1.0
		 *
		 * @param  int    $post_id   Post ID.
		 * @param  string $post_type Post type slug.
		 * @param  string $taxonomy  Taxonomy slug.
		 * @return int Term ID or zero.
		 */
		private function get_first_term_for_post( int $post_id, string $post_type, string $taxonomy ): int {
			if ( ! $post_id || ! $post_type ) {
				return 0;
			}

			if ( ! is_object_in_taxonomy( $post_type, $taxonomy ) ) {
				return 0;
			}

			$post_terms = get_the_terms( $post_id, $taxonomy );

			if ( empty( $post_terms ) || is_wp_error( $post_terms ) ) {
				return 0;
			}

			return $post_terms[0]->term_id;
		}

		/**
		 * Retrieve the image attachment ID from term meta.
		 *
		 * @since 0.1.0
		 *
		 * @param  int $term_id Term ID.
		 * @return int Attachment ID or zero.
		 */
		private function get_term_image_id( int $term_id ): int {
			$image_id = get_term_meta( $term_id, 'image', true );

			if ( ! is_numeric( $image_id ) ) {
				return 0;
			}

			return absint( (int) $image_id );
		}

		/**
		 * Build the <img> element for the term image.
		 *
		 * @since 0.1.0
		 *
		 * @param  int    $image_id   Attachment ID.
		 * @param  string $image_size Registered image size name.
		 * @param  string $alt_text   Alt attribute text.
		 * @return string Image HTML or empty string.
		 */
		private function build_image_html( int $image_id, string $image_size, string $alt_text ): string {
			return wp_get_attachment_image(
				$image_id,
				$image_size,
				false,
				array(
					'class' => 'term-image-block__image',
					'alt'   => esc_attr( $alt_text ),
				)
			);
		}

		/**
		 * Wrap image HTML in a term archive link.
		 *
		 * @since 0.1.0
		 *
		 * @param  string  $image_html Inner HTML to wrap.
		 * @param  WP_Term $term       Term object.
		 * @return string Linked HTML or original HTML on failure.
		 */
		private function wrap_with_link( string $image_html, WP_Term $term ): string {
			$term_link = get_term_link( $term );

			if ( is_wp_error( $term_link ) ) {
				return $image_html;
			}

			return sprintf(
				'<a href="%s" class="term-image-block__link">%s</a>',
				esc_url( $term_link ),
				$image_html
			);
		}

		/**
		 * Build the figcaption element if captions are enabled.
		 *
		 * @since 0.1.0
		 *
		 * @param  bool   $show_caption   Whether to display a caption.
		 * @param  string $custom_caption Custom caption text.
		 * @param  string $term_name      Fallback term name.
		 * @return string Caption HTML or empty string.
		 */
		private function build_caption_html( bool $show_caption, string $custom_caption, string $term_name ): string {
			if ( ! $show_caption ) {
				return '';
			}

			$caption_text = ! empty( $custom_caption ) ? $custom_caption : $term_name;

			return sprintf(
				'<figcaption class="term-image-block__caption">%s</figcaption>',
				esc_html( $caption_text )
			);
		}

		/**
		 * Safely retrieve an integer attribute.
		 *
		 * @since 0.1.0
		 *
		 * @param  array<string, mixed> $attributes    Block attributes.
		 * @param  string               $key           Attribute key.
		 * @param  int                  $default_value Default value.
		 * @return int Sanitized integer.
		 */
		private function get_int_attribute( array $attributes, string $key, int $default_value = 0 ): int {
			return isset( $attributes[ $key ] ) && is_int( $attributes[ $key ] ) ? $attributes[ $key ] : $default_value;
		}

		/**
		 * Safely retrieve a string attribute.
		 *
		 * @since 0.1.0
		 *
		 * @param  array<string, mixed> $attributes    Block attributes.
		 * @param  string               $key           Attribute key.
		 * @param  string               $default_value Default value.
		 * @return string Sanitized string.
		 */
		private function get_string_attribute( array $attributes, string $key, string $default_value = '' ): string {
			if ( ! isset( $attributes[ $key ] ) || ! is_string( $attributes[ $key ] ) ) {
				return $default_value;
			}

			return sanitize_text_field( $attributes[ $key ] );
		}

		/**
		 * Safely retrieve a boolean attribute.
		 *
		 * @since 0.1.0
		 *
		 * @param  array<string, mixed> $attributes    Block attributes.
		 * @param  string               $key           Attribute key.
		 * @param  bool                 $default_value Default value.
		 * @return bool Sanitized boolean.
		 */
		private function get_bool_attribute( array $attributes, string $key, bool $default_value = false ): bool {
			return isset( $attributes[ $key ] ) ? (bool) $attributes[ $key ] : $default_value;
		}

		/**
		 * Safely retrieve an integer from block context.
		 *
		 * @since 0.1.0
		 *
		 * @param  array<string, mixed> $context Block context.
		 * @param  string               $key     Context key.
		 * @return int Sanitized integer.
		 */
		private function get_context_int( array $context, string $key ): int {
			if ( ! isset( $context[ $key ] ) ) {
				return 0;
			}

			$value = $context[ $key ];

			return is_numeric( $value ) ? absint( $value ) : 0;
		}

		/**
		 * Safely retrieve a string from block context.
		 *
		 * @since 0.1.0
		 *
		 * @param  array<string, mixed> $context Block context.
		 * @param  string               $key     Context key.
		 * @return string Sanitized string.
		 */
		private function get_context_string( array $context, string $key ): string {
			if ( ! isset( $context[ $key ] ) ) {
				return '';
			}

			$value = $context[ $key ];

			return is_string( $value ) ? sanitize_text_field( $value ) : '';
		}
	}
}

/**
 * WordPress makes this spaghetti safe.
 *
 * @var array<string, mixed> $carstingaxion_term_image_renderer_context Type-safe block context.
 */
$carstingaxion_term_image_renderer_context = $block->context;

echo Carstingaxion_Term_Image_Renderer::get_instance()->render( $attributes, $carstingaxion_term_image_renderer_context ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
