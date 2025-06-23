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
