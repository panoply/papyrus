import { mergeCreateOptions, trimInput } from '../utils';
import { highlight } from './highlight';
import { CombinedOptions, CreateOptions } from '../../types/options';

export function create (codeInput: string, options: CreateOptions) {

  const config = mergeCreateOptions(options as any);
  const prism = highlight(config as CombinedOptions);
  const code = trimInput(codeInput, options as any);

  if (config.language === null) {
    console.error('𓁁 Papyrus: Missing Language Reference');
    return code;
  } else {
    prism.language(config.language);
  }

  const output: string[] = [];
  const preClass = config.addClass.pre.join(' ');
  const codeClass = config.addClass.code.join(' ');

  if (config.lineNumbers) {
    if (config.addAttrs.pre.length > 0) {
      output.push(`<pre class="papyrus line-numbers ${preClass}" ${config.addAttrs.pre.join(' ')}>`);
    } else {
      output.push(`<pre class="papyrus line-numbers ${preClass}">`);
    }
  } else {
    if (config.addAttrs.pre.length > 0) {
      output.push(`<pre class="papyrus ${preClass}" ${config.addAttrs.pre.join(' ').trim()}>`);
    } else {
      output.push(`<pre class="papyrus ${preClass}">`);
    }
  }

  if (config.lineNumbers) {
    if (config.addAttrs.code.length > 0) {
      output.push(`<code class="language-${config.language} lines ${codeClass}" ${config.addAttrs.code.join(' ')}>`);
    } else {
      output.push(`<code class="language-${config.language} lines ${codeClass}">`);
    }
  } else {
    if (config.addAttrs.code.length > 0) {
      output.push(`<code class="language-${config.language} ${codeClass}" ${config.addAttrs.code.join(' ')}>`);
    } else {
      output.push(`<code class="language-${config.language} ${codeClass}">`);
    }
  }

  const input = prism.raw(code);

  output.push(input, '</code>', '</pre>');

  return output.join('');

};
