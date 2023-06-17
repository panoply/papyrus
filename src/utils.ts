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
 * **Utility** ~ Extract the Language ID reference from className
 */
export function getLanguageFromClass (className: string) {

  const language = className.indexOf('language-');
  const langName = {
    html: 'html',
    shell: 'shell',
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
    yml: 'yaml'
  }[className.slice(language + 9).split(' ')[0].trimEnd()] as Languages;

  if (langName) return langName;

  return null;

}

/**
 * **Utility** ~ Returns the correct language name
 */
export function getLanguageName (language: string): Languages | null {

  const languages = {
    html: 'html',
    shell: 'bash',
    bash: 'bash',
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

  if (language in languages) return languages[language];

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
  return `<span class="line-numbers" contenteditable="false">${nl}</span>`;

}

/**
 * **Utility** ~ Merge options
 */
export function mergeOptions (config: MountOptions, defaults: MountOptions = {
  id: '',
  autoSave: true,
  autoClosing: true,
  editor: true,
  indentChar: ' ',
  indentSize: 2,
  input: '',
  language: null,
  lineHighlight: true,
  lineIndent: true,
  lineNumbers: true,
  locLimit: 1500,
  history: true,
  indentMultiline: true,
  tabConvert: true,
  newlineIndentChars: [ '(', '{', '[' ],
  newlineInsertChars: [ ')', '}', ']' ],
  spellcheck: false,
  showCRLF: false,
  showSpace: false,
  showCR: false,
  showLF: false,
  showTab: false,
  trimEnd: true,
  trimStart: true
}): MountOptions {

  for (const option in config) defaults[option] = config[option];

  return defaults;

}

export function mergeCreateOptions (config: CreateOptions) {

  const defaults: CreateOptions = {
    id: null,
    indentMultiline: true,
    tabConvert: true,
    autoSave: true,
    editor: true,
    indentChar: ' ',
    indentSize: 2,
    language: null,
    autoClosing: true,
    lineHighlight: true,
    lineIndent: true,
    lineNumbers: true,
    locLimit: 1500,
    history: true,
    newlineIndentChars: [ '(', '{', '[' ],
    newlineInsertChars: [ ')', '}', ']' ],
    spellcheck: false,
    showCRLF: false,
    showSpace: false,
    showCR: false,
    showLF: false,
    showTab: false,
    trimEnd: true,
    trimStart: true,
    addClass: {
      pre: [],
      code: []
    },
    addAttrs: {
      pre: [],
      code: []
    }

  };

  for (const option in config) {
    if (option === 'addAttrs' || option === 'addClass') {
      for (const attr in config[option]) {
        defaults[option][attr] = config[option][attr];
      }
    } else {
      defaults[option] = config[option];
    }
  }

  defaults.language = getLanguageName(config.language as Languages);

  return defaults;

}

/* -------------------------------------------- */
/* EDITOR UTILS                                 */
/* -------------------------------------------- */

/**
 * Get keyboard code
 */
function getKeyCode (event: KeyboardEvent): string | undefined {

  const key = event.key || event.keyCode || event.which;
  if (!key) return undefined;
  return (typeof key === 'string' ? key : String.fromCharCode(key)).toUpperCase();

}

/**
 * Is control key
 */
function isCtrl (event: KeyboardEvent) {

  return event.metaKey || event.ctrlKey;

}

/**
 * Visit node occurance
 */
export function visit (editor: HTMLElement, visitor: (el: Node) => 'stop' | undefined) {

  const queue: Node[] = [];

  if (editor.firstChild) queue.push(editor.firstChild);

  let el = queue.pop();

  while (el) {
    if (visitor(el) === 'stop') { break; };
    if (el.nextSibling) queue.push(el.nextSibling);
    if (el.firstChild) queue.push(el.firstChild);
    el = queue.pop();
  }
}

/**
 * Undo event
 */
export function isUndo (event: KeyboardEvent) {

  return isCtrl(event) && !event.shiftKey && getKeyCode(event) === 'Z';

}

/**
 * Redo event
 */
export function isRedo (event: KeyboardEvent) {

  return isCtrl(event) && event.shiftKey && getKeyCode(event) === 'Z';

}

/**
 * Copy keyboard event
 */
export function isCopy (event: KeyboardEvent) {

  return isCtrl(event) && getKeyCode(event) === 'C';

}

/**
 * Whether or not history should record
 */
export function canRecord (event: KeyboardEvent): boolean {

  return !isUndo(event) && !isRedo(event) &&
      event.key !== 'Meta' &&
      event.key !== 'Control' &&
      event.key !== 'Alt' &&
      !event.key.startsWith('Arrow');

};

/**
 * Debounce wrapper outside the event loop
 */
export function insert (text: string) {

  text = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  document.execCommand('insertHTML', false, text);

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
 * Returns the leading space padding
 */
export function findPadding (text: string): [string, number, number] {

  // Find beginning of previous line.
  let i = text.length - 1;
  while (i >= 0 && text[i] !== '\n') i--;
  i++;

  // Find padding of the line.
  let j = i;
  while (j < text.length && /[ \t]/.test(text[j])) j++;
  return [ text.substring(i, j) || '', i, j ];
}
