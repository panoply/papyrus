import type { Theme } from '../generate';

/**
 * Potion (dark) - The default Papyrus theme
 */
export const potion: Theme = {
  name: 'potion',
  scheme: 'dark',
  editor: {
    bg: '#181b20',
    fg: '#fafafa',
    caret: '#ffffff',
    selection: '#ffffff4d',
    lineNumber: '#363d49',
    lineNumberActive: '#fafafa',
    lineActive: '#abbece0d',
    fence: '#363d49',
    guide: '#ffffff1a',
    guideActive: '#ffffff45',
    matchSelection: '#424450',
    matchSearch: '#ffffff40',
    matchSearchActive: '#ffb86c80',
    matchTag: '#8be9fd4f',
    bracketActive: '#b9b9b9',
    bracketActiveBg: '#0064001a',
    scrollbarThumb: '#444b57',
    scrollbarThumbHover: '#5f6672',
    scrollbarTrack: '#181b20',
    inlineBg: '#181b20',
    inlineFg: '#fafafa',
    errorFg: '#ffffff',
    errorMuted: '#808080',
    errorAccent: '#f55968'
  },
  widget: {
    bg: '#21222c',
    fg: '#f8f8f2',
    fgActive: '#ffffff',
    fgMuted: '#b2b2a8',
    border: '#454545',
    inputBg: '#282a36',
    hover: '#5a5d5e80',
    active: '#6272a466',
    focus: '#bd93f9',
    errorBg: '#5a1d1d',
    errorRing: '#ff5555'
  },
  brackets: [
    '#f8f8f2',
    '#ff79c6',
    '#8be9fd',
    '#50fa7b',
    '#bd93f9',
    '#ffb86c'
  ],
  syntax: {
    comment: '#888888',
    important: '#e91e63',
    url: '#81d4fa',
    punctuation: '#fafafa',
    delimiter: '#becaff',
    operator: '#e91e63',
    keyword: '#e91e63',
    control: '#e91e63',
    module: '#e91e63',
    atrule: '#e91e63',
    string: '#fff9a6',
    regex: '#fff9a6',
    number: '#f48fb1',
    boolean: '#ff80f4',
    nil: '#912bff',
    constant: '#8bd3fd',
    variable: '#81d4fa',
    parameter: '#ffab40',
    property: '#81d4fa',
    function: '#9ee34f',
    className: '#9ee34f',
    type: '#8bd3fd',
    builtin: '#81d4fa',
    this: '#ffab40',
    tag: '#ff93bc',
    attrName: '#91ebc2',
    attrValue: '#fff9a6',
    selector: '#91ebc2',
    pseudo: '#e18d27',
    unit: '#e91e63',
    color: '#ff9494',
    entity: '#f48fb1',
    heading: '#91ebc2',
    invalid: '#ff5555'
  },
  languages: {
    html: {
      doctype: '#fafafa',
      doctypeName: '#becaff',
      equals: '#ff93bc'
    },
    xml: {
      doctype: '#fafafa',
      doctypeName: '#becaff',
      equals: '#ff93bc'
    },
    liquid: {
      delimiter: '#fafafa',
      property: '#fafafa',
      filter: '#3defb9',
      number: '#935eff',
      parameter: '#ff953c',
      punctuation: '#e91e63',
      stringDelimiter: '#888888'
    },
    markdown: {
      blockquote: '#ff93bc',
      list: '#ffab40',
      bold: '#becaff',
      italic: '#becaff',
      strike: '#becaff',
      code: '#ffffff',
      url: '#888888',
      urlContent: '#9753fd',
      table: '#888888',
      tableHeader: '#888888',
      container: '#e91e63',
      containerName: '#fff9a6'
    },
    css: {
      number: '#bc85ff',
      operator: '#ff93bc',
      pseudoClass: '#91ebc2',
      function: '#a5d447',
      variable: '#ca99ff',
      attrPunctuation: '#ff93bc'
    },
    scss: {
      number: '#bc85ff',
      operator: '#ff93bc',
      pseudoClass: '#91ebc2',
      function: '#a5d447',
      variable: '#ca99ff'
    },
    javascript: {
      class: '#8bd3fd',
      functionKeyword: '#81d4fa',
      object: '#8bd3fd',
      property: '#22c0cb',
      propertyAccess: '#fafafa',
      boolean: '#f48fb1',
      punctuationChars: '#e91e63',
      bracket: '#8d6fb1',
      bracketProperty: '#ffab40',
      interpolation: '#26f9e7',
      sinProperty: '#91ebc2',
      sinClassName: '#7c9dcd',
      sinVariable: '#efefef',
      sinPunctuation: '#e5e5e5'
    },
    typescript: {
      class: '#8bd3fd',
      functionKeyword: '#81d4fa',
      className: '#81d4fa',
      object: '#8bd3fd',
      propertyAccess: '#fafafa',
      boolean: '#f48fb1',
      punctuationChars: '#e91e63',
      bracket: '#8d6fb1',
      bracketProperty: '#ffab40'
    },
    json: {
      number: '#9753fd'
    },
    yaml: {
      key: '#ff93bc',
      number: '#9753fd',
      nil: '#ff80f4',
      punctuation: '#e91e63'
    },
    toml: {
      number: '#9753fd',
      punctuation: '#e91e63',
      table: '#888888'
    },
    bash: {
      heading: '#338ec8',
      argument: '#f48fb1',
      punctuation: '#888888'
    },
    treeview: {
      line: '#8a8a8a'
    }
  }
};
