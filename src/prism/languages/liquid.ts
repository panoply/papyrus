import Prism from 'prismjs';

export default function () {

  const Liquid = <Prism.Grammar>{
    comment: {
      global: true,
      pattern: /(\{%-?\s*comment\s*-?%\}[\s\S]+\{%-?\s*endcomment\s*-?%\}|\{%-?\s*#[\s\S]+?-?%\})/
    },
    'comment-html': {
      pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
      greedy: true
    },
    tag: {
      lookbehind: true,
      pattern: /({%-?\s*)([a-z_$][\w$]+)(?=\s)/
    },
    output: {
      lookbehind: true,
      pattern: /({{-?\s*)([a-z_$][\w$]+)(?=\s)/
    },
    delimiters: {
      global: true,
      pattern: /{%|{{|}}|%}/
    },
    object: {
      lookbehind: true,
      pattern: /\b[a-z_$]+(?=\.\s*)/i
    },
    property: {
      lookbehind: true,
      pattern: /(\.\s*)[a-z_$][\w$]+(?=[.\s])/i
    },
    filter: {
      lookbehind: true,
      pattern: /(\|)\s*(\w+)(?=[:]?)/
    },
    string: {
      lookbehind: true,
      pattern: /['"].*?['"]/
    },
    punctuation: {
      global: true,
      lookbehind: true,
      pattern: /[.,|:?]/
    },
    operator: {
      pattern: /[!=]=|<|>|[<>]=?|[|?:=-]|\b(?:in|and|contains(?=\s)|or)\b/
    },
    array: {
      lookbehind: true,
      pattern: /(\s+in\s+)(\b[a-z_$][\w$]+)(?=\.\s*)/
    },
    boolean: {
      pattern: /\b(?:true|false|nil)\b/
    },
    number: {
      pattern: /\b(?:\d+)\b/
    },
    parameter: {
      lookbehind: true,
      global: true,
      greedy: true,
      pattern: /([,:])\s*(\w+)(?=:)/i
    }
  };

  /**
   * Extended Liquid Language Support
   */
  const Markup = <Prism.Grammar> {
    markup: {
      pattern: /<\/?(?!(?:\d|!--))[^\s>/=$<%]+(?:\s(?:\s*[^\s>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: true,
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
              inside: Liquid
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
          inside: Liquid
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
    ...Liquid
  };

  Markup['liquid-style'] = {
    inside: Prism.languages.css,
    lookbehind: true,
    pattern: /(\{%-?\s*style(?:sheet)?\s*-?%\})([\s\S]+?)(?=\{%-?\s*endstyle(?:sheet)?\s*-?%\})/
  };

  Markup['liquid-javascript'] = {
    inside: Prism.languages.javascript,
    lookbehind: true,
    pattern: /(\{%-?\s*javascript\s*-?%\})([\s\S]*?)(?=\{%-?\s*endjavascript\s*-?%\})/
  };

  Markup['liquid-schema'] = {
    inside: Prism.languages.json,
    lookbehind: true,
    pattern: /(\{%-?\s*schema\s*-?%\})([\s\S]+?)(?=\{%-?\s*endschema\s*-?%\})/
  };

  Prism.languages.liquid = Markup;

  return Prism.languages.liquid;

}
