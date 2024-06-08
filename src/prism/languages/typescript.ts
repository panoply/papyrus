import Prism from 'prismjs';

export default function () {

  Prism.languages.typescript = Prism.languages.extend('javascript', {
    'class-name': {
      pattern: /(\b(?:extends|implements|instanceof|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: true,
      greedy: true,
      inside: null
    },
    builtin: {
      pattern: /(\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b\s+)/,
      global: true
    }
  });

  // The keywords TypeScript adds to JavaScript
  // @ts-ignore
  Prism.languages.typescript.keyword.push(
    /\b(?:abstract|declare|is|keyof|readonly|require|static)\b/,
    // keywords that have to be followed by an identifier
    /\b(?:asserts|infer|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
    // This is for `import type *, {}`
    /\btype\b(?=\s*(?:[{*]|$))/
  );

  // doesn't work with TS because TS is too complex
  // @ts-ignore
  delete Prism.languages.typescript.parameter;
  delete Prism.languages.typescript['literal-property'];

  // a version of typescript specifically for highlighting types
  const typeInside = Prism.languages.extend('typescript', {});

  delete typeInside['class-name'];

  // @ts-ignore
  Prism.languages.typescript['class-name'].inside = typeInside;

  Prism.languages.insertBefore('typescript', 'function', {
    decorator: {
      pattern: /@[$\w\xA0-\uFFFF]+/,
      inside: {
        at: {
          pattern: /^@/,
          alias: 'operator'
        },
        function: /^[\s\S]+/
      }
    },
    'generic-function': {
      // e.g. foo<T extends "bar" | "baz">( ...
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
      greedy: true,
      inside: {
        function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
        generic: {
          pattern: /<[\s\S]+/, // everything after the first <
          alias: 'types',
          inside: typeInside
        }
      }
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
        pattern: /([a-z_$]*?\??:\s+)\b(?:any|boolean|never|number|string|symbol|unknown)\b\s*(?=[),|])/i,
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
    ]
  });

  Prism.languages.insertBefore('typescript', 'operator', {
    'literal-property': {
      pattern: /(\s+=\s+(?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: true,
      alias: 'property'
    }
  });

  Prism.languages.typescript = Prism.languages.extend('typescript', <Prism.Grammar>{
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
        pattern: /\s+\b(?:any|boolean|console|never|number|string|symbol|unknown|Promise|interface)\b\s*(?![:.])/,
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
    }
  });

  Prism.languages.ts = Prism.languages.typescript;
  return Prism.languages.typescript;

};
