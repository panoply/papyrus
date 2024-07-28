/* eslint-disable no-control-regex */

import { languages } from 'prism-code-editor/prism';
import { regex, replace } from '../helpers';

export function YAML () {

  // https://yaml.org/spec/1.2/spec.html#c-ns-anchor-property
  // https://yaml.org/spec/1.2/spec.html#c-ns-alias-node
  const anchorOrAlias = /[*&][^\s[\]{},]+/;
  // https://yaml.org/spec/1.2/spec.html#c-ns-tag-property
  const tag = /!(?:<[\w%#;/?:@&=$,.!~*'()[\]+-]+>|(?:[a-zA-Z\d-]*!)?[\w%#;/?:@&=$.~*'()+-]+)?/;
  // https://yaml.org/spec/1.2/spec.html#c-ns-properties(n,c)
  const properties = `(?:${tag.source}(?:[ \t]+${anchorOrAlias.source})?|${anchorOrAlias.source}(?:[ \t]+${tag.source})?)`;
  // https://yaml.org/spec/1.2/spec.html#ns-plain(n,c)
  // This is a simplified version that doesn't support "#" and multiline keys
  // All these long scarry character classes are simplified versions of YAML's characters
  const plainKey = replace(
    /(?:[^\s\0-\x08\x0e-\x1f!"#%&'*,:>?@[\]{}`|\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff-]|[?:-]<0>)(?:[ \t]*(?:(?![#:])<0>|:<0>))*/.source,
    [ /[^\s\0-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source ]
  );
  const string = /"(?:\\.|[^\\\n"])*"|'(?:\\.|[^\\\n'])*'/.source;

  /**
 * @param {string} value
 * @param {string} [flags]
 */
  const createValuePattern = (value: string, flags: string) => regex(
    /([:,[{-]\s*(?:\s<0>[ \t]+)?)<1>(?=[ \t]*(?:$|,|\]|\}|(?:\n\s*)?#))/.source,
    [ properties, value ], flags
  );

  languages.yml = languages.yaml = {
    scalar: {
      pattern: regex(/([:-]\s*(?:\s<0>[ \t]+)?[|>])[ \t]*(?:(\n[ \t]+)\S.*(?:\2.+)*)/.source, [ properties ]),
      lookbehind: true,
      alias: 'string'
    },
    comment: /#.*/,
    key: {
      pattern: regex(
        /((?:^|[:,[{\n?-])[ \t]*(?:<0>[ \t]+)?)<1>(?=\s*:\s)/.source,
        [ properties, '(?:' + plainKey + '|' + string + ')' ], 'g'
      ),
      lookbehind: true,
      greedy: true,
      alias: 'atrule'
    },
    directive: {
      pattern: /(^[ \t]*)%.+/m,
      lookbehind: true,
      alias: 'important'
    },
    datetime: {
      pattern: createValuePattern(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d\d:\d\d(?:\.\d*)?(?:[ \t]*(?:Z|[+-]\d\d?(?::\d\d)?))?|\d{4}-\d\d-\d\d|\d\d?:\d\d(?::\d\d(?:\.\d*)?)?/.source, 'm'),
      lookbehind: true,
      alias: 'number'
    },
    boolean: {
      pattern: createValuePattern(/false|true/.source, 'im'),
      lookbehind: true,
      alias: 'important'
    },
    null: {
      pattern: createValuePattern(/null|~/.source, 'im'),
      lookbehind: true,
      alias: 'important'
    },
    string: {
      pattern: createValuePattern(string, 'mg'),
      lookbehind: true,
      greedy: true
    },
    number: {
      pattern: createValuePattern(/[+-]?(?:0x[a-f\d]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, 'im'),
      lookbehind: true
    },
    tag,
    important: anchorOrAlias,
    punctuation: /---|[:[\]{},|>?-]|\.{3}/
  };

}
