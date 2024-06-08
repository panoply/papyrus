import Prism from 'prismjs';
import Markup from './languages/markup';
import Liquid from './languages/liquid';
import TypeScript from './languages/typescript';
import JavaScript from './languages/javascript';
import XML from './languages/xml';
import Yaml from './languages/yaml';
import CSS from './languages/css';
import SCSS from './languages/scss';
import Json from './languages/json';
import Bash from './languages/bash';
import Treeview from './languages/treeview';

export function grammars () {

  // @ts-ignore
  if (!Prism.papyrus) {

    for (const call of [
      Markup,
      Liquid,
      JavaScript,
      TypeScript,
      XML,
      CSS,
      SCSS,
      Yaml,
      Json,
      Bash,
      Treeview
    ]) call();

    // @ts-ignore
    Prism.papyrus = true;

  }

  return Prism;

}
