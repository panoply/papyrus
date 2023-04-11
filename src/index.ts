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
// import { onkeydown } from './editor/indent';
import morphdom from 'morphdom';
import { IOptions, IModel, Languages } from '../index';
import { getLineCount, getLineNumbers } from './editor/lines';
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

function setDomNodes (pre: HTMLPreElement, config: IOptions): IModel {

  const options = Object.assign(<IOptions>{
    autoSave: true,
    readonly: false,
    indentChar: 'none',
    indentSize: 2,
    input: '',
    language: null,
    lineHighlight: true,
    lineIndent: true,
    lineNumbers: true,
    lineLimit: 1000,
    tabIndent: false,
    spellCheck: false,
    trim: true,
    invisibles: false
  }, config);

  if ('invisibles' in options) {
    if (typeof options.invisibles === 'boolean') {
      if (options.invisibles === true) {
        options.invisibles = {
          cr: true,
          crlf: true,
          lf: true,
          space: true,
          tab: true
        };
      } else {
        options.invisibles = false;
      }
    } else {

      options.invisibles = Object.assign({
        cr: false,
        crlf: false,
        lf: false,
        space: true,
        tab: false
      }, options.invisibles);

    }
  } else {
    options.invisibles = {
      cr: false,
      crlf: false,
      lf: false,
      space: true,
      tab: false
    };
  }

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

  if (options.invisibles !== false) invisible(options.invisibles)(Prism.languages[language]);

  let online: number = -1;
  let textarea: HTMLTextAreaElement = null;
  let selected: HTMLSpanElement;
  let lines = -1;
  let scroll: number = 0;
  let input = options.trim ? code.textContent.trim() : code.textContent;

  function disable () {

    const text = pre.querySelector('.editor');

    if (text) text.remove();
  }

  function enable () {

    textarea = pre.querySelector('textarea');

    if (!textarea) {
      textarea = document.createElement('textarea');
      textarea.classList.add('editor');
      textarea.spellcheck = options.spellCheck;
      if (options.tabIndent) enableTabToIndent(textarea);
    }

    if (textarea) {
      if (options.input.length > 0) {
        if (input === '') {
          input = options.trim ? options.input.trim() : options.input;
          textarea.value = input;
        } else {
          textarea.value = input;
        }
      } else {
        textarea.value = input;
      }
    }

    if (options.readonly === false) {
      pre.appendChild(textarea);
    }

    scroll = textarea.scrollTop;

    textarea.onkeyup = onclick;
    textarea.onclick = onclick;
    textarea.onscroll = onscroll;
    textarea.oninput = oninput;
    textarea.onkeydown = onkeydown;

  }

  if (!options.readonly) enable();

  if (options.lineNumbers) lines = getLineCount(input);

  /**
   * onclick event callback
   */
  function onclick () {

    const { value, selectionStart } = textarea;
    const number = value.slice(0, selectionStart).split('\n').length;

    if (online === -1) online = number;
    if (online !== number) {
      online = number;
      selected.classList.remove('highlight');
    } else {
      online = number;
    }

    selected = code.querySelector(`span[data-line="${number}"]`);
    selected.classList.add('highlight');

  }

  /**
   * highlight input
   */
  function highlight () {

    const output = Prism.highlight(input, Prism.languages[language], language);

    return options.lineNumbers
      ? `<code class="language-${language}">${output}${getLineNumbers(lines)}</code>`
      : `<code class="language-${language}">${output}</code>`;
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
  function oninput () {

    input = textarea.value;

    const newlines = getLineCount(input);

    if (options.lineIndent && lines < newlines) {
      textarea.scrollTop = scroll;
      code.scrollTop = scroll;
    }

    if (options.lineNumbers) lines = newlines;

    if (input.indexOf('\t') > -1) {
      if (typeof options.invisibles === 'boolean') {
        if (options.invisibles === true) input = input.replace(/\t/g, ' ');
      } else if (options.invisibles.tab === false) {
        input = input.replace(/\t/g, ' ');
      }
    }

    morphdom(code, highlight(), {
      onBeforeElUpdated: (from, to) => {

        if (from.classList.contains('highlight')) return false;

        if (from.isEqualNode(to)) return false;

        return true;

      }
    });

    onscroll();

  }

  function onkeydown (this: HTMLTextAreaElement, event: KeyboardEvent) {

    if (event.key === 'Enter') {

      if (event.altKey || event.ctrlKey) return;
      event.preventDefault(); // We will add newline ourselves.

      const start = this.selectionStart;
      const line = this.value.slice(0, start).split('\n').pop();
      const newline = '\n' + line.match(/^\s*/)[0];

      insert(this, newline);
      // document.execCommand('insertText', false, newline);

      onclick();

    } else if (event.key === 'Tab') {

      event.preventDefault();

      // insert(this, ' '.repeat(options.indentSize));
      document.execCommand('insertText', false, ' '.repeat(options.indentSize));

    } else {

      onclick();

      const reverse = (step: number) => (this.selectionEnd = this.selectionEnd - step);

      switch (event.key) {
        case '{':
          insert(this, '}');
          reverse(1);
          break;
        case '[':
          insert(this, ']');
          reverse(1);
          break;
        case '"':
          insert(this, '"');
          reverse(1);
          break;
        case "'":
          insert(this, "'");
          reverse(1);
          break;
        case '<':
          insert(this, '>');
          reverse(1);
          break;
      }

    }
  }

  morphdom(code, highlight());

  const state: IModel = {
    enable,
    disable,
    get pre () { return pre; },
    get code () { return code; },
    get textarea () { return textarea; },
    get raw () { return textarea.value; },
    get lines () { return lines; },
    get language () { return language; },
    set language (newLanguage) {

      if (language !== newLanguage) {
        pre.classList.remove(`language-${language}`);
        pre.classList.add(`language-${language}`);
        code.classList.remove(`language-${language}`);
        code.classList.add(`language-${language}`);
        language = newLanguage;
      }

    },
    update (input, newLanguage) {

      if (newLanguage) {
        state.language = newLanguage;
        set(textarea, input);
      }

      morphdom(code, highlight());

      console.warn(`𓁁 Papyprus: Updated Language: ${language}`);

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

  console.info('𓁁');

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
    console.error(`𓁁 Papyprus does not support "${options.language}"`);
    return code;
  }

  if (!('lineNumbers' in options)) options.lineNumbers = true;

  return Prism.highlight(
    code,
    Prism.languages[options.language],
    options.language
  );

};

papyrus.highlight = highlight;
papyrus.editor = setDomNodes;

export default papyrus;
