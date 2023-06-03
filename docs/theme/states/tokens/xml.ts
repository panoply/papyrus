import { IColor, IToken } from '../../attrs';

export default <IToken<IColor>[]>[
  {
    label: 'Prolog',
    sass: '$papyrus-xml-prolog',
    css: '--papyrus-xml-prolog',
    input: {
      type: 'color',
      format: 'hex',
      default: '#BECAFF',
      value: '#BECAFF'
    }
  },
  {
    label: 'Punctuation',
    sass: '$papyrus-html-delimiter',
    css: '--papyrus-html-delimiter',
    input: {
      type: 'color',
      format: 'hex',
      default: '#BECAFF',
      value: '#BECAFF'
    }
  },
  {
    label: 'Tags',
    sass: '$papyrus-html-tag-name',
    css: '--papyrus-html-tag-name',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FF93BC',
      value: '#FF93BC'
    }
  },
  {
    label: 'Attribute',
    sass: '$papyrus-html-attr-name',
    css: '--papyrus-html-attr-name',
    input: {
      type: 'color',
      format: 'hex',
      default: '#91EBC2',
      value: '#91EBC2'
    }
  },
  {
    label: 'Equal',
    sass: '$papyrus-html-equals',
    css: '--papyrus-html-equals',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FF93BC',
      value: '#FF93BC'
    }
  },
  {
    label: 'Value',
    sass: '$papyrus-html-attr-value',
    css: '--papyrus-html-attr-value',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FFF9A6',
      value: '#FFF9A6'
    }
  },
  {
    label: 'Comment',
    sass: '$papyrus-html-comment',
    css: '--papyrus-html-comment',
    input: {
      type: 'color',
      format: 'hex',
      default: '#888888',
      value: '#888888'
    }
  },
  {
    label: 'Prefix',
    sass: '$papyrus-xml-prefix',
    css: '--papyrus-xml-prefix',
    input: {
      type: 'color',
      format: 'hex',
      default: '#BECAFF',
      value: '#BECAFF'
    }
  }
];
