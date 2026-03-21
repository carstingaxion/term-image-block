<?php
// This file is generated. Do not modify it manually.
return array(
	'build' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'carstingaxion/term-image-block',
		'version' => '0.1.0',
		'title' => 'Term Image',
		'category' => 'media',
		'icon' => 'format-image',
		'description' => 'Display taxonomy term images with automatic detection and manual selection',
		'keywords' => array(
			'taxonomy',
			'term',
			'category',
			'tag',
			'image',
			'fse',
			'template'
		),
		'attributes' => array(
			'termId' => array(
				'type' => 'number',
				'default' => 0
			),
			'taxonomy' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageSize' => array(
				'type' => 'string',
				'default' => 'large'
			),
			'aspectRatio' => array(
				'type' => 'string',
				'default' => 'auto'
			),
			'linkToTerm' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showCaption' => array(
				'type' => 'boolean',
				'default' => false
			),
			'customCaption' => array(
				'type' => 'string',
				'default' => ''
			),
			'hideIfNoImage' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'align' => array(
				'left',
				'center',
				'right',
				'wide',
				'full'
			),
			'html' => false,
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'shadow' => true,
			'dimensions' => array(
				'width' => true
			)
		),
		'usesContext' => array(
			'postId',
			'postType',
			'termId',
			'taxonomy'
		),
		'textdomain' => 'term-image-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
