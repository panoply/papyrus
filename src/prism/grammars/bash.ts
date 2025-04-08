// import Prism from 'prismjs';
import { languages } from 'prism-code-editor/prism';

export function Bash () {


  languages.bash = {
    argument: {
      pattern: /(<)(.*?)(>)/,
      inside: {
        punctuation: /[<>]/
      }
    },
    punctuation: {
      pattern: /\$|&{2}|[<>]|--?(?=[a-z])/
    },
    target: {
      pattern: /([a-z] )(\..*)(?=[\s]|$)/,
      lookbehind: true
    },
    comment: {
      pattern: /#.*/
    },
    title: {
      pattern: /[a-zA-Z]+:(?=\n +)/,
      inside: {
        punctuation: /:/
      }
    }
  };

}
