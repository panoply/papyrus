import { model } from './model';
import { mount } from './modes/mount';
import { create } from './modes/create';
import { Options } from '../types/options';
import { Model } from '../types/model';
import { mergeOptions } from './utils';

if (typeof window !== 'undefined' && !('papyrus' in window)) {
  Object.defineProperty(window, 'papyrus', { get () { return model; } });
}

const papyrus: {
  (options?: Options): Model[];
  get(id?: string): Model | Model[];
  static(code: string, options: Options): string;
  render(code: string, element: string | HTMLElement, options?: Options): Model;
  mount(element: string | HTMLElement, options?: Options): Model
} = function papyrus (options: Options) {

  if (document.readyState === 'loading') return;

  document.querySelectorAll('pre').forEach(pre => mount(pre, options));

  return Array.from(model.values());

};

papyrus.get = function get (id?: string) {

  if (typeof id === 'string') {
    if (model.has(id)) return model.get(id);
    console.error(`𓁁 Papyprus: No code (<pre>) element using id: "${id}" `);
    return;
  }

  return Array.from(model.values());

};

papyrus.render = function render (code: string, element: string | HTMLElement, options?: Options) {

  const config = mergeOptions(options);
  const generate = create(code, config as Options);
  const output = typeof element === 'string'
    ? document.querySelector(element) as HTMLElement
    : element;

  output.innerHTML = generate;

  return mount(output, config as Options);

};

papyrus.mount = mount;
papyrus.static = create;

if (!('model' in papyrus)) {
  Object.defineProperty(papyrus, 'model', {
    get () {
      return model;
    }
  });
}

export default papyrus;
