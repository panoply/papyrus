import { IColor, IToken } from '../../attrs';

export default <IToken<IColor>[]>[
  {
    label: 'Comment',
    sass: '$papyrus-yaml-comment',
    css: '--papyrus-yaml-comment',
    input: {
      type: 'color',
      format: 'hex',
      default: '#888888',
      value: '#888888'
    }
  },
  {
    label: 'Punctuation',
    sass: '$papyrus-yaml-punctuation',
    css: '--papyrus-yaml-punctuation',
    input: {
      type: 'color',
      format: 'hex',
      default: '#E91E63',
      value: '#E91E63'
    }
  },
  {
    label: 'String',
    sass: '$papyrus-yaml-string',
    css: '--papyrus-yaml-string',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FFF9A6',
      value: '#FFF9A6'
    }
  },
  {
    label: 'Boolean',
    sass: '$papyrus-yaml-boolean',
    css: '--papyrus-yaml-boolean',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FF80F4',
      value: '#FF80F4'
    }
  },
  {
    label: 'Number',
    sass: '$papyrus-yaml-number',
    css: '--papyrus-yaml-number',
    input: {
      type: 'color',
      format: 'hex',
      default: '#9753fd',
      value: '#9753fd'
    }
  }
];
