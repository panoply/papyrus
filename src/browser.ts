import { Papyrus } from '../index';
import { mount, select } from './modes/mount';
import { get, list, grammar, model } from './utils/shared';
import { has } from './utils/helpers';

const papyrus: Partial<Papyrus.Browser> = function papyrus (options: Papyrus.Options) {

  return select('pre.prism-code-editor', options);

};

if (typeof window !== 'undefined' && has('papyprus', window) === false) {
  Object.defineProperty(window, 'papyrus', {
    get () {
      return model;
    }
  });
}

if (has('model', papyrus) === false) {
  Object.defineProperties(papyrus, {
    model: {
      get () {
        return model;
      }
    },
    grammar: {
      get () {
        return grammar;
      }
    }
  });
}

papyrus.get = get;
papyrus.list = list;

// @ts-expect-error
papyrus.mount = mount;

export default papyrus;
