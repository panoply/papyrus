import { Options } from '../../types/options';
import { Model } from '../../types/model';
import { highlight } from './highlight';
import { getLineCount, mergeEditorOptions, mergeOptions, trimInput } from '../utils';
import { texteditor } from './editor';

export function mount (element: HTMLElement, options: Options): Model {

  const config = mergeOptions(options);
  const attr = element.getAttribute('data-papyrus');

  if (attr !== null) {
    if (attr === 'editor' && config.editor === false) {
      config.editor = mergeEditorOptions(true);
      config.startMode = 'editor';
    } else if (attr === 'static' && config.editor !== false) {
      config.startMode = 'static';
    }
  }

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
    if (!prism.code.classList.contains('line-numbers')) {
      prism.code.classList.add('line-numbers');
      prism.lines = getLineCount(input);
    } else {
      prism.lines = getLineCount(input);
    }
  }

  prism.highlight(input);

  if (config.editor) {
    prism.pre.setAttribute('data-papyrus', 'editor');
  } else {
    prism.pre.setAttribute('data-papyrus', 'static');
  }

  if (prism.code.style.position === 'initial') {
    prism.code.style.setProperty('position', 'absolute');
    prism.pre.style.setProperty('height', `${prism.code.offsetHeight}px`);
  }

  const model = texteditor(prism, config as Options);

  if (config.editor && config.startMode === 'editor') {
    if (model.textarea.style.position === 'relative') {
      model.textarea.style.setProperty('position', 'relative');
    }
  }

  prism.model.set(prism.pre.id, model);

  return model;

}
