/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block-styles.js"
/*!*****************************!*\
  !*** ./src/block-styles.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Term Image — Block Styles Mirror.
 *
 * Copies all block styles registered for core/image to the
 * carstingaxion/term-image-block block so it inherits visual variants
 * like "Rounded" automatically.
 *
 * Uses wp.data.subscribe to watch the block registry, since our
 * editor script loads before core/image styles are registered.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */



/**
 * Self-invoking function that subscribes to the data store and
 * mirrors core/image styles once they become available.
 *
 * @return {void}
 */
(() => {
  /**
   * Flag to prevent duplicate processing.
   *
   * @type {boolean}
   */
  let copied = false;
  const unsubscribe = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.subscribe)(() => {
    if (copied) {
      return;
    }

    /** @type {Object} */
    const blocksStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/blocks');

    /* Wait until core/image is present in the registry. */
    const imageType = blocksStore.getBlockType('core/image');
    if (!imageType) {
      return;
    }

    /** @type {Array<{name: string, label: string}>|undefined} */
    const styles = blocksStore.getBlockStyles('core/image');
    if (!styles || !styles.length) {
      return;
    }
    copied = true;
    unsubscribe();

    /** @type {Array<{name: string, label: string}>} */
    const existing = blocksStore.getBlockStyles('carstingaxion/term-image-block') || [];

    /** @type {Set<string>} */
    const existingNames = new Set(existing.map(s => s.name));
    styles.forEach(style => {
      /* Skip the default style and any already registered. */
      if (style.name === 'default' || existingNames.has(style.name)) {
        return;
      }
      (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockStyle)('carstingaxion/term-image-block', {
        name: style.name,
        label: style.label
      });
    });
  });
})();

/***/ },

/***/ "./src/components/display-settings-panel.js"
/*!**************************************************!*\
  !*** ./src/components/display-settings-panel.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DisplaySettingsPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
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



/**
 * Internal dependencies.
 */


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

function DisplaySettingsPanel({
  attributes,
  setAttributes,
  termName = '',
  initialOpen = false
}) {
  const {
    imageSize,
    aspectRatio,
    linkToTerm,
    showCaption,
    customCaption,
    hideIfNoImage
  } = attributes;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display Settings', 'term-image-block'),
    initialOpen: initialOpen,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Image Size', 'term-image-block'),
      value: imageSize,
      options: _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE_OPTIONS,
      onChange: value => setAttributes({
        imageSize: value
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Aspect Ratio', 'term-image-block'),
      value: aspectRatio,
      options: _constants__WEBPACK_IMPORTED_MODULE_2__.ASPECT_RATIO_OPTIONS,
      onChange: value => setAttributes({
        aspectRatio: value
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Link to term archive', 'term-image-block'),
      checked: linkToTerm,
      onChange: value => setAttributes({
        linkToTerm: value
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show caption', 'term-image-block'),
      checked: showCaption,
      onChange: value => setAttributes({
        showCaption: value
      })
    }), showCaption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom caption', 'term-image-block'),
      value: customCaption,
      onChange: value => setAttributes({
        customCaption: value
      }),
      placeholder: termName,
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Leave empty to use term name', 'term-image-block')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hide if no image', 'term-image-block'),
      checked: hideIfNoImage,
      onChange: value => setAttributes({
        hideIfNoImage: value
      }),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hide the block on frontend if term has no image', 'term-image-block')
    })]
  });
}

/***/ },

/***/ "./src/components/fse-inspector.js"
/*!*****************************************!*\
  !*** ./src/components/fse-inspector.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FSEInspector)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _display_settings_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./display-settings-panel */ "./src/components/display-settings-panel.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Term Image — FSEInspector Component.
 *
 * Inspector controls specific to the FSE template editing context.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */




/**
 * Internal dependencies.
 */



/**
 * FSE template inspector controls.
 *
 * @param {Object}        props                  Component props.
 * @param {Object}        props.attributes       Block attributes.
 * @param {Function}      props.setAttributes    Block attribute setter.
 * @param {string}        props.taxonomy         Current taxonomy slug.
 * @param {Array<Object>} props.publicTaxonomies Filtered public taxonomies.
 * @param {string}        [props.contextInfo]    Info about context-provided values.
 * @return {Element} Inspector controls element.
 */

function FSEInspector({
  attributes,
  setAttributes,
  taxonomy,
  publicTaxonomies,
  contextInfo = ''
}) {
  /** @type {Array<{label: string, value: string}>} */
  const taxonomyOptions = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.buildTaxonomyOptions)(publicTaxonomies, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Auto-detect (archive pages)', 'term-image-block'));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term Detection', 'term-image-block'),
      initialOpen: true,
      children: [contextInfo && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
        status: "info",
        isDismissible: false,
        children: contextInfo
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Taxonomy', 'term-image-block'),
        value: taxonomy,
        options: taxonomyOptions,
        onChange: value => setAttributes({
          taxonomy: value,
          termId: 0
        }),
        help: taxonomy ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('The block will use the first term from this taxonomy assigned to the current post, or the queried term on archive pages.', 'term-image-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Auto-detect uses the queried term on taxonomy archive pages.', 'term-image-block')
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_display_settings_panel__WEBPACK_IMPORTED_MODULE_3__["default"], {
      attributes: attributes,
      setAttributes: setAttributes,
      initialOpen: true
    })]
  });
}

/***/ },

/***/ "./src/components/index.js"
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisplaySettingsPanel: () => (/* reexport safe */ _display_settings_panel__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   FSEInspector: () => (/* reexport safe */ _fse_inspector__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   PlaceholderCanvas: () => (/* reexport safe */ _placeholder_canvas__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   StandardInspector: () => (/* reexport safe */ _standard_inspector__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   TermImageFigure: () => (/* reexport safe */ _term_image_figure__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   TermImagePanel: () => (/* reexport safe */ _term_image_panel__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   TermSelectionPanel: () => (/* reexport safe */ _term_selection_panel__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _display_settings_panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display-settings-panel */ "./src/components/display-settings-panel.js");
/* harmony import */ var _term_selection_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./term-selection-panel */ "./src/components/term-selection-panel.js");
/* harmony import */ var _term_image_panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./term-image-panel */ "./src/components/term-image-panel.js");
/* harmony import */ var _placeholder_canvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./placeholder-canvas */ "./src/components/placeholder-canvas.js");
/* harmony import */ var _term_image_figure__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./term-image-figure */ "./src/components/term-image-figure.js");
/* harmony import */ var _fse_inspector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fse-inspector */ "./src/components/fse-inspector.js");
/* harmony import */ var _standard_inspector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./standard-inspector */ "./src/components/standard-inspector.js");
/**
 * Term Image — Components Barrel Export.
 *
 * Re-exports all editor components for convenient importing.
 *
 * @package
 * @since   0.1.0
 */









/***/ },

/***/ "./src/components/placeholder-canvas.js"
/*!**********************************************!*\
  !*** ./src/components/placeholder-canvas.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlaceholderCanvas)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

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
function PlaceholderCanvas({
  label,
  hint,
  showCaption = false,
  caption = ''
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("figure", {
    className: "term-image-block__figure",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "term-image-block__image-wrapper term-image-block__canvas",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "term-image-block__badge",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "term-image-block__badge-icon dashicons dashicons-format-image"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "term-image-block__badge-label",
          children: label
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "term-image-block__badge-hint",
          children: hint
        })]
      })
    }), showCaption && caption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("figcaption", {
      className: "term-image-block__caption",
      children: caption
    })]
  });
}

/***/ },

/***/ "./src/components/standard-inspector.js"
/*!**********************************************!*\
  !*** ./src/components/standard-inspector.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StandardInspector)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _term_selection_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./term-selection-panel */ "./src/components/term-selection-panel.js");
/* harmony import */ var _term_image_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./term-image-panel */ "./src/components/term-image-panel.js");
/* harmony import */ var _display_settings_panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./display-settings-panel */ "./src/components/display-settings-panel.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * Term Image — StandardInspector Component.
 *
 * Inspector controls for the standard post/page editing context.
 * Composes the term selection, term image management, and display
 * settings panels.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */




/**
 * Internal dependencies.
 */




/**
 * Standard post/page inspector controls.
 *
 * @param {Object}        props                    Component props.
 * @param {Object}        props.attributes         Block attributes.
 * @param {Function}      props.setAttributes      Block attribute setter.
 * @param {string}        props.taxonomy           Current taxonomy attribute.
 * @param {number}        props.termId             Current term ID attribute.
 * @param {number}        props.effectiveTermId    Resolved term ID (attribute or context).
 * @param {string}        props.effectiveTaxonomy  Resolved taxonomy (attribute or context).
 * @param {boolean}       props.isFromContext       Whether values come from block context.
 * @param {Array<Object>} props.publicTaxonomies   Filtered public taxonomies.
 * @param {Array<Object>} props.terms              Terms for the selected taxonomy.
 * @param {boolean}       props.isTermsLoading     Whether terms are loading.
 * @param {number}        props.termImageId        Current image attachment ID.
 * @param {string}        props.imageUrl           Resolved image URL.
 * @param {string}        props.termName           Term name.
 * @param {boolean}       props.isTermLoading      Whether term record is loading.
 * @param {boolean}       props.saving             Whether a save operation is in progress.
 * @param {string}        props.error              Current error message.
 * @param {string}        props.success            Current success message.
 * @param {Function}      props.onSelectImage      Callback for image selection.
 * @param {Function}      props.onRemoveImage      Callback for image removal.
 * @param {Function}      props.onClearMessages    Callback to clear feedback messages.
 * @return {Element} Inspector controls element.
 */

function StandardInspector({
  attributes,
  setAttributes,
  taxonomy,
  termId,
  effectiveTermId,
  effectiveTaxonomy,
  isFromContext,
  publicTaxonomies,
  terms,
  isTermsLoading,
  termImageId,
  imageUrl,
  termName,
  isTermLoading,
  saving,
  error,
  success,
  onSelectImage,
  onRemoveImage,
  onClearMessages
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
    children: [isFromContext && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
      status: "info",
      isDismissible: false,
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term data is provided by a parent block. Set taxonomy and term manually to override.', 'term-image-block')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_term_selection_panel__WEBPACK_IMPORTED_MODULE_3__["default"], {
      taxonomy: taxonomy,
      termId: termId,
      publicTaxonomies: publicTaxonomies,
      terms: terms,
      isTermsLoading: isTermsLoading,
      setAttributes: setAttributes,
      onClearMessages: onClearMessages
    }), effectiveTermId > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_term_image_panel__WEBPACK_IMPORTED_MODULE_4__["default"], {
      termImageId: termImageId,
      imageUrl: imageUrl,
      termName: termName,
      isTermLoading: isTermLoading,
      saving: saving,
      error: error,
      success: success,
      onSelectImage: onSelectImage,
      onRemoveImage: onRemoveImage
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_display_settings_panel__WEBPACK_IMPORTED_MODULE_5__["default"], {
      attributes: attributes,
      setAttributes: setAttributes,
      termName: termName
    })]
  });
}

/***/ },

/***/ "./src/components/term-image-figure.js"
/*!*********************************************!*\
  !*** ./src/components/term-image-figure.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TermImageFigure)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

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
function TermImageFigure({
  imageUrl,
  termName,
  showCaption,
  caption
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("figure", {
    className: "term-image-block__figure",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "term-image-block__image-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
        src: imageUrl,
        alt: termName,
        className: "term-image-block__image"
      })
    }), showCaption && caption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("figcaption", {
      className: "term-image-block__caption",
      children: caption
    })]
  });
}

/***/ },

/***/ "./src/components/term-image-panel.js"
/*!********************************************!*\
  !*** ./src/components/term-image-panel.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TermImagePanel)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/upload.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
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

function TermImagePanel({
  termImageId,
  imageUrl,
  termName,
  isTermLoading,
  saving,
  error,
  success,
  onSelectImage,
  onRemoveImage
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term Image', 'term-image-block'),
    initialOpen: true,
    children: [error && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
      status: "error",
      isDismissible: false,
      children: error
    }), success && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
      status: "success",
      isDismissible: false,
      children: success
    }), isTermLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
        onSelect: onSelectImage,
        allowedTypes: ['image'],
        value: termImageId,
        render: ({
          open
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "term-image-block__media-controls",
          children: [termImageId > 0 && imageUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "term-image-block__preview",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
              src: imageUrl,
              alt: termName,
              className: "term-image-block__preview-image"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "term-image-block__preview-actions",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                onClick: open,
                variant: "secondary",
                size: "small",
                disabled: saving,
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Replace Image', 'term-image-block')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                onClick: onRemoveImage,
                variant: "tertiary",
                isDestructive: true,
                size: "small",
                disabled: saving,
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Remove Image', 'term-image-block')
              })]
            })]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
            onClick: open,
            variant: "secondary",
            icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
            disabled: saving,
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Upload Image', 'term-image-block')
          }), saving && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {})]
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
      className: "term-image-block__help-text",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('This image will be saved to the term and available for use throughout your site.', 'term-image-block')
    })]
  });
}

/***/ },

/***/ "./src/components/term-selection-panel.js"
/*!************************************************!*\
  !*** ./src/components/term-selection-panel.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TermSelectionPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Term Image — TermSelectionPanel Component.
 *
 * Inspector panel for choosing a taxonomy and term in standard
 * post/page editing contexts.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */



/**
 * Internal dependencies.
 */


/**
 * Term selection inspector panel.
 *
 * @param {Object}        props                  Component props.
 * @param {string}        props.taxonomy         Current taxonomy slug.
 * @param {number}        props.termId           Current term ID.
 * @param {Array<Object>} props.publicTaxonomies Filtered public taxonomies.
 * @param {Array<Object>} props.terms            Terms for the selected taxonomy.
 * @param {boolean}       props.isTermsLoading   Whether terms are loading.
 * @param {Function}      props.setAttributes    Block attribute setter.
 * @param {Function}      props.onClearMessages  Callback to clear feedback messages.
 * @return {Element} Inspector panel element.
 */

function TermSelectionPanel({
  taxonomy,
  termId,
  publicTaxonomies,
  terms,
  isTermsLoading,
  setAttributes,
  onClearMessages
}) {
  /** @type {Array<{label: string, value: string}>} */
  const taxonomyOptions = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.buildTaxonomyOptions)(publicTaxonomies, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a taxonomy', 'term-image-block'));

  /** @type {Array<{label: string, value: number}>} */
  const termOptions = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.buildTermOptions)(terms, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a term', 'term-image-block'));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term Selection', 'term-image-block'),
    initialOpen: true,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Taxonomy', 'term-image-block'),
      value: taxonomy,
      options: taxonomyOptions,
      onChange: value => {
        setAttributes({
          taxonomy: value,
          termId: 0
        });
        onClearMessages();
      },
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Choose a taxonomy to select terms from', 'term-image-block')
    }), taxonomy && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
      children: isTermsLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term', 'term-image-block'),
        value: termId,
        options: termOptions,
        onChange: value => {
          setAttributes({
            termId: parseInt(value, 10)
          });
          onClearMessages();
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Leave empty to auto-detect on archive pages', 'term-image-block')
      })
    })]
  });
}

/***/ },

/***/ "./src/constants.js"
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ASPECT_RATIO_OPTIONS: () => (/* binding */ ASPECT_RATIO_OPTIONS),
/* harmony export */   IMAGE_SIZE_OPTIONS: () => (/* binding */ IMAGE_SIZE_OPTIONS),
/* harmony export */   TERM_IMAGE_META_KEY: () => (/* binding */ TERM_IMAGE_META_KEY)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
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


/**
 * Available image size options for the select control.
 *
 * @type {Array<{label: string, value: string}>}
 */
const IMAGE_SIZE_OPTIONS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Thumbnail', 'term-image-block'),
  value: 'thumbnail'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Medium', 'term-image-block'),
  value: 'medium'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Large', 'term-image-block'),
  value: 'large'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Full', 'term-image-block'),
  value: 'full'
}];

/**
 * Available aspect ratio options for the select control.
 *
 * @type {Array<{label: string, value: string}>}
 */
const ASPECT_RATIO_OPTIONS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Auto', 'term-image-block'),
  value: 'auto'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Square (1:1)', 'term-image-block'),
  value: '1-1'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Landscape (16:9)', 'term-image-block'),
  value: '16-9'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Portrait (9:16)', 'term-image-block'),
  value: '9-16'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Wide (21:9)', 'term-image-block'),
  value: '21-9'
}];

/**
 * Term meta key used to store the image attachment ID.
 *
 * Compatible with the "WP Term Images" plugin by JJJ.
 *
 * @type {string}
 */
const TERM_IMAGE_META_KEY = 'image';

/***/ },

/***/ "./src/edit.js"
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hooks */ "./src/hooks/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components */ "./src/components/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);
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





/**
 * Editor-only styles.
 */


/**
 * Internal dependencies — hooks.
 */


/**
 * Internal dependencies — components.
 */


/**
 * Internal dependencies — utilities.
 */



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

function Edit({
  attributes,
  setAttributes,
  context
}) {
  const {
    imageSize,
    aspectRatio,
    showCaption,
    customCaption
  } = attributes;

  /*
   * Resolve effective termId and taxonomy from attributes,
   * falling back to block context values when attributes are empty.
   */
  const contextTermId = context?.termId ? parseInt(context.termId, 10) : 0;
  const contextTaxonomy = context?.taxonomy || '';

  /** @type {number} Effective term ID — attribute takes priority over context. */
  const termId = attributes.termId || contextTermId;

  /** @type {string} Effective taxonomy — attribute takes priority over context. */
  const taxonomy = attributes.taxonomy || contextTaxonomy;

  /** @type {boolean} Whether values came from context rather than attributes. */
  const isFromContext = !attributes.termId && contextTermId > 0 || !attributes.taxonomy && contextTaxonomy !== '';

  /* ── Hooks ─────────────────────────────────────────────────── */

  const isInFSETemplate = (0,_hooks__WEBPACK_IMPORTED_MODULE_5__.useIsFSETemplate)();
  const {
    taxonomies,
    isTaxonomiesLoading
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_5__.useTaxonomies)();
  const {
    terms,
    isTermsLoading
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_5__.useTerms)(taxonomy, isInFSETemplate);
  const {
    termRecord,
    isTermLoading
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_5__.useTermRecord)(termId, taxonomy, false /* Never skip in editor — we need the record for preview. */);
  const {
    saving,
    error,
    success,
    onSelectImage,
    onRemoveImage,
    clearMessages
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_5__.useTermImageManager)(termId, taxonomy);

  /* ── Derived data ──────────────────────────────────────────── */

  /** @type {Array<Object>} */
  const publicTaxonomies = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => (0,_utils__WEBPACK_IMPORTED_MODULE_7__.filterPublicTaxonomies)(taxonomies), [taxonomies]);

  /** @type {number} */
  const termImageId = termRecord?.meta?.[_constants__WEBPACK_IMPORTED_MODULE_8__.TERM_IMAGE_META_KEY] || 0;

  /** @type {string} */
  const termName = termRecord?.name || '';

  /** @type {string} */
  const imageUrl = (0,_hooks__WEBPACK_IMPORTED_MODULE_5__.useTermImageUrl)(termImageId, imageSize);

  /** @type {string} */
  const caption = customCaption || termName;

  /** @type {boolean} */
  const loading = isTaxonomiesLoading || isTermsLoading;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: `term-image-block--aspect-ratio-${aspectRatio}`
  });

  /* ── Handlers ──────────────────────────────────────────────── */

  /**
   * Clear term and taxonomy selection.
   *
   * @return {void}
   */
  const clearSelection = () => {
    setAttributes({
      termId: 0,
      taxonomy: ''
    });
    clearMessages();
  };

  /* ── Loading state ─────────────────────────────────────────── */

  if (loading && !publicTaxonomies.length) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Placeholder, {
        icon: "format-image",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term Image', 'term-image-block'),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {})
      })
    });
  }

  /* ── FSE Template Context ──────────────────────────────────── */

  if (isInFSETemplate) {
    /*
     * In FSE templates, if we have a resolved term from context,
     * show the actual image preview instead of a placeholder.
     */
    if (termId > 0 && termRecord) {
      const selectedTaxLabel = taxonomy ? publicTaxonomies.find(t => t.slug === taxonomy)?.name || taxonomy : '';
      const contextLabel = isFromContext ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %1$s: term name, %2$s: taxonomy label */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('From context: %1$s (%2$s)', 'term-image-block'), termName, selectedTaxLabel) : '';
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components__WEBPACK_IMPORTED_MODULE_6__.FSEInspector, {
          attributes: attributes,
          setAttributes: setAttributes,
          taxonomy: attributes.taxonomy,
          publicTaxonomies: publicTaxonomies,
          contextInfo: contextLabel
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          ...blockProps,
          children: imageUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components__WEBPACK_IMPORTED_MODULE_6__.TermImageFigure, {
            imageUrl: imageUrl,
            termName: termName,
            showCaption: showCaption,
            caption: caption
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components__WEBPACK_IMPORTED_MODULE_6__.PlaceholderCanvas, {
            label: termName ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %s: term name */
            (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term Image — %s', 'term-image-block'), termName) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term Image', 'term-image-block'),
            hint: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No image set for this term', 'term-image-block'),
            showCaption: showCaption,
            caption: customCaption || termName || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term name', 'term-image-block')
          })
        })]
      });
    }
    const selectedTaxLabel = attributes.taxonomy ? publicTaxonomies.find(t => t.slug === attributes.taxonomy)?.name || attributes.taxonomy : '';
    const badgeLabel = attributes.taxonomy ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %s: taxonomy label */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term Image — %s', 'term-image-block'), selectedTaxLabel) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term Image — Auto-detect', 'term-image-block');
    const badgeHint = attributes.taxonomy ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Resolves from current post or archive', 'term-image-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Uses queried term on archive pages', 'term-image-block');
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components__WEBPACK_IMPORTED_MODULE_6__.FSEInspector, {
        attributes: attributes,
        setAttributes: setAttributes,
        taxonomy: attributes.taxonomy,
        publicTaxonomies: publicTaxonomies
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        ...blockProps,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components__WEBPACK_IMPORTED_MODULE_6__.PlaceholderCanvas, {
          label: badgeLabel,
          hint: badgeHint,
          showCaption: showCaption,
          caption: customCaption || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term name', 'term-image-block')
        })
      })]
    });
  }

  /* ── Standard Post / Page Context ──────────────────────────── */

  /** @type {string} */
  const placeholderLabel = termId ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No image set', 'term-image-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term Image', 'term-image-block');

  /** @type {string} */
  const placeholderHint = termId ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Use the Term Image panel to upload one', 'term-image-block') : isFromContext ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Receiving term from parent block context', 'term-image-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a taxonomy and term in the sidebar', 'term-image-block');

  /** @type {string} */
  const placeholderCaption = customCaption || termName || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term name', 'term-image-block');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components__WEBPACK_IMPORTED_MODULE_6__.StandardInspector, {
      attributes: attributes,
      setAttributes: setAttributes,
      taxonomy: attributes.taxonomy,
      termId: attributes.termId,
      effectiveTermId: termId,
      effectiveTaxonomy: taxonomy,
      isFromContext: isFromContext,
      publicTaxonomies: publicTaxonomies,
      terms: terms,
      isTermsLoading: isTermsLoading,
      termImageId: termImageId,
      imageUrl: imageUrl,
      termName: termName,
      isTermLoading: isTermLoading,
      saving: saving,
      error: error,
      success: success,
      onSelectImage: onSelectImage,
      onRemoveImage: onRemoveImage,
      onClearMessages: clearMessages
    }), attributes.termId > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarGroup, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
          icon: "no",
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Clear selection', 'term-image-block'),
          onClick: clearSelection
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
      ...blockProps,
      children: imageUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components__WEBPACK_IMPORTED_MODULE_6__.TermImageFigure, {
        imageUrl: imageUrl,
        termName: termName,
        showCaption: showCaption,
        caption: caption
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components__WEBPACK_IMPORTED_MODULE_6__.PlaceholderCanvas, {
        label: placeholderLabel,
        hint: placeholderHint,
        showCaption: showCaption,
        caption: placeholderCaption
      })
    })]
  });
}

/***/ },

/***/ "./src/hooks/index.js"
/*!****************************!*\
  !*** ./src/hooks/index.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useIsFSETemplate: () => (/* reexport safe */ _use_is_fse_template__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   useTaxonomies: () => (/* reexport safe */ _use_taxonomies__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   useTermImageManager: () => (/* reexport safe */ _use_term_image_manager__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   useTermImageUrl: () => (/* reexport safe */ _use_term_image_url__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   useTermRecord: () => (/* reexport safe */ _use_term_record__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   useTerms: () => (/* reexport safe */ _use_terms__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _use_is_fse_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-is-fse-template */ "./src/hooks/use-is-fse-template.js");
/* harmony import */ var _use_taxonomies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-taxonomies */ "./src/hooks/use-taxonomies.js");
/* harmony import */ var _use_terms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-terms */ "./src/hooks/use-terms.js");
/* harmony import */ var _use_term_record__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-term-record */ "./src/hooks/use-term-record.js");
/* harmony import */ var _use_term_image_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-term-image-url */ "./src/hooks/use-term-image-url.js");
/* harmony import */ var _use_term_image_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./use-term-image-manager */ "./src/hooks/use-term-image-manager.js");
/**
 * Term Image — Hooks Barrel Export.
 *
 * Re-exports all custom hooks for convenient importing.
 *
 * @package
 * @since   0.1.0
 */








/***/ },

/***/ "./src/hooks/use-is-fse-template.js"
/*!******************************************!*\
  !*** ./src/hooks/use-is-fse-template.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useIsFSETemplate)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Term Image — useIsFSETemplate Hook.
 *
 * Determines whether the editor is rendering an FSE template
 * or template part.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */


/**
 * Determine whether the editor is rendering an FSE template.
 *
 * @return {boolean} True when editing a wp_template or wp_template_part.
 */
function useIsFSETemplate() {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    const editorStore = select('core/editor');
    const postType = editorStore?.getEditedPostType ? editorStore.getEditedPostType() : '';
    return postType === 'wp_template' || postType === 'wp_template_part';
  }, []);
}

/***/ },

/***/ "./src/hooks/use-taxonomies.js"
/*!*************************************!*\
  !*** ./src/hooks/use-taxonomies.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useTaxonomies)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Term Image — useTaxonomies Hook.
 *
 * Fetches public taxonomies from the core data store.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */



/**
 * Fetch all public taxonomies from the core data store.
 *
 * @return {{ taxonomies: Array<Object>, isTaxonomiesLoading: boolean }} Returns an object containing the list of taxonomies and a loading state.
 */
function useTaxonomies() {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    const {
      getTaxonomies,
      isResolving
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__.store);

    /** @type {Object} */
    const query = {
      per_page: -1
    };
    return {
      taxonomies: getTaxonomies(query) || [],
      isTaxonomiesLoading: isResolving('getTaxonomies', [query])
    };
  }, []);
}

/***/ },

/***/ "./src/hooks/use-term-image-manager.js"
/*!*********************************************!*\
  !*** ./src/hooks/use-term-image-manager.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useTermImageManager)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/**
 * Term Image — useTermImageManager Hook.
 *
 * Encapsulates the state and logic for persisting term image
 * changes via the core data store.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */





/**
 * Internal dependencies.
 */


/**
 * Manage saving and removing term images via the core data store.
 *
 * @param {number} termId   Effective term ID (from attributes or context).
 * @param {string} taxonomy Effective taxonomy slug (from attributes or context).
 * @return {{
 *   saving: boolean,
 *   error: string,
 *   success: string,
 *   updateTermImage: Function,
 *   onSelectImage: Function,
 *   onRemoveImage: Function,
 *   clearMessages: Function,
 * }} Manager state and handlers.
 */
function useTermImageManager(termId, taxonomy) {
  /** @type {[boolean, Function]} */
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  /** @type {[string, Function]} */
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');

  /** @type {[string, Function]} */
  const [success, setSuccess] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const {
    saveEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store);

  /**
   * Clear all feedback messages.
   *
   * @return {void}
   */
  const clearMessages = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    setError('');
    setSuccess('');
  }, []);

  /**
   * Persist a new image ID to term meta via the core data store.
   *
   * @param {number} newImageId Attachment ID, or 0 to remove.
   * @return {Promise<void>}
   */
  const updateTermImage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async newImageId => {
    if (!termId || !taxonomy) {
      return;
    }
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await saveEntityRecord('taxonomy', taxonomy, {
        id: termId,
        meta: {
          [_constants__WEBPACK_IMPORTED_MODULE_4__.TERM_IMAGE_META_KEY]: newImageId
        }
      });
      const message = newImageId > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term image updated successfully!', 'term-image-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term image removed successfully!', 'term-image-block');
      setSuccess(message);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Failed to update term image', 'term-image-block'));
    } finally {
      setSaving(false);
    }
  }, [termId, taxonomy, saveEntityRecord]);

  /**
   * Handle image selection from the media library.
   *
   * @param {Object} media    Selected media object.
   * @param {number} media.id Attachment ID.
   * @return {void}
   */
  const onSelectImage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(media => {
    if (media?.id) {
      updateTermImage(media.id);
    }
  }, [updateTermImage]);

  /**
   * Remove the current term image.
   *
   * @return {void}
   */
  const onRemoveImage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    updateTermImage(0);
  }, [updateTermImage]);
  return {
    saving,
    error,
    success,
    updateTermImage,
    onSelectImage,
    onRemoveImage,
    clearMessages
  };
}

/***/ },

/***/ "./src/hooks/use-term-image-url.js"
/*!*****************************************!*\
  !*** ./src/hooks/use-term-image-url.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useTermImageUrl)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/**
 * Term Image — useTermImageUrl Hook.
 *
 * Fetches a media record and resolves the image URL for a given size.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */




/**
 * Internal dependencies.
 */


/**
 * Fetch a media record and resolve the image URL for a specific size.
 *
 * @param {number} imageId   Attachment ID.
 * @param {string} imageSize Registered image size name.
 * @return {string} Resolved image URL or empty string.
 */
function useTermImageUrl(imageId, imageSize) {
  /** @type {Object|null} */
  const termMedia = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    if (!imageId) {
      return null;
    }
    return select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__.store).getMedia(imageId, {
      context: 'view'
    });
  }, [imageId]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => (0,_utils__WEBPACK_IMPORTED_MODULE_3__.resolveImageUrl)(termMedia, imageSize), [termMedia, imageSize]);
}

/***/ },

/***/ "./src/hooks/use-term-record.js"
/*!**************************************!*\
  !*** ./src/hooks/use-term-record.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useTermRecord)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Term Image — useTermRecord Hook.
 *
 * Fetches a single term record including meta from the core data store.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */



/**
 * Fetch a single term record including meta.
 *
 * @param {number}  termId   Term ID.
 * @param {string}  taxonomy Taxonomy slug.
 * @param {boolean} skip     Whether to skip resolution.
 * @return {{ termRecord: Object|null, isTermLoading: boolean }} Returns an object containing the term record and a loading state.
 */
function useTermRecord(termId, taxonomy, skip = false) {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    if (!termId || !taxonomy || skip) {
      return {
        termRecord: null,
        isTermLoading: false
      };
    }
    const {
      getEntityRecord,
      isResolving
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__.store);
    return {
      termRecord: getEntityRecord('taxonomy', taxonomy, termId),
      isTermLoading: isResolving('getEntityRecord', ['taxonomy', taxonomy, termId])
    };
  }, [termId, taxonomy, skip]);
}

/***/ },

/***/ "./src/hooks/use-terms.js"
/*!********************************!*\
  !*** ./src/hooks/use-terms.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useTerms)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Term Image — useTerms Hook.
 *
 * Fetches terms for a specific taxonomy from the core data store.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */



/**
 * Fetch terms for a specific taxonomy.
 *
 * Skips resolution when in FSE template context (no term picker shown).
 *
 * @param {string}  taxonomy        Taxonomy slug.
 * @param {boolean} isInFSETemplate Whether the editor is in FSE template context.
 * @return {{ terms: Array<Object>, isTermsLoading: boolean }} Returns an object containing the list of terms and a loading state.
 */
function useTerms(taxonomy, isInFSETemplate) {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    if (!taxonomy || isInFSETemplate) {
      return {
        terms: [],
        isTermsLoading: false
      };
    }
    const {
      getEntityRecords,
      isResolving
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__.store);

    /** @type {Object} */
    const query = {
      per_page: -1,
      hide_empty: false
    };
    return {
      terms: getEntityRecords('taxonomy', taxonomy, query) || [],
      isTermsLoading: isResolving('getEntityRecords', ['taxonomy', taxonomy, query])
    };
  }, [taxonomy, isInFSETemplate]);
}

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _block_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block-styles */ "./src/block-styles.js");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Term Image — Block Registration.
 *
 * Registers the block type with the WordPress block editor using
 * metadata from block.json.
 *
 * @package
 * @since   0.1.0
 */

/**
 * WordPress dependencies.
 */


/**
 * Shared styles applied both in the editor and the frontend.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Copy block styles from core/image to this block.
 */


/**
 * Internal dependencies.
 */



/**
 * Register the Term Image block.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * Editor component.
   *
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ },

/***/ "./src/utils.js"
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildTaxonomyOptions: () => (/* binding */ buildTaxonomyOptions),
/* harmony export */   buildTermOptions: () => (/* binding */ buildTermOptions),
/* harmony export */   filterPublicTaxonomies: () => (/* binding */ filterPublicTaxonomies),
/* harmony export */   resolveImageUrl: () => (/* binding */ resolveImageUrl)
/* harmony export */ });
/**
 * Term Image — Utility Functions.
 *
 * Pure helper functions with no side-effects, suitable for
 * unit testing in isolation.
 *
 * @package
 * @since   0.1.0
 */

/**
 * Filter taxonomies to only include those visible to the user.
 *
 * @param {Array<Object>} taxonomies Raw taxonomy objects from the core data store.
 * @return {Array<Object>} Filtered public taxonomies.
 */
function filterPublicTaxonomies(taxonomies) {
  return taxonomies.filter(tax => tax.visibility?.public_queryable || tax.visibility?.show_ui);
}

/**
 * Build taxonomy select options with a placeholder entry.
 *
 * @param {Array<Object>} taxonomies  Filtered public taxonomies.
 * @param {string}        placeholder Label for the empty option.
 * @return {Array<{label: string, value: string}>} Select control options.
 */
function buildTaxonomyOptions(taxonomies, placeholder) {
  return [{
    label: placeholder,
    value: ''
  }, ...taxonomies.map(tax => ({
    label: tax.name,
    value: tax.slug
  }))];
}

/**
 * Build term select options with a placeholder entry.
 *
 * @param {Array<Object>} terms       Term objects from the core data store.
 * @param {string}        placeholder Label for the empty option.
 * @return {Array<{label: string, value: number}>} Select control options.
 */
function buildTermOptions(terms, placeholder) {
  return [{
    label: placeholder,
    value: 0
  }, ...terms.map(term => ({
    label: term.name,
    value: term.id
  }))];
}

/**
 * Resolve the image URL from a media record for a given size.
 *
 * @param {Object|null} media     Media record from the core data store.
 * @param {string}      imageSize Registered image size name.
 * @return {string} Image URL or empty string.
 */
function resolveImageUrl(media, imageSize) {
  if (!media) {
    return '';
  }

  /** @type {Object} */
  const sizes = media.media_details?.sizes || {};
  const sizeData = sizes[imageSize] || sizes.full || {};
  return sizeData.source_url || media.source_url || '';
}

/***/ },

/***/ "./src/editor.scss"
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/style.scss"
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/core-data"
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["coreData"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "@wordpress/primitives"
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["primitives"];

/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/upload.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/upload.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ upload_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/upload.tsx


var upload_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M18.5 15v3.5H13V6.7l4.5 4.1 1-1.1-6.2-5.8-5.8 5.8 1 1.1 4-4v11.7h-6V15H4v5h16v-5z" }) });

//# sourceMappingURL=upload.mjs.map


/***/ },

/***/ "./src/block.json"
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"carstingaxion/term-image-block","version":"0.1.0","title":"Term Image","category":"media","icon":"format-image","description":"Display taxonomy term images with automatic detection and manual selection","keywords":["taxonomy","term","category","tag","image","fse","template"],"attributes":{"termId":{"type":"number","default":0},"taxonomy":{"type":"string","default":""},"imageSize":{"type":"string","default":"large"},"aspectRatio":{"type":"string","default":"auto"},"linkToTerm":{"type":"boolean","default":false},"showCaption":{"type":"boolean","default":false},"customCaption":{"type":"string","default":""},"hideIfNoImage":{"type":"boolean","default":false}},"supports":{"align":["left","center","right","wide","full"],"html":false,"spacing":{"margin":true,"padding":true},"shadow":true,"dimensions":{"width":true}},"usesContext":["postId","postType","termId","taxonomy"],"textdomain":"term-image-block","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunk_carstingaxion_term_image_block"] = globalThis["webpackChunk_carstingaxion_term_image_block"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map