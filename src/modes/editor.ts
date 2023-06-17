
/* eslint-disable n/no-callback-literal */
/* eslint-disable no-unused-vars */

import { highlight } from './highlight';
import { Languages, MountOptions, EditorOptions } from '../../types/options';
import {
  visit,
  debounce,
  findPadding,
  insert,
  isCopy,
  isRedo,
  isUndo,
  canRecord,
  getLineCount
} from '../utils';
import { Model } from '../../types/model';

enum Dir {
  BACK = 1,
  FWRD
}

type Position = {
  start: number
  end: number
  dir?: Dir.FWRD | Dir.BACK
}

type HistoryRecord = {
  html: string
  pos: Position
}

export function editor (prism: ReturnType<typeof highlight>, config: MountOptions) {

  const { pre, code } = prism;

  /**
   * Event Listeners
   */
  const listeners: [string, any][] = [];

  /**
   * History Records
   */
  const history: HistoryRecord[] = [];

  /**
   * The indentation character + indentSize
   */
  let indentChar: string;

  /**
   * The length of the indentChar
   */
  let indentSize: number;

  /**
   * Regex match of `newlineIndentChars`
   */
  let indentOn: RegExp;

  /**
   * Regex match of `newlineInsertChars`
   */
  let moveToNewLine: RegExp;

  /**
   * Regex match of padding space
   */
  let spaceBefore: RegExp;

  /**
   * Regex match of padding space
   */
  let language: Languages;

  /* -------------------------------------------- */
  /* PERSISTED                                    */
  /* -------------------------------------------- */

  /**
   * The onUpdate callback reference
   */
  let onUpdate: (code: string, language: Languages) => string | void | false;

  /**
   * The line number element
   */
  let line: Element;

  /**
   * Code content prior keydown event
   */
  let prev: string; // code content prior keydown event

  /**
   * The current line number
   */
  let onLine: number = 1;

  /**
   * The index of history stack
   */
  let at: number = -1;

  /**
   * Whether or not focus has been applied
   */
  let focus = false;

  /**
   * Whether or not plaintext-only is supported
   */
  let isLegacy = false;

  /**
   * Whether or not history is recording
   */
  let recording = false;

  if (config.editor === true) enableEditor();

  const debounceHighlight = debounce(() => {

    const pos = save();

    prism.highlight(toString());

    restore(pos);
    onActiveLine();

  }, 25);

  const debounceHistory = debounce((event: KeyboardEvent) => {

    if (canRecord(event)) {
      recordHistory();
      recording = false;
    }

  }, 300);

  ev('click', event => {

    event.preventDefault();

    onActiveLine();

  });

  ev('keydown', event => {

    if (event.defaultPrevented) return;

    if (event.key.startsWith('Arrow')) {
      switch (event.key) {
        case 'ArrowDown':
          onActiveLine(0);
          break;
        case 'ArrowUp':
          onActiveLine(2);
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          onActiveLine();
          break;
      }
    }

    prev = toString();

    if (config.lineIndent) {
      onNewline(event);
    } else {
      onLegacyNewline(event);
    }

    if (config.tabConvert) onTabIndent(event);
    if (config.autoClosing) onAutoClose(event);

    onBackspace(event);

    if (config.history) {

      onUndoRedo(event);

      if (canRecord(event) && recording === false) {
        recordHistory();
        recording = true;
      }
    }

    onMultiIndent(event);

    if (isLegacy && !isCopy(event)) restore(save());

  });

  ev('keyup', event => {

    if (event.defaultPrevented) return;
    if (event.isComposing) return;

    if (prev !== toString()) debounceHighlight();

    debounceHistory(event);

    // Edit Events
    //
    if (onUpdate) onUpdate(toString(), language);

  });

  ev('focus', _event => {
    focus = true;
  });

  ev('blur', _event => {
    focus = false;
  });

  ev('paste', event => {

    recordHistory();
    onPaste(event);
    recordHistory();

    // Edit Events
    //
    if (onUpdate) onUpdate(toString(), language);

  });

  ev('cut', event => {
    recordHistory();
    onCut(event);
    recordHistory();

    // Edit Events
    //
    if (onUpdate) onUpdate(toString(), language);
  });

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
            return onLine;
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

      reassignRefs();

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

  function reassignRefs () {

    language = prism.languageId;
    indentChar = config.indentChar.repeat(config.indentSize);
    indentSize = indentChar.length;
    indentOn = new RegExp(`[${config.newlineIndentChars.join('')}]$`);
    moveToNewLine = new RegExp(`^[${config.newlineInsertChars.join('')}]`);
    spaceBefore = new RegExp(`\n[ \t]{${indentSize},}$`);

    code.setAttribute('spellcheck', config.spellcheck ? 'true' : 'false');

  }

  function enableEditor () {

    code.setAttribute('contenteditable', 'plaintext-only');
    code.style.outline = 'none';
    code.style.overflowWrap = 'break-word';
    code.style.overflowY = 'auto';
    code.style.whiteSpace = 'pre-wrap';

    reassignRefs();

    if (code.contentEditable !== 'plaintext-only') isLegacy = true;
    if (isLegacy) code.setAttribute('contenteditable', 'true');

    prism.mode = 'editing';

  }

  function disableEditor () {

    for (const [ type, fn ] of listeners) code.removeEventListener(type, fn);

    code.removeAttribute('contenteditable');
    code.removeAttribute('spellcheck');
    code.removeAttribute('style');

    prism.mode = 'static';

  }

  function ev <K extends keyof HTMLElementEventMap> (type: K, fn: (event: HTMLElementEventMap[K]) => void) {

    listeners.push([ type, fn ]);
    code.addEventListener(type, fn);

  };

  function save (): Position {

    const s = getSelection();
    const pos: Position = { start: 0, end: 0, dir: undefined };

    let { anchorNode, anchorOffset, focusNode, focusOffset } = s;

    // eslint-disable-next-line no-throw-literal
    if (!anchorNode || !focusNode) throw 'ERROR';

    // If the anchor and focus are the editor element, return either a full
    // highlight or a start/end cursor position depending on the selection
    if (anchorNode === code && focusNode === code) {
      const { textContent } = code;
      pos.start = (anchorOffset > 0 && textContent) ? textContent.length : 0;
      pos.end = (focusOffset > 0 && textContent) ? textContent.length : 0;
      pos.dir = (focusOffset >= anchorOffset) ? Dir.FWRD : Dir.BACK;
      return pos;
    }

    // Selection anchor and focus are expected to be text nodes,
    // so normalize them.
    if (anchorNode.nodeType === Node.ELEMENT_NODE) {
      const node = document.createTextNode('');
      anchorNode.insertBefore(node, anchorNode.childNodes[anchorOffset]);
      anchorNode = node;
      anchorOffset = 0;
    }
    if (focusNode.nodeType === Node.ELEMENT_NODE) {
      const node = document.createTextNode('');
      focusNode.insertBefore(node, focusNode.childNodes[focusOffset]);
      focusNode = node;
      focusOffset = 0;
    }

    visit(code, el => {
      if (el === anchorNode && el === focusNode) {
        pos.start += anchorOffset;
        pos.end += focusOffset;
        pos.dir = anchorOffset <= focusOffset ? Dir.FWRD : Dir.BACK;
        return 'stop';
      }

      if (el === anchorNode) {
        pos.start += anchorOffset;
        if (!pos.dir) {
          pos.dir = Dir.FWRD;
        } else {
          return 'stop';
        }
      } else if (el === focusNode) {
        pos.end += focusOffset;
        if (!pos.dir) {
          pos.dir = Dir.BACK;
        } else {
          return 'stop';
        }
      }

      if (el.nodeType === Node.TEXT_NODE) {
        if (pos.dir !== Dir.FWRD) pos.start += el.nodeValue!.length;
        if (pos.dir !== Dir.BACK) pos.end += el.nodeValue!.length;
      }
    });

    // collapse empty text nodes
    code.normalize();

    return pos;
  }

  function restore (pos: Position) {

    const s = getSelection();

    let startNode: Node | undefined;
    let startOffset = 0;
    let endNode: Node | undefined;
    let endOffset = 0;

    if (!pos.dir) pos.dir = Dir.FWRD;
    if (pos.start < 0) pos.start = 0;
    if (pos.end < 0) pos.end = 0;

    // Flip start and end if the direction reversed
    if (pos.dir === Dir.BACK) {
      const { start, end } = pos;
      pos.start = end;
      pos.end = start;
    }

    let current = 0;

    visit(code, el => {
      if (el.nodeType !== Node.TEXT_NODE) return;

      const len = (el.nodeValue || '').length;
      if (current + len > pos.start) {
        if (!startNode) {
          startNode = el;
          startOffset = pos.start - current;
        }
        if (current + len > pos.end) {
          endNode = el;
          endOffset = pos.end - current;
          return 'stop';
        }
      }
      current += len;
    });

    if (!startNode) {
      startNode = code;
      startOffset = code.childNodes.length;
    }

    if (!endNode) {
      endNode = code;
      endOffset = code.childNodes.length;
    }

    // Flip back the selection
    if (pos.dir === Dir.BACK) {
      [ startNode, startOffset, endNode, endOffset ] = [ endNode, endOffset, startNode, startOffset ];
    }

    s.setBaseAndExtent(startNode, startOffset, endNode, endOffset);
  }

  function beforeCursor () {

    const s = getSelection();
    const r0 = s.getRangeAt(0);
    const r = document.createRange();

    r.selectNodeContents(code);
    r.setEnd(r0.startContainer, r0.startOffset);

    return r.toString();

  }

  function afterCursor () {

    const s = getSelection();
    const r0 = s.getRangeAt(0);
    const r = document.createRange();
    r.selectNodeContents(code);
    r.setStart(r0.endContainer, r0.endOffset);

    return r.toString();
  }

  function cursorPosition (toStart = true): Position | undefined {
    const s = window.getSelection()!;
    if (s.rangeCount > 0) {
      const cursor = document.createElement('span');
      cursor.textContent = '|';

      const r = s.getRangeAt(0).cloneRange();
      r.collapse(toStart);
      r.insertNode(cursor);

      const { x, y, height } = cursor.getBoundingClientRect();
      const top = (window.scrollY + y + height) + 'px';
      const left = (window.scrollX + x) + 'px';
      cursor.parentNode!.removeChild(cursor);

      return { top, left };
    }
    return undefined;
  }

  function onActiveLine (offset = 1) {

    const before = beforeCursor();

    if (before.length > 0) {

      const number = getLineCount(before) - offset;

      if (onLine !== number) {

        onLine = number;

      }

      if (config.lineHighlight === true) {

        if (line && line.classList.contains('highlight')) line.classList.remove('highlight');

        line = code.lastElementChild.children[onLine];

        if (line && !line.classList.contains('highlight')) {

          line.classList.add('highlight');

        }
      }

    }
  }

  function onNewline (event: KeyboardEvent) {

    if (event.key === 'Enter') {

      const before = beforeCursor();
      const after = afterCursor();

      const [ padding ] = findPadding(before);

      let newLinePadding = padding;

      // If last symbol is "{" ident new line
      if (indentOn.test(before)) {
        newLinePadding += indentChar;
      }

      // Preserve padding
      if (newLinePadding.length > 0) {
        event.preventDefault();
        insert('\n' + newLinePadding);
      } else {
        onLegacyNewline(event);
      }

      // Place adjacent "}" on next line
      if (newLinePadding !== padding && moveToNewLine.test(after)) {
        const pos = save();
        insert('\n' + padding);
        restore(pos);
      }

      prism.lines = getLineCount(toString());

      onActiveLine();

    }
  }

  function onLegacyNewline (event: KeyboardEvent) {
    // Firefox does not support plaintext-only mode
    // and puts <div><br></div> on Enter. Let's help.
    if (isLegacy && event.key === 'Enter') {

      event.preventDefault();
      event.stopPropagation();

      if (afterCursor() === '') {
        insert('\n ');
        const pos = save();
        pos.start = --pos.end;
        restore(pos);
      } else {
        insert('\n');
      }
    }
  }

  function onAutoClose (event: KeyboardEvent) {

    const open = '<([{\'"';
    const close = '>)]}\'"';

    const codeAfter = afterCursor();
    const codeBefore = beforeCursor();

    const escapeCharacter = codeBefore.slice(codeBefore.length - 1) === '\\';
    const charAfter = codeAfter.slice(0, 1);

    if (close.includes(event.key) && !escapeCharacter && charAfter === event.key) {

      // We already have closing char next to cursor.
      // Move one char to right.
      const pos = save();

      event.preventDefault();
      pos.start = ++pos.end;
      restore(pos);

    } else if (open.includes(event.key) && !escapeCharacter && (
      '"\''.includes(event.key) ||
      [ '', ' ', '\n' ].includes(charAfter))
    ) {

      event.preventDefault();

      const pos = save();
      const wrapText = pos.start === pos.end ? '' : getSelection().toString();
      const text = event.key + wrapText + close[open.indexOf(event.key)];

      insert(text);
      pos.start++;
      pos.end++;
      restore(pos);

    }
  }

  function onBackspace (event: KeyboardEvent) {

    if (event.key === 'Backspace') {

      const before = beforeCursor();
      const [ padding, start ] = findPadding(before);

      if (spaceBefore.test(before)) {
        const pos = save();
        event.preventDefault();
        const len = Math.min(indentSize, padding.length);
        restore({ start, end: start + len });
        document.execCommand('delete');
        pos.start -= len;
        pos.end -= len;
        restore(pos);
      }

      onActiveLine();

    }
  }

  function onTabIndent (event: KeyboardEvent) {

    if (event.key === 'Tab') {

      const selection = getSelection()
        .getRangeAt(0)
        .toString()
        .trim();

      if (selection.length === 0) {

        event.preventDefault();

        const before = beforeCursor();
        const [ padding, start ] = findPadding(before);

        if (event.shiftKey) {

          if (padding.length > 0) {

            const pos = save();
            // Remove full length tab or just remaining padding
            const len = Math.min(indentSize, padding.length);
            restore({ start, end: start + len });
            document.execCommand('delete');
            pos.start -= len;
            pos.end -= len;
            restore(pos);
          }
        } else {

          if (/\n$/.test(before)) {
            insert(padding + indentChar);
          } else {
            insert(indentChar);
          }
        }
      }
    }
  }

  function onUndoRedo (event: KeyboardEvent) {

    if (isUndo(event)) {

      event.preventDefault();
      at--;
      const record = history[at];
      if (record) {
        code.innerHTML = record.html;
        restore(record.pos);
      }
      if (at < 0) at = 0;
    }
    if (isRedo(event)) {
      event.preventDefault();
      at++;
      const record = history[at];
      if (record) {
        code.innerHTML = record.html;
        restore(record.pos);
      }
      if (at >= history.length) at--;
    }
  }

  function onPaste (event: any) {

    event.preventDefault();

    const text = (event.originalEvent || event).clipboardData.getData('text/plain').replace(/\r/g, '');
    const pos = save();

    insert(text);
    prism.highlight(toString());
    restore({
      start: Math.min(pos.start, pos.end) + text.length,
      end: Math.min(pos.start, pos.end) + text.length,
      dir: Dir.BACK
    });

  }

  function onCut (event: ClipboardEvent) {
    const pos = save();
    const selection = getSelection();
    const originalEvent = (event as any).originalEvent ?? event;
    originalEvent.clipboardData.setData('text/plain', selection.toString());
    document.execCommand('delete');
    prism.highlight(toString());
    restore({
      start: pos.start,
      end: pos.start,
      dir: Dir.FWRD
    });
    event.preventDefault();
  }

  function onMultiIndent (event: KeyboardEvent) {

    if (event.key === 'Tab') {

      event.preventDefault();

      const sel = getSelection().getRangeAt(0).toString();
      const nwl = sel.split('\n');
      const itm = nwl.length;

      if (event.shiftKey) {

        const pos = save();
        let len = 0;

        for (let i = 0; i < itm; i++) {

          const space = nwl[i].slice(0, nwl[i].search(/\S/));

          if (space.length > indentSize) {
            nwl[i] = nwl[i].slice(indentSize);
            len = len + indentSize;
          } else if (space.length > 0) {
            len = len + 1;
            nwl[i] = nwl[i].slice(1);
          }

        }

        insert(nwl.join('\n'));

        if (pos.dir === Dir.BACK) {
          restore({ start: pos.start - len, end: pos.end });
        } else {
          restore({ start: pos.start, end: pos.end - len });
        }

      } else {

        const pos = save();
        let len = 0;

        for (let i = 0; i < itm; i++) {
          nwl[i] = indentChar + nwl[i];
          len = len + indentSize;
        }

        insert(nwl.join('\n'));

        if (pos.dir === Dir.BACK) {
          restore({ start: pos.start + len, end: pos.end });
        } else {
          restore({ start: pos.start, end: pos.end + len });
        }

      }

    }
  }

  function recordHistory () {

    if (!focus) return;

    const html = code.innerHTML;
    const pos = save();
    const last = history[at];

    if (last) {
      if (last.html === html && last.pos.start === pos.start && last.pos.end === pos.end) return;
    }

    at++;
    history[at] = { html, pos };
    history.splice(at + 1);

    const maxHistory = 300;

    if (at > maxHistory) {
      at = maxHistory;
      history.splice(0, 1);
    }
  }

  function toString () {

    return code.textContent || '';

  }

  function getSelection () {

    if (code.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      return (code.parentNode as Document).getSelection()!;
    }

    return window.getSelection()!;
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

}
