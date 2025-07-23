import { Options, Papyrus } from '../../';
import { trimInput, glue, getFlems, getCopy, uuid } from '../utils/helpers';
import { setHighlightOptions } from '../utils/options';
import { languages, tokenizeText, highlightTokens, Token } from 'prism-code-editor/prism';

function raw (codeInput: string, config: Papyrus.Options) {

  const input = trimInput(codeInput, config.trimStart, config.trimEnd);
  const tokenize = tokenizeText(input, languages[config.language]);

  const rawCode = highlightTokens(tokenize);
  const markup = config.lineNumbers === false || config.language === 'treeview'
    ? rawCode
    : rawCode
      .split('\n')
      .map((token, i) => {
       const r = `<div class="line-no" aria-hidden="true" data-line="${i + 1}">${token}</div>`
       return r
      })
      .join('');

  return markup;

}

function extend (config: Options.Highlight) {

  if (config.language === 'treeview') return '';

  let markup: string = '<div class="overlays">';

  if (config.flems !== null) {
    markup += getFlems(config.flems);
  }

  if (config.copyButton === true) {
    markup += getCopy();
  }

  return markup + '</div>';

}

export function createHighlight (codeInput: string, options: Papyrus.Options) {

  const config = setHighlightOptions(options);
  const markup = raw(codeInput, config);
  const preClass = [ 'papyrus', ...config.preClass ];
  const preAttrs = [ ...config.preAttrs ];
  const codeAttrs = glue(config.codeAttrs);
  const codeClass = [ `language-${config.language}`, ...config.codeClass ];

  if(config.language !== 'treeview') {
    if (config.lineNumbers) {
      preClass.push('line-numbers');
    }

    if (config.lineFence) {
      preClass.push('line-fence');
    }
  }

  let output: string = `<pre class="${glue(preClass)}" ${glue(preAttrs)}>`;

  if (config.codeAttrs.length > 0) {
    output += `<code class="${glue(codeClass)}" ${codeAttrs}>`;
  } else {
    output += `<code class="${glue(codeClass)}">`;
  }

  return `${output}${extend(config)}${markup}</code></pre>`;

};
