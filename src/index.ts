import { model } from './model';
import { mount } from './modes/mount';
import { create } from './modes/create';
import { Options } from '../types/options';
import { Model } from '../types/model';
import { Instance } from '../index';
import { has, mergeOptions } from './utils';

const papyrus: Partial<Instance> = function papyrus (options: Options) {

  if (document.readyState === 'loading') return;

  const nodes = document.querySelectorAll('pre');

  if (nodes.length > 0) {
    for (const pre of nodes) {
      mount(pre, options);
    }
  }

  return Array.from(model.values());

};

function list (): Model[] {

  return Array.from(model.values());

}

function get (id: string) {

  if (typeof id === 'string') {
    if (model.has(id)) return model.get(id);
    console.error(`𓁁 Papyprus: No code (<pre>) element using id: "${id}"`);
  } else {
    throw new Error(`𓁁 Papyprus: Invalid id parameter type, expected string, recevied: ${typeof id}`);
  }

  return null;

};

function render (code: string, element: string | HTMLElement, options?: Options) {

  const config = mergeOptions(options);
  const generate = create(code, config as Options);
  const output = typeof element === 'string'
    ? document.querySelector<HTMLElement>(element)
    : element;

  output.innerHTML = generate;

  return mount(output, config as Options);

};

if (typeof window !== 'undefined' && has('Papyprus', window) === false) {
  Object.defineProperty(window, 'Papyrus', {
    get () {
      return model;
    }
  });
}

if (has('model', papyrus) === false) {
  Object.defineProperty(papyrus, 'model', {
    get () {
      return model;
    }
  });
}

papyrus.get = get;
papyrus.list = list;
papyrus.render = render;
papyrus.mount = mount;
papyrus.static = create;

export default papyrus;
