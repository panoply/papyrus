import { Papyrus } from '../';
import { createStatic } from './modes/static';
import { createInline } from './modes/inline';
import { createHighlight } from './modes/highlight';
import { grammars } from './prism/grammar';

grammars();

export default <Papyrus.Node>{
  highlight: createHighlight,
  inline: createInline,
  static: createStatic
};
