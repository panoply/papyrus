import type { Theme } from '../generate';

/**
 * GitHub Light - Based on the GitHub Primer light syntax palette
 */
export const githubLight: Theme = {
  name: 'github-light',
  scheme: 'light',
  editor: {
    bg: '#ffffff',
    fg: '#24292e',
    caret: '#24292e',
    selection: '#add6ff',
    lineNumber: '#1b1f2380',
    lineNumberActive: '#1f2328',
    lineActive: '#f6f8fa',
    fence: '#d0d7de',
    guide: '#1f23281f',
    guideActive: '#1f23284d',
    matchSelection: '#34d05840',
    matchSearch: '#ffdf5d66',
    matchSearchActive: '#e9e5ba',
    matchTag: '#eaeef2',
    bracketActive: '#34d05899',
    bracketActiveBg: '#35d05940',
    scrollbarThumb: '#d0d7de',
    scrollbarThumbHover: '#afb8c1',
    scrollbarTrack: '#ffffff',
    inlineBg: '#afb8c133',
    inlineFg: '#24292e',
    errorFg: '#24292e',
    errorMuted: '#6a737d',
    errorAccent: '#cf222e'
  },
  widget: {
    bg: '#f6f8fa',
    fg: '#434d56',
    fgActive: '#000000',
    fgMuted: '#5a6772',
    border: '#bfbfbf',
    inputBg: '#fafbfc',
    hover: '#b8b8b84f',
    active: '#2188ff33',
    focus: '#007acc',
    errorBg: '#f2dede',
    errorRing: '#be1100'
  },
  brackets: [
    '#0366d6',
    '#138934',
    '#b37700',
    '#cb2431',
    '#a43276',
    '#8a3ddb'
  ],
  syntax: {
    comment: '#6a737d',
    important: '#d73a49',
    url: '#032f62',
    punctuation: '#24292e',
    delimiter: '#24292e',
    operator: '#d73a49',
    keyword: '#d73a49',
    control: '#d73a49',
    module: '#d73a49',
    atrule: '#e36209',
    string: '#032f62',
    regex: '#032f62',
    number: '#005cc5',
    boolean: '#005cc5',
    nil: '#005cc5',
    constant: '#005cc5',
    variable: '#e36209',
    parameter: '#e36209',
    property: '#005cc5',
    function: '#6f42c1',
    className: '#e36209',
    type: '#005cc5',
    builtin: '#005cc5',
    this: '#005cc5',
    tag: '#22863a',
    attrName: '#005cc5',
    attrValue: '#032f62',
    selector: '#22863a',
    pseudo: '#6f42c1',
    unit: '#d73a49',
    color: '#005cc5',
    entity: '#d73a49',
    heading: '#005cc5',
    invalid: '#ff1212cc'
  },
  languages: {
    css: {
      function: '#005cc5'
    },
    scss: {
      function: '#005cc5'
    },
    javascript: {
      object: '#24292e',
      interpolation: '#032f62'
    },
    typescript: {
      object: '#24292e',
      interpolation: '#032f62'
    },
    markdown: {
      list: '#e36209',
      url: '#24292e',
      urlContent: '#032f62',
      code: '#005cc5'
    },
    yaml: {
      key: '#22863a'
    },
    bash: {
      punctuation: '#6a737d'
    },
    treeview: {
      line: '#6a737d'
    }
  }
};
