import m from 'mithril';
import papyrus, { Languages } from 'papyrus';
import { IAttrs, IEditor, IModel } from './attrs';
import { Layout } from './components/layout';
import { Landing } from './components/landing';
import { editor } from './states/editor';
import { model } from './states/model';

// eslint-disable-next-line no-unused-vars
function replace (model: IModel, editor: IEditor) {

  const style: Map<string, string> = new Map();
  const element = document.createElement('style');
  const node = document.head.appendChild(element);

  for (const lang in model) {
    for (let i = 0; i < model[lang].tokens.length; i++) {
      const token = model[lang].tokens[i];
      style.set(token.css, token.input.value);
    }
  }

  for (let i = 0; i < editor.length; i++) {
    for (let x = 0; x < editor[i][1].length; x++) {
      const token = editor[i][1][x];
      if (token.input.type === 'range') {
        style.set(token.css, token.input.value + token.input.unit);
      } else {
        style.set(token.css, token.input.value);
      }
    }
  }

  function write () {

    const string = [ ':root {' ];

    for (const [ variable, hex ] of style.entries()) {

      string.push(`${variable}: ${hex};`);

    }

    string.push('}');
    node.innerHTML = string.join('\n  ');

  };

  write();

  const languages = new RegExp(
    '(' + Object
      .keys(model)
      .map(n => n === 'typescript' ? 'ts' : n === 'javascript' ? 'js' : n)
      .join('|') +
     ')'
  );

  function variables (top: string[], vars: string[]) {

    let currLang: any;

    const comments = (variable: string, entry: string) => {

      if (languages.test(variable)) {

        const langName = variable.match(languages);

        if (currLang !== langName[1]) {

          currLang = langName[1];

          if (currLang === 'ts') {
            vars.push('\n/* TypeScript */\n');
          } else if (currLang === 'js') {
            vars.push('\n/* JavaScript */\n');
          } else {
            vars.push(`\n/* ${currLang.toUpperCase()} */\n`);
          }

        }

        vars.push(entry);

      } else {

        if (currLang !== 'settings') {

          currLang = 'settings';
          top.push('\n/* Papyrus Settings */\n');

        }

        top.push(entry);
      }
    };

    return { comments, write: () => top.join('\n') };
  }

  return {
    write,
    map: style,
    get css () {

      const vars: string[] = [];
      const sort = variables([], vars);

      for (const [ variable, hex ] of style.entries()) {
        sort.comments(variable, `--${variable.slice(2)}: ${hex};`);
      }

      return sort.write() + '\n' + vars.join('\n');

    },
    get sass () {

      const vars: string[] = [];
      const sort = variables([], vars);

      for (const [ variable, hex ] of style.entries()) {
        sort.comments(variable, `$${variable.slice(2)}: ${hex};`);
      }

      return sort.write() + '\n' + vars.join('\n');
    }
  };
}

function render () {

  const style = replace(model, editor);

  const attrs: IAttrs = {
    language: 'liquid',
    settings: false,
    preview: {
      opened: 0,
      background: '#101215',
      tabs: [
        {
          active: true,
          label: 'Preview'
        },
        {
          active: false,
          label: 'CSS Vars'
        },
        {
          active: false,
          label: 'SASS Vars'
        }
      ]
    },
    get editor () {
      return editor;
    },
    get state () {
      return attrs.model[attrs.language];
    },
    get model () {
      return model;
    },
    mode () {
      return papyrus.model.has('editor') ? papyrus.get('editor').mode : null;
    },
    style,
    papyrus: {
      input: '',
      language: 'liquid',
      lineNumbers: true,
      editor: {
        tabIndent: true,
        indentChar: 'space',
        indentSize: 2,
        lineHighlight: true,
        lineIndent: true,
        locLimit: 2000,
        renderSpace: false,
        renderTab: false,
        spellcheck: false
      },
      showCR: false,
      showCRLF: false,
      showLF: false,
      showSpace: false,
      trimEnd: true,
      trimStart: true
    },
    cache: {
      reset,
      get (store: 'editor' | 'tokens') {
        const cache = JSON.parse(localStorage.getItem(store));
        return cache;
      },
      save (store) {

        localStorage.removeItem(store);
        localStorage.setItem(store, JSON.stringify(model));

        papyrus.get('css-vars').update(style.css);
        papyrus.get('scss-vars').update(style.sass);

      }
    }
  };

  m.route(document.body, '/', {
    '/': Landing,
    '/:language': Layout(attrs)
  });

  /**
   * Cache Reset
   */
  function reset (language?: Languages | 'editor') {

    const store = language ? language === 'editor' ? 'editor' : 'tokens' : 'all';

    if (store === 'tokens') {

      const read: IModel = JSON.parse(localStorage.getItem(store));

      for (let i = 0; i < read[language].tokens.length; i++) {

        const cache = read[language].tokens[i];
        const state = model[language].tokens[i];

        if (state.input.value !== state.input.default) {
          state.input.value = state.input.default;
        }

        cache.input.value = state.input.value;

      }

      localStorage.removeItem(store);
      localStorage.setItem(store, JSON.stringify(read));

    } if (store === 'editor') {

      const read: IEditor = JSON.parse(localStorage.getItem(store));

      for (let i = 0; i < read.length; i++) {
        for (let x = 0; x < read[i][1].length; x++) {
          const cache = read[i][1][x];
          const state = editor[i][1][x];

          if (state.input.value !== state.input.default) {
            state.input.value = state.input.default;
          }

          cache.input.value = state.input.value;
        }
      }

      localStorage.removeItem(store);
      localStorage.setItem(store, JSON.stringify(read));

    } else {

      for (let i = 0; i < editor.length; i++) {
        for (let x = 0; x < editor[i][1].length; x++) {
          const state = editor[i][1][x];
          if (state.input.value !== state.input.default) {
            state.input.value = state.input.default;
          }
        }
      }

      localStorage.removeItem('editor');
      localStorage.setItem('editor', JSON.stringify(editor));

      for (const lang in model) {
        for (let i = 0; i < model[lang].tokens.length; i++) {
          const state = model[lang].tokens[i];
          if (state.input.value !== state.input.default) {
            state.input.value = state.input.default;
          }
        }
      }

      localStorage.removeItem('tokens');
      localStorage.setItem('tokens', JSON.stringify(model));

    }

    attrs.style.write();

  }

}

export default render();
