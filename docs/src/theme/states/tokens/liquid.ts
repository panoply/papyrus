import { IColor, IToken } from '../../attrs';

export default <IToken<IColor>[]> [
  {
    label: 'Boolean',
    sass: '$papyrus-liquid-boolean',
    css: '--papyrus-liquid-boolean',
    input: {
      type: 'color',
      format: 'hex',
      default: '#ff80f4',
      value: '#ff80f4'
    }
  },
  {
    label: 'Comment',
    sass: '$papyrus-liquid-comment',
    css: '--papyrus-liquid-comment',
    input: {
      type: 'color',
      format: 'hex',
      default: '#888888',
      value: '#888888'
    }
  },
  {
    label: 'Delimiters',
    sass: '$papyrus-liquid-delimiters',
    css: '--papyrus-liquid-delimiters',
    input: {
      type: 'color',
      format: 'hex',
      default: '#fafafa',
      value: '#fafafa'
    }
  },
  {
    label: 'Fallback',
    sass: '$papyrus-liquid-fallback',
    css: '--papyrus-liquid-fallback',
    input: {
      type: 'color',
      format: 'hex',
      default: '#fafafa',
      value: '#fafafa'
    }
  },
  {
    label: 'Filter Name',
    sass: '$papyrus-liquid-filter-name',
    css: '--papyrus-liquid-filter-name',
    input: {
      type: 'color',
      format: 'hex',
      default: '#3defb9',
      value: '#3defb9'
    }
  },
  {
    label: 'Number',
    sass: '$papyrus-liquid-number',
    css: '--papyrus-liquid-number',
    input: {
      type: 'color',
      format: 'hex',
      default: '#935eff',
      value: '#935eff'
    }
  },
  {
    label: 'Object Name',
    sass: '$papyrus-liquid-object-name',
    css: '--papyrus-liquid-object-name',
    input: {
      type: 'color',
      format: 'hex',
      default: '#81d4fa',
      value: '#81d4fa'
    }
  },
  {
    label: 'Object Property',
    sass: '$papyrus-liquid-object-prop',
    css: '--papyrus-liquid-object-prop',
    input: {
      type: 'color',
      format: 'hex',
      default: '#fafafa',
      value: '#fafafa'
    }
  },
  {
    label: 'Operator',
    sass: '$papyrus-liquid-operator',
    css: '--papyrus-liquid-operator',
    input: {
      type: 'color',
      format: 'hex',
      default: '#E91E63',
      value: '#E91E63'
    }
  },
  {
    label: 'Output',
    sass: '$papyrus-liquid-output',
    css: '--papyrus-liquid-output',
    input: {
      type: 'color',
      format: 'hex',
      default: '#81d4fa',
      value: '#81d4fa'
    }
  },
  {
    label: 'Parameter',
    sass: '$papyrus-liquid-parameter',
    css: '--papyrus-liquid-parameter',
    input: {
      type: 'color',
      format: 'hex',
      default: '#ff953c',
      value: '#ff953c'
    }
  },
  {
    label: 'Punctuation',
    sass: '$papyrus-liquid-punctuation',
    css: '--papyrus-liquid-punctuation',
    input: {
      type: 'color',
      format: 'hex',
      default: '#E91E63',
      value: '#E91E63'
    }
  },
  {
    label: 'String',
    sass: '$papyrus-liquid-string',
    css: '--papyrus-liquid-string',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FFF9A6',
      value: '#FFF9A6'
    }
  },
  {
    label: 'String Delimiters',
    sass: '$papyrus-liquid-string-delimiters',
    css: '--papyrus-liquid-string-delimiters',
    describe: 'Delimiter token expressions contained within HTML attribute value strings.',
    input: {
      type: 'color',
      format: 'hex',
      default: '#888888',
      value: '#888888'
    }
  },
  {
    label: 'String Object Name',
    sass: '$papyrus-liquid-string-object-name',
    css: '--papyrus-liquid-string-object-name',
    input: {
      type: 'color',
      format: 'hex',
      default: '#81d4fa',
      value: '#81d4fa'
    }
  },
  {
    label: 'Tag',
    sass: '$papyrus-liquid-tag',
    css: '--papyrus-liquid-tag',
    input: {
      type: 'color',
      format: 'hex',
      default: '#E91E63',
      value: '#E91E63'
    }
  }
];
