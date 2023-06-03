import * as Liquid from '../grammars/liquid';
import * as Style from '../grammars/style';
import Script from '../grammars/script';
import JavaScript from '../grammars/javascript';
import Markup from '../grammars/markup';
import XML from '../grammars/xml';
import JSON from '../grammars/json';
import type Prism from 'prismjs';

/**
 * Apply potion grammar extension
 */
export function loadPotion (prism: typeof Prism) {

  Style.extend(prism);
  Liquid.extend(prism);

  prism.manual = true;
  prism.languages.insertBefore('javascript', 'keyword', JavaScript);
  prism.languages.typescript = prism.languages.extend('js', Script);
  prism.languages.xml = prism.languages.extend('markup', XML);
  prism.languages.liquid = prism.languages.extend('markup', Markup);
  prism.languages.json = JSON;

  return prism;

}
