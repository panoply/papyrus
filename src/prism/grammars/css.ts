// import Prism from 'prismjs';
import 'prism-code-editor/prism/languages/css';
import { Grammar, GrammarToken, languages, rest } from 'prism-code-editor/prism';
import { insertBefore } from 'prism-code-editor/prism/utils';
import { Merge } from 'type-fest';

export const colors = () => {

  const unit = {
    pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/,
    lookbehind: true
  };

  // 123 -123 .123 -.123 12.3 -12.3
  const number = {
    pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
    lookbehind: true
  };

  const color = [
    {
      pattern: /(^|[^\w-])(?:(?:alice|cadet|cornflower|deepsky|dodger|midnight|powder|royal|sky|steel)blue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blueviolet|brown|burlywood|chartreuse|chocolate|coral|cornsilk|crimson|(?:dark)?(?:blue|cyan|goldenrod|gr[ae]y|green|khaki|magenta|olivegreen|orange|orchid|red|salmon|seagreen|slateblue|slategr[ae]y|turquoise|violet)|deeppink|dimgr[ae]y|firebrick|floralwhite|(?:forest|lawn|lime|pale|spring)green|fuchsia|gainsboro|ghostwhite|gold|greenyellow|honeydew|hotpink|indianred|indigo|ivory|lavender|lavenderblush|lemonchiffon|light(?:blue|coral|cyan|goldenrodyellow|gr[ae]y|green|pink|salmon|seagreen|skyblue|slategr[ae]y|steelblue|yellow)|lime|linen|maroon|medium(?:aquamarine|blue|orchid|purple|seagreen|slateblue|springgreen|turquoise|violetred)|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orangered|palegoldenrod|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|purple|rebeccapurple|rosybrown|saddlebrown|sandybrown|seashell|sienna|silver|snow|tan|teal|thistle|tomato|transparent|wheat|white|whitesmoke|yellow|yellowgreen)(?![\w-])/i,
      lookbehind: true
    },
    {
      pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
      inside: {
        function: /^[^(]+/,
        unit,
        number,
        punctuation: /[(),]/
      }
    }
  ];

  return {
    color,
    unit,
    number
  };
};

export function CSS () {

  const { color, unit, number } = colors();
  const string = /(?:"(?:\\[\s\S]|[^\\\n"])*"|'(?:\\[\s\S]|[^\\\n'])*')/g;
  const stringSrc = string.source;
  const atruleInside = {
    rule: /^@[\w-]+/,
    'selector-function-argument': {
      pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^)]*\))*\))+(?=\s*\))/,
      lookbehind: true,
      alias: 'selector'
    },
    keyword: {
      pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
      lookbehind: true
    }
    // See rest below
  };

  atruleInside[rest] = languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: RegExp(`@[\\w-](?:[^;{\\s"']|\\s+(?!\\s)|${stringSrc})*?(?:;|(?=\\s*\\{))`),
      inside: atruleInside
    },
    url: {
      // https://drafts.csswg.org/css-values-3/#urls
      pattern: RegExp(`\\burl\\((?:${stringSrc}|(?:[^\\\\\n"')=]|\\\\[\\s\\S])*)\\)`, 'gi'),
      greedy: true,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: {
          pattern: RegExp('^' + stringSrc + '$'),
          alias: 'url'
        }
      }
    },
    selector: {
      pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|${stringSrc})*(?=\\s*\\{)`),
      lookbehind: true
    },
    string: {
      pattern: string,
      greedy: true
    },
    property: {
      pattern: /(^|[^-\w\xa0-\uffff])(?!\d)(?:(?!\s)[-\w\xa0-\uffff])+(?=\s*:)/i,
      lookbehind: true
    },
    important: /!important\b/i,
    function: {
      pattern: /(^|[^-a-z\d])[-a-z\d]+(?=\()/i,
      lookbehind: true
    },
    punctuation: /[(){},:;]/
  };

  const css = languages.css as Merge<Grammar, {
    selector: GrammarToken;
    atrule: GrammarToken;
  }>;

  css.selector.inside = css.atrule.inside['selector-function-argument'].inside = {
    'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
    'pseudo-class': /:[-\w]+/,
    class: /\.[-\w]+/,
    id: /#[-\w]+/,
    attribute: {
      pattern: /\[(?:[^[\]"']|(["'])(?:\\[\s\S]|(?!\1)[^\\\n])*\1)*\]/g,
      greedy: true,
      inside: {
        punctuation: /^\[|\]$/,
        'case-sensitivity': {
          pattern: /(\s)[si]$/i,
          lookbehind: true,
          alias: 'keyword'
        },
        namespace: {
          pattern: /^(\s*)(?:(?!\s)[-*\w\xa0-\uffff])*\|(?!=)/,
          lookbehind: true,
          inside: {
            punctuation: /\|$/
          }
        },
        'attr-name': {
          pattern: /^(\s*)(?:(?!\s)[-\w\xa0-\uffff])+/,
          lookbehind: true
        },
        'attr-value': {
          pattern: /(=\s*)(?:(?!\s)[-\w\xa0-\uffff])+(?=\s*$)|(["'])(?:\\[\s\S]|(?!\2)[^\\\n])*\2/,
          lookbehind: true
        },
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

    // the `tag` token has been existed and removed.
    // because we can't find a perfect tokenize to match it.
    // if you want to add it, please read https://github.com/PrismJS/prism/pull/2373 first.

    punctuation: /[(),]/
  };

  insertBefore(css, 'property', {
    variable: {
      pattern: /(^|[^-\w\xa0-\uffff])--(?!\d)(?:(?!\s)[-\w\xa0-\uffff])*/i,
      lookbehind: true
    }
  });

  insertBefore(css, 'function', {
    operator: {
      pattern: /(\s)[/*+-](?!\S)/,
      lookbehind: true
    },
    // CAREFUL!
    // Previewers and Inline color use hexcode and color.
    hexcode: {
      pattern: /\B#[a-f\d]{3,8}\b/i,
      alias: 'color'
    },
    color,
    // it's important that there is no boundary assertion after the hex digits
    entity: /\\[a-f\d]{1,8}/i,
    unit,
    number
  });

}
