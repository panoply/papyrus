import m from 'mithril';
import { IAttrs, IColor, IModel, IRange, ISelect, IState, ISwitch, IToken } from './attrs';
import { xml } from './states/xml';
import { html } from './states/html';
import { liquid } from './states/liquid';
import { css } from './states/css';
import { scss } from './states/scss';
import { yaml } from './states/yaml';
import { json } from './states/json';
import { jsx } from './states/jsx';
import { shell } from './states/shell';
import { tsx } from './states/tsx';
import { editor } from './states/editor';
import { javascript } from './states/javascript';
import { typescript } from './states/typescript';
import { Layout } from './components/layout';
import { Landing } from './components/landing';

// eslint-disable-next-line no-unused-vars
function replace (model: IModel) {

  const style: Map<string, string> = new Map();
  const element = document.createElement('style');
  const node = document.head.appendChild(element);

  for (const language in model) {

    const item = model[language];

    if (Array.isArray(item) === false) {
      for (const state of (item as IState).tokens) {
        for (const token of state[1]) {
          style.set(token.css, token.input.value);
        }
      }
    } else {

      for (const state of item) {
        for (const token of (state[1] as IToken<IColor | ISelect | ISwitch | IRange>[])) {
          if (token.input.type === 'range') {
            style.set(token.css, token.input.value + token.input.unit);
          } else {
            style.set(token.css, token.input.value);
          }
        }
      }
    }
  }

  function write () {

    const string = [ ':root {' ];

    for (const [ variable, hex ] of style.entries()) string.push(`${variable}: ${hex};`);

    string.push('}');
    node.innerHTML = string.join('\n  ');

  };

  write();

  return {
    write,
    map: style,
    get css () {
      const vars: string[] = [];
      for (const [ variable, hex ] of style.entries()) vars.push(`${variable}: ${hex};`);
      return vars.join('\n');
    },
    get sass () {
      const vars: string[] = [];
      for (const [ variable, hex ] of style.entries()) vars.push(`$${variable.slice(2)}: ${hex};`);
      return vars.join('\n');
    }
  };
}

function render () {

  const model = localStorage.getItem('cache') !== null ? JSON.parse(localStorage.getItem('cache')) : {
    editor,
    liquid,
    html,
    xml,
    json,
    javascript,
    jsx,
    typescript,
    tsx,
    css,
    scss,
    shell,
    yaml
  };

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
    get state () {
      return model[attrs.language];
    },
    model,
    style: replace(model),
    cache: {
      save () {
        localStorage.removeItem('cache');
        localStorage.setItem('cache', JSON.stringify(model));
      },
      merge () {

      }
    }
  };

  attrs.cache.merge();

  m.route(document.body, '/', {
    '/': Landing,
    '/:language': Layout(attrs)
  });

}

export default render();
