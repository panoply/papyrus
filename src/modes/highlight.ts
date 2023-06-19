import type { Languages, CombinedOptions } from '../../types/options';
import Prism, { Grammar } from 'prismjs';
import { model } from '../model';
import { grammars } from '../prism/grammars';
import { invisibles } from '../prism/invisibles';
import { getLanguageName, getLineNumbers } from '../utils';
import morphdom from 'morphdom';

export function highlight (config: CombinedOptions) {

  if (typeof window !== 'undefined' && !('Prism' in window)) {
    Object.assign(window, {
      Prism: { manual: true }
    });
  }

  Prism.manual = true;

  let mode: 'error' | 'static' | 'editing' = 'static';
  let languageId: Languages;
  let grammar: Grammar;
  let preEl: HTMLPreElement;
  let codeEl: HTMLElement;
  let lineCount: number = NaN;
  let locLimit: HTMLElement = null;

  grammars();

  for (const lang in Prism.languages) {
    invisibles(lang as Languages, config);
  }

  function language (languageName: Languages) {

    const lang = getLanguageName(languageName);

    if (lang === null) {
      console.warn(`𓁁 Papyprus: Unsupported language ${languageId}, will fallback to "plaintext"`);
      languageId = 'plaintext';
    } else {
      languageId = lang;
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
        preEl.id = Math.random().toString(36).slice(2);
      }
    }

  }

  function raw (input: string) {

    const output = Prism.highlight(input, grammar, languageId);

    return `${output}${getLineNumbers(lineCount)}`;

  }

  function highlight (input: string) {

    if (lineCount > config.locLimit) {

      if (locLimit === null) {
        const node = document.createElement('div');
        node.innerHTML = `<div class="loc-limit">LOC LIMIT (${config.locLimit}) EXCEEDED</div>`;
        preEl.insertBefore(codeEl, node.firstElementChild);
        locLimit = preEl.firstElementChild as HTMLElement;
      }

    } else {

      if (locLimit !== null) {
        locLimit.remove();
        locLimit = null;
      }

      const output = Prism.highlight(input, grammar, languageId);

      morphdom(codeEl, `<code>${output}${getLineNumbers(lineCount)}</code>`, {
        childrenOnly: true,
        onBeforeElUpdated: (from, to) => {
        // Skip line numbers
          if (from.classList.contains('line-numbers')) return false;
          if (from.isEqualNode(to)) return false;
          return true;
        }
      });
    }

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
