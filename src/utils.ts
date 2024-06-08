import { Merge } from 'type-fest';
import { Options, Languages, EditorOptions } from '../types/options';
import merge from 'mergerino';

/**
 * **Utility** ~ Check if property exists in object
 */
export function has<T extends object> (prop: string, object: T): boolean {

  return prop in object;

}

/**
 * **Utility** ~ Trim Code Input
 */
export function trimInput (input: string, options: Options) {

  if (options.trimStart && options.trimEnd) {
    return input.trim();
  } else if (options.trimStart === true && options.trimEnd === false) {
    return input.trimStart();
  } else if (options.trimStart === false && options.trimEnd === true) {
    return input.trimEnd();
  }

  return input;
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
    plaintext: 'plaintext',
    treeview: 'treeview',
    tree: 'treeview'
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
export function getLineNumbers (count: number, highlight: number = 0) {

  if (isNaN(count)) return '';

  highlight = highlight - 1;

  let nl = '';
  let i = 0;
  for (; i < count; i++) {
    if (highlight === i) {
      nl += '<span class="ln highlight"></span>';
    } else {
      nl += '<span class="ln"></span>';
    }
  }

  return `<div class="line-numbers">${nl}</div>`;

}

export function checkPairs (config: EditorOptions) {

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

  if ('autoIndentPairs' in config) {
    for (const [ open, close ] of config.autoIndentPairs) {
      if (open.length !== 1) {
        throw new Error(`𓁁 Papyprus: Invalid "autoIndentPairs" character ("${open}") - Single characters only!`);
      }
      if (open.length !== 1) {
        throw new Error(`𓁁 Papyprus: Invalid "autoIndentPairs" character ("${close}") - Single characters only!`);
      }
    }
  }

}

export function mergeEditorOptions (options: true | EditorOptions, defaults = <EditorOptions>{
  autoClosingPairs: [
    [ '"', '"' ],
    [ '(', ')' ],
    [ '{', '}' ],
    [ '[', ']' ]
  ],
  autoIndentPairs: [
    [ '{', '}' ],
    [ '[', ']' ]
  ],
  indentChar: ' ',
  indentSize: 2,
  lineHighlight: true,
  lineIndent: true,
  lineNumber: 1,
  locLimit: 1500,
  renderSpace: false,
  renderTab: false,
  spellcheck: false,
  tabConvert: true,
  tabIndent: true,
  completions: {}
}) {

  if (options === true) return defaults;

  const config = merge<EditorOptions>(defaults, options);

  checkPairs(config);

  return config;

}

export function specificOptions (options: Options) {

  if (options.language === 'treeview') {
    options.lineNumbers = false;
    options.editor = false;
    options.showSpace = false;
    options.showSpace = false;
    options.showCR = false;
    options.showLF = false;
    options.showTab = false;
  }

}

export function mergeOptions (options: Options): Merge<Options, { editor: false | EditorOptions }> {

  const config = merge<Options>({
    id: null,
    language: null,
    input: '',
    lineFence: true,
    lineNumbers: true,
    showCRLF: false,
    showSpace: false,
    showCR: false,
    showLF: false,
    showTab: false,
    trimEnd: true,
    trimStart: true,
    editor: false,
    startMode: 'static',
    addAttrs: {
      pre: [],
      code: []
    },
    addClass: {
      pre: [],
      code: []
    }
  }, options);

  if (config.editor !== false) {
    config.editor = mergeEditorOptions(config.editor);
    config.startMode = 'editor';
  }

  if (config.language === 'treeview') {
    config.lineNumbers = false;
    config.editor = false;
    config.showSpace = false;
    config.showSpace = false;
    config.showCR = false;
    config.showLF = false;
    config.showTab = false;
    config.startMode = 'static';
  }

  return config as Merge<Options, { editor: false | EditorOptions }>;

}

/* -------------------------------------------- */
/* EDITOR UTILS                                 */
/* -------------------------------------------- */

/**
 * Return a UUID
 */
export function uuid () {

  return Math.random().toString(36).slice(2);

}

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

/**
 * **Utility** ~ Safe text insertion
 */
export function safeTextInsert (text: string): boolean {

  return text === ''
    ? document.execCommand('delete')
    : document.execCommand('insertText', false, text);

}

export function findLineEnd (value: string, currentEnd: number): number {

  // Go to the beginning of the last line
  const lastLineStart = value.lastIndexOf('\n', currentEnd - 1) + 1;

  // There's nothing to unindent after the last cursor, so leave it as is
  if (value.charAt(lastLineStart) !== '\t') return currentEnd;

  return lastLineStart + 1; // Include the first character, which will be a tab

}
