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
  const preAttrs = config.addAttrs.pre.join(' ');
  const codeClass = config.addClass.code.join(' ');
  const codeAttrs = config.addAttrs.code.join(' ');
  const rel = 'style="position: relative;"';

  if (config.lineNumbers) {
    if (config.addAttrs.pre.length > 0) {
      output.push(`<pre class="papyrus line-numbers ${preClass}" ${preAttrs}>`);
    } else {
      output.push(`<pre class="papyrus line-numbers ${preClass}">`);
    }
  } else {
    if (config.addAttrs.pre.length > 0) {
      output.push(`<pre class="papyrus ${preClass}" ${preAttrs}>`);
    } else {
      output.push(`<pre class="papyrus ${preClass}">`);
    }
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

  if (config.editor) {
    output.push(
      input,
      '</code>',
      `<textarea style="position: relative;" class="editor" spellcheck="${config.spellcheck}">`,
      '</textarea>',
      '</pre>'
    );

  } else {
    output.push(
      input,
      '</code>',
      '</pre>'
    );
  }
  return output.join('');

};
