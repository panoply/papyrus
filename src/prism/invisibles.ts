/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */

import Prism from 'prismjs';
import { Languages, Options } from '../../index';

export function invisibles (language: Languages, options: Options) {

  if (
    options.showLF === false &&
    options.showCR === false &&
    options.showSpace === false &&
    options.showCRLF === false &&
    options.showTab === false) return;

  const config: {
    cr?: RegExp;
    lf?: RegExp;
    space?: RegExp;
    crlf?: RegExp;
    tab?: RegExp;
  } = {
    tab: /\t/
  };

  if (options.showTab) config.tab = /\t/;
  if (options.showCR) config.cr = /\r/;
  if (options.showLF) config.lf = /\n/;
  if (options.showSpace) config.space = / /;
  if (options.showCRLF) config.crlf = /\r\n/;

  /**
   * Handles the recursive calling of `addInvisibles` for one token.
   */
  function handleToken (tokens: object | object[], name: string | number) {

    const value = tokens[name];
    const type = Prism.util.type(value);

    switch (type) {
      case 'RegExp':
        var inside: any = {};
        tokens[name] = { pattern: value, inside };
        addInvisibles(inside);
        break;
      case 'Array':
        for (let i = 0, l = value.length; i < l; i++) handleToken(value, i);
        break;
      default:
        // eslint-disable-next-line
        var inside = value.inside || (value.inside = {});
        addInvisibles(inside);
        break;
    }
  }

  /**
 * Recursively adds patterns to match invisible characters to the
 * given grammar (if not added already).
 */
  function addInvisibles (grammar: any) {

    if (!grammar || grammar.tab) return;

    // assign invisibles here to "mark" the grammar in case of self references
    for (const name in config) if (name in config) grammar[name] = config[name];

    // eslint-disable-next-line no-redeclare
    for (const name in grammar) {
      if (name in grammar && !config[name]) {
        if (name === 'rest') {
          addInvisibles(grammar.rest);
        } else {
          handleToken(grammar, name);
        }
      }
    }

  };

  addInvisibles(Prism.languages[language]);

}
