/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */

import Prism from 'prismjs';
import { IOptions, Languages } from '../../index';

export function invisible (prism: typeof Prism, options: IOptions, language: Languages) {

  if ((
    options.showCRLF === false &&
    options.showSpace === false &&
    options.showCRLF === false &&
    options.showTab === false
  )) return;

  const invisibles: {
    cr?: RegExp;
    lf?: RegExp;
    space?: RegExp;
    crlf?: RegExp;
    tab?: RegExp;
  } = {
    tab: /\t/
  };

  if (options.showCR) invisibles.cr = /\r/;
  if (options.showLF) invisibles.lf = /\n/;
  if (options.showSpace) invisibles.space = / /;
  if (options.showCRLF) invisibles.crlf = /\r\n/;

  /**
   * Handles the recursive calling of `addInvisibles` for one token.
   */
  function handleToken (tokens: object | object[], name: string | number) {

    const value = tokens[name];
    const type = prism.util.type(value);
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
    for (const name in invisibles) {
      if (name in invisibles) grammar[name] = invisibles[name];
    }

    // eslint-disable-next-line no-redeclare
    for (const name in grammar) {
      if (name in grammar && !invisibles[name]) {
        if (name === 'rest') {
          addInvisibles(grammar.rest);
        } else {
          handleToken(grammar, name);
        }
      }
    }

  };

  addInvisibles(prism.languages[language]);
}
