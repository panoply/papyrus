// import Prism from 'prismjs';
import { Grammar, GrammarToken, languages } from 'prism-code-editor/prism';
import { extend, insertBefore } from 'prism-code-editor/prism/utils';
import { Merge } from 'type-fest';

export function TypeScript () {

  const className: GrammarToken = {
    pattern: /(\b(?:extends|implements|instanceof|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
    lookbehind: true,
    greedy: true
  };

  const typescript = languages.ts = languages.typescript = extend('js', {
    'class-name': className,
  }) as Merge<Grammar, { keyword: RegExp[] }>;

  insertBefore(typescript, 'operator', {
    builtin: {
      pattern: /(\b(?:Array|Function|Promise|any|boolean|console|never|number|object|string|symbol|unknown)\b\s+)/,
      global: true
    },
    'literal-property': {
      pattern: /(\s+=\s+(?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: true,
      alias: 'property'
    }
  });

  // The keywords TypeScript adds to JavaScript
  typescript.keyword.push(
    /\b(?:abstract|declare|is|keyof|readonly|require|static)\b/,
    // keywords that have to be followed by an identifier
    /\b(?:asserts|infer|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
    // This is for `import type *, {}`
    /\btype\b(?=\s*(?:[{*]|$))/,
  );

  // doesn't work with TS because TS is too complex
  delete typescript.parameter;
  delete typescript['literal-property'];

  // a version of typescript specifically for highlighting types
  const typeInside = className.inside = Object.assign({}, typescript);

  delete typeInside['class-name'];
  delete typeInside['maybe-class-name'];

  insertBefore(typescript, 'function', {
    decorator: {
      pattern: /@[$\w\xa0-\uffff]+/,
      inside: {
        at: {
          pattern: /^@/,
          alias: 'operator'
        },
        function: /.+/
      }
    },
    'generic-function': {
    // e.g. foo<T extends "bar" | "baz">( ...
      pattern: /#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+\s*<(?:[^<>=]|=[^<]|=?<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/g,
      greedy: true,
      inside: {
        generic: {
          pattern: /<[\s\S]+/, // everything after the first <
          alias: 'class-name',
          inside: typeInside
        },
        function: /\S+/
      }
    }
  });

  languages.typescript = extend('javascript', {
    'class-name': {
      pattern: /(\b(?:extends|implements|instanceof|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: true,
      greedy: true,
      inside: null
    },
    builtin: {
      pattern: /(\b(?:Array|Function|Promise|any|boolean|console|never|object|number|string|symbol|unknown)\b\s+)/,
      global: true
    },
    parameter: [
      {
        pattern: /(\s*[a-z_$]*?\s*\()\s*[a-z_$][\w$]+(?=\?:\s*)/i,
        lookbehind: true,
        global: true,
        alias: 'optional'
      },
      {
        pattern: /(\s*[a-z_$]*?\s*\()\s*[a-z_$][\w$]+(?=:\s*)/i,
        lookbehind: true,
        global: true
      },
      {
        pattern: /([a-z_$]*?\??:\s+)\b(?:any|object|boolean|never|number|string|symbol|unknown)\b\s*(?=[),|])/i,
        lookbehind: true,
        global: true,
        greedy: true,
        alias: 'builtin'
      },
      {
        pattern: /(\s*[a-z_$]*?\s*\(.*?,\s+)[a-z_$][\w$]+(?=\??:)/i,
        lookbehind: true,
        greedy: true
      }
    ],
    'punctuation-chars': {
      pattern: /[.,]/,
      global: true
    },
    semi: {
      pattern: /[;]/,
      global: true
    },
    nil: {
      pattern: /\b(?:null|undefined)\b/
    },
    'browser-objects': {
      pattern: /\b(?:window|document|console)\b/
    },
    types: [
      {
        pattern: /\s*\b(?:any|boolean|console|object|never|number|string|symbol|unknown|Promise|interface)\b\s*(?![:.])/,
        global: true
      },
      {
        pattern: /\s+\b(?:any|boolean|object|console|never|number|string)(?=\[\])/,
        global: true
      }
    ],
    'type-array': {
      pattern: /\[\]/,
      global: true
    },
    'type-object': {
      pattern: /\{\}/,
      global: true
    },
    'return-type': {
      pattern: /(\)):(?=\s)/,
      global: true,
      lookbehind: true
    },
    'extends-class': {
      lookbehind: true,
      pattern: /(extends)\s+\b[a-z_$][\w$]*\.[a-z_$][\w$.]*\s*(?=[<{])/i,
      global: true,
      greedy: true,
      inside: {
        object: /(\s+)\b([a-z_$][\w$]*)(?=[.])/i,
        punctuation: /\./,
        class: {
          pattern: /(\b[\w$]*\.)\b([a-z_$][\w$]*)\s+/i,
          lookbehind: true,
          global: true,
          greedy: true
        }
      }
    },
    flow: {
      pattern: /\b(?:return|await)\b/
    },
    method: {
      pattern: /(\.\s*)[a-z_$][\w$]*(?=(\())/i,
      lookbehind: true
    },
    'import-type': {
      pattern: /(\bimport)\b \b(?:type)\b(?= )/,
      lookbehind: true
    }
  });

};
