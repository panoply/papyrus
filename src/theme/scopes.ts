/* eslint-disable quote-props */

/**
 * Theme Scopes
 *
 * The single source of truth for everything themeable. The token rules in
 * `papyrus.css` and the variables in each theme stylesheet are generated
 * from these maps, themes only provide the colours.
 *
 * Variable naming:
 *
 * - editor:    `--papyrus-<key>`              e.g. `--papyrus-line-number`
 * - widget:    `--papyrus-widget-<key>`       e.g. `--papyrus-widget-border`
 * - brackets:  `--papyrus-bracket-<n>`        e.g. `--papyrus-bracket-1`
 * - syntax:    `--papyrus-<scope>`            e.g. `--papyrus-keyword`
 * - languages: `--papyrus-<language>-<token>` e.g. `--papyrus-yaml-key`
 *
 * A language token always falls back to its semantic scope, so a theme only
 * sets one when that language should differ from the rest.
 */

export interface LanguageToken {
  /**
   * The semantic scope the token falls back to
   */
  scope: SyntaxScope;
  /**
   * Selectors relative to the language container. An empty list means the
   * token only exposes a variable (referenced by static CSS).
   */
  selectors: string[];
}

export interface LanguageDef {
  /**
   * Language container selectors
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

export const editor = [
  'bg',
  'fg',
  'caret',
  'selection',
  'lineNumber',
  'lineNumberActive',
  'lineActive',
  'fence',
  'guide',
  'guideActive',
  'matchSelection',
  'matchSearch',
  'matchSearchActive',
  'matchTag',
  'bracketActive',
  'bracketActiveBg',
  'scrollbarThumb',
  'scrollbarThumbHover',
  'scrollbarTrack',
  'inlineBg',
  'inlineFg',
  'errorFg',
  'errorMuted',
  'errorAccent'
] as const;

/* -------------------------------------------- */
/* WIDGETS                                      */
/* -------------------------------------------- */

export const widget = [
  'bg',
  'fg',
  'fgActive',
  'fgMuted',
  'border',
  'inputBg',
  'hover',
  'active',
  'focus',
  'errorBg',
  'errorRing'
] as const;

/* -------------------------------------------- */
/* SYNTAX                                       */
/* -------------------------------------------- */

/**
 * Semantic scopes. The order is the CSS emission order, keep more specific
 * aliases after the generic scopes they refine.
 */
export const syntax = {
  comment: {
    selectors: [ '.token.comment', '.token.prolog', '.token.cdata', '.token.doc-comment', '.token.hashbang' ]
  },
  important: {
    selectors: [ '.token.important' ]
  },
  url: {
    selectors: [ '.token.url' ]
  },
  punctuation: {
    selectors: [ '.token.punctuation', '.token.punctuation-chars', '.token.semi', '.token.markup-bracket' ]
  },
  delimiter: {
    selectors: [
      '.token.attr-equals',
      '.token.interpolation-punctuation',
      '.token.tag .token.punctuation:not(.attr-equals)',
      '.token.doctype .token.punctuation'
    ]
  },
  operator: {
    selectors: [ '.token.operator', '.token.arrow', '.token.combinator', '.token.json-operator', '.token.at' ]
  },
  keyword: {
    selectors: [ '.token.keyword', '.token.rule', '.token.statement', '.token.operation', '.token.function-name', '.token.regex-flags' ]
  },
  control: {
    selectors: [ '.token.control-flow', '.token.flow' ]
  },
  module: {
    selectors: [ '.token.module', '.token.import-type' ]
  },
  atrule: {
    selectors: [ '.token.atrule', '.token.mixin' ]
  },
  string: {
    selectors: [ '.token.string', '.token.template-string', '.token.char', '.token.target' ]
  },
  regex: {
    selectors: [ '.token.regex', '.token.regex-source' ]
  },
  number: {
    selectors: [ '.token.number', '.token.numeric' ]
  },
  boolean: {
    selectors: [ '.token.boolean' ]
  },
  nil: {
    selectors: [ '.token.nil', '.token.null' ]
  },
  constant: {
    selectors: [ '.token.constant', '.token.alias' ]
  },
  variable: {
    selectors: [ '.token.variable', '.token.object', '.token.extends-class .token.object' ]
  },
  parameter: {
    selectors: [ '.token.parameter', '.token.argument' ]
  },
  property: {
    selectors: [ '.token.property', '.token.literal-property', '.token.property-access', '.token.key', '.token.identifier', '.token.bracket > .token.keyword' ]
  },
  function: {
    selectors: [ '.token.function', '.token.method', '.token.literal-func' ]
  },
  className: {
    selectors: [ '.token.class-name', '.token.maybe-class-name', '.token.extends-class .token.class' ]
  },
  type: {
    selectors: [ '.token.types', '.token.type-constructors', '.token.type-array', '.token.type-object', '.token.cast' ]
  },
  builtin: {
    selectors: [ '.token.builtin', '.token.browser-objects' ]
  },
  this: {
    selectors: [ '.token.this' ]
  },
  tag: {
    selectors: [ '.token.tag', '.token.doctype .token.name', '.token.element-name', '.token.sin-tag' ]
  },
  attrName: {
    selectors: [ '.token.attr-name' ]
  },
  attrValue: {
    selectors: [ '.token.attr-value', '.token.attr-value > .token.punctuation:not(.attr-equals)', '.token.special-attr' ]
  },
  selector: {
    selectors: [ '.token.selector', '.token.id', '.token.selector .token.class' ]
  },
  pseudo: {
    selectors: [ '.token.pseudo-element', '.token.pseudo-class' ]
  },
  unit: {
    selectors: [ '.token.unit' ]
  },
  color: {
    selectors: [ '.token.color', '.token.hexcode' ]
  },
  entity: {
    selectors: [ '.token.entity' ]
  },
  heading: {
    selectors: [ '.token.title', '.token.doctype-tag' ]
  },
  invalid: {
    selectors: [ '.token.bracket-error' ]
  }
} satisfies Record<string, { selectors: string[] }>;

export type SyntaxScope = keyof typeof syntax;

/* -------------------------------------------- */
/* LANGUAGES                                    */
/* -------------------------------------------- */

const t = (scope: SyntaxScope, ...selectors: string[]): LanguageToken => ({ scope, selectors });

/**
 * Language specific tokens. Every entry becomes a rule scoped to the
 * language container with a fallback to the semantic scope, e.g:
 *
 * ```css
 * .language-yaml .token.key {
 *   color: var(--papyrus-yaml-key, var(--papyrus-property));
 * }
 * ```
 *
 * Host languages (markup, markdown) are listed before the languages
 * they embed so embedded language rules win on equal specificity.
 */
export const languages = {
  html: {
    selectors: [ '.language-html', '.language-markup' ],
    tokens: {
      comment: t('comment', '.token.comment'),
      doctype: t('heading', '.token.doctype-tag'),
      doctypeName: t('tag', '.token.doctype .token.name'),
      delimiter: t('delimiter', '.token.tag .token.punctuation:not(.attr-equals)', '.token.doctype .token.punctuation'),
      tag: t('tag', '.token.tag'),
      tagPrefix: t('tag', '.token.tag > .token.tag > .token.namespace'),
      attrName: t('attrName', '.token.attr-name'),
      attrPrefix: t('attrName', '.token.attr-name > .token.namespace'),
      equals: t('delimiter', '.token.attr-equals'),
      attrValue: t('attrValue', '.token.attr-value', '.token.attr-value > .token.punctuation:not(.attr-equals)'),
      entity: t('entity', '.token.entity')
    }
  },
  xml: {
    selectors: [ '.language-xml' ],
    tokens: {
      comment: t('comment', '.token.comment'),
      prolog: t('delimiter', '.token.prolog'),
      cdata: t('comment', '.token.cdata'),
      doctype: t('heading', '.token.doctype-tag'),
      doctypeName: t('tag', '.token.doctype .token.name'),
      delimiter: t('delimiter', '.token.tag .token.punctuation:not(.attr-equals)', '.token.doctype .token.punctuation'),
      tag: t('tag', '.token.tag'),
      tagPrefix: t('tag', '.token.tag > .token.tag > .token.namespace'),
      attrName: t('attrName', '.token.attr-name'),
      attrPrefix: t('attrName', '.token.attr-name > .token.namespace'),
      equals: t('delimiter', '.token.attr-equals'),
      attrValue: t('attrValue', '.token.attr-value'),
      entity: t('entity', '.token.entity')
    }
  },
  markdown: {
    selectors: [ '.language-markdown', '.language-md' ],
    tokens: {
      heading: t('heading', '.token.title', '.token.title > .token.punctuation'),
      blockquote: t('punctuation', '.token.blockquote'),
      list: t('punctuation', '.token.list'),
      hr: t('punctuation', '.token.hr'),
      bold: t('delimiter', '.token.bold', '.token.bold > .token.punctuation'),
      italic: t('delimiter', '.token.italic', '.token.italic > .token.punctuation'),
      strike: t('delimiter', '.token.strike > .token.punctuation', '.token.strike > .token.content'),
      code: t('string', '.token.code-snippet'),
      codeFence: t('punctuation', '.token.code > .token.punctuation', '.token.code-language'),
      url: t('url', '.token.url', '.token.url > .token.operator', '.token.url > .token.string', '.token.url > .token.variable', '.token.url > .token.punctuation'),
      urlContent: t('string', '.token.url > .token.content', '.token.url > .token.url'),
      table: t('punctuation', '.token.table .token.punctuation'),
      tableHeader: t('heading', '.token.table-header'),
      container: t('keyword', '.token.container > .token.cols', '.token.container > .token.cols + .token.call'),
      containerName: t('string', '.token.container > .token.cols + .token.call + .token.call')
    }
  },
  css: {
    selectors: [ '.language-css' ],
    tokens: {
      comment: t('comment', '.token.comment'),
      atrule: t('atrule', '.token.atrule', '.token.rule'),
      keyword: t('keyword', '.token.atrule .token.keyword'),
      selector: t('selector', '.token.selector'),
      pseudoElement: t('pseudo', '.token.pseudo-element'),
      pseudoClass: t('pseudo', '.token.pseudo-class'),
      combinator: t('operator', '.token.combinator'),
      attrName: t('attrName', '.token.attribute .token.attr-name'),
      attrValue: t('attrValue', '.token.attribute .token.attr-value'),
      attrPunctuation: t('tag', '.token.attribute > .token.punctuation'),
      property: t('property', '.token.property'),
      variable: t('variable', '.token.variable'),
      function: t('function', '.token.function'),
      string: t('string', '.token.string'),
      url: t('string', '.token.url'),
      number: t('number', '.token.number'),
      unit: t('unit', '.token.unit'),
      color: t('color', '.token.color', '.token.hexcode'),
      important: t('important', '.token.important'),
      operator: t('operator', '.token.operator'),
      punctuation: t('punctuation', '.token.punctuation'),
      entity: t('entity', '.token.entity')
    }
  },
  javascript: {
    selectors: [ '.language-javascript', '.language-js' ],
    tokens: {
      comment: t('comment', '.token.comment'),
      punctuation: t('punctuation', '.token.punctuation'),
      punctuationChars: t('punctuation', '.token.punctuation-chars'),
      semi: t('punctuation', '.token.semi'),
      operator: t('operator', '.token.operator'),
      keyword: t('keyword', '.token.keyword'),
      control: t('control', '.token.control-flow', '.token.flow'),
      module: t('module', '.token.module', '.token.import-type'),
      class: t('keyword', '.token.keyword.class'),
      operation: t('keyword', '.token.operation'),
      functionKeyword: t('keyword', '.token.function-name'),
      variable: t('variable', '.token.variable'),
      object: t('variable', '.token.object'),
      objectChain: t('punctuation', '.token.object + .token.punctuation-chars + .token.object'),
      property: t('property', '.token.literal-property', '.token.string-property'),
      propertyAccess: t('property', '.token.property-access'),
      bracketProperty: t('property', '.token.bracket > .token.keyword'),
      bracket: t('punctuation', '.token.bracket > .token.punctuation'),
      function: t('function', '.token.function', '.token.literal-func'),
      className: t('className', '.token.class-name', '.token.maybe-class-name'),
      typeConstructor: t('type', '.token.type-constructors'),
      builtin: t('builtin', '.token.browser-objects'),
      this: t('this', '.token.this'),
      parameter: t('parameter', '.token.parameter'),
      constant: t('constant', '.token.constant'),
      string: t('string', '.token.string', '.token.template-string', '.token.template-punctuation'),
      interpolation: t('delimiter', '.token.interpolation-punctuation'),
      regex: t('regex', '.token.regex'),
      regexDelimiter: t('regex', '.token.regex-delimiter'),
      regexFlags: t('keyword', '.token.regex-flags'),
      number: t('number', '.token.number', '.token.numeric'),
      boolean: t('boolean', '.token.boolean'),
      nil: t('nil', '.token.nil'),
      sin: t('string', '.token.template-sin'),
      sinDelimiter: t('operator', '.token.template-sin > .token.template-punctuation'),
      sinTag: t('tag', '.token.sin-tag', '.token.element-name'),
      sinProperty: t('property', '.token.sin-css .token.property'),
      sinClassName: t('className', '.token.sin-css .token.class-name'),
      sinVariable: t('variable', '.token.sin-css .token.variable'),
      sinPunctuation: t('punctuation', '.token.sin-css .token.punctuation')
    }
  },
  typescript: {
    selectors: [ '.language-typescript', '.language-ts' ],
    tokens: {
      comment: t('comment', '.token.comment'),
      punctuation: t('punctuation', '.token.punctuation'),
      punctuationChars: t('punctuation', '.token.punctuation-chars'),
      semi: t('punctuation', '.token.semi'),
      operator: t('operator', '.token.operator'),
      keyword: t('keyword', '.token.keyword'),
      control: t('control', '.token.control-flow', '.token.flow'),
      module: t('module', '.token.module', '.token.import-type'),
      class: t('keyword', '.token.keyword.class'),
      operation: t('keyword', '.token.operation'),
      functionKeyword: t('keyword', '.token.function-name'),
      variable: t('variable', '.token.variable'),
      object: t('variable', '.token.object'),
      objectChain: t('punctuation', '.token.object + .token.punctuation-chars + .token.object'),
      property: t('property', '.token.literal-property', '.token.string-property'),
      propertyAccess: t('property', '.token.property-access'),
      bracketProperty: t('property', '.token.bracket > .token.keyword'),
      bracket: t('punctuation', '.token.bracket > .token.punctuation'),
      function: t('function', '.token.function', '.token.literal-func'),
      method: t('function', '.token.method'),
      decorator: t('function', '.token.decorator .token.function'),
      className: t('className', '.token.class-name', '.token.maybe-class-name', '.token.extends-class .token.class'),
      generic: t('className', '.token.generic'),
      type: t('type', '.token.types', '.token.type-array', '.token.type-object'),
      typeConstructor: t('type', '.token.type-constructors'),
      returnType: t('punctuation', '.token.return-type'),
      parameter: t('parameter', '.token.parameter'),
      builtin: t('builtin', '.token.builtin', '.token.browser-objects'),
      this: t('this', '.token.this'),
      constant: t('constant', '.token.constant'),
      string: t('string', '.token.string', '.token.template-string', '.token.template-punctuation'),
      interpolation: t('delimiter', '.token.interpolation-punctuation'),
      regex: t('regex', '.token.regex'),
      regexDelimiter: t('regex', '.token.regex-delimiter'),
      regexFlags: t('keyword', '.token.regex-flags'),
      number: t('number', '.token.number', '.token.numeric'),
      boolean: t('boolean', '.token.boolean'),
      nil: t('nil', '.token.nil')
    }
  },
  json: {
    selectors: [ '.language-json' ],
    tokens: {
      comment: t('comment', '.token.comment'),
      property: t('property', '.token.property'),
      string: t('string', '.token.string'),
      number: t('number', '.token.number'),
      boolean: t('boolean', '.token.boolean'),
      nil: t('nil', '.token.null'),
      operator: t('operator', '.token.operator'),
      punctuation: t('punctuation', '.token.punctuation')
    }
  },
  yaml: {
    selectors: [ '.language-yaml', '.language-yml' ],
    tokens: {
      comment: t('comment', '.token.comment'),
      key: t('property', '.token.key'),
      directive: t('atrule', '.token.directive'),
      anchor: t('important', '.token.important'),
      tag: t('tag', '.token.tag'),
      string: t('string', '.token.string', '.token.scalar'),
      number: t('number', '.token.number', '.token.datetime'),
      boolean: t('boolean', '.token.boolean'),
      nil: t('nil', '.token.null'),
      punctuation: t('punctuation', '.token.punctuation')
    }
  },
  toml: {
    selectors: [ '.language-toml' ],
    tokens: {
      comment: t('comment', '.token.comment'),
      table: t('className', '.token.table'),
      key: t('property', '.token.key'),
      string: t('string', '.token.string'),
      number: t('number', '.token.number'),
      date: t('number', '.token.date'),
      boolean: t('boolean', '.token.boolean'),
      punctuation: t('punctuation', '.token.punctuation')
    }
  },
  bash: {
    selectors: [ '.language-bash', '.language-shell' ],
    tokens: {
      comment: t('comment', '.token.comment'),
      heading: t('heading', '.token.title'),
      argument: t('parameter', '.token.argument'),
      target: t('string', '.token.target'),
      punctuation: t('punctuation', '.token.punctuation')
    }
  },
  sql: {
    selectors: [ '.language-sql', '.language-pgsql', '.language-postgresql' ],
    tokens: {
      comment: t('comment', '.token.comment'),
      keyword: t('keyword', '.token.keyword'),
      function: t('function', '.token.function'),
      string: t('string', '.token.string'),
      number: t('number', '.token.number'),
      boolean: t('boolean', '.token.boolean'),
      variable: t('variable', '.token.variable'),
      alias: t('constant', '.token.alias'),
      identifier: t('property', '.token.identifier'),
      cast: t('type', '.token.cast'),
      operator: t('operator', '.token.operator', '.token.json-operator'),
      punctuation: t('punctuation', '.token.punctuation')
    }
  },
  treeview: {
    selectors: [ '.language-treeview', '.language-tree' ],
    tokens: {
      comment: t('comment', '.token.comment'),
      line: t('comment'),
      operator: t('operator', '.token.operator')
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
