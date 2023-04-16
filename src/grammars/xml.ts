import Prism from 'prismjs';

/**
 * Extended Liquid Language Support
 */
export default <Prism.Grammar> {
  tag: {
    pattern: /<\/?(?!\d)[^\s>/=$<%]+(?:\s(?:\s*[^\s>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>/]+/,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>/:]+(?=:)/,
          prefix: /:/
        }
      },
      'special-attr': [],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [
            {
              pattern: /^=/,
              alias: 'attr-equals'
            }
          ]
        }
      },
      punctuation: /\/?>/,
      'attr-name': {
        pattern: /[^\s>/]+/,
        inside: {
          namespace: /^[^\s>/:]+:/
        }
      }
    }
  }
};
