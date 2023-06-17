import Prism from 'prismjs';
import Liquid from './languages/liquid';
import TypeScript from './languages/typescript';
import JavaScript from './languages/javascript';
import XML from './languages/xml';
import Yaml from './languages/yaml';
import CSS from './languages/css';
import SCSS from './languages/scss';
import Json from './languages/json';
import Bash from './languages/bash';

export function grammars () {

  JavaScript();
  TypeScript();
  XML();
  Liquid();
  CSS();
  SCSS();
  Yaml();
  Json();
  Bash();

  return Prism;

}
