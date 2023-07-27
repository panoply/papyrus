import { mergeOptions, trimInput } from '../utils';
import { highlight } from './highlight';
import { Options } from '../../types/options';

export function create (codeInput: string, options: Options) {

  const config = mergeOptions(options as any);
  const prism = highlight(config as Options);
  const code = trimInput(codeInput, options as any);

  if (config.language === null) {
    console.error('𓁁 Papyrus: Missing Language Reference');
    return code;
  } else {
    prism.language(config.language);
  }

  const output: string[] = [];
  const preClass = config.addClass.pre.join(' ').trimEnd();
  const preAttrs = config.addAttrs.pre.join(' ');
  const codeClass = config.addClass.code.join(' ').trimEnd();
  const codeAttrs = config.addAttrs.code.join(' ');
  const rel = 'style="position: initial;"';
  const fence = config.lineNumbers ? ' ' : 'no-fence ';

  if (config.addAttrs.pre.length > 0) {
    output.push(`<pre class="papyrus ${fence}${preClass}" ${preAttrs}>`);
  } else {
    output.push(`<pre class="papyrus ${fence}${preClass}">`);
  }

  if (config.lineNumbers) {
    if (config.addAttrs.code.length > 0) {
      output.push(`<code ${rel} class="language-${config.language} lines ${codeClass}" ${codeAttrs}>`);
    } else {
      output.push(`<code ${rel} class="language-${config.language} lines ${codeClass}">`);
    }
  } else {
    if (config.addAttrs.code.length > 0) {
      output.push(`<code ${rel} class="language-${config.language} ${codeClass}" ${codeAttrs}>`);
    } else {
      output.push(`<code ${rel} class="language-${config.language} ${codeClass}">`);
    }
  }

  const input = prism.raw(code);

  output.push(
    input,
    '</code>',
    '</pre>'
  );

  return output.join('');

};
