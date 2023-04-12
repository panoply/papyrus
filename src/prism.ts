/**
 * IMPORT MODULE
 *
 * PrismJS module import
 */
import Prism from 'prismjs';
import Script from './grammars/script';
import Markup from './grammars/markup';
import { invisible } from './editor/invisible';

Prism.manual = true;
Prism.disableWorkerMessageHandler = true;
Prism.languages.insertBefore('js', 'keyword', Script);
Prism.languages.insertBefore('ts', 'keyword', Script);
Prism.languages.liquid = Prism.languages.extend('markup', Markup);
Prism.languages.html = Prism.languages.extend('markup', Markup);

onmessage = (event) => {

  const { code, language, invisibles } = JSON.parse(event.data);

  if (invisibles !== false) invisible(invisibles)(Prism.languages[language]);

  const output = Prism.highlight(code, Prism.languages[language], language);

  postMessage(output);
};
