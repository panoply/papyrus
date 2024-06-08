import { getLineCount, trimInput, safeTextInsert, findLineEnd, mergeEditorOptions, has } from '../utils';
import { EditorOptions, Languages, Options } from '../../types/options';
import { Editor } from '../../types/editor';
import { highlight } from './highlight';
import { Model } from '../../types/model';
import { invisibles } from '../prism/invisibles';
import merge from 'mergerino';
import { Textcomplete, StrategyProps } from '@textcomplete/core';
import { TextareaEditor } from '@textcomplete/textarea';

export function texteditor (prism: ReturnType<typeof highlight>, config: Options): Model {

  const { code, pre } = prism;

  /* -------------------------------------------- */
  /* LEXICAL SCOPES                               */
  /* -------------------------------------------- */

  /** Editor Options */
  let editorOpts: EditorOptions;

  /** Completions */
  let complete: Textcomplete;

  /** Indentation Pairs */
  let indentPairs: string[];

  /** Autoclose Pairs  */
  let autoClosePairs: string[];

  /** The <textarea> Element */
  let textarea: HTMLTextAreaElement;

  /** The indentation characted */
  let indentChar: string;

  /** The current Language ID */
  let language: Languages = prism.languageId;

  /** The active line number <span> */
  let lineActive: HTMLSpanElement = null;

  /** The line number integer */
  let lineNo: number = -1;

  /** The current scroll position */
  let scroll: number = 0;

  /** The code input text */
  let input: string = trimInput(code.textContent, config);

  /** The dropdown element */
  let dropdown: HTMLElement;

  /** The onupdate function callback */
  let onUpdate: (code: string, language: Languages) => string | void | false;

  /** The onsave function callback */
  let onSave: (code: string, language: Languages) => string | void | false;

  /* -------------------------------------------- */
  /* CONSTANTS                                    */
  /* -------------------------------------------- */

  /** Cache reference of {@link input} */
  const initial = input;

  /* -------------------------------------------- */
  /* EDITOR                                       */
  /* -------------------------------------------- */

  const editor: Editor = function editor (opts?: EditorOptions) {

    editorOpts = opts;
    indentChar = editorOpts.indentChar.repeat(editorOpts.indentSize + 1);
    autoClosePairs = editorOpts.autoClosingPairs.map(char => char[0]);
    indentPairs = editorOpts.autoIndentPairs.map(char => char[0]);

    updateInvisibles();

    if (editorOpts.lineHighlight && lineActive === null) {
      lineActive = prism.lineNumbers.children[editorOpts.lineNumber - 1] as HTMLSpanElement;
      if (!lineActive.classList.contains('active')) {
        lineActive.classList.add('active');
      }
    }

    if (!textarea) {
      textarea = document.createElement('textarea');
    }

    if (!textarea.classList.contains('papyrus-editor')) {
      textarea.classList.add('papyrus-editor');
    }

    textarea.spellcheck = editorOpts.spellcheck;

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

    if (complete) complete.destroy();

    if (language in editorOpts.completions) {
      autoCompletions(editorOpts.completions[language]);
    }

    if (!pre.contains(textarea)) {
      pre.appendChild(textarea);
    }

    if (config.lineNumbers) {
      if (!code.classList.contains('line-numbers')) code.classList.add('line-numbers');
      prism.lines = getLineCount(input);
    } else {
      if (code.classList.contains('line-numbers')) code.classList.remove('line-numbers');
    }

    scroll = textarea.scrollTop;

    textarea.onclick = onclick;
    textarea.onscroll = onscroll;
    textarea.oninput = oninput;
    textarea.onkeydown = onkeydown;

    prism.mode = 'editor';

    if (pre.getAttribute('data-papyrus') !== 'editor') {
      pre.setAttribute('data-papyrus', 'editor');
    }

    loc();

  };

  function enable () {
    if (typeof config.editor === 'object') {
      editor(config.editor);
    } else {
      pre.setAttribute('data-papyrus', 'static');
    }
  };

  function disable () {

    if (textarea) textarea.remove();

    if (config.lineNumbers) {
      lineActive.classList.remove('active');
    }

    if (editorOpts.renderSpace !== config.showSpace || editorOpts.renderTab !== config.showTab) {
      invisibles(language, config);
    }

    prism.mode = 'static';
    prism.pre.setAttribute('data-papyrus', 'static');

  };

  if (typeof config.editor === 'object') {
    editor.enable = enable;
    editor.disable = disable;
    editor(config.editor);
  }

  /* -------------------------------------------- */
  /* EVENTS                                       */
  /* -------------------------------------------- */

  function onscroll () {

    scroll = textarea.scrollTop;

    textarea.scrollTop = scroll;
    code.scrollTop = scroll;

    if (textarea.scrollTop !== code.scrollTop) {
      textarea.scrollTop = code.scrollTop;
    }

    if (complete && complete.isShown()) complete.hide();

    const left = code.scrollLeft = textarea.scrollLeft;

    if (left > 0) {

      if (left > prism.lineNumbers.offsetLeft) {
        lineActive.style.setProperty('width', `${textarea.offsetWidth + left}px`);
        pre.style.setProperty('--papyrus-fence-offset', `${left}px`);
      }

    } else {

      if (has('--papyrus-fence-offset', pre.style)) {
        pre.style.removeProperty('--papyrus-fence-offset');
      }

      if (lineActive.hasAttribute('style')) {
        lineActive.removeAttribute('style');
      }

    }
  };

  function onclick ({ target }) {

    if (complete && complete.isShown()) {
      if (target !== dropdown) {
        complete.hide();
      }
    }

    onactive(1);
  }

  function oninput (this: HTMLTextAreaElement) {

    if (input !== textarea.value) input = textarea.value;

    const newlines = getLineCount(input);

    if (editorOpts.lineIndent && prism.lines < newlines) {
      textarea.scrollTop = scroll;
      code.scrollTop = scroll;
    }

    prism.lines = newlines;

    loc();

    prism.highlight(input);

    if (code.scrollTop !== textarea.scrollTop) {
      code.scrollTop = textarea.scrollTop;
    }

    if (onUpdate) onUpdate(input, language);

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

      if (complete && complete.isShown()) return;

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

      input = textarea.value;

      const start = textarea.selectionStart - 1;

      if (/\S/.test(input[start])) {

        const pair = autoClosePairs.indexOf(input[start]);

        if (pair > -1) {
          const [ open, close ] = editorOpts.autoClosingPairs[pair];
          if (input[start] === open && input[start + 1] === close) {
            event.preventDefault();
            textarea.setSelectionRange(start, textarea.selectionEnd + 1, 'backward');
            document.execCommand('delete', false);
          }
        }

        return;
      }

      const from = input.lastIndexOf('\n', start);
      const empty = input.slice(from, start);

      if (empty.trim() === '' && /[ \t]/.test(input[start])) {
        event.preventDefault();
        const selection = textarea.selectionStart - editorOpts.indentSize;
        textarea.setSelectionRange(selection, textarea.selectionEnd, 'backward');
        document.execCommand('delete', false);
        onactive();
        onscroll();
      }

      // Line highlight, when empty is '' backspace incurred
      if (empty === '') onactive(2);

    } else if (key === 'Tab') {

      if (event.defaultPrevented || event.metaKey || event.altKey || event.ctrlKey) return;

      event.preventDefault();

      if (editorOpts.tabIndent) {
        if (event.shiftKey) {
          dedentSelection();
        } else {
          indentSelection();
        }
      }

      const start = textarea.selectionStart;
      const from = input.lastIndexOf('\n', start - 1);
      const empty = input.slice(from, start);
      const clear = input.slice(start, input.indexOf('\n', start)).trimEnd();

      if (empty.length === 1 && empty.charCodeAt(0) === 10 && clear === '') insert(padding());

      onscroll();

    } else if (key === 'Escape' && !event.shiftKey) {

      if (complete) complete.hide();

      textarea.blur();
      event.preventDefault();
      event.stopImmediatePropagation();

    } else if (event.metaKey && key === 's') {

      event.preventDefault();
      event.stopImmediatePropagation();

      if (complete) complete.hide();

      input = textarea.value;

      if (onSave) {

        const saved = onSave(input, language);

        if (typeof saved === 'string') {

          const s = textarea.selectionStart;
          const e = textarea.selectionEnd;

          textarea.select();
          insert(saved);

          textarea.selectionStart = s;
          textarea.selectionEnd = e;
        }

      }
    } else {

      const char = autoClosePairs.indexOf(key);

      if (char > -1) {
        if (textarea.value[textarea.selectionStart] !== key) {
          event.preventDefault();
          insert(editorOpts.autoClosingPairs[char].join(''), 1);
        }
      }
    }
  }

  function onactive (offset = 1) {

    // Prevent highlight if completion is shown
    if (complete && complete.isShown()) return;

    const count = getLineCount(input.slice(0, textarea.selectionStart));
    const number = count - offset;

    if (lineNo !== number) lineNo = number;

    if (editorOpts.lineHighlight === true) {

      if (lineActive && lineActive.classList.contains('active')) {
        lineActive.classList.remove('active');
        if (lineActive.hasAttribute('style')) lineActive.removeAttribute('style');
      }

      lineActive = prism.lineNumbers.children[lineNo] as HTMLSpanElement;

      if (lineActive && lineActive.classList.contains('active') === false) {
        lineActive.classList.add('active');

        // ensure line highlight is flush when width exceeds
        const left = code.scrollLeft = textarea.scrollLeft;
        if (left > prism.lineNumbers.offsetLeft) {
          lineActive.style.setProperty('width', `${textarea.offsetWidth + left}px`);
        }
      }
    }

    loc();

  }

  function onupdate (cb: (code: string, language: Languages) => void, scope: any = {}) {

    scope.textarea = textarea;
    scope.lineNumber = lineNo;

    onUpdate = cb.bind(scope);

  }

  function onsave (cb: (code: string, language: Languages) => void, scope: any = {}) {

    const binding = Object.assign(scope, {
      textarea,
      lineNumber: lineNo
    });

    onSave = cb.bind(binding);

  }

  function update (newInput: string, newLanguage?: Languages, clearHistory?: boolean) {

    if (prism.mode === 'error') hideError();

    if (newLanguage) {
      if (newLanguage !== language && newLanguage !== prism.languageId) {
        updateInvisibles(true);
        language = prism.language(newLanguage);
        updateInvisibles(false);

        if (complete) {
          complete.removeAllListeners();
          complete.destroy(true);
        }

        if (language in editorOpts.completions) {
          autoCompletions(editorOpts.completions[language]);
          console.info(`𓁁 Papyprus: Completions enabled for: ${language}`);
        }

        console.info(`𓁁 Papyprus: Changed Language: ${language}`);
      }
    }

    input = newInput;

    if (prism.mode !== 'static') {
      if (clearHistory) {
        textarea.value = input;
      } else {
        textarea.select();
        insert(input);
      }
    }

    if (config.lineNumbers) {

      if (!code.classList.contains('line-numbers')) {
        code.classList.add('line-numbers');
      }

      prism.lines = getLineCount(input);

    } else if (code.classList.contains('line-numbers')) {

      code.classList.remove('line-numbers');
    }

    prism.highlight(input);

  }

  function options (newOptions?: EditorOptions): EditorOptions {

    if (typeof newOptions !== 'object') {
      return config as unknown as EditorOptions;
    }

    if (newOptions?.lineNumber) {
      lineNo = newOptions.lineNumber - 1;
      lineActive = prism.lineNumbers.children[lineNo] as HTMLSpanElement;
    }

    editorOpts = mergeEditorOptions(newOptions, editorOpts);
    indentChar = editorOpts.indentChar.repeat(editorOpts.indentSize + 1);
    autoClosePairs = editorOpts.autoClosingPairs.map(char => char[0]);
    indentPairs = editorOpts.autoIndentPairs.map(char => char[0]);

    textarea.spellcheck = editorOpts.spellcheck;

    if (editorOpts.lineHighlight === false) {
      const activeLine = prism.lineNumbers.querySelector('.active');
      if (activeLine) activeLine.classList.remove('active');
    }

    if (complete) complete.destroy();
    if (language in editorOpts.completions) {
      autoCompletions(editorOpts.completions[language]);
      console.info(`𓁁 Papyprus: Completions enabled for: ${language}`);
    }

    return editorOpts;

  }

  /* -------------------------------------------- */
  /* ERRORS                                       */
  /* -------------------------------------------- */

  function showError (newInput:string, opts: any) {

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

  };

  function hideError () {

    pre.querySelectorAll('.error-ref').forEach(node => node.remove());
    pre.classList.remove('error');

    prism.mode = textarea ? 'editor' : 'static';

  };

  return {
    get initial () {
      return initial;
    },
    get textarea () {
      return textarea;
    },
    get code () {
      return code;
    },
    get pre () {
      return pre;
    },
    get raw () {
      return input;
    },
    get language () {
      return language;
    },
    get mode () {
      return prism.mode;
    },
    get lines () {
      return prism.lines;
    },
    get complete () {
      return complete;
    },
    showError,
    hideError,
    onupdate,
    onsave,
    options,
    editor,
    update
  };

  /* -------------------------------------------- */
  /* UTILITIES                                    */
  /* -------------------------------------------- */

  /**
   * Lines and Columns reference which will be updated and
   * various points in the editing cylce.
   */
  function loc () {

    const value = textarea.value;
    const col = value.slice(
      value.lastIndexOf('\n', textarea.selectionStart - 1) + 1,
      value.indexOf('\n', textarea.selectionStart)
    );

    code.ariaLabel = `Ln ${lineNo + 1}, Col ${col.length}`;

  }

  /**
   * Auto indentation pairs logic
   */
  function indent (start: number, match: number) {

    const closeChar = editorOpts.autoIndentPairs[match][1];

    // Lets check no newlines already exist
    const nextSpace = input.slice(start - 1, input.indexOf(closeChar, start - 1));

    const amount = padding();

    if (nextSpace.indexOf('\n') > -1) {
      insert('\n' + indentChar + amount);
    } else {
      if (input.slice(start).trim().charCodeAt(0) === closeChar.charCodeAt(0)) {
        insert(`\n${indentChar + amount}\n${amount}`, amount.length + 1);
      } else {
        insert('\n' + amount);
      }
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
   * Also safe guards firefox usage. The `input` letting
   * will be updated.
   */
  function insert (text: string, backward: number = NaN): void {

    const document = textarea.ownerDocument!;
    const initialFocus = document.activeElement;

    if (initialFocus !== textarea) textarea.focus();

    const add = safeTextInsert(text);

    if (!add) {
      textarea.setRangeText(text, textarea.selectionStart || 0, textarea.selectionEnd || 0, 'end');
      textarea.dispatchEvent(new InputEvent('input', {
        data: text,
        inputType: 'insertText'
      }));
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

    if (input !== textarea.value) input = textarea.value;

    loc();
  }

  function updateInvisibles (revert = false) {

    if (editorOpts) {
      if (editorOpts?.renderSpace !== config.showSpace || editorOpts?.renderTab !== config.showTab) {
        invisibles(language, revert ? config : merge<Options>(config, {
          showSpace: editorOpts.renderSpace,
          showTab: editorOpts.renderTab
        }));
      }
    }

  }

  /* -------------------------------------------- */
  /* TAB SELECTION                                */
  /* -------------------------------------------- */

  /**
   * Indent selection of code
   */
  function indentSelection (): void {

    const { selectionStart, selectionEnd, value } = textarea;
    const selectedText = value.slice(selectionStart, selectionEnd);
    const lineBreakCount = /\n/g.exec(selectedText)?.length;

    if (lineBreakCount! > 0) {

      // Select full first line to replace everything at once
      const firstLineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
      const newSelection = textarea.value.slice(firstLineStart, selectionEnd - 1);
      const indentedText = newSelection.replace(/^|\n/g, `$&${editorOpts.tabConvert ? indentChar : '\t'}`);
      const replacementsCount = indentedText.length - newSelection.length;

      textarea.setSelectionRange(firstLineStart, selectionEnd - 1);
      insert(indentedText);
      textarea.setSelectionRange(selectionStart + 1, selectionEnd + replacementsCount);

    } else {

      insert(editorOpts.tabConvert ? indentChar : '\t');

    }
  }

  /**
   * Dedent selection of code
   */
  function dedentSelection (): void {

    const { selectionStart, selectionEnd, value } = textarea;

    // Select the whole first line because it might contain \t
    const firstLineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
    const minimumSelectionEnd = findLineEnd(value, selectionEnd);
    const newSelection = textarea.value.slice(firstLineStart, minimumSelectionEnd);
    const indentedText = newSelection.replace(/(^|\n)(\t| {1,2})/g, '$1');
    const replacementsCount = newSelection.length - indentedText.length;

    textarea.setSelectionRange(firstLineStart, minimumSelectionEnd);

    insert(indentedText);

    // Restore selection position, including the indentation
    const firstLineIndentation = /\t| {1,2}/.exec(value.slice(firstLineStart, selectionStart));
    const difference = firstLineIndentation ? firstLineIndentation[0]!.length : 0;
    const newSelectionStart = selectionStart - difference;

    textarea.setSelectionRange(
      selectionStart - difference,
      Math.max(newSelectionStart, selectionEnd - replacementsCount)
    );
  }

  /**
   * Autocompletion strategies
   */
  function autoCompletions (strategies: StrategyProps[]) {

    complete = new Textcomplete(new TextareaEditor(textarea), strategies, {
      dropdown: {
        maxCount: 12,
        rotate: true
      }
    });

    dropdown = document.querySelector('.textcomplete-dropdown');

    complete.on('selected', () => {

      // push outside when quote completions
      if (textarea.value[textarea.selectionEnd] === '"') {
        textarea.selectionStart += 1;
      }
    });

  }

}
