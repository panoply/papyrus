// import Prism from 'prismjs';
import './markup';
import { colors } from './css';
import { languages, rest } from 'prism-code-editor/prism';
import { insertBefore } from 'prism-code-editor/prism/utils';
import { comment, boolean, string } from '../helpers';

export function JavaScript () {

  const javascript = {};

  // sinjs literal markup tags
  const markuptags = [
    'a',
    'abbr',
    'acronym',
    'address',
    'applet',
    'area',
    'article',
    'aside',
    'audio',
    'audio',
    'audio',
    'b',
    'base',
    'basefont',
    'bdi',
    'bdo',
    'big',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'center',
    'cite',
    'code',
    'col',
    'colgroup',
    'command',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'dir',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'fieldset',
    'figcaption',
    'figure',
    'font',
    'footer',
    'form',
    'frame',
    'frame',
    'frameset',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'isindex',
    'kbd',
    'keygen',
    'label',
    'legend',
    'li',
    'link',
    'main',
    'map',
    'mark',
    'marquee',
    'menu',
    'menuitem',
    'meta',
    'meter',
    'nav',
    'noframes',
    'noscript',
    'object',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'picture',
    'picture',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'small',
    'source',
    'span',
    'strike',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'svg',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'tt',
    'u',
    'ul',
    'var',
    'video',
    'video',
    'video',
    'wbr'
  ].join('|');

  // sin methods
  const sinmethods = [
    'redrawing',
    'sleep',
    'with',
    'isAttrs',
    'isServer',
    'pathmode',
    'redraw',
    'redraw',
    'mount',
    'css',
    'css',
    'css',
    'css',
    'style',
    'animate',
    'http',
    'live',
    'event',
    'on',
    'trust',
    'route',
    'window',
    'scroll',
    'View',
    'error',
    'jsxFragment'
  ].join('|');

  const { color, unit, number } = colors();

  languages.javascript = languages.js = Object.assign(javascript, {
    'doc-comment': {
      pattern: /\/\*\*(?!\/)[\s\S]*?(?:\*\/|$)/g,
      greedy: true,
      alias: 'comment',
      inside: 'jsdoc'
    },
    comment: comment(),
    hashbang: {
      pattern: /^#!.*/g,
      greedy: true,
      alias: 'comment'
    },
    sin: {
      pattern: new RegExp(`([ \t]*)\\bs(?=(?:[\`(]|\\.(?:${sinmethods})))`, 'g'),
      lookbehind: true
    },
    'template-sin': {
      pattern: new RegExp(`(s)\`(?:${markuptags})\\b(?:\\[\\s\\S]|\\$\{(?:[^{}]|\\{(?:[^{}]|\\{[^}]*\\})*\\})*\\}|(?!\\$\\{)[^\\\`])*\``, 'g'),
      greedy: true,
      lookbehind: true,
      inside: {
        'template-punctuation': {
          pattern: /^`|`$/,
          alias: 'string'
        },
        'sin-tag': new RegExp(`^(?:${markuptags})\\b`),
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\\\)*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
          lookbehind: true,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\$\{|\}$/,
              alias: 'punctuation'
            },
            [rest]: javascript
          }
        },
        'sin-css': {
          pattern: /[\s\S]+/,
          inside: {
            property: {
              pattern: /(^[ \t]*|\n[ \t]*)[a-zA-Z-]+(?=[ \t])/g,
              lookbehind: true
            },
            value: {
              pattern: /(^[ \t]*|\n[ \t]*[a-zA-Z]*[ \t]*)(\S+)/g,
              lookbehind: true,
              inside: {
                hexcode: {
                  pattern: /\B#[a-f\d]{3,8}\b/i,
                  alias: 'color'
                },
                color,
                unit,
                number
              }
            }
          }
        }
      }
    },
    'template-string': {
      pattern: /(?!s)`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}|(?!\$\{)[^\\`])*`/g,
      greedy: true,
      inside: {
        'template-punctuation': {
          pattern: /^`|`$/,
          alias: 'string'
        },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\\\)*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
          lookbehind: true,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\$\{|\}$/,
              alias: 'punctuation'
            },
            [rest]: javascript
          }
        },
        string: /[\s\S]+/
      }
    },
    'string-property': {
      pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\[\s\S]|(?!\2)[^\\\n])*\2(?=\s*:)/mg,
      lookbehind: true,
      greedy: true,
      alias: 'property'
    },
    string: string(),
    regex: {
      pattern: /((?:^|[^$\w\xa0-\uffff"'`.)\]\s]|\b(?:return|yield))\s*)\/(?:(?:\[(?:\\.|[^\\\n\]])*\]|\\.|[^\\\n/[])+\/[dgimyus]{0,7}|(?:\[(?:\\.|[^\\\n[\]]|\[(?:\\.|[^\\\n[\]]|\[(?:\\.|[^\\\n[\]])*\])*\])*\]|\\.|[^\\\n/[])+\/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?!\/\*|[^()[\]{}.,:;?`\n%&|^!=<>/*+-]))/g,
      lookbehind: true,
      greedy: true,
      inside: {
        'regex-flags': /\w+$/,
        'regex-delimiter': /^\/|\/$/,
        'regex-source': {
          pattern: /.+/,
          alias: 'language-regex',
          inside: 'regex'
        }
      }
    },
    'class-name': [
      {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new)\s+)(?!\d)(?:(?!\s)[$\w.\xa0-\uffff])+/,
        lookbehind: true,
        inside: {
          punctuation: /\./
        }
      },
      {
        pattern: /(^|[^$\w\xa0-\uffff]|\s)(?![a-z\d])(?:(?!\s)[$\w\xa0-\uffff])+(?=\.(?:constructor|prototype)\b)/,
        lookbehind: true
      }
    ],
    // This must be declared before keyword because we use "function" inside the look-forward
    'function-variable': {
      pattern: /#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^)]*\))*\)|(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+)\s*=>))/,
      alias: 'function',
      inside: {
        'maybe-class-name': /^[A-Z].*/
      }
    },
    parameter: [
      /(function(?:\s+(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      /(^|[^$\w\xa0-\uffff]|\s)(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*=>)/,
      /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|continue|default|do|else|finally|for|if|return|switch|throw|try|while|yield|class|const|debugger|delete|enum|extends|function|[gs]et|export|from|import|implements|in|instanceof|interface|let|new|null|of|package|private|protected|public|static|super|this|typeof|undefined|var|void|with)(?![$\w\xa0-\uffff]))(?:(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/
    ].map(pattern => ({
      pattern,
      lookbehind: true,
      inside: javascript
    })),
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    keyword: [
      {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|export|from(?=\s*(?:['"]|$))|import)\b/,
        lookbehind: true,
        alias: 'module'
      },
      {
        pattern: /(\b(?:class)\b\s+)/,
        alias: 'class'
      },
      {
        pattern: /((?:^|\})\s*)catch\b/,
        lookbehind: true,
        alias: 'control-flow'
      },
      {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:await|break|case|continue|default|do|else|finally(?=\s*(?:\{|$))|for|if|return|switch|throw|try|while|yield|import|as|export|from|default)\b/,
        lookbehind: true,
        alias: 'control-flow'
      },
      {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|const|debugger|delete|enum|extends|function|(?:get|set)(?=\s*(?:[#[$\w\xA0-\uFFFF]|$))|implements|in|instanceof|let|new|null|of|package|private|protected|public|super|this|typeof\s+|undefined|var|void|\s+with)\b/,
        lookbehind: true,
        inside: {
          this: /\b(this)\b/
        }
      },
      {
        pattern: /(\s+)(\b(?:Boolean|String|Number|Object|Array)\b)/,
        alias: 'type-constructors'
      }
    ],
    boolean: boolean(),
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    function: {
      pattern: /#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      inside: {
        'maybe-class-name': /^[A-Z].*/
      }
    },
    number: {
      pattern: /(^|[^$\w])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][a-fA-F\d]+(?:_[a-fA-F\d]+)*n?|\d+(?:_\d+)*n|(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?)(?![$\w])/,
      lookbehind: true
    },
    'literal-property': {
      pattern: /([\n,{][ \t]*|[ \t]*)(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*:)/,
      lookbehind: true,
      alias: 'property'
    },
    operator: [
      {
        pattern: /=>/,
        alias: 'arrow'
      },
      /--|\+\+|(?:\*\*|&&|\|\||[!=]=|>>>?|<<|[%&|^!=<>/*+-]|\?\?)=?|\.{3}|\?(?!\.)|~|:/
    ],
    'property-access': {
      pattern: /(\.\s*)#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+/,
      lookbehind: true,
      inside: {
        'maybe-class-name': /^[A-Z].*/
      }
    },
    'maybe-class-name': {
      pattern: /(^|[^$\w\xa0-\uffff])[A-Z][$\w\xa0-\uffff]+/,
      lookbehind: true
    },
    punctuation: /\?\.|[()[\]{}.,:;]/
  });

  insertBefore(languages.javascript, 'keyword', {
    variable: {
      pattern: /\b(?:const|var|let)\b/
    },
    'function-name': {
      pattern: /\b(?:function)\b/
    },
    property: {
      lookbehind: true,
      pattern: /(?:import|as|export|from|default)(?=[:])/
    },
    operation: {
      pattern: /(\b(?:typeof|new|of|delete|void|readonly)\b\s+)/,
      global: true
    },
    object: {
      lookbehind: true,
      pattern: /(\s+)\b([a-z_$][\w$]*)(?=[.])/i,
      global: true,
      greedy: true,
      inside: {
        this: /\b(this)\b/
      }
    },
    'punctuation-chars': {
      pattern: /[.,]/,
      global: true
    },
    semi: {
      pattern: /[;]/,
      global: true
    },
    nil: {
      pattern: /\b(?:null|undefined)\b/
    },
    'browser-objects': {
      pattern: /\b(?:window|document|console)\b/
    },
    flow: {
      pattern: /(\b(?:return|await|new)\b\s+)/
    },
    numeric: {
      pattern: /(\+{2}|-{2})\w+/,
      lookbehind: true,
      inside: {
        this: /\b(this)\b/
      }
    },
    bracket: {
      pattern: /(\w+)\[.*?\]/,
      lookbehind: true,
      inside: {
        keyword: {
          pattern: /\w+/
        },
        punctuation: {
          pattern: /\[|\]/
        }
      }
    }
  });

};
