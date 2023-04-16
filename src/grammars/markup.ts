import Prism from 'prismjs';
import { Grammar } from './liquid';

export default <Prism.Grammar>{
  tag: {
    pattern: /<\/?(?!\d)[^\s>/=$<%]+(?:\s(?:\s*[^\s>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    alias: 'markup',
    inside: {
      tag: {
        pattern: /^<\/?[^\s>/]+/,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>/:]+:/
        }
      },
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          liquid: {
            alias: 'liquid-string',
            pattern: /{[{%]-?[\s\S]+-?[%}]}/,
            inside: Grammar
          },
          punctuation: [
            {
              pattern: /^=/,
              alias: 'attr-equals'
            },
            {
              pattern: /^(\s*)["']|["']$/,
              lookbehind: true,
              alias: 'attr-value'
            }
          ]
        }
      },
      liquid: {
        pattern: /{[{%]-?[\s\S]+-?[%}]}/,
        inside: Grammar
      },
      punctuation: /\/?>/,
      'attr-name': {
        pattern: /[^\s>/]+/,
        inside: {
          namespace: /^[^\s>/:]+:/,
          punctuation: /{[{%]-?|-?[%}]}/,
          'attr-object': {
            lookbehind: true,
            pattern: /([a-z]*?)\s*[[\]0-9_\w$]+(?=\.)/i
          },
          'attr-property': {
            lookbehind: true,
            pattern: /(\.)\s*?[[\]\w0-9_$]+(?=[.\s?])/i
          },
          'punctuation-chars': {
            global: true,
            pattern: /[.,|:?]/
          },
          'attr-eq': /=/
        }
      }
    }
  },
  liquid: {
    pattern: /{[{%]-?[\s\S]+-?[%}]}/,
    inside: Grammar
  }
};
