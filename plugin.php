<?php
/**
 * Plugin Name:       Term Image Block
 * Description:       Display taxonomy term images with automatic detection and manual selection.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.2
 * Author:            Carsten Bach
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       term-image-block
 * Domain Path:       /languages
 *
 * @package Carstingaxion\TermImageDisplay
 */

if (! defined('ABSPATH') ) {
    exit;
}

if (! class_exists('Carstingaxion_Term_Image_Block') ) {

    /**
     * Main plugin class implementing the Singleton pattern.
     *
     * Handles block registration, term meta registration, and all
     * plugin-level initialisation for the Term Image block.
     *
     * @since 0.1.0
     */
    class Carstingaxion_Term_Image_Block
    {
    

        /**
         * Singleton instance.
         *
         * @since 0.1.0
         * @var   Carstingaxion_Term_Image_Block|null
         */
        private static ?Carstingaxion_Term_Image_Block $instance = null;

        /**
         * Term meta key used to store the image attachment ID.
         *
         * Compatible with the "WP Term Images" plugin by JJJ.
         *
         * @since 0.1.0
         * @var   string
         */
        const META_KEY = 'image';

        /**
         * Retrieve the singleton instance.
         *
         * @since 0.1.0
         *
         * @return Carstingaxion_Term_Image_Block Plugin instance.
         */
        public static function get_instance(): Carstingaxion_Term_Image_Block
        {
            if (null === self::$instance ) {
                self::$instance = new self();
            }

            return self::$instance;
        }

        /**
         * Constructor. Registers WordPress hooks.
         *
         * @since 0.1.0
         */
        private function __construct()
        {
            add_action('init', array( $this, 'register_block' ));
            add_action('init', array( $this, 'register_term_meta' ));
        }

        /**
         * Prevent cloning of the singleton.
         *
         * @since 0.1.0
         *
         * @return void
         */
        private function __clone()
        {
        }

        /**
         * Prevent unserialization of the singleton.
         *
         * @since 0.1.0
         *
         * @throws \RuntimeException Always.
         * @return void
         */
        public function __wakeup(): void
        {
            throw new \RuntimeException('Cannot unserialize singleton.');
        }

        /**
         * Register the block type from compiled metadata.
         *
         * @since 0.1.0
         *
         * @return void
         */
        public function register_block(): void
        {
            register_block_type(__DIR__ . '/build/');
        }

        /**
         * Register the term image meta field for all public taxonomies.
         *
         * The meta field is exposed in the REST API so it can be read and
         * written via the core data store in the block editor.
         *
         * @since 0.1.0
         *
         * @return void
         */
        public function register_term_meta(): void
        {
            /**
             * Get all public taxonomies to register the meta field for each.
             *
             * @var string[] $taxonomies 
             */
            $taxonomies = get_taxonomies(array( 'public' => true ));

            foreach ( $taxonomies as $taxonomy ) {
                register_term_meta(
                    $taxonomy,
                    self::META_KEY,
                    array(
                    'type'              => 'integer',
                    'single'            => true,
                    'default'           => 0,
                    'show_in_rest'      => true,
                    'sanitize_callback' => 'absint',
                    'auth_callback'     => array( $this, 'meta_auth_callback' ),
                    )
                );
            }
        }

        /**
         * Authorization callback for the term image meta field.
         *
         * @since 0.1.0
         *
         * @return bool Whether the current user can edit the meta.
         */
        public function meta_auth_callback(): bool
        {
            return current_user_can('edit_posts');
        }
    }

    Carstingaxion_Term_Image_Block::get_instance();
}
