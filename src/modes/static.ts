import { Options, Papyrus } from '../..';
import { model } from '../utils/shared';
import { trimInput, glue, getCopy, getFlems, isNode } from '../utils/helpers';
import { setAttributeHint, setOptions } from '../utils/options';
import { languages, tokenizeText, highlightTokens } from 'prism-code-editor/prism';

function raw (codeInput: string, config: Papyrus.Options) {

  const input = trimInput(codeInput, config.trimStart, config.trimEnd);
  const tokenize = tokenizeText(input, languages[config.language]);
  const rawCode = highlightTokens(tokenize);
  const html = config.lineNumbers === false
    ? rawCode
    : rawCode
      .split('\n')
      .map((token, i) => `<div class="pce-line" aria-hidden="true" data-line="${i + 1}">${token}</div>`)
      .join('');

  return { html, input };

}

function extend (config: Papyrus.Options, input: string) {

  if (config.language === 'treeview') return '';

  let markup: string = '<div class="pce-overlays">';

  markup += `<textarea name="${config.id}" spellcheck="false" autocapitalize="off" autocomplete="off" inputmode="" aria-readonly="${config.readOnly}">${input}</textarea>`;

  if (config.flems !== null) markup += getFlems(config.flems);
  if (config.copyButton === true) markup += getCopy();

  return markup + '</div>';

}

export function createStatic (codeInput: string, options: Options.Static) {

  const config = setOptions('static', options);
  const { html, input } = raw(codeInput, config);

  const styleVars = [ `--tab-size:${config.tabSize};`, '--number-width:2.001ch;' ];
  const codeClass = [ `pce-wrapper language-${config.language}`, ...config.codeClass ];
  const preClass = [ 'prism-code-editor', config.wordWrap ? 'pce-wrap' : 'pce-nowrap', ...config.preClass ];

  const codeAttrs = glue(config.codeAttrs);
  const preAttrs = [ `id="${config.id}"`, `data-papyrus="${setAttributeHint(config)}"`, ...config.preAttrs ];

  if (config.lineNumbers) {
    preClass.push('show-line-numbers');
  }

  if (config.lineFence) {
    codeClass.push('pce-line-fence');
    styleVars.push('--line-fence: block;');
  }

  preAttrs.push(`style="${glue(styleVars)}"`);

  let output: string = `<pre class="${glue(preClass)}" ${glue(preAttrs)}>`;

  if (config.codeAttrs.length > 0) {
    output += `<code class="${glue(codeClass)}" ${codeAttrs}>`;
  } else {
    output += `<code class="${glue(codeClass)}">`;
  }

  const markup = `${output}${extend(config, input)}${html}</code></pre>`;

  if (isNode) {
    model.set(config.id, {
      type: 'static',
      markup,
      input,
      config
    });
  }

  return markup;

};
