import { MountOptions, CreateOptions, Languages } from '../types/options';

/**
 * **Utility** ~ Trim Code Input
 */
export function trimInput (input: string, options: MountOptions | CreateOptions) {

  if (options.trimStart && options.trimStart) {
    return input.trim();
  } else if (options.trimStart) {
    return input.trimStart();
  } else if (options.trimStart === false && options.trimEnd === true) {
    return input.trimEnd();
  }

  return input;
}

/**
 * **Utility** ~ Safe text insertion
 */
export function safeTextInsert (text: string): boolean {

  return text === ''
    ? document.execCommand('delete')
    : document.execCommand('insertText', false, text);

}

/**
 * **Utility** ~ Extract the Language ID reference from className
 */
export function getLanguageFromClass (className: string) {

  const language = className.indexOf('language-');

  return getLanguageName(className.slice(language + 9).split(' ')[0].trimEnd());

}

/**
 * **Utility** ~ Returns the correct language name
 */
export function getLanguageName (language: string): Languages | null {

  if (language === null) return null;

  const map = {
    html: 'html',
    shell: 'bash',
    bash: 'bash',
    cli: 'bash',
    css: 'css',
    scss: 'scss',
    liquid: 'liquid',
    xml: 'xml',
    json: 'json',
    javascript: 'javascript',
    js: 'javascript',
    typescript: 'typescript',
    ts: 'typescript',
    jsx: 'jsx',
    tsx: 'tsx',
    yaml: 'yaml',
    yml: 'yaml',
    plaintext: 'plaintext'
  };

  if (language in map) return map[language];

  console.error(`𓁁 Papyprus: Unsupported language "${language}" provided, will fallback to "plaintext"`);

  return null;

}

/**
 * **Utility** ~ Returns the number of newline occurances
 */
export function getLineCount (code: string) {

  return code.split('\n').length;

}

/**
 * **Utility** ~ Returns the newline counter node
 */
export function getLineNumbers (count: number) {

  if (isNaN(count)) return '';

  let nl = '';
  let i = 0;
  for (; i < count; i++) nl += '<span class="ln"></span>';
  return `<span class="line-numbers">${nl}</span>`;

}

export function mergePairs (config: MountOptions) {

  if ('autoClosingPairs' in config) {
    for (const [ open, close ] of config.autoClosingPairs) {
      if (open.length !== 1) {
        throw new Error(`𓁁 Papyprus: Invalid "autoClosePairs" character ("${open}") - Single characters only!`);
      }
      if (open.length !== 1) {
        throw new Error(`𓁁 Papyprus: Invalid "autoClosePairs" character ("${close}") - Single characters only!`);
      }
    }
  }

  if ('newlineIndentPairs' in config) {
    for (const [ open, close ] of config.newlineIndentPairs) {
      if (open.length !== 1) {
        throw new Error(`𓁁 Papyprus: Invalid "newlineIndentPairs" character ("${open}") - Single characters only!`);
      }
      if (open.length !== 1) {
        throw new Error(`𓁁 Papyprus: Invalid "newlineIndentPairs" character ("${close}") - Single characters only!`);
      }
    }
  }

  const defaults = {
    autoClosingPairs: [
      [ '"', '"' ],
      [ "'", "'" ],
      [ '(', ')' ],
      [ '{', '}' ],
      [ '[', ']' ]
    ],
    newlineIndentPairs: [
      [ '{', '}' ],
      [ '[', ']' ]
    ]
  };

  for (const key in config) defaults[key] = config[key];

  return defaults;

}

export function mergeShared <T = any> (config: T): T {

  const defaults = {
    id: null,
    autoSave: true,
    editor: true,
    tabConvert: true,
    input: '',
    indentChar: ' ',
    indentSize: 2,
    language: null,
    lineIndent: true,
    lineNumbers: true,
    lineHighlight: true,
    locLimit: 1500,
    spellcheck: false,
    showCRLF: false,
    showSpace: false,
    showCR: false,
    showLF: false,
    showTab: false,
    trimEnd: true,
    trimStart: true
  } as any;

  for (const key in config) defaults[key] = config[key];

  return defaults;

}

/**
 * **Utility** ~ Merge options
 */
export function mergeOptions (config: MountOptions): MountOptions {

  const combined = mergeShared(config) as MountOptions;
  const pairs = mergePairs(config) as MountOptions;
  const defaults = Object.assign(config, combined, pairs);

  for (const option in config) defaults[option] = config[option];

  return defaults;

}

export function mergeCreateOptions (config: CreateOptions) {

  const combined = mergeShared<CreateOptions>(config);

  combined.addClass = {
    pre: [],
    code: []
  };

  combined.addAttrs = {
    pre: [],
    code: []
  };

  for (const option in config) {
    if (option === 'addAttrs' || option === 'addClass') {
      for (const attr in config[option]) {
        combined[option][attr] = config[option][attr];
      }
    } else {
      combined[option] = config[option];
    }
  }

  combined.language = getLanguageName(combined.language as Languages);

  return combined;

}

/* -------------------------------------------- */
/* EDITOR UTILS                                 */
/* -------------------------------------------- */

/**
 * Debounce wrapper outside the event loop
 */
export function debounce (cb: any, wait: number) {

  let timeout = 0;

  return (...args: any) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => cb(...args), wait);
  };

}
