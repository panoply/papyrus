// import Prism from 'prismjs';
import { languages, Grammar, GrammarToken } from 'prism-code-editor/prism';
import { clone, insertBefore } from 'prism-code-editor/prism/utils';

export function Liquid () {

  /** Markup Language */
  const markup = clone(languages.markup);

  // We do not use markup bracket
  delete markup['markup-bracket'];

  /**
   * Inside Liquid - The main Liquid PrismJS Grammar
   */
  const inside = {
    comment: {
      global: true,
      pattern: /\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}|\{%-?\s*#[\s\S]+?-?%\}/
    },
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

  inside['liquid-tag'] = {
    pattern: /(\bliquid\s+)[\s\S]*?(?=-?%})/,
    global: true,
    greedy: true,
    lookbehind: true,
    inside: Object.assign(clone(inside), {
      'tag-name': {
        pattern: /\b(?:end)?(?:form|paginate|capture|case|comment|for|if|raw|tablerow|unless|include|layout|section|assign|liquid|break|continue|cycle|decrement|echo|increment|render)\b/
      }
    })
  };

  insertBefore(languages.css, 'property', {
    liquid: {
      pattern: /{[{%][\s\S]+[%}]}/,
      inside
    }
  });

  const liquid = languages.liquid = Object.assign(markup, {
    liquid: {
      pattern: /({{|{%)[\s\S]+(}}|%})/,
      global: true,
      inside
    }
  })as { tag?: GrammarToken } & Grammar;

  liquid.tag.alias = 'markup';

  liquid.tag.inside['attr-value'].inside.liquid = {
    alias: 'liquid-string',
    pattern: /{[{%]-?[\s\S]+-?[%}]}/,
    inside: liquid
  };

  liquid.tag.inside['special-attr'].push({
    pattern: /{[{%]-?[\s\S]+-?[%}]}/,
    inside
  });

  delete liquid.tag.inside['attr-value'].inside.number;
  delete liquid.tag.inside['attr-value'].inside.boolean;
  delete liquid.tag.inside['attr-value'].inside.script;
  delete liquid.tag.inside['attr-value'].inside['dot-notation'];

  languages.liquid['language-css'] = {
    inside: languages.css,
    lookbehind: true,
    pattern: /(\{%-?\s*style(?:sheet)?\s*-?%\})([\s\S]+?)(?=\{%-?\s*endstyle(?:sheet)?\s*-?%\})/
  };

  languages.liquid['language-javascript'] = {
    inside: languages.javascript,
    lookbehind: true,
    pattern: /(\{%-?\s*javascript\s*-?%\})([\s\S]*?)(?=\{%-?\s*endjavascript\s*-?%\})/
  };

  languages.liquid['language-json'] = {
    inside: languages.json,
    lookbehind: true,
    pattern: /(\{%-?\s*schema\s*-?%\})([\s\S]+?)(?=\{%-?\s*endschema\s*-?%\})/
  };

}
