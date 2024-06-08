import Prism from 'prismjs';

export default function () {

  Prism.languages.javascript.keyword = [
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|export|from(?=\s*(?:['"]|$))|import)\b/,
      lookbehind: true,
      alias: 'module'
    },
    {
      pattern: /(\b(?:class)\b\s+)/,
      alias: 'class'
    },
    {
      pattern: /((?:^|\})\s*)catch\b/,
      lookbehind: true,
      alias: 'control-flow'
    },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:await|break|case|continue|default|do|else|finally(?=\s*(?:\{|$))|for|if|return|switch|throw|try|while|yield|import|as|export|from|default)\b/,
      lookbehind: true,
      alias: 'control-flow'
    },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|const|debugger|delete|enum|extends|function|(?:get|set)(?=\s*(?:[#[$\w\xA0-\uFFFF]|$))|implements|in|instanceof|let|new|null|of|package|private|protected|public|super|this|typeof\s+|undefined|var|void|with)\b/,
      lookbehind: true,
      inside: {
        this: /\b(this)\b/
      }
    },
    {
      pattern: /(\s+)(\b(?:Boolean|String|Number|Object|Array)\b)/,
      alias: 'type-constructors'
    }
  ];

  Prism.languages.insertBefore('javascript', 'keyword', <Prism.Grammar>{
    variable: {
      pattern: /\b(?:const|var|let)\b/
    },
    'function-name': {
      pattern: /\b(?:function)\b/
    },
    property: {
      lookbehind: true,
      pattern: /(?:import|as|export|from|default)(?=[:])/
    },
    operation: {
      pattern: /(\b(?:typeof|new|of|delete|void|readonly)\b\s+)/,
      global: true
    },
    object: {
      lookbehind: true,
      pattern: /(\s+)\b([a-z_$][\w$]*)(?=[.])/i,
      global: true,
      greedy: true,
      inside: {
        this: /\b(this)\b/
      }
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
      pattern: /(\b(?:return|await|new)\b\s+)/
    },
    numeric: {
      pattern: /(\+{2}|-{2})\w+/,
      lookbehind: true,
      inside: {
        this: /\b(this)\b/
      }
    },
    bracket: {
      pattern: /(\w+)\[.*?\]/,
      lookbehind: true,
      inside: {
        keyword: {
          pattern: /\w+/
        },
        punctuation: {
          pattern: /\[|\]/
        }
      }
    }
  });

  if (Prism.languages.html) {

    const attrs = /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source;
    // @ts-expect-error
    Prism.languages.html.tag.addInlined('script', 'javascript');

    // @ts-expect-error
    Prism.languages.liquid.tag.addInlined('script', 'javascript');

    // add attribute support for all DOM events.
    // https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
    // @ts-expect-error
    Prism.languages.html.tag.addAttribute(attrs, 'javascript');

  }

  return Prism.languages.javascript;

};
