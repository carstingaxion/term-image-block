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

if (! class_exists('Carstingaxion_Term_Image_Renderer') ) {

    /**
     * Singleton renderer for the Term Image block.
     *
     * Encapsulates all front-end rendering logic including auto-detection
     * of taxonomy terms from the current query context and block context.
     *
     * @since 0.1.0
     */
    class Carstingaxion_Term_Image_Renderer
    {

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
        public static function get_instance(): Carstingaxion_Term_Image_Renderer
        {
            if (null === self::$instance ) {
                self::$instance = new self();
            }

            return self::$instance;
        }

        /**
         * Private constructor to enforce singleton usage.
         *
         * @since 0.1.0
         */
        private function __construct()
        {
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
        public function render( array $attributes, array $context = array() ): string
        {
            $term_id          = $this->get_int_attribute($attributes, 'termId');
            $taxonomy         = $this->get_string_attribute($attributes, 'taxonomy');
            $image_size       = $this->get_string_attribute($attributes, 'imageSize', 'large');
            $aspect_ratio     = $this->get_string_attribute($attributes, 'aspectRatio', 'auto');
            $link_to_term     = $this->get_bool_attribute($attributes, 'linkToTerm');
            $show_caption     = $this->get_bool_attribute($attributes, 'showCaption');
            $custom_caption   = $this->get_string_attribute($attributes, 'customCaption');
            $hide_if_no_image = $this->get_bool_attribute($attributes, 'hideIfNoImage');

            /*
            * Context-aware resolution.
            *
            * If a parent block (e.g. a custom block) provides termId and taxonomy
            * via block context, use those as fallbacks when the attributes are empty.
            */
            $context_term_id  = isset($context['termId']) ? absint($context['termId']) : 0;
            $context_taxonomy = isset($context['taxonomy']) ? sanitize_text_field($context['taxonomy']) : '';
            $context_post_id  = isset($context['postId']) ? absint($context['postId']) : 0;
            $context_post_type = isset($context['postType']) ? sanitize_text_field($context['postType']) : '';

            /*
            * Apply context values as fallbacks.
            *
            * Direct termId/taxonomy context takes priority over postId/postType context.
            */
            if (! $term_id && $context_term_id ) {
                $term_id = $context_term_id;
            }

            if (! $taxonomy && $context_taxonomy ) {
                $taxonomy = $context_taxonomy;
            }

            /*
            * Auto-detection logic.
            *
            * Rule 3: Skip entirely when both taxonomy and term_id are set.
            * Rule 1: Neither set — resolve from taxonomy archive queried object.
            * Rule 2: Taxonomy set, no term_id — resolve from the current post
            *         or from the context post.
            */
            if (! $taxonomy || ! $term_id ) {
                [ $taxonomy, $term_id ] = $this->auto_detect_term(
                    $taxonomy,
                    $term_id,
                    $context_post_id,
                    $context_post_type
                );
            }

            if (! $term_id ) {
                return '';
            }

            $term = get_term($term_id, $taxonomy);

            if (! $term instanceof WP_Term ) {
                return '';
            }

            $image_id = (int) get_term_meta($term_id, 'image', true);

            if (! $image_id && $hide_if_no_image || ! is_int($image_id) ) {
                return '';
            }

            $wrapper_attributes = get_block_wrapper_attributes(
                array(
                'class' => 'term-image-block--aspect-ratio-' . esc_attr($aspect_ratio),
                )
            );

            if (! $image_id ) {
                return sprintf(
                    '<div %s><div class="term-image-block__empty">%s</div></div>',
                    $wrapper_attributes,
                    esc_html__('No image set for this term.', 'term-image-block')
                );
            }

            $image_html = $this->build_image_html($image_id, $image_size, $term->name);

            if (! $image_html ) {
                return '';
            }

            $image_html = sprintf(
                '<div class="term-image-block__image-wrapper">%s</div>',
                $image_html
            );

            if ($link_to_term ) {
                $image_html = $this->wrap_with_link($image_html, $term);
            }

            $caption_html = $this->build_caption_html($show_caption, $custom_caption, $term->name);

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
         * Considers both the global query and an optional context post
         * (e.g. provided by a Query Loop block).
         *
         * @since 0.1.0
         *
         * @param  string $taxonomy          Current taxonomy slug (may be empty).
         * @param  int    $term_id           Current term ID (may be zero).
         * @param  int    $context_post_id   Post ID from block context (may be zero).
         * @param  string $context_post_type Post type from block context (may be empty).
         * @return array{0: string, 1: int} Resolved taxonomy and term ID.
         */
        private function auto_detect_term(
            string $taxonomy,
            int $term_id,
            int $context_post_id = 0,
            string $context_post_type = ''
        ): array {
            /*
            * Rule 1: No taxonomy and no term_id — use the queried object
            * on taxonomy archive pages.
            */
            if (! $taxonomy && ! $term_id ) {
                if (is_tax() || is_category() || is_tag() ) {
                    $queried_object = get_queried_object();

                    if ($queried_object instanceof WP_Term ) {
                        $term_id  = $queried_object->term_id;
                        $taxonomy = $queried_object->taxonomy;
                    }
                }
            }

            /*
            * Rule 2: Taxonomy is set but term_id is not — resolve from
            * the context post first, then fall back to the queried object.
            */
            if ($taxonomy && ! $term_id ) {
                /*
                * Try the context post (e.g. from Query Loop) first.
                */
                if ($context_post_id > 0 ) {
                    $post_type_to_check = $context_post_type ?: get_post_type($context_post_id);

                    if ($post_type_to_check && is_object_in_taxonomy($post_type_to_check, $taxonomy) ) {
                        $post_terms = get_the_terms($context_post_id, $taxonomy);

                        if (! empty($post_terms) && ! is_wp_error($post_terms) ) {
                            $term_id = $post_terms[0]->term_id;
                        }
                    }
                }

                /*
                * Fall back to the global queried object.
                */
                if (! $term_id ) {
                    $queried_object = get_queried_object();

                    if ($queried_object instanceof WP_Post
                        && is_object_in_taxonomy($queried_object->post_type, $taxonomy)
                    ) {
                        $post_terms = get_the_terms($queried_object->ID, $taxonomy);

                        if (! empty($post_terms) && ! is_wp_error($post_terms) ) {
                            $term_id = $post_terms[0]->term_id;
                        }
                    }
                }
            }

            return array( $taxonomy, $term_id );
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
        private function build_image_html( int $image_id, string $image_size, string $alt_text ): string
        {
            return wp_get_attachment_image(
                $image_id,
                $image_size,
                false,
                array(
                'class' => 'term-image-block__image',
                'alt'   => esc_attr($alt_text),
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
        private function wrap_with_link( string $image_html, WP_Term $term ): string
        {
            $term_link = get_term_link($term);

            if (is_wp_error($term_link) ) {
                return $image_html;
            }

            return sprintf(
                '<a href="%s" class="term-image-block__link">%s</a>',
                esc_url($term_link),
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
        private function build_caption_html( bool $show_caption, string $custom_caption, string $term_name ): string
        {
            if (! $show_caption ) {
                return '';
            }

            $caption_text = ! empty($custom_caption) ? $custom_caption : $term_name;

            return sprintf(
                '<figcaption class="term-image-block__caption">%s</figcaption>',
                esc_html($caption_text)
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
        private function get_int_attribute( array $attributes, string $key, int $default_value = 0 ): int
        {
            return isset($attributes[ $key ]) && is_int($attributes[ $key ]) ? $attributes[ $key ] : $default_value;
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
        private function get_string_attribute( array $attributes, string $key, string $default_value = '' ): string
        {
            return isset($attributes[ $key ]) && is_string($attributes[ $key ]) ? sanitize_text_field($attributes[ $key ]) : $default_value;
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
        private function get_bool_attribute( array $attributes, string $key, bool $default_value = false ): bool
        {
            return isset($attributes[ $key ]) ? (bool) $attributes[ $key ] : $default_value;
        }
    }
}

echo Carstingaxion_Term_Image_Renderer::get_instance()->render($attributes, $block->context); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
