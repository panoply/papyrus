import { MountOptions, CombinedOptions } from '../../types/options';
import { Model } from '../../types/model';
import { highlight } from './highlight';
import { getLanguageFromClass, getLineCount, mergeOptions, trimInput } from '../utils';
import { editor } from './editor';

export function mount (element: HTMLElement, options: MountOptions): Model {

  const config = mergeOptions(options);
  const prism = highlight(config as CombinedOptions);

  prism.nodes(element);

  if (config.language === null || config.language === undefined) {
    const classLanguage = getLanguageFromClass(prism.code.className);
    config.language = classLanguage !== null ? classLanguage : 'plaintext';
  }

  prism.language(config.language);

  let input = '';

  if (config.input !== undefined && config.input.length > 0) {
    input = trimInput(config.input, config);
  } else {
    input = trimInput(prism.code.textContent || '', config);
  }

  if (config.lineNumbers) {
    if (!prism.pre.classList.contains('line-numbers')) {
      prism.pre.classList.add('line-numbers');
    }

    if (!prism.code.classList.contains('lines')) {
      prism.code.classList.add('lines');
      prism.lines = getLineCount(input);
    } else {
      prism.lines = getLineCount(input);
    }
  }

  prism.highlight(input);

  const model = editor(prism, config);
  prism.model.set(prism.pre.id, model);

  return model;

}
