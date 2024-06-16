/* eslint-disable dot-notation */
import Prism from 'prismjs';

export default function () {

  /**
   * Inside Liquid - The main Liquid PrismJS Grammar
   */
  const Inside = <Prism.Grammar>{
    'tag-name': {
      lookbehind: true,
      pattern: /({%-?\s*)([a-z_$][\w$]+)/
    },
    output: {
      lookbehind: true,
      pattern: /({{-?\s*)([a-z_$][\w$]+)/
    },
    delimiters: {
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

  Inside['liquid-tag'] = {
    pattern: /(\bliquid\s+)[\s\S]*?(?=-?%})/,
    global: true,
    greedy: true,
    lookbehind: true,
    inside: Object.assign({}, Inside, {
      'tag-name': {
        pattern: /\b(?:end)?(?:form|paginate|capture|case|comment|for|if|raw|tablerow|unless|include|layout|section|assign|liquid|break|continue|cycle|decrement|echo|increment|render)\b/
      }
    })
  };

  /**
   * Liquid Grammar - Resuable grammar point
   */
  const Liquid = <Prism.Grammar>{
    comment: {
      global: true,
      pattern: /(\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}|\{%-?\s*#[\s\S]+?-?%\})/
    },
    liquid: {
      pattern: /({{|{%)[\s\S]+(}}|%})/,
      global: true,
      inside: Object.assign({}, Inside, {
        'string-delimiters': /{%|{{|}}|%}/
      })
    }
  };

  Prism.languages.insertBefore('css', 'property', {
    liquid: {
      pattern: /{[{%][\s\S]+[%}]}/,
      inside: Inside
    }
  });

  Prism.languages.liquid = Prism.languages.extend('markup', Liquid);
  Prism.languages.liquid['tag'].alias = 'markup';
  Prism.languages.liquid['tag'].inside['attr-value'].inside.liquid = {
    alias: 'liquid-string',
    pattern: /{[{%]-?[\s\S]+-?[%}]}/,
    inside: Liquid
  };

  Prism.languages.liquid['tag'].inside['special-attr'].push({
    pattern: /{%(?!\d)[^\s]*(?:(?:"[^"]*"|'[^']*'|[^\s'"])|(?!{%)|[^%]*}|[^}])*?%}/,
    inside: Inside
  });

  delete Prism.languages.liquid['tag'].inside['attr-value'].inside['number'];
  delete Prism.languages.liquid['tag'].inside['attr-value'].inside['boolean'];
  delete Prism.languages.liquid['tag'].inside['attr-value'].inside['script'];
  delete Prism.languages.liquid['tag'].inside['attr-value'].inside['dot-notation'];

  Prism.languages.liquid['language-css'] = {
    inside: Prism.languages.css,
    lookbehind: true,
    pattern: /(\{%-?\s*style(?:sheet)?\s*-?%\})([\s\S]+?)(?=\{%-?\s*endstyle(?:sheet)?\s*-?%\})/
  };

  Prism.languages.liquid['language-javascript'] = {
    inside: Prism.languages.javascript,
    lookbehind: true,
    pattern: /(\{%-?\s*javascript\s*-?%\})([\s\S]*?)(?=\{%-?\s*endjavascript\s*-?%\})/
  };

  Prism.languages.liquid['language-json'] = {
    inside: Prism.languages.json,
    lookbehind: true,
    pattern: /(\{%-?\s*schema\s*-?%\})([\s\S]+?)(?=\{%-?\s*endschema\s*-?%\})/
  };

  // @ts-expect-error
  Object.defineProperty(Prism.languages.liquid.tag, 'addInlined', {
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

      Prism.languages.insertBefore('liquid', 'cdata', def);
    }
  });

  // @ts-ignore
  Object.defineProperty(Prism.languages.liquid.tag, 'addAttribute', {
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

  return Prism.languages.liquid;

}
