/* eslint-disable no-control-regex */

import Prism from 'prismjs';

export default function () {

  const anchor = /[*&][^\s[\]{},]+/;
  const ancsrc = anchor.source;
  const tag = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/;
  const properties = '(?:' + tag.source + '(?:[ \t]+' + ancsrc + ')?|' + ancsrc + '(?:[ \t]+' + tag.source + ')?)';
  const plainKey = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source
    .replace(/<PLAIN>/g, function () { return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source; });
  const string = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;

  function createValuePattern (value: string, flags?: string): RegExp {

    flags = (flags || '').replace(/m/g, '') + 'm'; // add m flag
    const { source } = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/;

    const pattern = source
      .replace(/<<prop>>/g, properties)
      .replace(/<<value>>/g, value);

    return RegExp(pattern, flags);

  }

  /**
   * Extended Liquid Language Support
   */
  Prism.languages.yaml = {
    scalar: {
      pattern: RegExp(/([-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source
        .replace(/<<prop>>/g, properties)),
      lookbehind: true,
      alias: 'string'
    },
    comment: /#.*/,
    key: {
      pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source
        .replace(/<<prop>>/g, properties)
        .replace(/<<key>>/g, '(?:' + plainKey + '|' + string + ')')),
      lookbehind: true,
      greedy: true
    },
    directive: {
      pattern: /(^[ \t]*)%.+/m,
      lookbehind: true,
      alias: 'important'
    },
    datetime: {
      pattern: createValuePattern(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),
      lookbehind: true,
      alias: 'number'
    },
    boolean: {
      pattern: createValuePattern(/false|true/.source, 'i'),
      lookbehind: true,
      alias: 'important'
    },
    null: {
      pattern: createValuePattern(/null|~/.source, 'i'),
      lookbehind: true,
      alias: 'important'
    },
    string: {
      pattern: createValuePattern(string),
      lookbehind: true,
      greedy: true
    },
    number: {
      pattern: createValuePattern(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, 'i'),
      lookbehind: true
    },
    tag,
    important: anchor,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
  };

  return Prism.languages.yaml;

}
