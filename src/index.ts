import Prism from 'prismjs';
import { enableTabToIndent } from 'indent-textarea';
import { insert, set } from 'text-field-edit';
import { IOptions, IModel, Papyrus } from 'index';
import morphdom from 'morphdom';
import { invisible } from './editor/invisible';
import { loadPotion } from './editor/potion';
import { IRenderOptions } from '../index';
import {
  getLanguageFromClass,
  mergeOptions,
  trimInput,
  getLineCount,
  getLineNumbers,
  mergeRenderOptions
} from './utils';

const papyrus: Partial<typeof Papyrus> = function Papyrus (options = {}) {

  if (!('models' in papyrus)) papyrus.models = new Map();

  document.querySelectorAll('pre').forEach((pre) => {
    if (!pre.classList.contains('papyrus')) pre.classList.add('papyrus');
    papyrus.mount(pre, options);
  });

  console.info('𓁁 Papyrus Initialized');

  return Array.from(papyrus.models);

};

papyrus.prism = Prism;

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'papyrus', {
    get () {
      return papyrus;
    }
  });
}

papyrus.get = function (id?: string) {

  if (!id) return [ ...papyrus.models.values() ][0];

  if (papyrus.models.has(id)) return papyrus.models.get(id);

  return [ ...papyrus.models.values() ][0];
};

papyrus.mount = function (pre: HTMLPreElement, config: IOptions = {}) {

  if (!Prism) {
    throw new Error('𓁁 Papyrus: Missing PrismJS dependency');
  }

  if (!('models' in papyrus)) papyrus.models = new Map();

  if (!pre.hasAttribute('id')) pre.id = Math.random().toString(36).slice(2);

  const options = mergeOptions(config) as IOptions;

  if (options.potion) {
    papyrus.prism = loadPotion(Prism);
  }

  const tab = ' '.repeat(options.indentSize);

  const code = pre.querySelector('code');
  if (!code) {
    console.warn('𓁁 Papyprus: Missing "<code>" element');
    return null;
  }

  let language = getLanguageFromClass(code.className, options);
  if (!language) {
    console.warn(`𓁁 Papyprus: Unsupported or Missing Language ${language}`);
    return null;
  }

  let textarea: HTMLTextAreaElement = null;
  let selected: HTMLSpanElement;
  let atline: number = -1;
  let lines: number = -1;
  let scroll: number = 0;
  let input: string = trimInput(code.textContent, options);

  invisible(Prism, options, language);

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
          input = textarea.value = trimInput(options.input, options);
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
    code.classList.add('lines');
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

    const grammar = papyrus.prism.languages[language] || papyrus.prism.languages.plaintext;
    const highlight = papyrus.prism.highlight(input, grammar, language);

    const output = options.lineNumbers
      ? `<code>${highlight}${getLineNumbers(lines)}</code>`
      : `<code>${highlight}</code>`;

    morphdom(code, output, {
      childrenOnly: true,
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
    const left = code.scrollLeft = textarea.scrollLeft;
    if (left > 0) {
      pre.classList.add('no-fence');
      // pre.setAttribute('style', `--papyrus-line-scroll-left: -${left}px`);
      //  code.lastElementChild.setAttribute('style', `--papyrus-line-scroll-left: ${left}px`);
    } else {
      pre.classList.remove('no-fence');
    }
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

    // tokens = Prism.tokenize(input, Prism.languages[language]);

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

        // pre.classList.remove(`language-${language}`);
        // pre.classList.add(`language-${newLanguage}`);
        code.classList.remove(`language-${language}`);
        code.classList.add(`language-${newLanguage}`);

        if (options.lineNumbers) {
          if (!code.classList.contains('lines')) {
            code.classList.add('lines');
          }
        } else {
          if (code.classList.contains('lines')) {
            code.classList.remove('lines');
          }
        }

        language = newLanguage;

      }

    },
    update (newInput, newLanguage) {

      input = newInput;
      lines = getLineCount(input);

      if (newLanguage) {
        state.language = newLanguage;
        textarea.value = input;
      } else {
        set(textarea, input);
      }

      onupdate();
      console.info(`𓁁 Papyprus: Updated Language: ${language}`);

    }
  };

  papyrus.models.set(pre.id, state);

  return state;

};

papyrus.render = function (input: string, config: IRenderOptions) {

  if (!Prism) {
    throw new Error('𓁁 Papyrus: Missing PrismJS dependency');
  }

  const options = mergeRenderOptions(config);

  if (options.potion) papyrus.prism = loadPotion(Prism);

  const code = trimInput(input, options);

  invisible(papyrus.prism, options, options.language);

  if (!options.language) {
    console.error('𓁁 Papyrus: Missing Language Reference');
    return code;
  }

  const output: string[] = [];
  const lines = getLineCount(code);

  if (options.insertPreElement) {
    if (options.lineNumbers) {
      output.push('<pre class="papyrus line-numbers">');
    } else {
      output.push('<pre class="papyrus">');
    }
  }

  if (options.insertCodeElement) {
    if (options.lineNumbers) {
      output.push(`<code class="language-${options.language} lines auto-height">`);
    } else {
      output.push(`<code class="language-${options.language} lines auto-height">`);
    }
  }

  const highlight = papyrus.prism.highlight(code, papyrus.prism.languages[options.language], options.language);

  if (options.lineNumbers) {
    const lineNumbers = getLineNumbers(lines, true);
    output.push(highlight, lineNumbers, '</code>');
  } else {
    output.push(highlight, '</code>');
  }

  if (options.editor && options.insertTextArea) {
    output.push('<textarea class="editor">', code, '</textarea>');
  }

  output.push('</pre>');

  return output.join('');

};

export default papyrus;
