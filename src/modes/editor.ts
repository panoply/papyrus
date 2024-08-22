import { Papyrus } from '../..';
import { editorFromPlaceholder, EditorOptions, EditorExtension } from 'prism-code-editor';
import { insertText } from 'prism-code-editor/utils';
import { searchWidget, highlightSelectionMatches } from 'prism-code-editor/search';
import { defaultCommands, editHistory } from 'prism-code-editor/commands';
import { cursorPosition } from 'prism-code-editor/cursor';
import { copyButton } from 'prism-code-editor/copy-button';
import { matchTags } from 'prism-code-editor/match-tags';
import { indentGuides } from 'prism-code-editor/guides';
import { highlightBracketPairs } from 'prism-code-editor/highlight-brackets';
import { assign, has } from '../utils/helpers';
import { Merge } from 'type-fest';
import { setOptions } from '../utils/options';

function editorOptions (
  config: Merge<Papyrus.Options, { value?:string }>,
  value?: string
): Partial<EditorOptions> {

  const create: Partial<EditorOptions> = {
    insertSpaces: config.useTabs === false,
    language: config.language,
    lineNumbers: config.lineNumbers,
    wordWrap: config.wordWrap,
    tabSize: config.tabSize,
    rtl: config.rtl,
    readOnly: config.readOnly
  };

  if (value) {
    create.value = value;
  } else if (has('value', config)) {
    create.value = config.value;
  }

  return create;

}

export function setEditor (element: HTMLElement, value: string, config: Papyrus.Options) {

  const events: {
    onupdate: [ Function, any][];
    onresize: [ Function, any][];
    onscroll: [ Function, any][];
    onselect: [ Function, any][];
    onsave: [Function, any][];
  } = Object.create(null);

  events.onupdate = [];
  events.onresize = [];
  events.onscroll = [];
  events.onselect = [];
  events.onsave = [];

  // eslint-disable-next-line no-var
  const instance: Partial<Papyrus.Model> = {
    onselect: (cb: Function, scope = {}) => events.onselect.push([ cb, scope ]),
    onscroll: (cb: Function, scope = {}) => events.onscroll.push([ cb, scope ]),
    onupdate: (cb: Function, scope = {}) => events.onupdate.push([ cb, scope ]),
    onresize: (cb: Function, scope = {}) => events.onresize.push([ cb, scope ]),
    onsave: (cb: Function, scope = {}) => events.onsave.push([ cb, scope ]),
    error: Object.create(null)
  };

  const editor = editorFromPlaceholder(element, editorOptions(config, value), ...setExtensions(config));
  const MetaKey = editor.keyCommandMap.Meta;

  /** Initial input value */
  let initial = value;
  /** Container offsetHeight */
  let heightY: number;
  /** Container offsetHeight */
  let errShow: boolean = false;
  /** Whether or not command or control key was pressed */
  let metaKey: boolean = false;
  /** The current scroll X position */
  let scrollX: number;
  /** The current scroll Y position */
  let scrollY: number;
  /** The current selection (if any) */
  let iselect: any;
  /** The current selection (if any) */
  let noupdate: boolean = false;

  // First, we apply DOM specific references
  editor.scrollContainer.id = config.id;
  editor.textarea.name = config.id;

  if (config.lineFence) {
    editor.scrollContainer.style.setProperty('--line-fence', 'block');
  }

  /* DEFINE GETTERS ----------------------------- */

  Object.defineProperties(instance, {
    activeLine: { get: () => editor.activeLine },
    focused: { get: () => editor.focused },
    overlays: { get: () => editor.overlays },
    lineNumber: { get: () => editor.activeLineNumber },
    tokens: { get: () => editor.tokens },
    container: { get: () => editor.scrollContainer },
    textarea: { get: () => editor.textarea },
    wrapper: { get: () => editor.wrapper },
    removed: { get: () => editor.removed },
    language: { get: () => editor.options.language },
    id: { get: () => config.id },
    keyCommandMap: { get: () => editor.keyCommandMap },
    inputCommandMap: { get: () => editor.inputCommandMap },
    initial: { get: () => initial },
    input: { get: () => editor.value },
    extensions: { get: () => editor.extensions },
    addExtensions: { get: () => editor.addExtensions },
    remove: { get: () => editor.remove }
  });

  /* UPDATE LISTENER ---------------------------- */

  editor.addListener('update', (e) => {

    if (errShow) {
      instance.error.hide();
      editor.update();
      return;
    }

    if (noupdate === false) {
      for (const [ cb, scope ] of events.onupdate) {
        cb.call(assign(scope, { get editor () { return instance; } }), e);
      }
    } else {
      noupdate = false;
    }

    heightY = editor.scrollContainer.offsetHeight;

    for (const [ cb, scope ] of events.onresize) {
      cb.call(assign(scope, { get editor () { return instance; } }), {
        height: heightY,
        width: editor.scrollContainer.offsetWidth,
        scrollX,
        scrollY
      });
    }
  });

  /* SELECTION LISTENER ------------------------- */
  editor.addListener('selectionChange', (inputSelection) => {

    if (iselect !== inputSelection) {
      iselect = inputSelection;
      for (const [ cb, scope ] of events.onselect) {
        cb.call(assign(scope, { get editor () { return instance; } }), inputSelection);
      }
    }

  });

  /* ONSAVE KEY COMMANDS ------------------------ */

  editor.keyCommandMap.Meta = (e, selection, value) => {
    metaKey = true;
    return MetaKey?.(e, selection, value);
  };

  editor.keyCommandMap.s = (_event, _selection, value) => {

    if (!metaKey) return;

    metaKey = false;

    for (const [ cb, scope ] of events.onsave) {
      cb.call(assign(scope, { get editor () { return instance; } }), value);
    }

    return true;
  };

  /* SCROLL LISTENERS --------------------------- */

  editor.scrollContainer.onscroll = (e) => {

    scrollY = editor.scrollContainer.scrollTop;
    scrollX = editor.scrollContainer.scrollLeft;

    for (const [ cb, scope ] of events.onscroll) {
      cb.call(assign(scope, { get editor () { return instance; } }), { x: scrollX, y: scrollY });
    }
  };

  instance.scroll = (position: { y?: number, x?:number } = {}) => {

    if (typeof position.y === 'number') {
      scrollY = editor.scrollContainer.scrollTop = position.y;
    }

    if (typeof position.x === 'number') {
      scrollX = editor.scrollContainer.scrollLeft = position.x;
    }
  };

  instance.height = (y?:number, reset = false) => {

    if (editor.value.length > config.locLimit) {

      if (!editor.scrollContainer.style.getPropertyValue('max-height')) {

        editor.scrollContainer.style.height = 'auto';

        heightY = editor.scrollContainer.offsetHeight;

        editor.scrollContainer.style.height = `${heightY}px`;
        editor.scrollContainer.style.maxHeight = `${heightY}px`;

      }

      return heightY;

    }

    editor.scrollContainer.style.height = 'auto';

    if (y === undefined) {

      heightY = editor.scrollContainer.offsetHeight;

      if (config.autoHeight || reset === true) {
        editor.scrollContainer.style.height = 'auto';
      } else {
        editor.scrollContainer.style.height = `${heightY}px`;
        editor.scrollContainer.style.maxHeight = `${heightY}px`;
      }

    } else {

      if (heightY !== y) {
        heightY = y;
        editor.scrollContainer.style.height = `${heightY}px`;
      }
    }

    return heightY;

  };

  instance.reset = (clearHistory = false) => {

    if (clearHistory) editor.extensions.history.clear();

    insertText(editor, initial);
  };

  instance.select = (
    start?: number | [number, number, 'backward' | 'forward' | 'none'],
    end: number = null,
    direction: 'backward' | 'forward' | 'none' = 'none'
  ) => {

    if (start === undefined) return editor.getSelection();

    if (typeof start === 'number') {

      editor.setSelection(start, end, direction);

    } else if (Array.isArray(start)) {

      if (iselect !== start) {
        iselect = start;
        editor.setSelection(start[0], start[1] || null, start[2] || 'none');
      }

    }

    return editor.getSelection();

  };

  instance.update = (codeInput: string, language?: Papyrus.Languages, clearHistory: boolean = false) => {

    if (language) {

      if (clearHistory) {
        editor.extensions.history.clear();
        initial = codeInput;
      }

      config.language = language;
      editor.setOptions({ language, value: codeInput });

    } else {

      if (config.readOnly) {
        editor.setOptions({ value: codeInput });
      } else {

        if (codeInput !== editor.value) {
          const [ start ] = editor.getSelection();
          const selection = editor.value.length;
          noupdate = true;
          insertText(editor, codeInput, 0, selection, start);
        }
      }
    }
  };

  instance.options = (opts?: Partial<Papyrus.Options>) => {

    if (typeof opts === 'object') {

      assign(config, setOptions('mount', opts as Papyrus.Options));

      if (config.lineFence === false) {
        editor.wrapper.style.removeProperty('--line-fence');
      }

      editor.setOptions(editorOptions(opts as Papyrus.Options));

    }

    return config;

  };

  instance.enable = () => {
    if (editor.options.readOnly === true) {
      // @ts-ignore
      instance.options({ readOnly: false });
    }
  };

  instance.disable = () => {
    if (editor.options.readOnly === false) {
      // @ts-ignore
      instance.options({ readOnly: true });
    }
  };

  instance.error.show = (input: string, context = {}) => {

    instance.error.hide();

    const error = document.createElement('div');
    error.className = 'error';
    error.setAttribute('id', 'error');
    const message = document.createElement('div');
    message.className = 'error-message error-ref';
    message.innerText = input;

    if (context) {

      if (context?.title) {
        const title = document.createElement('div');
        title.className = 'error-title error-ref';
        title.innerText = context.title;
        error.appendChild(title);
        error.appendChild(message);
      } else {
        error.appendChild(message);
      }

      if (context?.stack) {
        const stack = document.createElement('div');
        stack.className = 'error-stack error-ref';
        stack.innerText = context.stack;
        error.appendChild(stack);
      }

      if (context?.heading) {
        const heading = document.createElement('div');
        heading.className = 'error-heading error-ref';
        heading.innerText = context.heading;
        error.appendChild(heading);
      }
    } else {
      error.appendChild(message);
    }

    editor.overlays.appendChild(error);
    errShow = true;

  };

  instance.error.hide = () => {

    if (errShow) {
      editor.overlays.querySelector('#error').remove();
      editor.scrollContainer.classList.remove('error');
      errShow = false;
    }
  };

  if (config.autoHeight === false) setTimeout(() => instance.height(), 100);

  return instance as Papyrus.Model;
}

function setExtensions (config: Papyrus.Options) {

  const plugins: EditorExtension[] = [
    cursorPosition(),
    defaultCommands(
      config.selfClosePairs,
      config.selfCloseRegex
    )
  ];

  ;

  if (config.copyButton) {
    plugins.push(copyButton());
  }

  if (config.indentGuides) {
    plugins.push(indentGuides());
  }

  if (config.searchWidget) {
    plugins.push(searchWidget());
  }
  if (config.matchSelected) {
    plugins.push(highlightSelectionMatches());
  }

  if (config.bracketPairs) {
    plugins.push(highlightBracketPairs());
  }

  if (config.matchTags) {
    plugins.push(matchTags());
  }

  if (config.readOnly === false) {
    plugins.push(editHistory(config.editHistory));
  }

  return plugins;

}
