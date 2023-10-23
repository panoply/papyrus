
import type { Languages, Options } from '../../types/options';
import Prism, { Grammar } from 'prismjs';
import { model } from '../model';
import { grammars } from '../prism/grammars';
import { invisibles } from '../prism/invisibles';
import { getLanguageName, getLineCount, getLineNumbers, uuid } from '../utils';
import morphdom from 'morphdom';
import { EditorOptions } from '../..';

export function highlight (config: Options) {

  let mode: 'error' | 'static' | 'editing' = 'static';
  let languageId: Languages = config.language;
  let grammar: Grammar;
  let preEl: HTMLPreElement;
  let codeEl: HTMLElement;
  let lineCount: number = NaN;

  grammars();

  for (const lang in Prism.languages) invisibles(lang as Languages, config);

  function language (languageName: Languages) {

    if (languageId === null || languageId !== languageName) {
      languageId = getLanguageName(languageName);
    }

    if (codeEl && codeEl.hasAttribute('class')) {

      const className = codeEl.className.indexOf('language-');

      if (className > 0) {

        const langName = codeEl.className.slice(className + 9).split(' ')[0].trimEnd();

        if (langName !== languageId) {
          codeEl.classList.remove(`language-${langName}`);
          codeEl.classList.add(`language-${languageId}`);
        }

      } else {
        codeEl.classList.add(`language-${languageId}`);
      }

    }

    grammar = Prism.languages[languageId] || Prism.languages.plaintext;

    return languageId;

  }

  function nodes (element: HTMLElement) {

    if (element.tagName === 'PRE') {
      if (element.firstElementChild !== null && element.firstElementChild.tagName !== 'CODE') {
        throw new Error('𓁁 Papyprus: Missing "<code>" element');
      } else {
        preEl = element as HTMLPreElement;
        codeEl = element.firstElementChild as HTMLElement;
      }
    } else if (element.tagName === 'CODE') {

      if (element.parentElement !== null && element.parentElement.tagName !== 'PRE') {
        throw new Error('𓁁 Papyprus: The "<pre>" element must be a parent of "<code>"');
      } else {
        preEl = element.parentElement as HTMLPreElement;
        codeEl = element;
      }
    } else {

      preEl = document.createElement('pre');
      codeEl = document.createElement('code');
      preEl.appendChild(codeEl);
      element.append(preEl);
    }

    if (!preEl.classList.contains('papyrus')) {
      preEl.classList.add('papyrus');
    }

    if (!preEl.hasAttribute('id')) {
      if (config.id) {
        preEl.id = config.id;
      } else {
        preEl.id = uuid();
      }
    }

  }

  function raw (input: string) {

    grammars();

    for (const lang in Prism.languages) invisibles(lang as Languages, config);

    const output = Prism.highlight(input, grammar, languageId);

    if (config.lineNumbers) {

      const editorOpts = (config.editor as EditorOptions);

      lineCount = getLineCount(input);

      if (editorOpts.lineHighlight) {
        return `${output}${getLineNumbers(lineCount, (config.editor as EditorOptions).lineNumber)}`;
      } else {
        return `${output}${getLineNumbers(lineCount, 0)}`;
      }
    } else {
      return `${output}`;
    }
  }

  function highlight (input: string) {

    const output = Prism.highlight(input, grammar, languageId);

    morphdom(codeEl, `<code>${output}${getLineNumbers(lineCount)}</code>`, {
      childrenOnly: true,
      onBeforeElUpdated: (from, to) => {
        // Skip line numbers
        if (from.classList.contains('active')) return false;
        if (from.isEqualNode(to)) return false;
        return true;
      }
    });

  }

  return {
    get id () {
      return preEl.id;
    },
    get languageId () {
      return languageId;
    },
    get lines () {
      return lineCount;
    },
    set lines (lines) {
      lineCount = lines;
    },
    get model () {
      return model;
    },
    get code () {
      return codeEl;
    },
    get lineNumbers () {
      return codeEl.lastElementChild as HTMLElement;
    },
    get pre () {
      return preEl;
    },
    get mode () {
      return mode;
    },
    set mode (modeName) {
      mode = modeName;
    },
    get highlight () {
      return highlight;
    },
    raw,
    nodes,
    language

  };

}
