import { Papyrus } from '../..';
import { grammars } from '../prism/grammar';

export const grammar = grammars();

/** State Editor Models */
export const model: Map<string, any> = new Map();

export const list = (): Papyrus.Model[] => Array.from(model.values());

export const get = (id: string) => {

  if (typeof id === 'string') {
    if (model.has(id)) return model.get(id);
  } else {
    throw new Error(`𓁁 Papyprus: Invalid id parameter type, expected string, recevied: ${typeof id}`);
  }

  return null;

};
