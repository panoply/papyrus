
import Prism from 'prismjs';

export default function () {

  const STRING = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  const CSS = <Prism.Grammar>{
    'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
    'pseudo-class': /:[-\w]+/,
    class: /\.[-\w]+/,
    id: /#[-\w]+/,
    'css-tag': /\w+/,
    attribute: {
      pattern: RegExp('\\[(?:[^[\\]"\']|' + STRING.source + ')*\\]'),
      greedy: true,
      inside: {
        punctuation: /^\[|\]$/,
        'case-sensitivity': {
          pattern: /(\s)[si]$/i,
          lookbehind: true,
          alias: 'keyword'
        },
        namespace: {
          pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
          lookbehind: true,
          inside: {
            punctuation: /\|$/
          }
        },
        'css-attr-name': {
          pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
          lookbehind: true
        },
        'css-attr-value': [
          STRING,
          {
            pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
            lookbehind: true
          }
        ],
        operator: /[|~*^$]?=/
      }
    },
    'n-th': [
      {
        pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
        lookbehind: true,
        inside: {
          number: /[\dn]+/,
          operator: /[+-]/
        }
      },
      {
        pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
        lookbehind: true
      }
    ],
    combinator: />|\+|~|\|\|/,
    punctuation: /[(),]/
  };

  Prism.languages.css.selector = {
    pattern: (Prism.languages.css.selector as any).pattern,
    lookbehind: true,
    inside: CSS
  };

  (Prism.languages.css.atrule as any).inside['selector-function-argument'].inside = CSS;

  Prism.languages.insertBefore('css', 'punctuation', {
    colon: /:/
  });

  Prism.languages.insertBefore('css', 'property', {
    variable: {
      pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
      lookbehind: true
    },
    'property-value': {
      lookbehind: true,
      pattern: /([: ])([a-z-]+)(?=;)/
    }
  });

  const unit = {
    pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/,
    lookbehind: true
  };

  // 123 -123 .123 -.123 12.3 -12.3
  const number = {
    pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
    lookbehind: true
  };

  Prism.languages.insertBefore('css', 'function', {
    operator: {
      pattern: /(\s)[+\-*/](?=\s)/,
      lookbehind: true
    },
    // CAREFUL!
    // Previewers and Inline color use hexcode and color.
    hexcode: {
      pattern: /\B#[\da-f]{3,8}\b/i,
      alias: 'color'
    },
    color: [
      {
        pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
        inside: {
          unit,
          number,
          function: /[\w-]+(?=\()/,
          punctuation: /[(),]/
        }
      }
    ],
    // it's important that there is no boundary assertion after the hex digits
    entity: /\\[\da-f]{1,8}/i,
    unit,
    number
  });

  return Prism.languages.css;

}
