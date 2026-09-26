/* AUTO GENERATED FROM src/theme/scopes.ts - DO NOT EDIT */

export type ThemeScheme = 'dark' | 'light';

export interface ThemeEditor {
  /**
   * Background
   *
   * CSS: `--papyrus-bg`
   */
  bg: string;
  /**
   * Text
   *
   * Fallback text colour for unmatched tokens
   *
   * CSS: `--papyrus-fg`
   */
  fg: string;
  /**
   * Caret
   *
   * CSS: `--papyrus-caret`
   */
  caret: string;
  /**
   * Selection
   *
   * Text selection background
   *
   * CSS: `--papyrus-selection`
   */
  selection: string;
  /**
   * Line Number
   *
   * CSS: `--papyrus-line-number`
   */
  lineNumber: string;
  /**
   * Active Line Number
   *
   * CSS: `--papyrus-line-number-active`
   */
  lineNumberActive: string;
  /**
   * Active Line
   *
   * Active line background
   *
   * CSS: `--papyrus-line-active`
   */
  lineActive: string;
  /**
   * Line Fence
   *
   * Border colour of the editor and line number fence
   *
   * CSS: `--papyrus-fence`
   */
  fence: string;
  /**
   * Indent Guide
   *
   * CSS: `--papyrus-guide`
   */
  guide: string;
  /**
   * Active Indent Guide
   *
   * CSS: `--papyrus-guide-active`
   */
  guideActive: string;
  /**
   * Selection Match
   *
   * Background of text matching the current selection
   *
   * CSS: `--papyrus-match-selection`
   */
  matchSelection: string;
  /**
   * Search Match
   *
   * CSS: `--papyrus-match-search`
   */
  matchSearch: string;
  /**
   * Active Search Match
   *
   * CSS: `--papyrus-match-search-active`
   */
  matchSearchActive: string;
  /**
   * Tag Match
   *
   * Background of matching tag pairs and word matches
   *
   * CSS: `--papyrus-match-tag`
   */
  matchTag: string;
  /**
   * Active Bracket
   *
   * Ring colour of the bracket pair at the cursor
   *
   * CSS: `--papyrus-bracket-active`
   */
  bracketActive: string;
  /**
   * Active Bracket Background
   *
   * CSS: `--papyrus-bracket-active-bg`
   */
  bracketActiveBg: string;
  /**
   * Scrollbar Thumb
   *
   * CSS: `--papyrus-scrollbar-thumb`
   */
  scrollbarThumb: string;
  /**
   * Scrollbar Thumb Hover
   *
   * CSS: `--papyrus-scrollbar-thumb-hover`
   */
  scrollbarThumbHover: string;
  /**
   * Scrollbar Track
   *
   * CSS: `--papyrus-scrollbar-track`
   */
  scrollbarTrack: string;
  /**
   * Inline Code Background
   *
   * CSS: `--papyrus-inline-bg`
   */
  inlineBg: string;
  /**
   * Inline Code Text
   *
   * CSS: `--papyrus-inline-fg`
   */
  inlineFg: string;
  /**
   * Error Text
   *
   * CSS: `--papyrus-error-fg`
   */
  errorFg: string;
  /**
   * Error Stack
   *
   * CSS: `--papyrus-error-muted`
   */
  errorMuted: string;
  /**
   * Error Heading
   *
   * CSS: `--papyrus-error-accent`
   */
  errorAccent: string;
}

export interface ThemeWidget {
  /**
   * Background
   *
   * CSS: `--papyrus-widget-bg`
   */
  bg: string;
  /**
   * Text
   *
   * CSS: `--papyrus-widget-fg`
   */
  fg: string;
  /**
   * Active Text
   *
   * CSS: `--papyrus-widget-fg-active`
   */
  fgActive: string;
  /**
   * Muted Text
   *
   * Option buttons and copy button text
   *
   * CSS: `--papyrus-widget-fg-muted`
   */
  fgMuted: string;
  /**
   * Border
   *
   * CSS: `--papyrus-widget-border`
   */
  border: string;
  /**
   * Input Background
   *
   * CSS: `--papyrus-widget-input-bg`
   */
  inputBg: string;
  /**
   * Hover Background
   *
   * CSS: `--papyrus-widget-hover`
   */
  hover: string;
  /**
   * Active Background
   *
   * CSS: `--papyrus-widget-active`
   */
  active: string;
  /**
   * Focus Ring
   *
   * CSS: `--papyrus-widget-focus`
   */
  focus: string;
  /**
   * Error Background
   *
   * CSS: `--papyrus-widget-error-bg`
   */
  errorBg: string;
  /**
   * Error Ring
   *
   * CSS: `--papyrus-widget-error-ring`
   */
  errorRing: string;
}

export interface ThemeSyntax {
  /**
   * Comment
   *
   * CSS: `--papyrus-comment`
   */
  comment: string;
  /**
   * Important
   *
   * !important, anchors and other emphasised tokens
   *
   * CSS: `--papyrus-important`
   */
  important: string;
  /**
   * URL
   *
   * CSS: `--papyrus-url`
   */
  url: string;
  /**
   * Punctuation
   *
   * CSS: `--papyrus-punctuation`
   */
  punctuation: string;
  /**
   * Delimiter
   *
   * Markup angle brackets, template delimiters and interpolation punctuation
   *
   * CSS: `--papyrus-delimiter`
   */
  delimiter: string;
  /**
   * Operator
   *
   * CSS: `--papyrus-operator`
   */
  operator: string;
  /**
   * Keyword
   *
   * CSS: `--papyrus-keyword`
   */
  keyword: string;
  /**
   * Control Flow
   *
   * return, await, if, for and other flow keywords
   *
   * CSS: `--papyrus-control`
   */
  control: string;
  /**
   * Module
   *
   * import, export, from, as
   *
   * CSS: `--papyrus-module`
   */
  module: string;
  /**
   * At Rule
   *
   * @media, @import and YAML directives
   *
   * CSS: `--papyrus-atrule`
   */
  atrule: string;
  /**
   * String
   *
   * CSS: `--papyrus-string`
   */
  string: string;
  /**
   * Regular Expression
   *
   * CSS: `--papyrus-regex`
   */
  regex: string;
  /**
   * Number
   *
   * CSS: `--papyrus-number`
   */
  number: string;
  /**
   * Boolean
   *
   * CSS: `--papyrus-boolean`
   */
  boolean: string;
  /**
   * Null
   *
   * null, undefined, nil
   *
   * CSS: `--papyrus-nil`
   */
  nil: string;
  /**
   * Constant
   *
   * CSS: `--papyrus-constant`
   */
  constant: string;
  /**
   * Variable
   *
   * CSS: `--papyrus-variable`
   */
  variable: string;
  /**
   * Parameter
   *
   * CSS: `--papyrus-parameter`
   */
  parameter: string;
  /**
   * Property
   *
   * Object keys, CSS properties, YAML and TOML keys
   *
   * CSS: `--papyrus-property`
   */
  property: string;
  /**
   * Function
   *
   * CSS: `--papyrus-function`
   */
  function: string;
  /**
   * Class Name
   *
   * CSS: `--papyrus-class-name`
   */
  className: string;
  /**
   * Type
   *
   * CSS: `--papyrus-type`
   */
  type: string;
  /**
   * Built In
   *
   * window, document, console and language builtins
   *
   * CSS: `--papyrus-builtin`
   */
  builtin: string;
  /**
   * This
   *
   * CSS: `--papyrus-this`
   */
  this: string;
  /**
   * Tag
   *
   * Markup tag names
   *
   * CSS: `--papyrus-tag`
   */
  tag: string;
  /**
   * Attribute Name
   *
   * CSS: `--papyrus-attr-name`
   */
  attrName: string;
  /**
   * Attribute Value
   *
   * CSS: `--papyrus-attr-value`
   */
  attrValue: string;
  /**
   * Selector
   *
   * CSS: `--papyrus-selector`
   */
  selector: string;
  /**
   * Pseudo Selector
   *
   * CSS: `--papyrus-pseudo`
   */
  pseudo: string;
  /**
   * Unit
   *
   * CSS: `--papyrus-unit`
   */
  unit: string;
  /**
   * Colour
   *
   * Hex codes and named colours
   *
   * CSS: `--papyrus-color`
   */
  color: string;
  /**
   * Entity
   *
   * CSS: `--papyrus-entity`
   */
  entity: string;
  /**
   * Heading
   *
   * Markdown titles and shell headings
   *
   * CSS: `--papyrus-heading`
   */
  heading: string;
  /**
   * Invalid
   *
   * CSS: `--papyrus-invalid`
   */
  invalid: string;
}

export type SyntaxScope = keyof ThemeSyntax;

export interface ThemeLanguages {
  /**
   * HTML
   */
  html?: {
    /**
     * Comment
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-html-comment`
     */
      comment?: string;
    /**
     * Doctype
     *
     * Falls back to `heading`
     *
     * CSS: `--papyrus-html-doctype`
     */
      doctype?: string;
    /**
     * Doctype Name
     *
     * Falls back to `tag`
     *
     * CSS: `--papyrus-html-doctype-name`
     */
      doctypeName?: string;
    /**
     * Delimiter
     *
     * Falls back to `delimiter`
     *
     * CSS: `--papyrus-html-delimiter`
     */
      delimiter?: string;
    /**
     * Tag Name
     *
     * Falls back to `tag`
     *
     * CSS: `--papyrus-html-tag`
     */
      tag?: string;
    /**
     * Tag Namespace
     *
     * Falls back to `tag`
     *
     * CSS: `--papyrus-html-tag-prefix`
     */
      tagPrefix?: string;
    /**
     * Attribute Name
     *
     * Falls back to `attrName`
     *
     * CSS: `--papyrus-html-attr-name`
     */
      attrName?: string;
    /**
     * Attribute Namespace
     *
     * Falls back to `attrName`
     *
     * CSS: `--papyrus-html-attr-prefix`
     */
      attrPrefix?: string;
    /**
     * Attribute Equals
     *
     * Falls back to `delimiter`
     *
     * CSS: `--papyrus-html-equals`
     */
      equals?: string;
    /**
     * Attribute Value
     *
     * Falls back to `attrValue`
     *
     * CSS: `--papyrus-html-attr-value`
     */
      attrValue?: string;
    /**
     * Entity
     *
     * Falls back to `entity`
     *
     * CSS: `--papyrus-html-entity`
     */
      entity?: string;
  };
  /**
   * XML
   */
  xml?: {
    /**
     * Comment
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-xml-comment`
     */
      comment?: string;
    /**
     * Prolog
     *
     * Falls back to `delimiter`
     *
     * CSS: `--papyrus-xml-prolog`
     */
      prolog?: string;
    /**
     * CDATA
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-xml-cdata`
     */
      cdata?: string;
    /**
     * Doctype
     *
     * Falls back to `heading`
     *
     * CSS: `--papyrus-xml-doctype`
     */
      doctype?: string;
    /**
     * Doctype Name
     *
     * Falls back to `tag`
     *
     * CSS: `--papyrus-xml-doctype-name`
     */
      doctypeName?: string;
    /**
     * Delimiter
     *
     * Falls back to `delimiter`
     *
     * CSS: `--papyrus-xml-delimiter`
     */
      delimiter?: string;
    /**
     * Tag Name
     *
     * Falls back to `tag`
     *
     * CSS: `--papyrus-xml-tag`
     */
      tag?: string;
    /**
     * Tag Namespace
     *
     * Falls back to `tag`
     *
     * CSS: `--papyrus-xml-tag-prefix`
     */
      tagPrefix?: string;
    /**
     * Attribute Name
     *
     * Falls back to `attrName`
     *
     * CSS: `--papyrus-xml-attr-name`
     */
      attrName?: string;
    /**
     * Attribute Namespace
     *
     * Falls back to `attrName`
     *
     * CSS: `--papyrus-xml-attr-prefix`
     */
      attrPrefix?: string;
    /**
     * Attribute Equals
     *
     * Falls back to `delimiter`
     *
     * CSS: `--papyrus-xml-equals`
     */
      equals?: string;
    /**
     * Attribute Value
     *
     * Falls back to `attrValue`
     *
     * CSS: `--papyrus-xml-attr-value`
     */
      attrValue?: string;
    /**
     * Entity
     *
     * Falls back to `entity`
     *
     * CSS: `--papyrus-xml-entity`
     */
      entity?: string;
  };
  /**
   * Liquid
   */
  liquid?: {
    /**
     * Comment
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-liquid-comment`
     */
      comment?: string;
    /**
     * Delimiter
     *
     * Falls back to `delimiter`
     *
     * CSS: `--papyrus-liquid-delimiter`
     */
      delimiter?: string;
    /**
     * Tag Name
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-liquid-tag`
     */
      tag?: string;
    /**
     * Output
     *
     * Falls back to `variable`
     *
     * CSS: `--papyrus-liquid-output`
     */
      output?: string;
    /**
     * Object
     *
     * Falls back to `variable`
     *
     * CSS: `--papyrus-liquid-object`
     */
      object?: string;
    /**
     * Property
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-liquid-property`
     */
      property?: string;
    /**
     * Filter
     *
     * Falls back to `function`
     *
     * CSS: `--papyrus-liquid-filter`
     */
      filter?: string;
    /**
     * Parameter
     *
     * Falls back to `parameter`
     *
     * CSS: `--papyrus-liquid-parameter`
     */
      parameter?: string;
    /**
     * Punctuation
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-liquid-punctuation`
     */
      punctuation?: string;
    /**
     * Operator
     *
     * Falls back to `operator`
     *
     * CSS: `--papyrus-liquid-operator`
     */
      operator?: string;
    /**
     * String
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-liquid-string`
     */
      string?: string;
    /**
     * Number
     *
     * Falls back to `number`
     *
     * CSS: `--papyrus-liquid-number`
     */
      number?: string;
    /**
     * Boolean
     *
     * Falls back to `boolean`
     *
     * CSS: `--papyrus-liquid-boolean`
     */
      boolean?: string;
    /**
     * String Delimiter
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-liquid-string-delimiter`
     */
      stringDelimiter?: string;
    /**
     * String Property
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-liquid-string-property`
     */
      stringProperty?: string;
  };
  /**
   * Markdown
   */
  markdown?: {
    /**
     * Heading
     *
     * Falls back to `heading`
     *
     * CSS: `--papyrus-markdown-heading`
     */
      heading?: string;
    /**
     * Blockquote
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-markdown-blockquote`
     */
      blockquote?: string;
    /**
     * List Marker
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-markdown-list`
     */
      list?: string;
    /**
     * Horizontal Rule
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-markdown-hr`
     */
      hr?: string;
    /**
     * Bold
     *
     * Falls back to `delimiter`
     *
     * CSS: `--papyrus-markdown-bold`
     */
      bold?: string;
    /**
     * Italic
     *
     * Falls back to `delimiter`
     *
     * CSS: `--papyrus-markdown-italic`
     */
      italic?: string;
    /**
     * Strikethrough
     *
     * Falls back to `delimiter`
     *
     * CSS: `--papyrus-markdown-strike`
     */
      strike?: string;
    /**
     * Code Snippet
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-markdown-code`
     */
      code?: string;
    /**
     * Code Fence
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-markdown-code-fence`
     */
      codeFence?: string;
    /**
     * URL
     *
     * Falls back to `url`
     *
     * CSS: `--papyrus-markdown-url`
     */
      url?: string;
    /**
     * URL Content
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-markdown-url-content`
     */
      urlContent?: string;
    /**
     * Table
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-markdown-table`
     */
      table?: string;
    /**
     * Table Header
     *
     * Falls back to `heading`
     *
     * CSS: `--papyrus-markdown-table-header`
     */
      tableHeader?: string;
    /**
     * Container
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-markdown-container`
     */
      container?: string;
    /**
     * Container Name
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-markdown-container-name`
     */
      containerName?: string;
  };
  /**
   * CSS
   */
  css?: {
    /**
     * Comment
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-css-comment`
     */
      comment?: string;
    /**
     * At Rule
     *
     * Falls back to `atrule`
     *
     * CSS: `--papyrus-css-atrule`
     */
      atrule?: string;
    /**
     * Keyword
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-css-keyword`
     */
      keyword?: string;
    /**
     * Selector
     *
     * Falls back to `selector`
     *
     * CSS: `--papyrus-css-selector`
     */
      selector?: string;
    /**
     * Pseudo Element
     *
     * Falls back to `pseudo`
     *
     * CSS: `--papyrus-css-pseudo-element`
     */
      pseudoElement?: string;
    /**
     * Pseudo Class
     *
     * Falls back to `pseudo`
     *
     * CSS: `--papyrus-css-pseudo-class`
     */
      pseudoClass?: string;
    /**
     * Combinator
     *
     * Falls back to `operator`
     *
     * CSS: `--papyrus-css-combinator`
     */
      combinator?: string;
    /**
     * Attribute Name
     *
     * Falls back to `attrName`
     *
     * CSS: `--papyrus-css-attr-name`
     */
      attrName?: string;
    /**
     * Attribute Value
     *
     * Falls back to `attrValue`
     *
     * CSS: `--papyrus-css-attr-value`
     */
      attrValue?: string;
    /**
     * Attribute Punctuation
     *
     * Falls back to `tag`
     *
     * CSS: `--papyrus-css-attr-punctuation`
     */
      attrPunctuation?: string;
    /**
     * Property
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-css-property`
     */
      property?: string;
    /**
     * Variable
     *
     * Falls back to `variable`
     *
     * CSS: `--papyrus-css-variable`
     */
      variable?: string;
    /**
     * Function
     *
     * Falls back to `function`
     *
     * CSS: `--papyrus-css-function`
     */
      function?: string;
    /**
     * String
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-css-string`
     */
      string?: string;
    /**
     * URL
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-css-url`
     */
      url?: string;
    /**
     * Number
     *
     * Falls back to `number`
     *
     * CSS: `--papyrus-css-number`
     */
      number?: string;
    /**
     * Unit
     *
     * Falls back to `unit`
     *
     * CSS: `--papyrus-css-unit`
     */
      unit?: string;
    /**
     * Colour
     *
     * Falls back to `color`
     *
     * CSS: `--papyrus-css-color`
     */
      color?: string;
    /**
     * Important
     *
     * Falls back to `important`
     *
     * CSS: `--papyrus-css-important`
     */
      important?: string;
    /**
     * Operator
     *
     * Falls back to `operator`
     *
     * CSS: `--papyrus-css-operator`
     */
      operator?: string;
    /**
     * Punctuation
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-css-punctuation`
     */
      punctuation?: string;
    /**
     * Entity
     *
     * Falls back to `entity`
     *
     * CSS: `--papyrus-css-entity`
     */
      entity?: string;
  };
  /**
   * SCSS
   */
  scss?: {
    /**
     * Comment
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-scss-comment`
     */
      comment?: string;
    /**
     * At Rule
     *
     * Falls back to `atrule`
     *
     * CSS: `--papyrus-scss-atrule`
     */
      atrule?: string;
    /**
     * Keyword
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-scss-keyword`
     */
      keyword?: string;
    /**
     * Selector
     *
     * Falls back to `selector`
     *
     * CSS: `--papyrus-scss-selector`
     */
      selector?: string;
    /**
     * Parent Selector
     *
     * Falls back to `operator`
     *
     * CSS: `--papyrus-scss-parent`
     */
      parent?: string;
    /**
     * Placeholder
     *
     * Falls back to `selector`
     *
     * CSS: `--papyrus-scss-placeholder`
     */
      placeholder?: string;
    /**
     * Pseudo Element
     *
     * Falls back to `pseudo`
     *
     * CSS: `--papyrus-scss-pseudo-element`
     */
      pseudoElement?: string;
    /**
     * Pseudo Class
     *
     * Falls back to `pseudo`
     *
     * CSS: `--papyrus-scss-pseudo-class`
     */
      pseudoClass?: string;
    /**
     * Combinator
     *
     * Falls back to `operator`
     *
     * CSS: `--papyrus-scss-combinator`
     */
      combinator?: string;
    /**
     * Property
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-scss-property`
     */
      property?: string;
    /**
     * Variable
     *
     * Falls back to `variable`
     *
     * CSS: `--papyrus-scss-variable`
     */
      variable?: string;
    /**
     * Function
     *
     * Falls back to `function`
     *
     * CSS: `--papyrus-scss-function`
     */
      function?: string;
    /**
     * String
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-scss-string`
     */
      string?: string;
    /**
     * URL
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-scss-url`
     */
      url?: string;
    /**
     * Number
     *
     * Falls back to `number`
     *
     * CSS: `--papyrus-scss-number`
     */
      number?: string;
    /**
     * Unit
     *
     * Falls back to `unit`
     *
     * CSS: `--papyrus-scss-unit`
     */
      unit?: string;
    /**
     * Colour
     *
     * Falls back to `color`
     *
     * CSS: `--papyrus-scss-color`
     */
      color?: string;
    /**
     * Boolean
     *
     * Falls back to `boolean`
     *
     * CSS: `--papyrus-scss-boolean`
     */
      boolean?: string;
    /**
     * Null
     *
     * Falls back to `nil`
     *
     * CSS: `--papyrus-scss-nil`
     */
      nil?: string;
    /**
     * Important
     *
     * Falls back to `important`
     *
     * CSS: `--papyrus-scss-important`
     */
      important?: string;
    /**
     * Operator
     *
     * Falls back to `operator`
     *
     * CSS: `--papyrus-scss-operator`
     */
      operator?: string;
    /**
     * Punctuation
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-scss-punctuation`
     */
      punctuation?: string;
  };
  /**
   * JavaScript
   */
  javascript?: {
    /**
     * Comment
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-javascript-comment`
     */
      comment?: string;
    /**
     * Punctuation
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-javascript-punctuation`
     */
      punctuation?: string;
    /**
     * Dot and Comma
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-javascript-punctuation-chars`
     */
      punctuationChars?: string;
    /**
     * Semicolon
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-javascript-semi`
     */
      semi?: string;
    /**
     * Operator
     *
     * Falls back to `operator`
     *
     * CSS: `--papyrus-javascript-operator`
     */
      operator?: string;
    /**
     * Keyword
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-javascript-keyword`
     */
      keyword?: string;
    /**
     * Control Flow
     *
     * Falls back to `control`
     *
     * CSS: `--papyrus-javascript-control`
     */
      control?: string;
    /**
     * Module
     *
     * Falls back to `module`
     *
     * CSS: `--papyrus-javascript-module`
     */
      module?: string;
    /**
     * Class Keyword
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-javascript-class`
     */
      class?: string;
    /**
     * Operation
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-javascript-operation`
     */
      operation?: string;
    /**
     * Function Keyword
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-javascript-function-keyword`
     */
      functionKeyword?: string;
    /**
     * Variable
     *
     * Falls back to `variable`
     *
     * CSS: `--papyrus-javascript-variable`
     */
      variable?: string;
    /**
     * Object
     *
     * Falls back to `variable`
     *
     * CSS: `--papyrus-javascript-object`
     */
      object?: string;
    /**
     * Chained Object
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-javascript-object-chain`
     */
      objectChain?: string;
    /**
     * Property
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-javascript-property`
     */
      property?: string;
    /**
     * Property Access
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-javascript-property-access`
     */
      propertyAccess?: string;
    /**
     * Bracket Property
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-javascript-bracket-property`
     */
      bracketProperty?: string;
    /**
     * Bracket
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-javascript-bracket`
     */
      bracket?: string;
    /**
     * Function
     *
     * Falls back to `function`
     *
     * CSS: `--papyrus-javascript-function`
     */
      function?: string;
    /**
     * Class Name
     *
     * Falls back to `className`
     *
     * CSS: `--papyrus-javascript-class-name`
     */
      className?: string;
    /**
     * Type Constructor
     *
     * Falls back to `type`
     *
     * CSS: `--papyrus-javascript-type-constructor`
     */
      typeConstructor?: string;
    /**
     * Browser Object
     *
     * Falls back to `builtin`
     *
     * CSS: `--papyrus-javascript-builtin`
     */
      builtin?: string;
    /**
     * This
     *
     * Falls back to `this`
     *
     * CSS: `--papyrus-javascript-this`
     */
      this?: string;
    /**
     * Parameter
     *
     * Falls back to `parameter`
     *
     * CSS: `--papyrus-javascript-parameter`
     */
      parameter?: string;
    /**
     * Constant
     *
     * Falls back to `constant`
     *
     * CSS: `--papyrus-javascript-constant`
     */
      constant?: string;
    /**
     * String
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-javascript-string`
     */
      string?: string;
    /**
     * Interpolation
     *
     * Falls back to `delimiter`
     *
     * CSS: `--papyrus-javascript-interpolation`
     */
      interpolation?: string;
    /**
     * Regular Expression
     *
     * Falls back to `regex`
     *
     * CSS: `--papyrus-javascript-regex`
     */
      regex?: string;
    /**
     * Regex Delimiter
     *
     * Falls back to `regex`
     *
     * CSS: `--papyrus-javascript-regex-delimiter`
     */
      regexDelimiter?: string;
    /**
     * Regex Flags
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-javascript-regex-flags`
     */
      regexFlags?: string;
    /**
     * Number
     *
     * Falls back to `number`
     *
     * CSS: `--papyrus-javascript-number`
     */
      number?: string;
    /**
     * Boolean
     *
     * Falls back to `boolean`
     *
     * CSS: `--papyrus-javascript-boolean`
     */
      boolean?: string;
    /**
     * Null
     *
     * Falls back to `nil`
     *
     * CSS: `--papyrus-javascript-nil`
     */
      nil?: string;
    /**
     * Sin Template
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-javascript-sin`
     */
      sin?: string;
    /**
     * Sin Template Delimiter
     *
     * Falls back to `operator`
     *
     * CSS: `--papyrus-javascript-sin-delimiter`
     */
      sinDelimiter?: string;
    /**
     * Sin Tag
     *
     * Falls back to `tag`
     *
     * CSS: `--papyrus-javascript-sin-tag`
     */
      sinTag?: string;
    /**
     * Sin CSS Property
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-javascript-sin-property`
     */
      sinProperty?: string;
    /**
     * Sin CSS Class Name
     *
     * Falls back to `className`
     *
     * CSS: `--papyrus-javascript-sin-class-name`
     */
      sinClassName?: string;
    /**
     * Sin CSS Variable
     *
     * Falls back to `variable`
     *
     * CSS: `--papyrus-javascript-sin-variable`
     */
      sinVariable?: string;
    /**
     * Sin CSS Punctuation
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-javascript-sin-punctuation`
     */
      sinPunctuation?: string;
  };
  /**
   * TypeScript
   */
  typescript?: {
    /**
     * Comment
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-typescript-comment`
     */
      comment?: string;
    /**
     * Punctuation
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-typescript-punctuation`
     */
      punctuation?: string;
    /**
     * Dot and Comma
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-typescript-punctuation-chars`
     */
      punctuationChars?: string;
    /**
     * Semicolon
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-typescript-semi`
     */
      semi?: string;
    /**
     * Operator
     *
     * Falls back to `operator`
     *
     * CSS: `--papyrus-typescript-operator`
     */
      operator?: string;
    /**
     * Keyword
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-typescript-keyword`
     */
      keyword?: string;
    /**
     * Control Flow
     *
     * Falls back to `control`
     *
     * CSS: `--papyrus-typescript-control`
     */
      control?: string;
    /**
     * Module
     *
     * Falls back to `module`
     *
     * CSS: `--papyrus-typescript-module`
     */
      module?: string;
    /**
     * Class Keyword
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-typescript-class`
     */
      class?: string;
    /**
     * Operation
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-typescript-operation`
     */
      operation?: string;
    /**
     * Function Keyword
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-typescript-function-keyword`
     */
      functionKeyword?: string;
    /**
     * Variable
     *
     * Falls back to `variable`
     *
     * CSS: `--papyrus-typescript-variable`
     */
      variable?: string;
    /**
     * Object
     *
     * Falls back to `variable`
     *
     * CSS: `--papyrus-typescript-object`
     */
      object?: string;
    /**
     * Chained Object
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-typescript-object-chain`
     */
      objectChain?: string;
    /**
     * Property
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-typescript-property`
     */
      property?: string;
    /**
     * Property Access
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-typescript-property-access`
     */
      propertyAccess?: string;
    /**
     * Bracket Property
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-typescript-bracket-property`
     */
      bracketProperty?: string;
    /**
     * Bracket
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-typescript-bracket`
     */
      bracket?: string;
    /**
     * Function
     *
     * Falls back to `function`
     *
     * CSS: `--papyrus-typescript-function`
     */
      function?: string;
    /**
     * Method
     *
     * Falls back to `function`
     *
     * CSS: `--papyrus-typescript-method`
     */
      method?: string;
    /**
     * Decorator
     *
     * Falls back to `function`
     *
     * CSS: `--papyrus-typescript-decorator`
     */
      decorator?: string;
    /**
     * Class Name
     *
     * Falls back to `className`
     *
     * CSS: `--papyrus-typescript-class-name`
     */
      className?: string;
    /**
     * Generic
     *
     * Falls back to `className`
     *
     * CSS: `--papyrus-typescript-generic`
     */
      generic?: string;
    /**
     * Type
     *
     * Falls back to `type`
     *
     * CSS: `--papyrus-typescript-type`
     */
      type?: string;
    /**
     * Type Constructor
     *
     * Falls back to `type`
     *
     * CSS: `--papyrus-typescript-type-constructor`
     */
      typeConstructor?: string;
    /**
     * Return Type Colon
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-typescript-return-type`
     */
      returnType?: string;
    /**
     * Parameter
     *
     * Falls back to `parameter`
     *
     * CSS: `--papyrus-typescript-parameter`
     */
      parameter?: string;
    /**
     * Built In
     *
     * Falls back to `builtin`
     *
     * CSS: `--papyrus-typescript-builtin`
     */
      builtin?: string;
    /**
     * This
     *
     * Falls back to `this`
     *
     * CSS: `--papyrus-typescript-this`
     */
      this?: string;
    /**
     * Constant
     *
     * Falls back to `constant`
     *
     * CSS: `--papyrus-typescript-constant`
     */
      constant?: string;
    /**
     * String
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-typescript-string`
     */
      string?: string;
    /**
     * Interpolation
     *
     * Falls back to `delimiter`
     *
     * CSS: `--papyrus-typescript-interpolation`
     */
      interpolation?: string;
    /**
     * Regular Expression
     *
     * Falls back to `regex`
     *
     * CSS: `--papyrus-typescript-regex`
     */
      regex?: string;
    /**
     * Regex Delimiter
     *
     * Falls back to `regex`
     *
     * CSS: `--papyrus-typescript-regex-delimiter`
     */
      regexDelimiter?: string;
    /**
     * Regex Flags
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-typescript-regex-flags`
     */
      regexFlags?: string;
    /**
     * Number
     *
     * Falls back to `number`
     *
     * CSS: `--papyrus-typescript-number`
     */
      number?: string;
    /**
     * Boolean
     *
     * Falls back to `boolean`
     *
     * CSS: `--papyrus-typescript-boolean`
     */
      boolean?: string;
    /**
     * Null
     *
     * Falls back to `nil`
     *
     * CSS: `--papyrus-typescript-nil`
     */
      nil?: string;
  };
  /**
   * JSON
   */
  json?: {
    /**
     * Comment
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-json-comment`
     */
      comment?: string;
    /**
     * Property
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-json-property`
     */
      property?: string;
    /**
     * String
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-json-string`
     */
      string?: string;
    /**
     * Number
     *
     * Falls back to `number`
     *
     * CSS: `--papyrus-json-number`
     */
      number?: string;
    /**
     * Boolean
     *
     * Falls back to `boolean`
     *
     * CSS: `--papyrus-json-boolean`
     */
      boolean?: string;
    /**
     * Null
     *
     * Falls back to `nil`
     *
     * CSS: `--papyrus-json-nil`
     */
      nil?: string;
    /**
     * Colon
     *
     * Falls back to `operator`
     *
     * CSS: `--papyrus-json-operator`
     */
      operator?: string;
    /**
     * Punctuation
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-json-punctuation`
     */
      punctuation?: string;
  };
  /**
   * YAML
   */
  yaml?: {
    /**
     * Comment
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-yaml-comment`
     */
      comment?: string;
    /**
     * Key
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-yaml-key`
     */
      key?: string;
    /**
     * Directive
     *
     * Falls back to `atrule`
     *
     * CSS: `--papyrus-yaml-directive`
     */
      directive?: string;
    /**
     * Anchor
     *
     * Falls back to `important`
     *
     * CSS: `--papyrus-yaml-anchor`
     */
      anchor?: string;
    /**
     * Tag
     *
     * Falls back to `tag`
     *
     * CSS: `--papyrus-yaml-tag`
     */
      tag?: string;
    /**
     * String
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-yaml-string`
     */
      string?: string;
    /**
     * Number
     *
     * Falls back to `number`
     *
     * CSS: `--papyrus-yaml-number`
     */
      number?: string;
    /**
     * Boolean
     *
     * Falls back to `boolean`
     *
     * CSS: `--papyrus-yaml-boolean`
     */
      boolean?: string;
    /**
     * Null
     *
     * Falls back to `nil`
     *
     * CSS: `--papyrus-yaml-nil`
     */
      nil?: string;
    /**
     * Punctuation
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-yaml-punctuation`
     */
      punctuation?: string;
  };
  /**
   * TOML
   */
  toml?: {
    /**
     * Comment
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-toml-comment`
     */
      comment?: string;
    /**
     * Table
     *
     * Falls back to `className`
     *
     * CSS: `--papyrus-toml-table`
     */
      table?: string;
    /**
     * Key
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-toml-key`
     */
      key?: string;
    /**
     * String
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-toml-string`
     */
      string?: string;
    /**
     * Number
     *
     * Falls back to `number`
     *
     * CSS: `--papyrus-toml-number`
     */
      number?: string;
    /**
     * Date
     *
     * Falls back to `number`
     *
     * CSS: `--papyrus-toml-date`
     */
      date?: string;
    /**
     * Boolean
     *
     * Falls back to `boolean`
     *
     * CSS: `--papyrus-toml-boolean`
     */
      boolean?: string;
    /**
     * Punctuation
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-toml-punctuation`
     */
      punctuation?: string;
  };
  /**
   * Bash
   */
  bash?: {
    /**
     * Comment
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-bash-comment`
     */
      comment?: string;
    /**
     * Heading
     *
     * Falls back to `heading`
     *
     * CSS: `--papyrus-bash-heading`
     */
      heading?: string;
    /**
     * Argument
     *
     * Falls back to `parameter`
     *
     * CSS: `--papyrus-bash-argument`
     */
      argument?: string;
    /**
     * Target
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-bash-target`
     */
      target?: string;
    /**
     * Punctuation
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-bash-punctuation`
     */
      punctuation?: string;
  };
  /**
   * SQL
   */
  sql?: {
    /**
     * Comment
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-sql-comment`
     */
      comment?: string;
    /**
     * Keyword
     *
     * Falls back to `keyword`
     *
     * CSS: `--papyrus-sql-keyword`
     */
      keyword?: string;
    /**
     * Function
     *
     * Falls back to `function`
     *
     * CSS: `--papyrus-sql-function`
     */
      function?: string;
    /**
     * String
     *
     * Falls back to `string`
     *
     * CSS: `--papyrus-sql-string`
     */
      string?: string;
    /**
     * Number
     *
     * Falls back to `number`
     *
     * CSS: `--papyrus-sql-number`
     */
      number?: string;
    /**
     * Boolean
     *
     * Falls back to `boolean`
     *
     * CSS: `--papyrus-sql-boolean`
     */
      boolean?: string;
    /**
     * Variable
     *
     * Falls back to `variable`
     *
     * CSS: `--papyrus-sql-variable`
     */
      variable?: string;
    /**
     * Alias
     *
     * Falls back to `constant`
     *
     * CSS: `--papyrus-sql-alias`
     */
      alias?: string;
    /**
     * Identifier
     *
     * Falls back to `property`
     *
     * CSS: `--papyrus-sql-identifier`
     */
      identifier?: string;
    /**
     * Cast
     *
     * Falls back to `type`
     *
     * CSS: `--papyrus-sql-cast`
     */
      cast?: string;
    /**
     * Operator
     *
     * Falls back to `operator`
     *
     * CSS: `--papyrus-sql-operator`
     */
      operator?: string;
    /**
     * Punctuation
     *
     * Falls back to `punctuation`
     *
     * CSS: `--papyrus-sql-punctuation`
     */
      punctuation?: string;
  };
  /**
   * Treeview
   */
  treeview?: {
    /**
     * Comment
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-treeview-comment`
     */
      comment?: string;
    /**
     * Connector Line
     *
     * Falls back to `comment`
     *
     * CSS: `--papyrus-treeview-line`
     */
      line?: string;
    /**
     * Symlink Arrow
     *
     * Falls back to `operator`
     *
     * CSS: `--papyrus-treeview-operator`
     */
      operator?: string;
  };
}

export type LanguageId = keyof ThemeLanguages;

export interface Theme {
  /**
   * The theme name, used in `data-papyrus-theme="name"`
   */
  name: string;
  /**
   * Whether the theme is dark or light
   *
   * Applied as the `color-scheme` of the editor and used for `prefers-color-scheme` matching.
   */
  scheme: ThemeScheme;
  /**
   * Editor chrome colours
   */
  editor: ThemeEditor;
  /**
   * Search, copy and folding widget colours
   */
  widget: ThemeWidget;
  /**
   * Bracket pair colours
   *
   * One per nesting level (6 levels, repeating).
   */
  brackets: string[];
  /**
   * Semantic syntax colours shared by all languages
   */
  syntax: ThemeSyntax;
  /**
   * Optional per-language overrides
   *
   * Omitted tokens fall back to the semantic scope they belong to.
   */
  languages?: ThemeLanguages;
}

/**
 * A partial theme
 *
 * Anything omitted is inherited from the theme it extends (the default `potion` theme when `extends` is omitted).
 */

export interface ThemeInput {
  name: string;
  extends?: string | Theme;
  scheme?: ThemeScheme;
  editor?: Partial<ThemeEditor>;
  widget?: Partial<ThemeWidget>;
  brackets?: string[];
  syntax?: Partial<ThemeSyntax>;
  languages?: ThemeLanguages;
}

export interface ThemeCSSOptions {
  /**
   * Emit the variables on `:root` so the theme applies without a `data-papyrus-theme` attribute
   */
  root?: boolean;
  /**
   * Also apply the theme when `prefers-color-scheme` matches and no explicit theme attribute is set
   */
  auto?: boolean;
  /**
   * Custom selector to scope the variables to
   */
  selector?: string;
  /**
   * Minify the output
   */
  minify?: boolean;
}

export interface ScopeMeta {
  label: string;
  description?: string;
}

export interface EditorScopeMeta extends ScopeMeta {
  color: boolean;
}

export interface SyntaxScopeMeta extends ScopeMeta {
  selectors: string[];
}

export interface LanguageTokenMeta {
  label: string;
  scope: SyntaxScope;
  selectors: string[];
}

export interface LanguageMeta {
  label: string;
  selectors: string[];
  tokens: Record<string, LanguageTokenMeta>;
}

/**
 * The scope maps the theme system is generated from. Useful for building
 * theme editors.
 */
export interface ThemeScopes {
  editor: Record<keyof ThemeEditor, EditorScopeMeta>;
  widget: Record<keyof ThemeWidget, EditorScopeMeta>;
  syntax: Record<SyntaxScope, SyntaxScopeMeta>;
  languages: Record<LanguageId, LanguageMeta>;
}

export interface ThemeHandle {
  /**
   * The resolved theme
   */
  theme: Theme;
  /**
   * The theme name, use with `data-papyrus-theme="name"` or the `theme` option
   */
  name: string;
  /**
   * The generated CSS
   */
  css: string;
  /**
   * Applies the theme globally (sets `data-papyrus-theme` on `<html>`) or
   * on the provided element.
   */
  use (element?: HTMLElement): void;
  /**
   * Removes the injected `<style>` element
   */
  remove (): void;
}

export interface ThemeAPI {
  /**
   * Defines a theme. In the browser the generated CSS is injected into
   * `<head>`, replacing any previous definition with the same name.
   *
   * @example
   * import papyrus from 'papyrus';
   *
   * const dusk = papyrus.theme({
   *   name: 'dusk',
   *   extends: 'potion',
   *   syntax: { keyword: '#ff79c6' },
   *   languages: { liquid: { tag: '#bd93f9' } }
   * });
   *
   * dusk.use(); // <html data-papyrus-theme="dusk">
   */
  (theme: Theme | ThemeInput, options?: ThemeCSSOptions): ThemeHandle;
  /**
   * Generates the CSS custom properties for a theme
   */
  css (theme: Theme | ThemeInput, options?: ThemeCSSOptions): string;
  /**
   * Returns a flat map of custom property names to values
   */
  vars (theme: Theme | ThemeInput): Record<string, string>;
  /**
   * Creates a new theme from a base theme and partial overrides
   */
  extend (base: string | Theme, input: Omit<ThemeInput, 'extends'>): Theme;
  /**
   * Resolves a partial theme into a complete theme
   */
  resolve (theme: Theme | ThemeInput): Theme;
  /**
   * Generates the theme independent token rules (already part of `papyrus.css`)
   */
  tokens (options?: { minify?: boolean }): string;
  /**
   * Built-in themes by name
   */
  themes: Record<string, Theme>;
  /**
   * The default dark theme
   */
  potion: Theme;
  /**
   * The light variant of the default theme
   */
  potionLight: Theme;
  /**
   * A light theme based on the GitHub Primer palette
   */
  githubLight: Theme;
  /**
   * The scope maps the theme system is generated from
   */
  scopes: ThemeScopes;
}

export declare const theme: ThemeAPI;
export declare const themes: Record<string, Theme>;
export declare const potion: Theme;
export declare const potionLight: Theme;
export declare const githubLight: Theme;
export declare function css (theme: Theme | ThemeInput, options?: ThemeCSSOptions): string;
export declare function extend (base: string | Theme, input: Omit<ThemeInput, 'extends'>): Theme;
export declare function resolve (theme: Theme | ThemeInput): Theme;
export declare function vars (theme: Theme): Record<string, string>;
export declare function themeCSS (theme: Theme, options?: ThemeCSSOptions): string;
export declare function tokenCSS (options?: { minify?: boolean }): string;
