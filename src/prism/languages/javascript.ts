
import Prism from 'prismjs';

export default function () {

  Prism.languages.insertBefore('javascript', 'keyword', <Prism.Grammar>{
    variable: {
      pattern: /\b(?:const|var|let)\b/
    },
    'function-name': {
      pattern: /\b(?:function)\b/
    },
    module: {
      pattern: /\b(?:import|as|export|from|default)\b/
    },
    operation: {
      pattern: /\b(?:typeof|new|of|delete|void|readonly)\b/
    },
    object: {
      lookbehind: true,
      pattern: /(\s+)\b([a-z_$][\w$]*)(?=[.])/
    },
    'punctuation-chars': {
      pattern: /[.,]/,
      global: true
    },
    semi: {
      pattern: /[;]/,
      global: true
    },
    nil: {
      pattern: /\b(?:null|undefined)\b/
    },
    'browser-objects': {
      pattern: /\b(?:window|document|console)\b/
    },
    flow: {
      pattern: /\b(?:return|await|new)\b/
    }
  });

  return Prism.languages.javascript;

};
