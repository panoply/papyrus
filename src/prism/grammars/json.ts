// import Prism from 'prismjs';
import { languages } from 'prism-code-editor/prism';
import { comment, boolean } from '../helpers';

export function Json () {

  languages.json = {
    property: {
      pattern: /"(?:\\.|[^\\\n"])*"(?=\s*:)/g,
      greedy: true
    },
    string: {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    comment: comment(),
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    operator: /:/,
    punctuation: /[[\]{},]/,
    boolean: boolean(),
    null: {
      pattern: /\bnull\b/,
      alias: 'keyword'
    }
  };

}
