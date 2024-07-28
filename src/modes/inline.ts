import { Options } from '../..';
import { trimInput, glue } from '../utils/helpers';
import { setInlineOptions } from '../utils/options';
import { languages, highlightText } from 'prism-code-editor/prism';

export function createInline (codeInput: string, options: Options.Inline) {

  const config = setInlineOptions(options);
  const input = trimInput(codeInput, config.trimStart, config.trimEnd);

  if (config.language === null || config.language === 'plaintext') {

    const codeClass = config.addClass.length > 0 ? ` class="${glue(config.addClass)}` : '';
    const markup = config.addAttrs.length > 0
      ? `<code${codeClass} ${glue(config.addAttrs)}>${input}</code$>`
      : `<code${codeClass}>${input}</code$>`;

    return markup;
  }

  const codeClass = glue([ `language-${config.language}`, ...config.addClass ]);
  const codeAttrs = glue(config.addAttrs).trimEnd();
  const highlight = highlightText(input, languages[config.language]);
  const markup = config.addAttrs.length > 0
    ? `<code class="${codeClass}" ${codeAttrs}>${highlight}</code>`
    : `<code class="${codeClass}">${highlight}</code>`;

  return markup;
}
