import { Options } from '../../types/options';
import { Model } from '../../types/model';
import { highlight } from './highlight';
import { getLineCount, mergeOptions, trimInput } from '../utils';
import { texteditor } from './editor';

export function mount (element: HTMLElement, options: Options): Model {

  const config = mergeOptions(options);
  const prism = highlight(config as Options);

  prism.nodes(element);
  prism.language(config.language);

  let input = '';

  if (config.input !== undefined && config.input.length > 0) {
    input = trimInput(config.input, config as Options);
  } else {
    input = trimInput(prism.code.textContent || '', config as Options);
  }

  if (config.lineNumbers) {

    if (!prism.code.classList.contains('lines')) {
      prism.code.classList.add('lines');
      prism.lines = getLineCount(input);
    } else {
      prism.lines = getLineCount(input);
    }
  }

  prism.highlight(input);

  if (prism.code.style.position === 'relative') {
    const height = prism.code.getBoundingClientRect().height + 'px';
    prism.code.style.position = 'absolute';
    prism.pre.style.height = height;
  }

  const model = texteditor(prism, config as Options);

  if (config.editor) {
    if (model.textarea.style.position === 'relative') {
      model.textarea.style.position = 'absolute';
    }
  }

  prism.model.set(prism.pre.id, model);

  return model;

}
