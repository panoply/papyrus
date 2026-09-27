import type { Theme } from '../generate';

/**
 * Potion (light) - A light variant of the default theme
 */
export const potionLight: Theme = {
  name: 'potion-light',
  scheme: 'light',
  editor: {
    bg: '#fbfbfc',
    fg: '#24292f',
    caret: '#24292f',
    selection: '#0969da33',
    lineNumber: '#b4bcc6',
    lineNumberActive: '#24292f',
    lineActive: '#6e768114',
    fence: '#e1e4e8',
    guide: '#0000001a',
    guideActive: '#00000045',
    matchSelection: '#c9d1d9',
    matchSearch: '#ffdf5d80',
    matchSearchActive: '#ffb86c80',
    matchTag: '#0969da2e',
    bracketActive: '#57606a',
    bracketActiveBg: '#0064001a',
    scrollbarThumb: '#d0d7de',
    scrollbarThumbHover: '#afb8c1',
    scrollbarTrack: '#fbfbfc',
    inlineBg: '#eff1f3',
    inlineFg: '#24292f',
    errorFg: '#24292f',
    errorMuted: '#6e7781',
    errorAccent: '#cf222e'
  },
  widget: {
    bg: '#f6f8fa',
    fg: '#24292f',
    fgActive: '#000000',
    fgMuted: '#57606a',
    border: '#d0d7de',
    inputBg: '#ffffff',
    hover: '#d0d7de80',
    active: '#0969da33',
    focus: '#0969da',
    errorBg: '#ffebe9',
    errorRing: '#cf222e'
  },
  brackets: [
    '#24292f',
    '#c0397a',
    '#0a6ea8',
    '#1a7f37',
    '#8250df',
    '#bc4c00'
  ],
  syntax: {
    comment: '#8b949e',
    important: '#cf1f5e',
    url: '#0a6ea8',
    punctuation: '#24292f',
    delimiter: '#6f7ab8',
    operator: '#cf1f5e',
    keyword: '#cf1f5e',
    control: '#cf1f5e',
    module: '#cf1f5e',
    atrule: '#cf1f5e',
    string: '#9a6b00',
    regex: '#9a6b00',
    number: '#c0397a',
    boolean: '#a626a4',
    nil: '#6f42c1',
    constant: '#0a6ea8',
    variable: '#0a6ea8',
    parameter: '#b35900',
    property: '#0a6ea8',
    function: '#3d8a1f',
    className: '#3d8a1f',
    type: '#0a6ea8',
    builtin: '#0a6ea8',
    this: '#b35900',
    tag: '#d12b6f',
    attrName: '#1a8a5c',
    attrValue: '#9a6b00',
    selector: '#1a8a5c',
    pseudo: '#b35900',
    unit: '#cf1f5e',
    color: '#d6336c',
    entity: '#c0397a',
    heading: '#1a8a5c',
    invalid: '#cf222e'
  },
  languages: {
    html: {
      doctype: '#24292f',
      doctypeName: '#6f7ab8',
      equals: '#d12b6f'
    },
    xml: {
      doctype: '#24292f',
      doctypeName: '#6f7ab8',
      equals: '#d12b6f'
    },
    markdown: {
      blockquote: '#d12b6f',
      list: '#b35900',
      bold: '#6f7ab8',
      italic: '#6f7ab8',
      strike: '#6f7ab8',
      code: '#24292f',
      url: '#8b949e',
      urlContent: '#6f42c1',
      table: '#8b949e',
      tableHeader: '#8b949e',
      container: '#cf1f5e',
      containerName: '#9a6b00'
    },
    css: {
      pseudoClass: '#1a8a5c',
      function: '#3d8a1f',
      variable: '#6f42c1',
      attrPunctuation: '#d12b6f'
    },
    javascript: {
      class: '#0a6ea8',
      functionKeyword: '#0a6ea8',
      object: '#0a6ea8',
      property: '#0b7285',
      propertyAccess: '#24292f',
      boolean: '#c0397a',
      punctuationChars: '#cf1f5e',
      bracket: '#6f42c1',
      bracketProperty: '#b35900',
      interpolation: '#0b7285',
      sinProperty: '#1a8a5c',
      sinClassName: '#4a6fa5',
      sinVariable: '#57606a',
      sinPunctuation: '#57606a'
    },
    typescript: {
      class: '#0a6ea8',
      functionKeyword: '#0a6ea8',
      className: '#0a6ea8',
      object: '#0a6ea8',
      propertyAccess: '#24292f',
      boolean: '#c0397a',
      punctuationChars: '#cf1f5e',
      bracket: '#6f42c1',
      bracketProperty: '#b35900'
    },
    json: {
      number: '#6f42c1'
    },
    yaml: {
      key: '#d12b6f',
      number: '#6f42c1',
      nil: '#a626a4',
      punctuation: '#cf1f5e'
    },
    toml: {
      number: '#6f42c1',
      punctuation: '#cf1f5e',
      table: '#8b949e'
    },
    bash: {
      heading: '#0a6ea8',
      argument: '#c0397a',
      punctuation: '#8b949e'
    },
    treeview: {
      line: '#8b949e'
    }
  }
};
