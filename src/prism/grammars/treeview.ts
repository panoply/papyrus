// import Prism from 'prismjs';
import { languages, Token, tokenize, withoutTokenizer } from 'prism-code-editor/prism';

export function Treeview () {

  const folders = /(^|[^\\])\/\s*$/;

  languages.treeview = languages.tree = {
    comment: {
      pattern: /#.*/
    },
    'treeview-part': {
      pattern: /^.+/m,
      inside: {
        'entry-line': [
          {
            pattern: /\|-- |├── /,
            alias: 'line-h'
          },
          {
            pattern: /\| {3}|│ {3}/,
            alias: 'line-v'
          },
          {
            pattern: /`-- |└── /,
            alias: 'line-v-last'
          },
          {
            pattern: / {4}/,
            alias: 'line-v-gap'
          }
        ],
        'entry-name': {
          pattern: /.*\S.*/,
          inside: {
            // symlink
            operator: / -> /
          }
        },
        [tokenize] (code, grammar) {

          const tokens = withoutTokenizer(code, grammar);
          const length = tokens.length;

          let p = 0;
          let i = 0;

          while (i < length) {

            const token = tokens[i++];
            const entries = token.length;

            if (token instanceof Token) {

              let content: string;

              if (token.type === 'entry-name') {

                content = code.slice(p, p + entries);

                const classes: string[] = [ token.type ];

                if (folders.test(content)) {
                  // folder
                  // remove trailing /
                  content = content.replace(folders, '$1');
                  classes.push('dir');

                } else {

                  // file
                  // remove trailing file marker
                  content = content.replace(/(^|[^\\])[=*|]\s*$/, '$1');
                  const parts = content.toLowerCase().replace(/\s+/g, '').split('.');

                  while (parts.length > 1) {
                    parts.shift();
                    classes.push('ext-' + parts.join('-'));
                  }
                }

                if (content[0] === '.') classes.push('dotfile');

                token.type = classes.join(' ');
                token.content = content;

              }

            }

            p += entries;
          }

          // Do something with the tokens
          return tokens;
        }
      }
    }

  };

}
