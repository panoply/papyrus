import { IColor, IToken } from '../../attrs';

export default <IToken<IColor>[]> [
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
    label: 'Objects',
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
    label: 'Filters',
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
    label: 'Operators',
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
    label: 'Tags',
    sass: '$papyrus-liquid-tag-name',
    css: '--papyrus-liquid-tag-name',
    input: {
      type: 'color',
      format: 'hex',
      default: '#E91E63',
      value: '#E91E63'
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
    label: 'Strings',
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
    describe: 'Delimiter token expressions contained within HTML attribute value strings.',
    sass: '$papyrus-liquid-string-delimiters',
    css: '--papyrus-liquid-string-delimiters',
    input: {
      type: 'color',
      format: 'hex',
      default: '#888888',
      value: '#888888'
    }
  }
];
