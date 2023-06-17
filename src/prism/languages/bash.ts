import Prism from 'prismjs';

export default function () {

  Prism.languages.bash = {
    keyword: {
      pattern: /(esthetic\s)/
    },
    argument: {
      pattern: /<(.*?)>/
    },
    punctuation: {
      pattern: /[<>]|--?(?=[a-z])/
    },
    comment: {
      pattern: /#.*?(?=\n)/
    }
  };

  return Prism.languages.bash;

}
