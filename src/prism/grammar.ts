import { Grammar, languages } from 'prism-code-editor/prism';
import { Markup } from './grammars/markup';
import { Liquid } from './grammars/liquid';
import { TypeScript } from './grammars/typescript';
import { JavaScript } from './grammars/javascript';
import { YAML } from './grammars/yaml';
import { Toml } from './grammars/toml';
import { CSS } from './grammars/css';
import { SCSS } from './grammars/scss';
import { Json } from './grammars/json';
import { Bash } from './grammars/bash';
import { Treeview } from './grammars/treeview';

const grammars: { (): Record<string, Grammar>; defined: boolean; } = function grammar () {

  if (!grammars.defined) {

    for (const call of [
      Markup,
      JavaScript,
      TypeScript,
      Liquid,
      CSS,
      SCSS,
      YAML,
      Toml,
      Json,
      Bash,
      Treeview
    ]) call();

    grammars.defined = true;

  }

  return languages;

};

grammars.defined = false;

export { grammars };
