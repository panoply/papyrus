/**
 * IMPORT MODULE
 *
 * PrismJS module import
 */
import Prism from 'prismjs';
import { enableTabToIndent } from 'indent-textarea';
import { insert, set } from 'text-field-edit';
import Script from './grammars/script';
import Markup from './grammars/markup';
import morphdom from 'morphdom';
import { IOptions, IModel, Languages } from '../index';
import { invisible } from './editor/invisible';

Prism.manual = true;
Prism.languages.insertBefore('js', 'keyword', Script);
Prism.languages.insertBefore('ts', 'keyword', Script);
Prism.languages.liquid = Prism.languages.extend('markup', Markup);
Prism.languages.html = Prism.languages.extend('markup', Markup);

/**
 * Extract the Language ID reference from className
 */
function getLanguageFromClass (className: string) {

  const language = className.indexOf('language-');

  return {
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
    yaml: 'yaml'
  }[className.slice(language + 9).split(' ')[0].trimEnd()] as Languages;

}

/**
 * Returns the number of newline occurances
 */
function getLineCount (code: string) {

  return code.split('\n').length;

}

/**
 * Returns the newline counter node
 */
function getLineNumbers (count: number) {

  let nl = '';

  for (let i = 0; i < count; i++) nl += `<span class="ln" data-line="${i + 1}"></span>`;
  return `<span class="line-numbers">${nl}</span>`;

}

function setDomNodes (pre: HTMLPreElement, config: IOptions): IModel {

  const options = Object.assign(<IOptions>{
    autoSave: true,
    editor: false,
    indentChar: 'none',
    indentSize: 2,
    input: '',
    language: null,
    lineHighlight: true,
    lineIndent: true,
    lineNumbers: true,
    locLimit: 1500,
    tabIndent: false,
    spellcheck: false,
    showCRLF: false,
    showSpace: false,
    showCR: false,
    showLF: false,
    showTab: false,
    trimEnd: true,
    trimStart: true
  }, config);

  const tab = ' '.repeat(options.indentSize);

  const code = pre.querySelector('code');
  if (!code) {
    console.warn('𓁁 Papyprus: Missing "<code>" element');
    return null;
  }

  let language = getLanguageFromClass(code.className);
  if (!language) {
    console.warn(`𓁁 Papyprus: Unsupported Language ${language}`);
    return null;
  }

  let textarea: HTMLTextAreaElement = null;
  let selected: HTMLSpanElement;
  let atline: number = -1;
  let lines: number = -1;
  let scroll: number = 0;
  let input: string;

  if (options.trimStart && options.trimStart) {
    input = code.textContent.trim();
  } else if (options.trimStart === true && options.trimEnd === false) {
    input = code.textContent.trimStart();
  } else if (options.trimStart === false && options.trimEnd === true) {
    input = code.textContent.trimEnd();
  }

  if ((
    options.showCRLF === false &&
    options.showSpace === false &&
    options.showCRLF === false &&
    options.showTab === false
  ) === false) invisible(options)(Prism.languages[language]);

  /**
   * Disable Text Editor
   */
  function disable () {

    const text = pre.querySelector('.editor');

    if (text) text.remove();
  }

  /**
   * Enable Text Editor
   */
  function enable () {

    textarea = pre.querySelector('textarea');

    if (!textarea) {
      textarea = document.createElement('textarea');
      textarea.classList.add('editor');
      textarea.spellcheck = options.spellcheck;
      if (options.tabIndent) enableTabToIndent(textarea);
    }

    if (textarea) {
      if (options.input.length > 0) {
        if (input.trim() === '') {

          if (options.trimStart && options.trimStart) {
            input = options.input.trim();
          } else if (options.trimStart === true && options.trimEnd === false) {
            input = options.input.trimStart();
          } else if (options.trimStart === false && options.trimEnd === true) {
            input = options.input.trimEnd();
          }

          textarea.value = input;

        } else {

          textarea.value = input;

        }
      } else {

        textarea.value = input;

      }
    }

    if (options.editor) pre.appendChild(textarea);

    scroll = textarea.scrollTop;

    textarea.onkeyup = onclick;
    textarea.onclick = onclick;
    textarea.onscroll = onscroll;
    textarea.oninput = oninput;
    textarea.onkeydown = onkeydown;

  }

  if (options.editor) enable();

  if (options.lineNumbers) {
    code.classList.add('line-numbers');
    lines = getLineCount(input);
  }

  /**
   * onclick event callback
   */
  function onclick () {

    const { value, selectionStart } = textarea;
    const number = value.slice(0, selectionStart).split('\n').length;

    if (atline === -1) atline = number;
    if (atline !== number) {
      atline = number;
      selected.classList.remove('highlight');
    } else {
      atline = number;
    }

    selected = code.querySelector(`span[data-line="${number}"]`);
    selected.classList.add('highlight');

  }

  function onupdate () {

    if (lines > options.locLimit) {
      return '<code><span class="papyrus-loc-limit">LOC LIMIT EXCEEDED</span></code>';
    }

    const highlight = Prism.highlight(input, Prism.languages[language], language);
    const output = options.lineNumbers
      ? `<code>${highlight}${getLineNumbers(lines)}</code>`
      : `<code>${highlight}</code>`;

    morphdom(code, output, {
      childrenOnly: true,
      onBeforeElChildrenUpdated: (from, to) => {
        if (from.classList.contains('highlight')) return false;
        if (from.isEqualNode(to)) return false;
        return true;
      },
      onBeforeElUpdated: (from, to) => {
        if (from.classList.contains('highlight')) return false;
        if (from.isEqualNode(to)) return false;
        return true;
      }
    });

  }

  /**
   * onscroll event callback
   */
  function onscroll () {

    code.scrollTop = scroll = textarea.scrollTop;
    code.scrollLeft = textarea.scrollLeft;

  };

  /**
   * oninput event callback
   */
  function oninput (this: HTMLTextAreaElement, event: InputEvent) {

    input = textarea.value;

    const newlines = getLineCount(input);

    if (options.lineIndent && lines < newlines) {
      textarea.scrollTop = scroll;
      code.scrollTop = scroll;
    }

    lines = newlines;

    if (input.indexOf('\t') > -1 && options.showTab === false) input = input.replace(/\t/g, tab);

    onupdate();
    onscroll();

  }

  function onkeydown (event: KeyboardEvent) {

    if (event.key === 'Enter') {

      if (event.altKey || event.ctrlKey) return;

      event.preventDefault();

      const start = textarea.selectionStart;
      const line = textarea.value.slice(0, start).split('\n').pop();
      const newline = '\n' + line.match(/^\s*/)[0];

      insert(textarea, newline);
      onclick();

    } else if (event.key === 'Backspace') {

      const line = textarea.value.slice(0, textarea.selectionStart).split('\n').pop();

      if (line.trim().length === 0) {
        event.preventDefault();
        textarea.setSelectionRange(textarea.selectionStart - line.length, textarea.selectionEnd, 'backward');
        document.execCommand('delete', false);
        onscroll();
      }

    } else if (event.key === 'Tab') {
      event.preventDefault();
      insert(textarea, tab);
      onscroll();
    }
  }

  onupdate();

  const state: IModel = {
    enable,
    disable,
    get pre () { return pre; },
    get code () { return code; },
    get textarea () { return textarea; },
    get raw () { return input; },
    get lines () { return lines; },
    get language () { return language; },
    set language (newLanguage) {

      if (language !== newLanguage) {
        pre.classList.remove(`language-${language}`);
        pre.classList.add(`language-${newLanguage}`);
        code.classList.remove(`language-${language}`);
        code.classList.add(`language-${newLanguage}`);
        language = newLanguage;
      }

    },
    update (input, newLanguage) {

      if (newLanguage) {
        state.language = newLanguage;
        set(textarea, input);
      }

      onupdate();
      console.info(`𓁁 Papyprus: Updated Language: ${language}`);

    }
  };

  return state;

}

const papyrus = function papyrus (options?: IOptions) {

  const model: IModel[] = [];

  document.body.querySelectorAll('pre').forEach((pre) => {

    const dom = setDomNodes(pre, options);

    if (dom === null) return;

    model.push(dom);

  });

  console.info('𓁁 Papyrus Initialized');

  return model;

};

function highlight (code: string, options: IOptions) {

  if (!options.language) {
    console.error('𓁁 Papyrus: Missing Language Reference');
    return code;
  }

  if (![
    'html',
    'shell',
    'css',
    'scss',
    'liquid',
    'xml',
    'json',
    'javascript',
    'typescript',
    'jsx',
    'tsx',
    'yaml'
  ].includes(options.language)) {

    console.error(`𓁁 Papyprus: Unsupported language "${options.language}"`);
    return code;

  }

  if (!('lineNumbers' in options)) options.lineNumbers = true;

  return Prism.highlight(code, Prism.languages[options.language], options.language);

};

papyrus.highlight = highlight;
papyrus.editor = setDomNodes;

export default papyrus;
