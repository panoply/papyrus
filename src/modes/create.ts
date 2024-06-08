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
  const fence = config.lineNumbers ? '' : 'no-fence';

  if (config.addAttrs.pre.length > 0) {
    const className = `papyrus ${fence} ${preClass}`.trimEnd();
    if (config.editor) {
      output.push(`<pre class="${className}" ${preAttrs} data-papyrus="editor">`);
    } else {
      output.push(`<pre class="${className}" ${preAttrs} data-papyrus="static">`);
    }
  } else {
    if (config.editor) {
      const className = `papyrus ${fence} ${preClass}`.trimEnd();
      output.push(`<pre class="${className}" data-papyrus="editor">`);
    } else {
      const className = `papyrus ${fence} ${preClass}`.trimEnd();
      output.push(`<pre class="${className}" data-papyrus="static">`);
    }
  }

  if (config.lineNumbers) {

    const className = `language-${config.language} line-numbers ${codeClass}`.trimEnd();

    if (config.addAttrs.code.length > 0) {
      output.push(`<code class="${className}" ${codeAttrs}>`);
    } else {
      output.push(`<code class="${className}">`);
    }
  } else {

    const className = `language-${config.language} ${codeClass}`.trimEnd();

    if (config.addAttrs.code.length > 0) {
      output.push(`<code class="${className}" ${codeAttrs}>`);
    } else {
      output.push(`<code class="${className}">`);
    }
  }

  output.push(prism.raw(code), '</code>', '</pre>');

  return output.join('');

};
