// import Prism from 'prismjs';
import { languages, Token, tokenize, withoutTokenizer } from 'prism-code-editor/prism';

export function Treeview () {

  const folders = /(^|[^\\])(?:\/|\^)\s*$/;

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

                  let dirClass = 'dir-open'

                  if(/\^\s*$/.test(content)) {
                    dirClass = 'dir'
                  }

                  // folder
                  // remove trailing /
                  content = content.replace(folders, '$1');
                  classes.push(dirClass);

                } else {

                  // file
                  // remove trailing file marker
                  content = content.replace(/(^|[^\\])[=*|]\s*$/, '$1');
                  const name = content.toLowerCase().replace(/\s+/g, '')
                  const files = [
                    ['sin.lock', 'icon-sin'],
                    ['package.json', 'icon-npm'],
                    ['eslint.config', 'icon-eslint'],
                    ['jsconfig', 'icon-jsconfig'],
                    ['tsconfig', 'icon-tsconfig']
                  ]

                  let known: boolean = false

                  for (const [file, id] of files) {
                    if (content.startsWith(file)) {
                      classes.push(id);
                      known = true
                      break
                    }
                  }

                  if(!known) {

                    if(name.endsWith('.schema.json')) {
                      classes.push('icon-schema');
                    } else {
                      const parts = name.split('.');
                      while (parts.length > 1) {
                        parts.shift();
                        classes.push('icon-file icon-' + parts.join('-'));
                      }
                    }
                  }
                }

                if (content[0] === '.') {

                  const dots = [
                    ['.gitignore', 'icon-git'],
                    ['.prettier', 'icon-prettier'],
                    ['.env', 'icon-env'],
                    ['.npmignore', 'icon-npm'],
                    ['.liquidrc.json', 'icon-liquid'],
                    ['.liquidrc', 'icon-liquid'],
                  ]

                  let found = false
                  for (const [file, id] of dots) {
                    if (content.startsWith(file)) {
                      classes.push(id);
                      found = true
                      break
                    }
                  }

                  if(!found) {
                    classes.push('dotfile');
                  }

                }

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
