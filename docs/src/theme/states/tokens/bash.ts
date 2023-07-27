import { IColor, IToken } from '../../attrs';

export default <IToken<IColor>[]>[
  {
    label: 'Punctuation',
    sass: '$papyrus-punctuation-comment',
    css: '--papyrus-punctuation-comment',
    input: {
      type: 'color',
      format: 'hex',
      default: '#888888',
      value: '#888888'
    }
  },
  {
    label: 'Comment',
    sass: '$papyrus-bash-comment',
    css: '--papyrus-bash-comment',
    input: {
      type: 'color',
      format: 'hex',
      default: '#888888',
      value: '#888888'
    }
  },
  {
    label: 'Argument',
    sass: '$papyrus-bash-argument',
    css: '--papyrus-bash-argument',
    input: {
      type: 'color',
      format: 'hex',
      default: '#888888',
      value: '#888888'
    }
  }
];
