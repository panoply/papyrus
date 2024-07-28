// import Prism from 'prismjs';
import { XML } from './xml';
import { languages, Grammar, tokenize } from 'prism-code-editor/prism';
import { embeddedIn, insertBefore } from 'prism-code-editor/prism/utils';
import { addInlined } from '../helpers';

export function Markup () {

  const markup = languages.html = languages.markup = XML<{ tag: Grammar } & Grammar>();

  // We do not use markup bracket
  delete markup['markup-bracket'];

  const punctuation = [
    {
      pattern: /^=/,
      alias: 'attr-equals'
    },
    {
      pattern: /^(\s*)["']|["']$/,
      lookbehind: true
    }
  ];

  /* -------------------------------------------- */
  /* SPX ATTRIBUTES START                         */
  /* -------------------------------------------- */

  // @ts-expect-error
  markup.tag = {
    pattern: /<\/?(?!\d)[^\s>/=$<%]+(?:\s(?:\s*[^\s>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>/]+/,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>/:]+:/
        }
      },
      'special-attr': [],
      'spx-attr': [
        {
          pattern: /(spx-node)=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          lookbehind: true,
          global: true,
          inside: {
            'dot-notation': {
              pattern: /[a-zA-Z0-9]+\.[a-zA-Z0-9]+/,
              inside: {
                key: /[a-zA-Z0-9]+(?=\.)/,
                dot: /\./,
                val: /^[^.][a-zA-Z0-9]+/
              }
            },
            punctuation
          }
        },
        {
          pattern: /(spx-component)=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          lookbehind: true,
          global: true,
          inside: {
            'component-name': /[a-zA-Z0-9-]+/,
            separator: /[|,]/,
            punctuation
          }
        },
        {
          pattern: /(spx-bind)=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          lookbehind: true,
          global: true,
          inside: {
            'bind-notation': {
              pattern: /[a-zA-Z0-9]+\.[a-zA-Z0-9]+/,
              inside: {
                'event-key': /[a-zA-Z0-9]+(?=\.)/,
                dot: /\./,
                val: /^[^.][a-zA-Z0-9]+/
              }
            },
            punctuation
          }
        },
        {
          pattern: /(spx@[a-z:]+)=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          lookbehind: true,
          global: true,
          inside: {
            'dot-notation': {
              pattern: /[a-zA-Z0-9]+\.[a-zA-Z0-9]+\s*/,
              inside: {
                'event-key': /[a-zA-Z0-9]+(?=\.)/,
                dot: /\./,
                val: /^[^.][a-zA-Z0-9]+/
              }
            },
            'event-struct': {
              pattern: /(\s)\{[\s\S]*?\}\s*/,
              greedy: true,
              lookbehind: true,
              inside: {
                delim: /[{}]/,
                comma: /,/,
                prop: /[a-z]+/
              }
            },
            punctuation
          }
        }
      ],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation,
          script: {
            pattern: /[[{][\s\S]*?[\]}]/,

            inside: {
              [tokenize]: embeddedIn('javascript')
            }
          },
          integer: /(\d*)/,
          boolean: /\b(true|false)\b/
        }
      },
      'attr-name': {
        pattern: /[^\s>/]+/,
        inside: {
          'spx-name': {
            pattern: /(spx-target|spx-morph|spx-replace|spx-hover|spx-eval|spx-data|spx-component|spx-node|spx-bind|spx-watch|spx-hydrate|spx-intersect|spx-prepend|spx-append|spx-threshold|spx-proximity|spx-position|spx-progress|spx-scroll|spx-cache|spx-disable|spx-history)\b/
          },
          'at-notation': {
            pattern: /[a-zA-Z0-9]+@[a-zA-Z0-9]+$/,
            inside: {
              prefix: /^[\w-]+?(?=@)/,
              symbol: /[@]/,
              suffix: /[a-zA-Z0-9]+/
            }
          },
          'at-window-notation': {
            pattern: /[a-zA-Z0-9]+@window:[a-zA-Z0-9]+$/,
            inside: {
              prefix: /^[\w-]+?(?=@)/,
              window: /\bwindow\b(?=:)/,
              symbol: /[:@]/,
              suffix: /[a-zA-Z0-9]+$/
            }
          },
          'ns-notation': {
            pattern: /[a-zA-Z0-9-]+:[a-zA-Z0-9-]+$/,
            inside: {
              prefix: /^[\w-]+?(?=:)/,
              symbol: /:/,
              suffix: /[a-zA-Z0-9-]+?$/
            }
          },
          namespace: /^[^\s>/:]+:/,
          punctuation: [
            {
              pattern: /=(?=["'])/,
              alias: 'attr-equals'
            },
            {
              pattern: /["']|["']/,
              lookbehind: true
            }
          ]
        }
      },
      punctuation: /\/?>/
    }
  };

  /* -------------------------------------------- */
  /* SPX ATTRIBUTES END                           */
  /* -------------------------------------------- */

  insertBefore(markup, 'cdata', {
    style: addInlined('style', 'css'),
    script: addInlined('script', 'javascript')
  });

}
