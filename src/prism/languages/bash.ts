import Prism from 'prismjs';

export default function () {

  Prism.languages.bash = {
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

  return Prism.languages.bash;

}
