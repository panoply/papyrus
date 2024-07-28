import { model } from '../utils/shared';
import { Options, Papyrus } from '../..';
import { getLanguageFromCode, has, decompress } from '../utils/helpers';
import { setEditor } from './editor';
import { setOptions } from '../utils/options';

export function select (selector: string | HTMLElement | Element, options: Options.Default) {

  // ensure dom is ready
  if (document.readyState === 'loading') {
    addEventListener('DOMContentLoaded', () => select(selector, options));
    return;
  }

  const single = typeof selector === 'object' && 'tagName' in selector;

  // Ensure the selector is not a NodeList
  if (single && selector instanceof NodeList) {
    throw TypeError('Papyprus: Invalid NodeList selector. Provide string or HTMLElement');
  }

  if (single) {

    const el = typeof selector === 'string'
      ? document.body.querySelector<HTMLElement>(selector)
      : selector as HTMLElement;

    if (el !== null) mount(el, options);

  } else {

    document.body
      .querySelectorAll<HTMLElement>(selector)
      .forEach(element => mount(element, options));

  }

  const instances = Array.from(model.values());

  return single ? instances[instances.length - 1] : instances;

}

export function mount (element: HTMLElement, options: Options.Default) {

  let config: Options.Default;
  let input: string = '';

  // data-papyrus attribute means we generated using papyrus.static
  // when this applies, we need to perform some analysis on the element to
  // determine whether or not we will create an editor instance
  if (element.hasAttribute('data-papyrus')) {

    const attr = decompress(element.getAttribute('data-papyrus').trim());
    config = setOptions('mount', attr);

    if (config.readOnly === false) {
      input = element.querySelector('textarea').value;
    } else {
      input = Array
        .from(element.querySelector('code').children)
        .slice(1)
        .map((child) => child.textContent)
        .join('\n');
    }

    if (has('input', config) && config.input !== null) {
      input = config.input;
    }

    element.removeAttribute('data-papyrus');

  } else {

    if (!has('language', options)) {
      options.language = getLanguageFromCode(element);
    }

    config = setOptions('mount', options);

  }

  if (config.language === 'treeview') return;

  const editor: Papyrus.Model = setEditor(element, input, config);

  model.set(editor.id, editor);

  return editor;
}
