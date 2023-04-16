import Prism from 'prismjs';

/**
 * Extended Liquid Language Support
 */
export const Grammar = <Prism.Grammar> {
  tag: {
    lookbehind: true,
    pattern: /({%-?\s*)([a-z_$][\w$]+)(?=\s)/
  },
  output: {
    lookbehind: true,
    pattern: /({{-?\s*)([a-z_$][\w$]+)(?=\s)/
  },
  delimiters: {
    global: true,
    pattern: /{%|{{|}}|%}/
  },
  comment: {
    lookbehind: true,
    global: true,
    pattern: /(?:\{%-?\s*comment\s*-?%\}[\s\S]+\{%-?\s*endcomment\s*-?%\}|\{%-?\s*#[\s\S]+?-?%\})/
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

export function extend (prism: typeof Prism) {

  Grammar['liquid-style'] = {
    inside: prism.languages.css,
    lookbehind: true,
    pattern: /(\{%-?\s*style(?:sheet)?\s*-?%\})([\s\S]+?)(?=\{%-?\s*endstyle(?:sheet)?\s*-?%\})/
  };

  Grammar['liquid-javascript'] = {
    inside: prism.languages.javascript,
    lookbehind: true,
    pattern: /(\{%-?\s*javascript\s*-?%\})([\s\S]*?)(?=\{%-?\s*endjavascript\s*-?%\})/
  };

  Grammar['liquid-schema'] = {
    inside: prism.languages.json,
    lookbehind: true,
    pattern: /(\{%-?\s*schema\s*-?%\})([\s\S]+?)(?=\{%-?\s*endschema\s*-?%\})/
  };

  return Grammar;

}
