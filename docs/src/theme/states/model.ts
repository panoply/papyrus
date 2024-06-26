import { IModel } from '../attrs';
import liquidSample from './samples/liquid';
import liquidTokens from './tokens/liquid';
import htmlSample from './samples/html';
import htmlTokens from './tokens/html';
import spxSample from './samples/spx';
import spxTokens from './tokens/spx';
import xmlSample from './samples/xml';
import xmlTokens from './tokens/xml';
import cssSample from './samples/css';
import cssTokens from './tokens/css';
// import scssSample from './samples/scss';
// import scssTokens from './tokens/scss';
import jsonSample from './samples/json';
import jsonTokens from './tokens/json';
import javascriptSample from './samples/javascript';
import javascriptTokens from './tokens/javascript';
// import jsxSample from './samples/jsx';
// import jsxTokens from './tokens/jsx';
import typescriptSample from './samples/typescript';
import typescriptTokens from './tokens/typescript';
// import tsxSample from './samples/tsx';
// import tsxTokens from './tokens/tsx';
import yamlSample from './samples/yaml';
import yamlTokens from './tokens/yaml';
import bashSample from './samples/bash';
import bashTokens from './tokens/bash';
import treeviewSample from './samples/treeview';
import treeviewTokens from './tokens/treeview';

export const model: IModel = {
  liquid: {
    language: 'Liquid Template Language',
    get sample () { return liquidSample; },
    get tokens () { return liquidTokens; }
  }
  ,
  html: {
    language: 'HTML',
    get sample () { return htmlSample; },
    get tokens () { return htmlTokens; }
  }
  ,
  spx: {
    language: 'SPX',
    alias: 'html',
    get sample () { return spxSample; },
    get tokens () { return spxTokens; }
  }
  ,
  xml: {
    language: 'XML',
    get sample () { return xmlSample; },
    get tokens () { return xmlTokens; }
  }
  ,
  css: {
    language: 'CSS',
    get sample () { return cssSample; },
    get tokens () { return cssTokens; }
  }
  ,
  // scss: {
  //   language: 'SCSS',
  //   get sample () { return scssSample; },
  //   get tokens () { return scssTokens; }
  // }
  // ,
  json: {
    language: 'JSON',
    get sample () { return jsonSample; },
    get tokens () { return jsonTokens; }
  }
  ,
  javascript: {
    language: 'JavaScript',
    get sample () { return javascriptSample; },
    get tokens () { return javascriptTokens; }
  }
  ,
  // jsx: {
  //   language: 'JSX',
  //   get sample () { return jsxSample; },
  //   get tokens () { return jsxTokens; }
  // }
  // ,
  typescript: {
    language: 'TypeScript',
    get sample () { return typescriptSample; },
    get tokens () { return typescriptTokens; }
  }
  ,
  // tsx: {
  //   language: 'TSX',
  //   get sample () { return tsxSample; },
  //   get tokens () { return tsxTokens; }
  // }
  // ,
  yaml: {
    language: 'YAML',
    get sample () { return yamlSample; },
    get tokens () { return yamlTokens; }
  }
  ,
  bash: {
    language: 'Bash',
    get sample () { return bashSample; },
    get tokens () { return bashTokens; }
  }
  ,
  treeview: {
    language: 'Treeview',
    get sample () { return treeviewSample; },
    get tokens () { return treeviewTokens; }
  }
};
