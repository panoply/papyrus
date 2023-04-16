/**
 * IMPORT MODULE
 *
 * PrismJS module import
 */
import Prism from 'prismjs';
import { enableTabToIndent } from 'indent-textarea';
import { insert, set } from 'text-field-edit';
import * as Liquid from './grammars/liquid';
import * as Style from './grammars/style';
import Script from './grammars/script';
import JavaScript from './grammars/javascript';
import Markup from './grammars/markup';
import XML from './grammars/xml';
import JSON from './grammars/json';
import morphdom from 'morphdom';
import { IOptions, IModel, Languages, Papyrus, IRenderOptions } from '../index';
import { invisible } from './editor/invisible';

const papyrus: Partial<typeof Papyrus> = function run (options = {}) {

  if (arguments.length === 0) {
    if (papyrus.prism === null) {
      if (getPrismJS()) return;
    }
  } else if (arguments.length === 1) {
    if ('disableWorkerMessageHandler' in arguments[0]) {
      papyrus.prism = arguments[0];
      return run;
    }
  }

  if (!('models' in papyrus)) papyrus.models = new Map();

  document.querySelectorAll('pre').forEach((pre) => {
    if (!pre.classList.contains('papyrus')) pre.classList.add('papyrus');
    mountDom(pre, options);
  });

  console.info('𓁁 Papyrus Initialized');

  return Array.from(papyrus.models);

};

/**
 * **Utility** ~ Attempt to get PrismJS instance
 */
function getPrismJS () {

  if (globalThis.Prism) {
    papyrus.prism = globalThis.Prism;
    return false;
  }

  console.error('𓁁 Papyrus: Unable to obtain PrismJS context');

  return true;

}

/**
 * **Utility** ~ Extract the Language ID reference from className
 */
function getLanguageFromClass (className: string, options: IOptions) {

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
    yaml: 'yaml'
  }[className.slice(language + 9).split(' ')[0].trimEnd()] as Languages;

  if (langName) {
    if (options.language === null) options.language = langName;
    return langName;
  }

  if (options.language !== null) return options.language;

  return langName;

}

/**
 * **Utility** ~ Returns the number of newline occurances
 */
function getLineCount (code: string) {

  return code.split('\n').length;

}

/**
 * **Utility** ~ Returns the newline counter node
 */
function getLineNumbers (count: number) {

  let nl = '';

  for (let i = 0; i < count; i++) nl += `<span class="ln" data-line="${i + 1}"></span>`;
  return `<span class="line-numbers">${nl}</span>`;

}

/**
 * **Utility** ~ Merge options
 */
function mergeOptions (config: IOptions) {

  return Object.assign(<IOptions>{
    autoSave: true,
    prism: null,
    editor: true,
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

}

/**
 * **Utility** ~ Trim Code Input
 */
function trimInput (input: string, options: IOptions) {

  if (options.trimStart && options.trimStart) {
    return input.trim();
  } else if (options.trimStart === true && options.trimEnd === false) {
    return input.trimStart();
  } else if (options.trimStart === false && options.trimEnd === true) {
    return input.trimEnd();
  }

  return input;
}

function mountPrism () {

  if (!('models' in papyrus)) papyrus.models = new Map();

  if (arguments.length === 1) {

    if (arguments[0] instanceof HTMLPreElement) {
      return mountDom(arguments[0]);
    }

    if ('disableWorkerMessageHandler' in arguments[0]) {
      papyrus.prism = arguments[0];
      return mountDom;
    }
  }

  return mountDom(arguments[0], arguments[1]);

}

function mountDom (pre: HTMLPreElement, config: IOptions = {}) {

  if (!pre.hasAttribute('id')) pre.id = Math.random().toString(36).slice(2);

  const { prism } = papyrus;
  const options = mergeOptions(config);
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

  invisible(prism, options, language);

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

    const grammar = prism.languages[language] || prism.languages.plaintext;
    const highlight = prism.highlight(input, grammar, language);

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

    // tokens = prism.tokenize(input, prism.languages[language]);

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

}

/**
 * Apply potion grammar extension
 */
function potion () {

  if ('disableWorkerMessageHandler' in arguments[0]) {

    const prism = arguments[0] as typeof Prism;

    Style.extend(prism);
    Liquid.extend(prism);

    prism.manual = true;
    prism.languages.insertBefore('ts', 'keyword', Script);
    prism.languages.insertBefore('js', 'keyword', JavaScript);
    prism.languages.xml = prism.languages.extend('markup', XML);
    prism.languages.liquid = prism.languages.extend('markup', Markup);
    prism.languages.json = JSON;

    papyrus.prism = prism;

  }

  return papyrus;

}

function render () {

  if (arguments.length === 0) throw new Error('𓁁 Papyrus: Missing code parameter');

  if (typeof arguments[0] !== 'string' && 'disableWorkerMessageHandler' in arguments[0]) {
    papyrus.prism = arguments[0];
    return render;
  } else if (papyrus.prism === null) {
    if (getPrismJS()) return arguments[0];
  }

  if (arguments.length < 2) {
    console.error('𓁁 Papyrus: Render method requires options argument');
    return arguments[0];
  }

  const options = mergeOptions(arguments[1]) as IRenderOptions;
  const code = trimInput(arguments[0], options);

  if (!('insertCodeElement' in options)) options.insertPreElement = true;
  if (!('insertPreElement' in options)) options.insertCodeElement = true;
  if (!('insertTextArea' in options)) options.insertTextArea = true;
  if (!options.language) {
    console.error('𓁁 Papyrus: Missing Language Reference');
    return code;
  }

  const output: string[] = [];

  if (options.insertPreElement) {
    if (options.lineNumbers) {
      output.push('<pre class="papyrus line-numbers">');
    } else {
      output.push('<pre class="papyrus">');
    }
  }

  if (options.insertCodeElement) {
    output.push(`<code class="language-${options.language}">`);
  }

  const highlight = papyrus.prism.highlight(code, papyrus.prism.languages[options.language], options.language);

  if (options.lineNumbers) {
    const lineNumbers = getLineNumbers(getLineCount(code));
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

function getModel (id?: string) {

  if (!id) return [ ...papyrus.models.values() ][0];

  if (papyrus.models.has(id)) return papyrus.models.get(id);

  return [ ...papyrus.models.values() ][0];
}

papyrus.prism = null;
papyrus.get = getModel;
papyrus.render = render;
papyrus.mount = mountPrism as typeof Papyrus['mount'];
papyrus.potion = potion as typeof Papyrus['potion'];

export default papyrus;
