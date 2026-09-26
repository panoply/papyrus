/* eslint-disable quote-props */

/**
 * Theme Scopes
 *
 * This module is the single source of truth for everything themeable in
 * Papyrus. It describes:
 *
 * 1. `editor`   – the editor chrome (backgrounds, line numbers, selection...)
 * 2. `widget`   – the search / copy / fold widgets
 * 3. `syntax`   – semantic token scopes shared by every language
 * 4. `languages` – language specific tokens, each falling back to a semantic scope
 *
 * The CSS (token rules and theme variables), the TypeScript theme types and
 * the theme builder in the docs are all generated from these maps. Nothing
 * here carries a colour, themes provide the colours.
 *
 * Variable naming:
 *
 * - editor:    `--papyrus-<key>`             e.g. `--papyrus-line-number`
 * - widget:    `--papyrus-widget-<key>`      e.g. `--papyrus-widget-border`
 * - brackets:  `--papyrus-bracket-<n>`       e.g. `--papyrus-bracket-1`
 * - syntax:    `--papyrus-<scope>`           e.g. `--papyrus-keyword`
 * - languages: `--papyrus-<language>-<token>` e.g. `--papyrus-liquid-tag`
 *
 * A language token rule always falls back to its semantic scope, so
 * `--papyrus-liquid-tag` is only ever set when a theme wants Liquid tags to
 * differ from `--papyrus-keyword`.
 */

export interface ScopeDef {
  /**
   * Human readable label (used by theme builders)
   */
  label: string;
  /**
   * Short description of what the scope covers
   */
  description?: string;
  /**
   * Global token selectors this scope colours. Order of the `syntax`
   * map is the CSS emission order, later scopes win when a token
   * carries multiple classes (e.g. `token boolean important`).
   */
  selectors: string[];
}

export interface EditorDef {
  label: string;
  description?: string;
  /**
   * When `true`, the value is a CSS colour. When `false` the value is
   * a plain CSS value (e.g. a length). Used by theme builders.
   */
  color: boolean;
}

export interface LanguageToken {
  /**
   * The semantic scope this token inherits from when the theme does not
   * provide a language specific colour.
   */
  scope: SyntaxScope;
  /**
   * Selectors relative to the language container. An empty array means
   * the token only exposes a variable (referenced by static CSS).
   */
  selectors: string[];
  /**
   * Human readable label (used by theme builders)
   */
  label: string;
}

export interface LanguageDef {
  /**
   * Human readable language name
   */
  label: string;
  /**
   * Language container selectors (`<code class="language-*">` or a
   * nested `<span class="token language-*">`)
   */
  selectors: string[];
  /**
   * Language specific tokens
   */
  tokens: Record<string, LanguageToken>;
}

/* -------------------------------------------- */
/* EDITOR                                       */
/* -------------------------------------------- */

export const editor = {
  bg: { label: 'Background', color: true },
  fg: { label: 'Text', description: 'Fallback text colour for unmatched tokens', color: true },
  caret: { label: 'Caret', color: true },
  selection: { label: 'Selection', description: 'Text selection background', color: true },
  lineNumber: { label: 'Line Number', color: true },
  lineNumberActive: { label: 'Active Line Number', color: true },
  lineActive: { label: 'Active Line', description: 'Active line background', color: true },
  fence: { label: 'Line Fence', description: 'Border colour of the editor and line number fence', color: true },
  guide: { label: 'Indent Guide', color: true },
  guideActive: { label: 'Active Indent Guide', color: true },
  matchSelection: { label: 'Selection Match', description: 'Background of text matching the current selection', color: true },
  matchSearch: { label: 'Search Match', color: true },
  matchSearchActive: { label: 'Active Search Match', color: true },
  matchTag: { label: 'Tag Match', description: 'Background of matching tag pairs and word matches', color: true },
  bracketActive: { label: 'Active Bracket', description: 'Ring colour of the bracket pair at the cursor', color: true },
  bracketActiveBg: { label: 'Active Bracket Background', color: true },
  scrollbarThumb: { label: 'Scrollbar Thumb', color: true },
  scrollbarThumbHover: { label: 'Scrollbar Thumb Hover', color: true },
  scrollbarTrack: { label: 'Scrollbar Track', color: true },
  inlineBg: { label: 'Inline Code Background', color: true },
  inlineFg: { label: 'Inline Code Text', color: true },
  errorFg: { label: 'Error Text', color: true },
  errorMuted: { label: 'Error Stack', color: true },
  errorAccent: { label: 'Error Heading', color: true }
} satisfies Record<string, EditorDef>;

/* -------------------------------------------- */
/* WIDGETS                                      */
/* -------------------------------------------- */

export const widget = {
  bg: { label: 'Background', color: true },
  fg: { label: 'Text', color: true },
  fgActive: { label: 'Active Text', color: true },
  fgMuted: { label: 'Muted Text', description: 'Option buttons and copy button text', color: true },
  border: { label: 'Border', color: true },
  inputBg: { label: 'Input Background', color: true },
  hover: { label: 'Hover Background', color: true },
  active: { label: 'Active Background', color: true },
  focus: { label: 'Focus Ring', color: true },
  errorBg: { label: 'Error Background', color: true },
  errorRing: { label: 'Error Ring', color: true }
} satisfies Record<string, EditorDef>;

/* -------------------------------------------- */
/* SYNTAX                                       */
/* -------------------------------------------- */

/**
 * Semantic scopes. The order is the CSS emission order, keep more specific
 * aliases after the generic scopes they refine.
 */
export const syntax = {
  comment: {
    label: 'Comment',
    selectors: [ '.token.comment', '.token.prolog', '.token.cdata', '.token.doc-comment', '.token.hashbang' ]
  },
  important: {
    label: 'Important',
    description: '!important, anchors and other emphasised tokens',
    selectors: [ '.token.important' ]
  },
  url: {
    label: 'URL',
    selectors: [ '.token.url' ]
  },
  punctuation: {
    label: 'Punctuation',
    selectors: [ '.token.punctuation', '.token.punctuation-chars', '.token.semi', '.token.markup-bracket' ]
  },
  delimiter: {
    label: 'Delimiter',
    description: 'Markup angle brackets, template delimiters and interpolation punctuation',
    selectors: [
      '.token.delimiters',
      '.token.attr-equals',
      '.token.interpolation-punctuation',
      '.token.tag .token.punctuation:not(.attr-equals)',
      '.token.doctype .token.punctuation'
    ]
  },
  operator: {
    label: 'Operator',
    selectors: [ '.token.operator', '.token.arrow', '.token.combinator', '.token.json-operator', '.token.at' ]
  },
  keyword: {
    label: 'Keyword',
    selectors: [ '.token.keyword', '.token.rule', '.token.statement', '.token.operation', '.token.function-name', '.token.regex-flags', '.token.tag-name' ]
  },
  control: {
    label: 'Control Flow',
    description: 'return, await, if, for and other flow keywords',
    selectors: [ '.token.control-flow', '.token.flow' ]
  },
  module: {
    label: 'Module',
    description: 'import, export, from, as',
    selectors: [ '.token.module', '.token.import-type' ]
  },
  atrule: {
    label: 'At Rule',
    description: '@media, @import and YAML directives',
    selectors: [ '.token.atrule', '.token.mixin' ]
  },
  string: {
    label: 'String',
    selectors: [ '.token.string', '.token.template-string', '.token.char', '.token.target' ]
  },
  regex: {
    label: 'Regular Expression',
    selectors: [ '.token.regex', '.token.regex-source' ]
  },
  number: {
    label: 'Number',
    selectors: [ '.token.number', '.token.numeric' ]
  },
  boolean: {
    label: 'Boolean',
    selectors: [ '.token.boolean' ]
  },
  nil: {
    label: 'Null',
    description: 'null, undefined, nil',
    selectors: [ '.token.nil', '.token.null' ]
  },
  constant: {
    label: 'Constant',
    selectors: [ '.token.constant', '.token.alias' ]
  },
  variable: {
    label: 'Variable',
    selectors: [ '.token.variable', '.token.object', '.token.output', '.token.array', '.token.extends-class .token.object' ]
  },
  parameter: {
    label: 'Parameter',
    selectors: [ '.token.parameter', '.token.argument' ]
  },
  property: {
    label: 'Property',
    description: 'Object keys, CSS properties, YAML and TOML keys',
    selectors: [ '.token.property', '.token.literal-property', '.token.property-access', '.token.key', '.token.identifier', '.token.bracket > .token.keyword' ]
  },
  function: {
    label: 'Function',
    selectors: [ '.token.function', '.token.method', '.token.literal-func', '.token.filter' ]
  },
  className: {
    label: 'Class Name',
    selectors: [ '.token.class-name', '.token.maybe-class-name', '.token.extends-class .token.class' ]
  },
  type: {
    label: 'Type',
    selectors: [ '.token.types', '.token.type-constructors', '.token.type-array', '.token.type-object', '.token.cast' ]
  },
  builtin: {
    label: 'Built In',
    description: 'window, document, console and language builtins',
    selectors: [ '.token.builtin', '.token.browser-objects' ]
  },
  this: {
    label: 'This',
    selectors: [ '.token.this' ]
  },
  tag: {
    label: 'Tag',
    description: 'Markup tag names',
    selectors: [ '.token.tag', '.token.doctype .token.name', '.token.element-name', '.token.sin-tag' ]
  },
  attrName: {
    label: 'Attribute Name',
    selectors: [ '.token.attr-name' ]
  },
  attrValue: {
    label: 'Attribute Value',
    selectors: [ '.token.attr-value', '.token.attr-value > .token.punctuation:not(.attr-equals)', '.token.special-attr' ]
  },
  selector: {
    label: 'Selector',
    selectors: [ '.token.selector', '.token.id', '.token.selector .token.class' ]
  },
  pseudo: {
    label: 'Pseudo Selector',
    selectors: [ '.token.pseudo-element', '.token.pseudo-class' ]
  },
  unit: {
    label: 'Unit',
    selectors: [ '.token.unit' ]
  },
  color: {
    label: 'Colour',
    description: 'Hex codes and named colours',
    selectors: [ '.token.color', '.token.hexcode' ]
  },
  entity: {
    label: 'Entity',
    selectors: [ '.token.entity' ]
  },
  heading: {
    label: 'Heading',
    description: 'Markdown titles and shell headings',
    selectors: [ '.token.title', '.token.doctype-tag' ]
  },
  invalid: {
    label: 'Invalid',
    selectors: [ '.token.bracket-error' ]
  }
} satisfies Record<string, ScopeDef>;

export type SyntaxScope = keyof typeof syntax;

/* -------------------------------------------- */
/* LANGUAGES                                    */
/* -------------------------------------------- */

const t = (scope: SyntaxScope, label: string, ...selectors: string[]): LanguageToken => ({ scope, label, selectors });

/**
 * Language specific tokens. Every entry becomes a rule scoped to the
 * language container with a fallback to the semantic scope, e.g:
 *
 * ```css
 * .language-liquid .token.tag-name {
 *   color: var(--papyrus-liquid-tag, var(--papyrus-keyword));
 * }
 * ```
 *
 * Host languages (markup, liquid, markdown) are listed before the languages
 * they embed so embedded language rules win on equal specificity.
 */
export const languages = {
  html: {
    label: 'HTML',
    selectors: [ '.language-html', '.language-markup' ],
    tokens: {
      comment: t('comment', 'Comment', '.token.comment'),
      doctype: t('heading', 'Doctype', '.token.doctype-tag'),
      doctypeName: t('tag', 'Doctype Name', '.token.doctype .token.name'),
      delimiter: t('delimiter', 'Delimiter', '.token.tag .token.punctuation:not(.attr-equals)', '.token.doctype .token.punctuation'),
      tag: t('tag', 'Tag Name', '.token.tag'),
      tagPrefix: t('tag', 'Tag Namespace', '.token.tag > .token.tag > .token.namespace'),
      attrName: t('attrName', 'Attribute Name', '.token.attr-name'),
      attrPrefix: t('attrName', 'Attribute Namespace', '.token.attr-name > .token.namespace'),
      equals: t('delimiter', 'Attribute Equals', '.token.attr-equals'),
      attrValue: t('attrValue', 'Attribute Value', '.token.attr-value', '.token.attr-value > .token.punctuation:not(.attr-equals)'),
      entity: t('entity', 'Entity', '.token.entity')
    }
  },
  xml: {
    label: 'XML',
    selectors: [ '.language-xml' ],
    tokens: {
      comment: t('comment', 'Comment', '.token.comment'),
      prolog: t('delimiter', 'Prolog', '.token.prolog'),
      cdata: t('comment', 'CDATA', '.token.cdata'),
      doctype: t('heading', 'Doctype', '.token.doctype-tag'),
      doctypeName: t('tag', 'Doctype Name', '.token.doctype .token.name'),
      delimiter: t('delimiter', 'Delimiter', '.token.tag .token.punctuation:not(.attr-equals)', '.token.doctype .token.punctuation'),
      tag: t('tag', 'Tag Name', '.token.tag'),
      tagPrefix: t('tag', 'Tag Namespace', '.token.tag > .token.tag > .token.namespace'),
      attrName: t('attrName', 'Attribute Name', '.token.attr-name'),
      attrPrefix: t('attrName', 'Attribute Namespace', '.token.attr-name > .token.namespace'),
      equals: t('delimiter', 'Attribute Equals', '.token.attr-equals'),
      attrValue: t('attrValue', 'Attribute Value', '.token.attr-value'),
      entity: t('entity', 'Entity', '.token.entity')
    }
  },
  liquid: {
    label: 'Liquid',
    selectors: [ '.language-liquid' ],
    tokens: {
      comment: t('comment', 'Comment', '.token.liquid .token.comment'),
      delimiter: t('delimiter', 'Delimiter', '.token.delimiters'),
      tag: t('keyword', 'Tag Name', '.token.tag-name'),
      output: t('variable', 'Output', '.token.output'),
      object: t('variable', 'Object', '.token.liquid .token.object', '.token.liquid .token.array'),
      property: t('property', 'Property', '.token.liquid .token.property'),
      filter: t('function', 'Filter', '.token.filter'),
      parameter: t('parameter', 'Parameter', '.token.liquid .token.parameter'),
      punctuation: t('punctuation', 'Punctuation', '.token.liquid .token.punctuation'),
      operator: t('operator', 'Operator', '.token.liquid .token.operator'),
      string: t('string', 'String', '.token.liquid .token.string'),
      number: t('number', 'Number', '.token.liquid .token.number'),
      boolean: t('boolean', 'Boolean', '.token.liquid .token.boolean'),
      stringDelimiter: t('comment', 'String Delimiter', '.token.liquid-string .token.delimiters'),
      stringProperty: t('string', 'String Property', '.token.liquid-string .token.property')
    }
  },
  markdown: {
    label: 'Markdown',
    selectors: [ '.language-markdown', '.language-md' ],
    tokens: {
      heading: t('heading', 'Heading', '.token.title', '.token.title > .token.punctuation'),
      blockquote: t('punctuation', 'Blockquote', '.token.blockquote'),
      list: t('punctuation', 'List Marker', '.token.list'),
      hr: t('punctuation', 'Horizontal Rule', '.token.hr'),
      bold: t('delimiter', 'Bold', '.token.bold', '.token.bold > .token.punctuation'),
      italic: t('delimiter', 'Italic', '.token.italic', '.token.italic > .token.punctuation'),
      strike: t('delimiter', 'Strikethrough', '.token.strike > .token.punctuation', '.token.strike > .token.content'),
      code: t('string', 'Code Snippet', '.token.code-snippet'),
      codeFence: t('punctuation', 'Code Fence', '.token.code > .token.punctuation', '.token.code-language'),
      url: t('url', 'URL', '.token.url', '.token.url > .token.operator', '.token.url > .token.string', '.token.url > .token.variable', '.token.url > .token.punctuation'),
      urlContent: t('string', 'URL Content', '.token.url > .token.content', '.token.url > .token.url'),
      table: t('punctuation', 'Table', '.token.table .token.punctuation'),
      tableHeader: t('heading', 'Table Header', '.token.table-header'),
      container: t('keyword', 'Container', '.token.container > .token.cols', '.token.container > .token.cols + .token.call'),
      containerName: t('string', 'Container Name', '.token.container > .token.cols + .token.call + .token.call')
    }
  },
  css: {
    label: 'CSS',
    selectors: [ '.language-css' ],
    tokens: {
      comment: t('comment', 'Comment', '.token.comment'),
      atrule: t('atrule', 'At Rule', '.token.atrule', '.token.rule'),
      keyword: t('keyword', 'Keyword', '.token.atrule .token.keyword'),
      selector: t('selector', 'Selector', '.token.selector'),
      pseudoElement: t('pseudo', 'Pseudo Element', '.token.pseudo-element'),
      pseudoClass: t('pseudo', 'Pseudo Class', '.token.pseudo-class'),
      combinator: t('operator', 'Combinator', '.token.combinator'),
      attrName: t('attrName', 'Attribute Name', '.token.attribute .token.attr-name'),
      attrValue: t('attrValue', 'Attribute Value', '.token.attribute .token.attr-value'),
      attrPunctuation: t('tag', 'Attribute Punctuation', '.token.attribute > .token.punctuation'),
      property: t('property', 'Property', '.token.property'),
      variable: t('variable', 'Variable', '.token.variable'),
      function: t('function', 'Function', '.token.function'),
      string: t('string', 'String', '.token.string'),
      url: t('string', 'URL', '.token.url'),
      number: t('number', 'Number', '.token.number'),
      unit: t('unit', 'Unit', '.token.unit'),
      color: t('color', 'Colour', '.token.color', '.token.hexcode'),
      important: t('important', 'Important', '.token.important'),
      operator: t('operator', 'Operator', '.token.operator'),
      punctuation: t('punctuation', 'Punctuation', '.token.punctuation'),
      entity: t('entity', 'Entity', '.token.entity')
    }
  },
  scss: {
    label: 'SCSS',
    selectors: [ '.language-scss' ],
    tokens: {
      comment: t('comment', 'Comment', '.token.comment'),
      atrule: t('atrule', 'At Rule', '.token.atrule', '.token.rule'),
      keyword: t('keyword', 'Keyword', '.token.keyword'),
      selector: t('selector', 'Selector', '.token.selector'),
      parent: t('operator', 'Parent Selector', '.token.parent'),
      placeholder: t('selector', 'Placeholder', '.token.placeholder'),
      pseudoElement: t('pseudo', 'Pseudo Element', '.token.pseudo-element'),
      pseudoClass: t('pseudo', 'Pseudo Class', '.token.pseudo-class'),
      combinator: t('operator', 'Combinator', '.token.combinator'),
      property: t('property', 'Property', '.token.property'),
      variable: t('variable', 'Variable', '.token.variable'),
      function: t('function', 'Function', '.token.function'),
      string: t('string', 'String', '.token.string'),
      url: t('string', 'URL', '.token.url'),
      number: t('number', 'Number', '.token.number'),
      unit: t('unit', 'Unit', '.token.unit'),
      color: t('color', 'Colour', '.token.color', '.token.hexcode'),
      boolean: t('boolean', 'Boolean', '.token.boolean'),
      nil: t('nil', 'Null', '.token.null'),
      important: t('important', 'Important', '.token.important'),
      operator: t('operator', 'Operator', '.token.operator'),
      punctuation: t('punctuation', 'Punctuation', '.token.punctuation')
    }
  },
  javascript: {
    label: 'JavaScript',
    selectors: [ '.language-javascript', '.language-js' ],
    tokens: {
      comment: t('comment', 'Comment', '.token.comment'),
      punctuation: t('punctuation', 'Punctuation', '.token.punctuation'),
      punctuationChars: t('punctuation', 'Dot and Comma', '.token.punctuation-chars'),
      semi: t('punctuation', 'Semicolon', '.token.semi'),
      operator: t('operator', 'Operator', '.token.operator'),
      keyword: t('keyword', 'Keyword', '.token.keyword'),
      control: t('control', 'Control Flow', '.token.control-flow', '.token.flow'),
      module: t('module', 'Module', '.token.module', '.token.import-type'),
      class: t('keyword', 'Class Keyword', '.token.keyword.class'),
      operation: t('keyword', 'Operation', '.token.operation'),
      functionKeyword: t('keyword', 'Function Keyword', '.token.function-name'),
      variable: t('variable', 'Variable', '.token.variable'),
      object: t('variable', 'Object', '.token.object'),
      objectChain: t('punctuation', 'Chained Object', '.token.object + .token.punctuation-chars + .token.object'),
      property: t('property', 'Property', '.token.literal-property', '.token.string-property'),
      propertyAccess: t('property', 'Property Access', '.token.property-access'),
      bracketProperty: t('property', 'Bracket Property', '.token.bracket > .token.keyword'),
      bracket: t('punctuation', 'Bracket', '.token.bracket > .token.punctuation'),
      function: t('function', 'Function', '.token.function', '.token.literal-func'),
      className: t('className', 'Class Name', '.token.class-name', '.token.maybe-class-name'),
      typeConstructor: t('type', 'Type Constructor', '.token.type-constructors'),
      builtin: t('builtin', 'Browser Object', '.token.browser-objects'),
      this: t('this', 'This', '.token.this'),
      parameter: t('parameter', 'Parameter', '.token.parameter'),
      constant: t('constant', 'Constant', '.token.constant'),
      string: t('string', 'String', '.token.string', '.token.template-string', '.token.template-punctuation'),
      interpolation: t('delimiter', 'Interpolation', '.token.interpolation-punctuation'),
      regex: t('regex', 'Regular Expression', '.token.regex'),
      regexDelimiter: t('regex', 'Regex Delimiter', '.token.regex-delimiter'),
      regexFlags: t('keyword', 'Regex Flags', '.token.regex-flags'),
      number: t('number', 'Number', '.token.number', '.token.numeric'),
      boolean: t('boolean', 'Boolean', '.token.boolean'),
      nil: t('nil', 'Null', '.token.nil'),
      sin: t('string', 'Sin Template', '.token.template-sin'),
      sinDelimiter: t('operator', 'Sin Template Delimiter', '.token.template-sin > .token.template-punctuation'),
      sinTag: t('tag', 'Sin Tag', '.token.sin-tag', '.token.element-name'),
      sinProperty: t('property', 'Sin CSS Property', '.token.sin-css .token.property'),
      sinClassName: t('className', 'Sin CSS Class Name', '.token.sin-css .token.class-name'),
      sinVariable: t('variable', 'Sin CSS Variable', '.token.sin-css .token.variable'),
      sinPunctuation: t('punctuation', 'Sin CSS Punctuation', '.token.sin-css .token.punctuation')
    }
  },
  typescript: {
    label: 'TypeScript',
    selectors: [ '.language-typescript', '.language-ts' ],
    tokens: {
      comment: t('comment', 'Comment', '.token.comment'),
      punctuation: t('punctuation', 'Punctuation', '.token.punctuation'),
      punctuationChars: t('punctuation', 'Dot and Comma', '.token.punctuation-chars'),
      semi: t('punctuation', 'Semicolon', '.token.semi'),
      operator: t('operator', 'Operator', '.token.operator'),
      keyword: t('keyword', 'Keyword', '.token.keyword'),
      control: t('control', 'Control Flow', '.token.control-flow', '.token.flow'),
      module: t('module', 'Module', '.token.module', '.token.import-type'),
      class: t('keyword', 'Class Keyword', '.token.keyword.class'),
      operation: t('keyword', 'Operation', '.token.operation'),
      functionKeyword: t('keyword', 'Function Keyword', '.token.function-name'),
      variable: t('variable', 'Variable', '.token.variable'),
      object: t('variable', 'Object', '.token.object'),
      objectChain: t('punctuation', 'Chained Object', '.token.object + .token.punctuation-chars + .token.object'),
      property: t('property', 'Property', '.token.literal-property', '.token.string-property'),
      propertyAccess: t('property', 'Property Access', '.token.property-access'),
      bracketProperty: t('property', 'Bracket Property', '.token.bracket > .token.keyword'),
      bracket: t('punctuation', 'Bracket', '.token.bracket > .token.punctuation'),
      function: t('function', 'Function', '.token.function', '.token.literal-func'),
      method: t('function', 'Method', '.token.method'),
      decorator: t('function', 'Decorator', '.token.decorator .token.function'),
      className: t('className', 'Class Name', '.token.class-name', '.token.maybe-class-name', '.token.extends-class .token.class'),
      generic: t('className', 'Generic', '.token.generic'),
      type: t('type', 'Type', '.token.types', '.token.type-array', '.token.type-object'),
      typeConstructor: t('type', 'Type Constructor', '.token.type-constructors'),
      returnType: t('punctuation', 'Return Type Colon', '.token.return-type'),
      parameter: t('parameter', 'Parameter', '.token.parameter'),
      builtin: t('builtin', 'Built In', '.token.builtin', '.token.browser-objects'),
      this: t('this', 'This', '.token.this'),
      constant: t('constant', 'Constant', '.token.constant'),
      string: t('string', 'String', '.token.string', '.token.template-string', '.token.template-punctuation'),
      interpolation: t('delimiter', 'Interpolation', '.token.interpolation-punctuation'),
      regex: t('regex', 'Regular Expression', '.token.regex'),
      regexDelimiter: t('regex', 'Regex Delimiter', '.token.regex-delimiter'),
      regexFlags: t('keyword', 'Regex Flags', '.token.regex-flags'),
      number: t('number', 'Number', '.token.number', '.token.numeric'),
      boolean: t('boolean', 'Boolean', '.token.boolean'),
      nil: t('nil', 'Null', '.token.nil')
    }
  },
  json: {
    label: 'JSON',
    selectors: [ '.language-json' ],
    tokens: {
      comment: t('comment', 'Comment', '.token.comment'),
      property: t('property', 'Property', '.token.property'),
      string: t('string', 'String', '.token.string'),
      number: t('number', 'Number', '.token.number'),
      boolean: t('boolean', 'Boolean', '.token.boolean'),
      nil: t('nil', 'Null', '.token.null'),
      operator: t('operator', 'Colon', '.token.operator'),
      punctuation: t('punctuation', 'Punctuation', '.token.punctuation')
    }
  },
  yaml: {
    label: 'YAML',
    selectors: [ '.language-yaml', '.language-yml' ],
    tokens: {
      comment: t('comment', 'Comment', '.token.comment'),
      key: t('property', 'Key', '.token.key'),
      directive: t('atrule', 'Directive', '.token.directive'),
      anchor: t('important', 'Anchor', '.token.important'),
      tag: t('tag', 'Tag', '.token.tag'),
      string: t('string', 'String', '.token.string', '.token.scalar'),
      number: t('number', 'Number', '.token.number', '.token.datetime'),
      boolean: t('boolean', 'Boolean', '.token.boolean'),
      nil: t('nil', 'Null', '.token.null'),
      punctuation: t('punctuation', 'Punctuation', '.token.punctuation')
    }
  },
  toml: {
    label: 'TOML',
    selectors: [ '.language-toml' ],
    tokens: {
      comment: t('comment', 'Comment', '.token.comment'),
      table: t('className', 'Table', '.token.table'),
      key: t('property', 'Key', '.token.key'),
      string: t('string', 'String', '.token.string'),
      number: t('number', 'Number', '.token.number'),
      date: t('number', 'Date', '.token.date'),
      boolean: t('boolean', 'Boolean', '.token.boolean'),
      punctuation: t('punctuation', 'Punctuation', '.token.punctuation')
    }
  },
  bash: {
    label: 'Bash',
    selectors: [ '.language-bash', '.language-shell' ],
    tokens: {
      comment: t('comment', 'Comment', '.token.comment'),
      heading: t('heading', 'Heading', '.token.title'),
      argument: t('parameter', 'Argument', '.token.argument'),
      target: t('string', 'Target', '.token.target'),
      punctuation: t('punctuation', 'Punctuation', '.token.punctuation')
    }
  },
  sql: {
    label: 'SQL',
    selectors: [ '.language-sql', '.language-pgsql', '.language-postgresql' ],
    tokens: {
      comment: t('comment', 'Comment', '.token.comment'),
      keyword: t('keyword', 'Keyword', '.token.keyword'),
      function: t('function', 'Function', '.token.function'),
      string: t('string', 'String', '.token.string'),
      number: t('number', 'Number', '.token.number'),
      boolean: t('boolean', 'Boolean', '.token.boolean'),
      variable: t('variable', 'Variable', '.token.variable'),
      alias: t('constant', 'Alias', '.token.alias'),
      identifier: t('property', 'Identifier', '.token.identifier'),
      cast: t('type', 'Cast', '.token.cast'),
      operator: t('operator', 'Operator', '.token.operator', '.token.json-operator'),
      punctuation: t('punctuation', 'Punctuation', '.token.punctuation')
    }
  },
  treeview: {
    label: 'Treeview',
    selectors: [ '.language-treeview', '.language-tree' ],
    tokens: {
      comment: t('comment', 'Comment', '.token.comment'),
      line: t('comment', 'Connector Line'),
      operator: t('operator', 'Symlink Arrow', '.token.operator')
    }
  }
} satisfies Record<string, LanguageDef>;

export type LanguageId = keyof typeof languages;

/**
 * Bracket pair colour levels (`.token.bracket-level-0` ... `bracket-level-5`,
 * levels 6 to 11 repeat the sequence).
 */
export const BRACKET_LEVELS = 6;

/**
 * The custom property prefix
 */
export const PREFIX = '--papyrus';

/**
 * Converts camelCase keys to kebab-case
 */
export const kebab = (key: string) => key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
