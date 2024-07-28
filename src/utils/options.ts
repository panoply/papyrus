import { compressToEncodedURIComponent } from 'lz-string';
import { Options } from '../..';
import { assign, getLanguageName, has, uuid } from './helpers';

/**
 * The `data-papyrus=""` object options which are compressed
 */
export function setAttributeHint (options: Options.Default) {

  const config = assign({}, options);

  // @ts-ignore
  config.selfCloseRegex = config.selfCloseRegex.source;

  return compressToEncodedURIComponent(JSON.stringify(config));

}

/**
 * The inline options for method `papyrus.inline` - this applied to
 * `{js some.method()}` in markup.
 */
export function setInlineOptions (options?: Options.Inline) {

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

/**
 * The inline options for method `papyrus.highlight`
 */
export function setHighlightOptions (options?: Options.Highlight) {

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
export function setOptions (type: 'editor' | 'mount' | 'static', options?: Options.Static) {

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
