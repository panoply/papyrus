
import Prism from 'prismjs';

export default function () {

  Prism.languages.treeview = {
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
        }
      }
    }
  };

  Prism.hooks.add('wrap', function (env) {

    if (env.language === 'treeview' && env.type === 'entry-name') {
      const classes = env.classes;
      const folderPattern = /(^|[^\\])\/\s*$/;

      if (folderPattern.test(env.content)) {
        env.content = env.content.replace(folderPattern, '$1'); // remove trailing /
        classes.push('dir');
      } else {

        // file
        // remove trailing file marker

        env.content = env.content.replace(/(^|[^\\])[=*|]\s*$/, '$1');
        const parts = env.content.toLowerCase().replace(/\s+/g, '').split('.');

        while (parts.length > 1) {
          parts.shift();
          // Ex. 'foo.min.js' would become '<span class="token keyword ext-min-js ext-js">foo.min.js</span>'
          classes.push('ext-' + parts.join('-'));
        }
      }

      if (env.content[0] === '.') {
        classes.push('dotfile');
      }
    }
  });

}
