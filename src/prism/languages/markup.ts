/* eslint-disable dot-notation */
import Prism from 'prismjs';

export default function () {

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

  Prism.languages.markup = {
    comment: {
      pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
      greedy: true
    },
    prolog: {
      pattern: /<\?[\s\S]+?\?>/,
      greedy: true
    },
    doctype: {
      // https://www.w3.org/TR/xml/#NT-doctypedecl
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: true,
      inside: {
        'internal-subset': {
          pattern: /(^[^[]*\[)[\s\S]+(?=\]>$)/,
          lookbehind: true,
          greedy: true,
          inside: null // see below
        },
        string: {
          pattern: /"[^"]*"|'[^']*'/,
          greedy: true
        },
        punctuation: /^<!|>$|[[\]]/,
        'doctype-tag': /^DOCTYPE/i,
        name: /[^\s<>'"]+/
      }
    },
    cdata: {
      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
      greedy: true
    },
    tag: {
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
            pattern: /(spx@[a-z]+)=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
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
              'event-struct-on': {
                pattern: /([a-zA-Z0-9])\{[\s\S]*?\}\s*/,
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
            number: {
              pattern: /(["'])[0-9]+\.[0-9]+(?=['"])/,
              lookbehind: true
            },
            integer: {
              pattern: /(["'])[0-9]+(?=['"])/,
              lookbehind: true
            },
            boolean: /\b(true|false)\b/,
            script: {
              pattern: /[[{][\s\S]*?[\]}]/,
              greedy: true,
              inside: Prism.languages.javascript
            },
            punctuation: [
              {
                pattern: /^=/,
                alias: 'attr-equals'
              },
              {
                pattern: /^(\s*)["']|["']$/,
                lookbehind: true
              }
            ]
          }
        },
        punctuation: /\/?>/,
        'attr-name': {
          pattern: /[^\s>/]+/,
          inside: {
            'spx-name': {
              pattern: /(spx-target|spx-morph|spx-replace|spx-hover|spx-eval|spx-data|spx-component|spx-node|spx-bind|spx-watch|spx-hydrate|spx-intersect|spx-prepend|spx-append|spx-threshold|spx-proximity|spx-position|spx-progress|spx-scroll|spx-cache|spx-disable|spx-history)\b/
            },
            'ns-notation': {
              pattern: /[a-zA-Z0-9-]+:[a-zA-Z0-9-]+$/,
              inside: {
                prefix: /^[\w-]+?(?=:)/,
                symbol: /:/,
                suffix: /[a-zA-Z0-9-]+?$/
              }
            },
            'at-notation': {
              pattern: /[a-zA-Z0-9]+@[a-zA-Z0-9]+$/,
              inside: {
                prefix: /^[\w-]+?(?=@)/,
                symbol: /@/,
                suffix: /[a-zA-Z0-9]+?$/
              }
            },
            namespace: /^[^\s>/:]+:/
          }
        }
      }
    },
    entity: [
      {
        pattern: /&[\da-z]{1,8};/i,
        alias: 'named-entity'
      },
      /&#x?[\da-f]{1,8};/i
    ]
  };

  // @ts-expect-error
  Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];

  // @ts-expect-error
  Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

  // Plugin to make entity title show the real entity, idea by Roman Komarov
  Prism.hooks.add('wrap', function (env) {
    if (env.type === 'entity') {
      env.attributes['title'] = env.content.replace(/&amp;/, '&');
    }
  });

  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    /**
     * Adds an inlined language to markup.
     *
     * An example of an inlined language is CSS with `<style>` tags.
     *
     * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addInlined('style', 'css');
     */
    value: function addInlined (tagName: string, lang: string) {
      const includedCdataInside = {};
      includedCdataInside['language-' + lang] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: true,
        inside: Prism.languages[lang]
      };
      includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

      const inside = {
        'included-cdata': {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: includedCdataInside
        }
      };
      inside['language-' + lang] = {
        pattern: /[\s\S]+/,
        inside: Prism.languages[lang]
      };

      const def = {};
      def[tagName] = {
        pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
        lookbehind: true,
        greedy: true,
        inside
      };

      Prism.languages.insertBefore('markup', 'cdata', def);
    }
  });
  Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
    /**
     * Adds an pattern to highlight languages embedded in HTML attributes.
     *
     * An example of an inlined language is CSS with `style` attributes.
     *
     * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addAttribute('style', 'css');
     */
    value: function (attrName: string, lang: string) {

      // @ts-expect-error
      Prism.languages.markup.tag.inside['special-attr'].push({
        pattern: RegExp(
          /(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
          'i'
        ),
        lookbehind: true,
        inside: {
          'attr-name': /^[^\s=]+/,
          'attr-value': {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: true,
                alias: [ lang, 'language-' + lang ],
                inside: Prism.languages[lang]
              },
              punctuation: [
                {
                  pattern: /^=/,
                  alias: 'attr-equals'
                },
                /"|'/
              ]
            }
          }
        }
      });
    }
  });

  Prism.languages.html = Prism.languages.markup;
  Prism.languages.mathml = Prism.languages.markup;
  Prism.languages.svg = Prism.languages.markup;
  Prism.languages.xml = Prism.languages.extend('markup', {});
  Prism.languages.ssml = Prism.languages.xml;
  Prism.languages.atom = Prism.languages.xml;
  Prism.languages.rss = Prism.languages.xml;

  return Prism.languages.html;

}
