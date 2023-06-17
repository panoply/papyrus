import { IColor, IToken } from '../../attrs';

export default <IToken<IColor>[]>[
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
    label: 'String',
    sass: '$papyrus-json-string',
    css: '--papyrus-json-string',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FFF9A6',
      value: '#FFF9A6'
    }
  },
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
    label: 'Number',
    sass: '$papyrus-json-number',
    css: '--papyrus-json-number',
    input: {
      type: 'color',
      format: 'hex',
      default: '#9753fd',
      value: '#9753fd'
    }
  }
];
