/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */

import Prism from 'prismjs';
import { InvisibleChars } from '../../index';

export function invisible (options: InvisibleChars) {

  const invisibles: { [K in keyof InvisibleChars]?: RegExp } = {};

  if (options.cr) invisibles.cr = /\r/;
  if (options.lf) invisibles.lf = /\n/;
  if (options.space) invisibles.space = / /;
  if (options.crlf) invisibles.crlf = /\r\n/;

  invisibles.tab = /\t/;

  /**
   * Handles the recursive calling of `addInvisibles` for one token.
   */
  function handleToken (tokens: object | object[], name: string | number) {

    const value = tokens[name];
    const type = Prism.util.type(value);

    switch (type) {
      case 'RegExp':
        var inside = {};
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

  return addInvisibles;
}
