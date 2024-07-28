// import Prism from 'prismjs';
import { languages } from 'prism-code-editor/prism';

export function Bash () {

  languages.bash = {
    argument: {
      pattern: /<(.*?)>/
    },
    punctuation: {
      pattern: /\$|&{2}|[<>]|--?(?=[a-z])/
    },
    comment: {
      pattern: /#.*?(?=\n)/
    }
  };

}
