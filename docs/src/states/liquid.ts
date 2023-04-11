import { IState } from '../attrs';
import sample from './samples/liquid';

export const liquid: IState = {

  language: 'Liquid Template Language',
  sample,
  theme: new Map(),
  tokens: [
    [
      'Liquid Tokens' /* --------------------------------- */
      ,
      [
        {
          label: 'Delimiters',
          sass: '$papyrus-liquid-delimiters',
          css: '--papyrus-liquid-delimiters',
          input: {
            type: 'color',
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
            default: '#888',
            value: '#888'
          }
        },
        {
          label: 'Boolean',
          sass: '$papyrus-liquid-boolean',
          css: '--papyrus-liquid-boolean',
          input: {
            type: 'color',
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
            default: '#3defb9',
            value: '#3defb9'
          }
        },
        {
          label: 'Strings',
          sass: '$papyrus-liquid-string',
          css: '--papyrus-liquid-string',
          input: {
            type: 'color',
            default: '#FFF9A6',
            value: '#FFF9A6'
          }
        },
        {
          label: 'Operators',
          sass: '$papyrus-liquid-operator',
          css: '--papyrus-liquid-operator',
          input: {
            type: 'color',
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
            default: '#E91E63',
            value: '#E91E63'
          }
        }

      ]
    ],
    [
      'Markup Tokens' /* --------------------------------- */
      ,
      [
        {
          label: 'Plain Text',
          sass: '$papyrus-markup-text-content',
          css: '--papyrus-markup-text-content',
          input: {
            type: 'color',
            default: '#FAFAFA',
            value: '#FAFAFA'
          }
        },
        {
          label: 'Punctuation',
          sass: '$papyrus-markup-delimiter',
          css: '--papyrus-markup-delimiter',
          input: {
            type: 'color',
            default: '#BECAFF',
            value: '#BECAFF'
          }
        },
        {
          label: 'Tags',
          sass: '$papyrus-markup-tag-name',
          css: '--papyrus-markup-tag-name',
          input: {
            type: 'color',
            default: '#FF93BC',
            value: '#FF93BC'
          }
        },
        {
          label: 'Attribute',
          sass: '$papyrus-markup-attr-name',
          css: '--papyrus-markup-attr-name',
          input: {
            type: 'color',
            default: '#91EBC2',
            value: '#91EBC2'
          }
        },
        {
          label: 'Equal',
          sass: '$papyrus-markup-equals',
          css: '--papyrus-markup-equals',
          input: {
            type: 'color',
            default: '#FF93BC',
            value: '#FF93BC'
          }
        },
        {
          label: 'Value',
          sass: '$papyrus-markup-attr-value',
          css: '--papyrus-markup-attr-value',
          input: {
            type: 'color',
            default: '#FFF9A6',
            value: '#FFF9A6'
          }
        },
        {
          label: 'Comment',
          sass: '$papyrus-markup-comment',
          css: '--papyrus-markup-comment',
          input: {
            type: 'color',
            default: '#888888',
            value: '#888888'
          }
        }
      ]
    ]
  ]
};
