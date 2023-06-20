import Prism from 'prismjs';

export default function () {

  const Inside = <Prism.Grammar>{
    'tag-name': {
      lookbehind: true,
      pattern: /({%-?\s*)([a-z_$][\w$]+)/
    },
    output: {
      lookbehind: true,
      pattern: /({{-?\s*)([a-z_$][\w$]+)/
    },
    delimiters: {
      pattern: /{%|{{|}}|%}/
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

  const Liquid = <Prism.Grammar>{
    comment: {
      global: true,
      pattern: /(\{%-?\s*comment\s*-?%\}[\s\S]+\{%-?\s*endcomment\s*-?%\}|\{%-?\s*#[\s\S]+?-?%\})/
    },
    liquid: {
      pattern: /{[{%]-?[\s\S]+-?[%}]}/,
      inside: Inside
    }
  };

  Prism.languages.insertBefore('css', 'property', {
    liquid: {
      pattern: /{[{%]-?[\s\S]+-?[%}]}/,
      inside: Inside
    }
  });

  Prism.languages.liquid = Prism.languages.extend('markup', Liquid);

  // @ts-ignore
  Prism.languages.liquid.tag.alias = 'markup';

  // @ts-ignore
  Prism.languages.liquid.tag.inside['attr-value'].inside.liquid = {
    alias: 'liquid-string',
    pattern: /{[{%]-?[\s\S]+-?[%}]}/,
    inside: Liquid
  };

  // @ts-ignore
  Prism.languages.liquid.tag.inside['special-attr'].push({
    pattern: /{%(?!\d)[^\s]*(?:(?:"[^"]*"|'[^']*'|[^\s'"])|(?!{%)|[^%]*}|[^}])*?%}/,
    inside: Inside
  });

  Prism.languages.liquid['language-css'] = {
    inside: Prism.languages.css,
    lookbehind: true,
    pattern: /(\{%-?\s*style(?:sheet)?\s*-?%\})([\s\S]+?)(?=\{%-?\s*endstyle(?:sheet)?\s*-?%\})/
  };

  Prism.languages.liquid['language-javascript'] = {
    inside: Prism.languages.javascript,
    lookbehind: true,
    pattern: /(\{%-?\s*javascript\s*-?%\})([\s\S]*?)(?=\{%-?\s*endjavascript\s*-?%\})/
  };

  Prism.languages.liquid['language-json'] = {
    inside: Prism.languages.json,
    lookbehind: true,
    pattern: /(\{%-?\s*schema\s*-?%\})([\s\S]+?)(?=\{%-?\s*endschema\s*-?%\})/
  };

  return Prism.languages.liquid;

}
