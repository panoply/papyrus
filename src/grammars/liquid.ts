import Prism from 'prismjs';

/**
 * Extended Liquid Language Support
 */
export default <Prism.Grammar> {
  'liquid-delimiters': {
    global: true,
    pattern: /{%|{{|}}|%}/
  },
  'liquid-comment': {
    lookbehind: true,
    global: true,
    pattern: /(?:\{%-?\s*comment\s*-?%\}[\s\S]+\{%-?\s*endcomment\s*-?%\}|\{%-?\s*#[\s\S]+?-?%\})/
  },
  'liquid-tag': {
    lookbehind: true,
    pattern: /({%-?\s*)\b([a-z]+)\b(?=[\s-%]})/i
  },
  'liquid-tagged': {
    pattern: /\s+\b((?:end)[a-z]+|schema|echo|if|unless|for|case|when)\s+/
  },
  'liquid-object': {
    lookbehind: true,
    pattern: /\b[a-z_$]+(?=\.\s*)/i
  },
  'liquid-property': {
    lookbehind: true,
    pattern: /(\.\s*)[a-z_$][\w$]+(?=[.\s])/i
  },
  'liquid-filter': {
    lookbehind: true,
    pattern: /(\|)\s*(\w+)(?=[:]?)/
  },
  'liquid-string': {
    lookbehind: true,
    pattern: /['"].*?['"]/
  },
  'liquid-punctuation': {
    global: true,
    lookbehind: true,
    pattern: /[.,|:?]/
  },
  'liquid-operator': {
    pattern: /[!=]=|<|>|[<>]=?|[|?:=-]|\b(?:in|and|contains(?=\s)|or)\b/
  },
  'liquid-array': {
    lookbehind: true,
    pattern: /(\s+in\s+)(\b[a-z_$][\w$]+)(?=\.\s*)/
  },
  'liquid-boolean': {
    pattern: /\b(?:true|false|nil)\b/
  },
  'liquid-number': {
    pattern: /\b(?:\d+)\b/
  },
  'liquid-parameter': {
    lookbehind: true,
    global: true,
    greedy: true,
    pattern: /([,:])\s*(\w+)(?=:)/i
  }
};
