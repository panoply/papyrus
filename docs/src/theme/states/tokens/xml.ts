import { IColor, IToken } from '../../attrs';

export default <IToken<IColor>[]>[
  {
    label: 'Attribute Name',
    sass: '$papyrus-xml-attr-name',
    css: '--papyrus-xml-attr-name',
    input: {
      type: 'color',
      format: 'hex',
      default: '#91EBC2',
      value: '#91EBC2'
    }
  },
  {
    label: 'Attribute Value',
    sass: '$papyrus-xml-attr-value',
    css: '--papyrus-xml-attr-value',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FFF9A6',
      value: '#FFF9A6'
    }
  },
  {
    label: 'Comment',
    sass: '$papyrus-xml-comment',
    css: '--papyrus-xml-comment',
    input: {
      type: 'color',
      format: 'hex',
      default: '#888888',
      value: '#888888'
    }
  },
  {
    label: 'Delimiter',
    sass: '$papyrus-xml-delimiter',
    css: '--papyrus-xml-delimiter',
    input: {
      type: 'color',
      format: 'hex',
      default: '#BECAFF',
      value: '#BECAFF'
    }
  },
  {
    label: 'Equals',
    sass: '$papyrus-xml-equals',
    css: '--papyrus-xml-equals',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FF93BC',
      value: '#FF93BC'
    }
  },
  {
    label: 'Name',
    sass: '$papyrus-xml-name',
    css: '--papyrus-xml-name',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FF93BC',
      value: '#FF93BC'
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
  },
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
    label: 'Tag Name',
    sass: '$papyrus-xml-tag-name',
    css: '--papyrus-xml-tag-name',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FF93BC',
      value: '#FF93BC'
    }
  }
];
