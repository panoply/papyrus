// import Prism from 'prismjs';
import { languages, Grammar } from 'prism-code-editor/prism';
import { clone } from 'prism-code-editor/prism/utils';
import { has } from '../../utils/helpers';

/**
 * Extended XML Language Support
 */
export function XML <T = Grammar> (): T {

  if (has('xml', languages)) return <T>clone(languages.xml);

  const entity = [
    { pattern: /&[a-z\d]{1,8};/i, alias: 'named-entity' },
    /&#x?[a-f\d]{1,8};/i
  ];

  languages.xml = {
    comment: {
      pattern: /<!--(?:(?!<!--)[\s\S])*?-->/g,
      greedy: true
    },
    prolog: {
      pattern: /<\?[\s\S]+?\?>/g,
      greedy: true
    },
    doctype: {
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/gi,
      greedy: true,
      inside: {
        'internal-subset': {
          pattern: /(\[)[\s\S]+(?=\]\s*>$)/,
          lookbehind: true,
          inside: 'xml'
        },
        string: /"[^"]*"|'[^']*'/,
        punctuation: /^<!|[>[\]]/,
        'doctype-tag': /^DOCTYPE/i,
        name: /\S+/
      }
    },
    cdata: {
      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/gi,
      greedy: true
    },
    tag: {
      pattern: /<\/?(?!\d)[^\s/=>$<%]+(?:\s(?:\s*[^\s/=>]+(?:\s*=\s*(?!\s)(?:"[^"]*"|'[^']*'|[^\s"'=>]+(?=[\s>]))?|(?=[\s/>])))+)?\s*\/?>/g,
      greedy: true,
      inside: {
        punctuation: /^<\/?|\/?>$/,
        tag: {
          pattern: /^\S+/,
          inside: {
            namespace: /^[^:]+:/
          }
        },
        'special-attr': [],
        'attr-value': [
          {
            pattern: /(=\s*)(?:"[^"]*"|'[^']*'|[^\s"'=>]+)/g,
            lookbehind: true,
            greedy: true,
            inside: {
              punctuation: /^["']|["']$/,
              entity
            }
          }
        ],
        'attr-equals': /=/,
        'attr-name': {
          pattern: /\S+/,
          inside: {
            namespace: /^[^:]+:/
          }
        }
      }
    },
    entity,
    'markup-bracket': {
      pattern: /[()[\]{}]/,
      alias: 'punctuation'
    }
  };

  return <T>clone(languages.xml);

};
