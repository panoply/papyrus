
import Prism from 'prismjs';

const string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;

export const Grammar = <Prism.Grammar>{
  'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
  'pseudo-class': /:[-\w]+/,
  class: /\.[-\w]+/,
  id: /#[-\w]+/,
  'css-tag': /\w+/,
  attribute: {
    pattern: RegExp('\\[(?:[^[\\]"\']|' + string.source + ')*\\]'),
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
        string,
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

export function extend (prism: typeof Prism) {

  prism.languages.css.selector = {
    pattern: (prism.languages.css.selector as any).pattern,
    lookbehind: true,
    inside: Grammar
  };

  (prism.languages.css.atrule as any).inside['selector-function-argument'].inside = Grammar;

  prism.languages.insertBefore('css', 'punctuation', {
    colon: /:/
  });

  prism.languages.insertBefore('css', 'property', {
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

  prism.languages.insertBefore('css', 'function', {
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
        pattern: /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
        lookbehind: true
      },
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

  return Grammar;
}
