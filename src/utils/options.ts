import { compressToEncodedURIComponent } from 'lz-string';
import { Options } from '../..';
import { assign, getLanguageName, has, uuid } from './helpers';

/**
 * The `data-papyrus=""` object options which are compressed
 */
export function setAttributeHint(options: Options.Default) {

  const config = assign({}, options);

  // @ts-ignore
  config.selfCloseRegex = config.selfCloseRegex.source;

  return compressToEncodedURIComponent(JSON.stringify(config));

}

/**
 * The inline options for method `papyrus.inline` - this applied to
 * `{js some.method()}` in markup.
 */
export function setInlineOptions(options?: Options.Inline) {

  const config: Options.Inline = {
    language: null,
    trimEnd: false,
    trimStart: false,
    addAttrs: [],
    addClass: []
  };

  if (typeof options === 'object') {

    config.language = getLanguageName(options.language);

    for (const k in config) {
      if (has(k, options)) {
        config[k] = k === 'language' ? getLanguageName(options[k]) : options[k];
      }
    }
  }

  return config;

}

function dedent(strings: TemplateStringsArray, ...values: Array<string>) {

  const raw = typeof strings === 'string' ? [strings] : strings.raw;
  const len = raw.length;

  // first, perform interpolation
  let result = '';
  let mindent: number | null = null;

  for (let i = 0; i < len; i++) {

    result += raw[i]
      .replace(/\\\n[ \t]*/g, '')
      .replace(/\\`/g, '`');

    if (i < values.length) result += values[i];

  }

  // now strip indentation
  const lines = result.split('\n');
  const size = lines.length;

  for (let i = 0; i < size; i++) {

    const m = lines[i].match(/^(\s+)\S+/);

    if (m) {
      const indent = m[1].length;
      mindent = !mindent ? indent : Math.min(mindent, indent);
    }

  }

  if (mindent !== null) {
    const m = mindent;
    result = lines.map(l => l[0] === ' ' ? l.slice(m) : l).join('\n');
  }

  return result.trim().replace(/\\n/g, '\n');

};


/**
 * The inline options for method `papyrus.highlight`
 */
export function setHighlightOptions(options?: Options.Highlight) {

  const config: Options.Highlight = {
    language: null,
    flems: null,
    lineFence: true,
    lineNumbers: true,
    autoHeight: true,
    tabSize: 2,
    trimEnd: true,
    trimStart: true,
    useTabs: false,
    wordWrap: false,
    copyButton: true,
    rtl: false,
    preAttrs: [],
    preClass: [],
    codeAttrs: [],
    codeClass: []
  };

  if (typeof options === 'object') {

    if (!has('language', options)) {
      console.warn('𓁁 Papyprus: No "language", provided, will fallback to "plaintext"');
    } else {
      config.language = getLanguageName(options.language);
    }

    for (const k in config) {
      if (has(k, options)) {
        config[k] = k === 'language' ? getLanguageName(options[k]) : options[k];
      }
    }
  }

  if (config.lineFence === true && config.lineNumbers === false) {
    config.lineFence = false;
  }

  return config;

}

/**
 * The options for method `papyrus.editor`
 */
export function setOptions(type: 'editor' | 'mount' | 'static', options?: Options.Static) {

  const config: Options.Default = {
    type,
    id: null,
    language: null,
    flems: null,
    lineFence: false,
    lineNumbers: true,
    autoHeight: true,
    tabSize: 2,
    readOnly: false,
    input: null,
    trimEnd: true,
    trimStart: true,
    useTabs: false,
    wordWrap: false,
    copyButton: true,
    rtl: false,
    preAttrs: [],
    preClass: [],
    codeAttrs: [],
    codeClass: [],
    indentGuides: true,
    matchTags: true,
    matchSelected: true,
    bracketPairs: true,
    editHistory: 999,
    searchWidget: true,
    selfCloseRegex: /([^$\w'"`]["'`]|.[[({])[.,:;\])}>\s]|.[[({]`/s,
    selfClosePairs: [
      '""',
      "''",
      '``',
      '()',
      '[]',
      '{}'
    ]
  };

  if (typeof options === 'object') {

    if (!has('language', options)) {
      console.warn('𓁁 Papyprus: No "language", provided, will fallback to "plaintext"');
    } else {
      config.language = getLanguageName(options.language);
    }

    for (const k in config) {
      if (k === 'language' || k === 'type') continue;
      if (has(k, options)) config[k] = options[k];
    }
  }

  if (config.language === 'treeview') {
    config.type = 'static';
    config.readOnly = true;
    config.lineNumbers = false;
    config.lineFence = false;
    config.indentGuides = false;
  }

  if (config.id === null && config.type !== 'static') config.id = uuid();
  if (config.indentGuides === true) config.lineFence = false;

  return config;

}
