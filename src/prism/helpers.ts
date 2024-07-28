import { Grammar } from 'prism-code-editor/prism';

/**
 * Replaces all placeholders "<n>" of given pattern with the n-th replacement (zero based).
 *
 * Note: This is a simple text based replacement. Be careful when using backreferences!
 */
export const replace = (exp: string, v: string[]) => exp.replace(/<(\d+)>/g, (_m, i) => `(?:${v[+i]})`);

export const regex = (exp: string, v: string[], flags?: string) => RegExp(replace(exp, v), flags);

export const comment = () => ({ pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/g, greedy: true });

export const boolean = () => /\b(?:false|true)\b/;

export const string = () => ({ pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\\n])*\1/g, greedy: true });

export const addLang = (grammar: Grammar, language: string) => {

  grammar['language-' + language] = {
    pattern: /[\s\S]+/,
    inside: language
  };

  return grammar;

};

export const addInlined = (tagName: string, language: string) => ({
  pattern: RegExp(`(<${tagName}[^>]*>)(?!</${tagName}>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[\\s\\S])+?(?=</${tagName}>)`, 'gi'),
  lookbehind: true,
  greedy: true,
  inside: addLang({
    'included-cdata': {
      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
      inside: addLang({
        cdata: /^<!\[CDATA\[|\]\]>$/i
      }, language)
    }
  }, language)
});

export const addAttribute = (attrName: string, language: string) => ({
  pattern: RegExp(`((?:^|["'\\s])(?:${attrName})\\s*=\\s*)(?:"[^"]*"|'[^']*'|[^\\s"'=>]+)`, 'gi'),
  lookbehind: true,
  greedy: true,
  inside: addLang({ punctuation: /^["']|["']$/ }, language)
});
