import { IColor, IToken } from '../../attrs';

export default <IToken<IColor>[]>[
  {
    label: 'Boolean',
    sass: '$papyrus-json-boolean',
    css: '--papyrus-json-boolean',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FF80F4',
      value: '#FF80F4'
    }
  },
  {
    label: 'Comment',
    sass: '$papyrus-json-comment',
    css: '--papyrus-json-comment',
    input: {
      type: 'color',
      format: 'hex',
      default: '#888888',
      value: '#888888'
    }
  },
  {
    label: 'Number',
    sass: '$papyrus-json-number',
    css: '--papyrus-json-number',
    input: {
      type: 'color',
      format: 'hex',
      default: '#9753fd',
      value: '#9753fd'
    }
  },
  {
    label: 'Operator',
    sass: '$papyrus-json-operator',
    css: '--papyrus-json-operator',
    input: {
      type: 'color',
      format: 'hex',
      default: '#E91E63',
      value: '#E91E63'
    }
  },
  {
    label: 'Property',
    sass: '$papyrus-json-property',
    css: '--papyrus-json-property',
    input: {
      type: 'color',
      format: 'hex',
      default: '#81D4FA',
      value: '#81D4FA'
    }
  },
  {
    label: 'Punctuation',
    sass: '$papyrus-json-punctuation',
    css: '--papyrus-json-punctuation',
    input: {
      type: 'color',
      format: 'hex',
      default: '#fafafa',
      value: '#fafafa'
    }
  },
  {
    label: 'Quotes',
    sass: '$papyrus-json-quotes',
    css: '--papyrus-json-quotes',
    input: {
      type: 'color',
      format: 'hex',
      default: '#888888',
      value: '#888888'
    }
  },
  {
    label: 'String',
    sass: '$papyrus-json-string',
    css: '--papyrus-json-string',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FFF9A6',
      value: '#FFF9A6'
    }
  }
];
