import { model } from './model';
import { mount } from './modes/mount';
import { create } from './modes/create';
import { MountOptions, CreateOptions } from '../types/options';
import { Model } from '../types/model';

if (typeof window !== 'undefined' && !('Prism' in window)) {
  document.onreadystatechange = () => {
    if (document.readyState === 'loading') Object.assign(window, { Prism: { manual: true } });
  };
}

const papyrus: {
  (options?: MountOptions): Model[];
  get(id?: string): Model | Model[];
  create(code: string, options: CreateOptions): string;
  render(code: string, options: CreateOptions): HTMLPreElement;
  mount(element: HTMLElement, options?: MountOptions): Model
} = function papyrus (options: MountOptions) {

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

papyrus.render = function render (code: string, options: CreateOptions) {

  const element = document.createElement('div');
  element.innerHTML = create(code, options);

  return element.firstElementChild as HTMLPreElement;

};

papyrus.mount = mount;
papyrus.create = create;

Object.defineProperty(papyrus, 'model', {
  get () {
    return model;
  }
});

if (typeof window !== 'undefined') {

  Object.defineProperty(window, 'papyrus', {
    get () {
      return model;
    }
  });
}

export default papyrus;
