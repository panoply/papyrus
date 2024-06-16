import { IColor, IToken } from '../../attrs';

export default <IToken<IColor>[]>[
  {
    label: 'Attribute Name',
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
    label: 'Attribute Value',
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
    label: 'Delimiter',
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
    label: 'Doctype',
    sass: '$papyrus-html-doctype',
    css: '--papyrus-html-doctype',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FAFAFA',
      value: '#FAFAFA'
    }
  },
  {
    label: 'Equals',
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
    label: 'Tag Name',
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
    label: 'Text Content',
    sass: '$papyrus-html-text-content',
    css: '--papyrus-html-text-content',
    input: {
      type: 'color',
      format: 'hex',
      default: '#FAFAFA',
      value: '#FAFAFA'
    }
  }
];
