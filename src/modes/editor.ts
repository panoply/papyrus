import { enableTabToIndent } from 'indent-textarea';
import { getLineCount, trimInput, safeTextInsert } from '../utils';
import { EditorOptions, Languages, MountOptions } from '../../types/options';
import { highlight } from './highlight';
import { Model } from '../../types/model';

export function texteditor (prism: ReturnType<typeof highlight>, config: MountOptions) {

  const { code, pre } = prism;

  let indentPairs: string[];
  let autoClosePairs: string[];
  let textarea: HTMLTextAreaElement = null;
  let indentChar: string;
  let language: Languages;
  let lineActive: HTMLSpanElement = null;
  let lineNo: number = -1;
  let scroll: number = 0;
  let input: string = trimInput(code.textContent, config);
  let onUpdate: (code: string, language: Languages) => string | void | false;

  /**
     * Disable Text Editor
     */
  function disableEditor () {

    const text = pre.querySelector('.editor');

    if (text) text.remove();
  }

  /**
   * Enable text editing mode. This function will insert
   * a textarea element into the `<pre>` papyrus element.
   */
  function enableEditor () {

    language = prism.languageId;
    indentChar = config.indentChar.repeat(config.indentSize + 1);
    autoClosePairs = config.autoClosingPairs.map(char => char[0]);
    indentPairs = config.newlineIndentPairs.map(char => char[0]);
    textarea = pre.querySelector('textarea');

    if (config.lineHighlight && lineActive === null) {
      lineActive = prism.lineNumbers.firstElementChild as HTMLSpanElement;
      if (!lineActive.classList.contains('highlight')) lineActive.classList.add('highlight');
    }

    if (!textarea) {
      textarea = document.createElement('textarea');
      textarea.classList.add('editor');
      textarea.spellcheck = config.spellcheck;
      if (config.indentMultiline) enableTabToIndent(textarea);
    }

    if (textarea) {
      if (config?.input && config.input !== null && config.input.length > 0) {
        if (input.trim() === '') {
          input = textarea.value = trimInput(config.input, config);
        } else {
          textarea.value = input;
        }
      } else {
        textarea.value = input;
      }
    }

    if (config.editor) pre.appendChild(textarea);

    scroll = textarea.scrollTop;

    textarea.onclick = () => onactive(1);
    textarea.onscroll = onscroll;
    textarea.oninput = oninput;
    textarea.onkeydown = onkeydown;

  }

  if (config.editor) enableEditor();

  if (config.lineNumbers) {
    code.classList.add('lines');
    prism.lines = getLineCount(input);
  }

  /**
     * onscroll event callback
     */
  function onscroll () {

    scroll = textarea.scrollTop;

    textarea.scrollTop = scroll;
    code.scrollTop = scroll;

    if (textarea.scrollTop !== code.scrollTop) {
      textarea.scrollTop = code.scrollTop;
    }

    const left = code.scrollLeft = textarea.scrollLeft;

    if (left > 0) {
      pre.classList.add('no-fence');
    } else {
      pre.classList.remove('no-fence');
    }
  };

  /**
   * oninput event callback
   */
  function oninput (this: HTMLTextAreaElement) {

    if (input !== textarea.value) input = textarea.value;

    const newlines = getLineCount(input);

    if (config.lineIndent && prism.lines < newlines) {
      textarea.scrollTop = scroll;
      code.scrollTop = scroll;
    }

    prism.lines = newlines;
    prism.highlight(input);

    if (code.scrollTop !== textarea.scrollTop) {
      code.scrollTop = textarea.scrollTop;
    }

  }

  function onkeydown (event: KeyboardEvent) {

    const key = event.key;

    if (key.startsWith('Arrow')) {
      switch (key) {
        case 'ArrowDown':
          onactive(0);
          break;
        case 'ArrowUp':
          onactive(2);
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          onactive();
          break;
      }

    } else if (key === 'Enter') {

      if (event.altKey || event.ctrlKey) return;

      event.preventDefault();
      input = textarea.value;

      const start = textarea.selectionStart;
      const char = indentPairs.indexOf(input[start - 1]);

      if (char > -1) {
        indent(start, char);
      } else {
        insert('\n' + padding());
      }

      onactive();
      onscroll();

    } else if (key === 'Backspace') {

      const start = textarea.selectionStart;
      const from = input.lastIndexOf('\n', start);
      const empty = input.slice(from, start);

      if (empty.trim() === '' && /\s/.test(input[start - indentChar.length])) {
        event.preventDefault();
        textarea.setSelectionRange(textarea.selectionStart - indentChar.length, textarea.selectionEnd, 'backward');
        document.execCommand('delete', false);
        onactive();
        onscroll();
      }

    } else if (key === 'Tab') {

      event.preventDefault();
      input = textarea.value;

      const start = textarea.selectionStart;
      const from = input.lastIndexOf('\n', start - 1);
      const empty = input.slice(from, start);
      const clear = input.slice(start, input.indexOf('\n', start)).trimEnd();

      if (empty.length === 1 && empty.charCodeAt(0) === 10 && clear === '') {
        insert(padding());
      } else {
        insert(config.tabConvert ? indentChar : '\t');
      }

      onscroll();

    } else {

      const char = autoClosePairs.indexOf(key);

      if (char > -1) {
        event.preventDefault();
        insert(config.autoClosingPairs[char].join(''), 1);
      }
    }

  }

  function onactive (offset = 1) {

    const count = getLineCount(input.slice(0, textarea.selectionStart));
    const number = count - offset;

    if (lineNo !== number) lineNo = number;

    if (config.lineHighlight === true) {

      if (lineActive && lineActive.classList.contains('highlight')) {
        lineActive.classList.remove('highlight');
      }

      lineActive = prism.lineNumbers.children[lineNo] as HTMLSpanElement;

      if (lineActive && lineActive.classList.contains('highlight') === false) {
        lineActive.classList.add('highlight');
      }
    }

  }

  function hideError () {

    pre.querySelectorAll('.error-ref').forEach(node => node.remove());
    pre.classList.remove('error');

    prism.mode = code.hasAttribute('contenteditable') ? 'editing' : 'static';

  }

  function showError (newInput: string, opts: {
    title?: string;
    stack?: string;
    heading?: string;
  }) {

    hideError();

    pre.classList.add('error');

    const message = document.createElement('div');
    message.className = 'error-message error-ref';
    message.innerText = newInput;

    if (opts) {

      if (opts?.title) {
        const title = document.createElement('div');
        title.className = 'error-title error-ref';
        title.innerText = opts.title;
        pre.appendChild(title);
        pre.appendChild(message);
      } else {
        pre.appendChild(message);
      }

      if (opts?.stack) {
        const stack = document.createElement('div');
        stack.className = 'error-stack error-ref';
        stack.innerText = opts.stack;
        pre.appendChild(stack);
      }

      if (opts?.heading) {
        const heading = document.createElement('div');
        heading.className = 'error-heading error-ref';
        heading.innerText = opts.heading;
        pre.appendChild(heading);
      }
    } else {
      pre.appendChild(message);
    }

    prism.mode = 'error';

  }

  return <Model>{
    enableEditor,
    disableEditor,
    showError,
    hideError,
    get mode () {
      return prism.mode;
    },
    get code () {
      return code;
    },
    get pre () {
      return pre;
    },
    get raw () {
      return toString();
    },
    get lines () {
      return prism.lines;
    },
    get language () {
      return language;
    },
    onUpdate (cb: (code: string, language: Languages) => void, scope: any = {}) {

      const binding = Object.defineProperties(scope, {
        element: {
          get () {
            return code;
          }
        },
        lineNumber: {
          get () {
            return lineNo;
          }
        }
      });

      onUpdate = cb.bind(binding);

    },
    options (newOptions?: EditorOptions) {

      if (typeof newOptions !== 'object') return config;

      Object.assign(config, newOptions);

      if (config.lineNumbers === false) {
        if (code.classList.contains('lines')) code.classList.remove('lines');
        if (code.lastElementChild?.classList.contains('line-numbers')) {
          code.removeChild(code.lastElementChild);
        }
      }

      return config;

    },
    update (newInput: string, newLanguage?: Languages) {

      if (prism.mode === 'error') hideError();

      let hasUpdated: boolean = false;

      if (onUpdate) {

        const edits = onUpdate(newInput, newLanguage || language);

        if (typeof edits === 'string') {
          code.textContent = edits;
          hasUpdated = true;
        } else if (edits === false) {
          return;
        };

      }

      if (newLanguage) {
        if (newLanguage !== language && newLanguage !== prism.languageId) {
          language = prism.language(newLanguage);
          console.info(`𓁁 Papyprus: Updated Language: ${language}`);
        }
      }

      if (hasUpdated === false) {
        code.textContent = newInput;
      }

      if (config.lineNumbers) {

        if (!pre.classList.contains('line-numbers')) pre.classList.add('line-numbers');
        if (!code.classList.contains('lines')) code.classList.add('lines');

        prism.lines = getLineCount(toString());

      } else {

        if (pre.classList.contains('line-numbers')) pre.classList.remove('line-numbers');
        if (code.classList.contains('lines')) code.classList.remove('lines');

        prism.lines = NaN;

      }

      prism.highlight(toString());

    }

  };

  function indent (start: number, match: number) {

    const next = config.newlineIndentPairs[match][1];
    const amount = padding();

    if (input.slice(start).trim().charCodeAt(0) === next.charCodeAt(0)) {
      const string = `\n${indentChar + amount}\n${amount}`;
      insert(string, amount.length + 1);
    } else {
      insert('\n' + indentChar + amount);
    }

  }

  /**
   * Returns the current indentation padding from left side.
   * Optionally accepts an `indent` boolean parameter which
   * defaults to `false`. When `true` will return padding + `indentChar`
   */
  function padding (indent = false) {

    const line = input.slice(input.lastIndexOf('\n', textarea.selectionStart + 1) + 1);
    const amount = line.slice(0, line.search(/[\S\n]/));

    return amount === '' ? '' : indent
      ? amount + indentChar
      : amount;

  }

  /**
   * Insert text in the textarea and respects history.
   * Also safe guards firefox usage.
   */
  function insert (text: string, backward: number = NaN): void {

    const document = textarea.ownerDocument!;
    const initialFocus = document.activeElement;

    if (initialFocus !== textarea) textarea.focus();

    const add = safeTextInsert(text);

    if (!add) {
      textarea.setRangeText(text, textarea.selectionStart || 0, textarea.selectionEnd || 0, 'end');
      textarea.dispatchEvent(new InputEvent('input', { data: text, inputType: 'insertText' }));
    }

    if (initialFocus === document.body) {
      textarea.blur();
    } else if (initialFocus instanceof HTMLElement && initialFocus !== textarea) {
      initialFocus.focus();
    }

    if (!isNaN(backward)) {
      if (initialFocus !== textarea) textarea.focus();
      textarea.selectionEnd = textarea.selectionEnd - backward;
    }

  }
}
