import { IToken, IColor, IRange } from '../attrs';

export const editor: Array<[ string, IToken<IColor | IRange>[]]> = [
  [
    'Base' /* --------------------------------- */
    ,
    [
      {
        label: 'Root',
        description: 'Papyrus uses <strong>em</strong> units. This is the base font <strong>px</strong> size that is used to scale the code regions fonts, lines and other typography stylings.',
        sass: '$papyrus-font-size-root',
        css: '--papyrus-font-size-root',
        input: {
          type: 'range',
          default: '15',
          value: '15',
          min: '2',
          max: '30',
          step: '1',
          unit: 'px'
        }
      },
      {
        label: 'Color',
        description: 'The fallback text color of the code block. This is used when tokens cannot be matched, typically plain text.',
        sass: '$papyrus-code-color',
        css: '--papyrus-code-color',
        input: {
          type: 'color',
          format: 'hex',
          default: '#FFFFFF',
          value: '#FFFFFF'
        }
      }
    ]
  ]
  ,
  [
    'Sizing' /* --------------------------------- */
    ,
    [
      {
        label: 'Font Size',
        sass: '$papyrus-font-size',
        css: '--papyrus-font-size',
        input: {
          type: 'range',
          default: '1',
          value: '1',
          min: '0.1',
          max: '3',
          step: '0.01',
          unit: 'em'
        }
      }
      ,
      {
        label: 'Padding Y',
        sass: '$papyrus-code-padding-y',
        css: '--papyrus-code-padding-y',
        input: {
          type: 'range',
          default: '0.4',
          value: '0.4',
          min: '0',
          max: '5',
          step: '0.1',
          unit: 'em'
        }
      }
      ,
      {
        label: 'Padding X',
        sass: '$papyrus-code-padding-x',
        css: '--papyrus-code-padding-x',
        input: {
          type: 'range',
          default: '0.4',
          value: '0.4',
          min: '0',
          max: '5',
          step: '0.1',
          unit: 'em'
        }
      }
      ,
      {
        label: 'Line Height',
        sass: '$papyrus-line-height',
        css: '--papyrus-line-height',
        input: {
          type: 'range',
          default: '1.7',
          value: '1.7',
          min: '0.1',
          max: '5',
          step: '0.1',
          unit: 'em'
        }
      }
      ,
      {
        label: 'Radius',
        sass: '$papyrus-code-border-radius',
        css: '--papyrus-code-border-radius',
        input: {
          type: 'range',
          default: '0.5',
          value: '0.5',
          min: '0',
          max: '2',
          step: '0.1',
          unit: 'em'
        }
      }
    ]
  ],
  [
    'Backgrounds' /* --------------------------------- */
    ,
    [
      {
        label: 'Preview',
        sass: '$papyrus-body-bg',
        css: '--papyrus-body-bg',
        input: {
          type: 'color',
          format: 'hex',
          default: '#181b20',
          value: '#181b20'
        }
      },
      {
        label: 'Code',
        sass: '$papyrus-code-bg',
        css: '--papyrus-code-bg',
        input: {
          type: 'color',
          format: 'hex',
          default: '#181b20',
          value: '#181b20'
        }
      }
    ]
  ],
  [
    'Scrollbars' /* --------------------------------- */
    ,
    [
      {
        label: 'Width',
        sass: '$papyrus-scrollbar-width',
        css: '--papyrus-scrollbar-width',
        input: {
          type: 'range',
          default: '2',
          value: '2',
          min: '0.5',
          max: '10',
          step: '0.1',
          unit: 'px'
        }
      }
      ,
      {
        label: 'Background',
        sass: '$papyrus-scrollbar-bg',
        css: '--papyrus-scrollbar-bg',
        input: {
          type: 'color',
          format: 'hex',
          default: '#384355',
          value: '#384355'
        }
      }
      ,
      {
        label: 'Thumb',
        sass: '$papyrus-scrollbar-thumb',
        css: '--papyrus-scrollbar-thumb',
        input: {
          type: 'color',
          format: 'hex',
          default: '#384355',
          value: '#384355'
        }
      }
      ,
      {
        label: 'Track',
        sass: '$papyrus-scrollbar-track',
        css: '--papyrus-scrollbar-track',
        input: {
          type: 'color',
          format: 'hex',
          default: '#181b20',
          value: '#181b20'
        }
      },
      {
        label: 'Thumb Hover',
        sass: '$papyrus-scrollbar-thumb-hover',
        css: '--papyrus-scrollbar-thumb-hover',
        input: {
          type: 'color',
          format: 'hex',
          default: '#5f6672',
          value: '#5f6672'
        }
      }
    ]
  ]
  ,
  [
    'Selection' /* ----------------------------- */
    ,
    [
      {
        label: 'Alpha',
        sass: '$papyrus-selection-alpha',
        css: '--papyrus-selection-alpha',
        input: {
          type: 'range',
          default: '0.3',
          value: '0.3',
          min: '0.1',
          max: '1',
          step: '0.01',
          unit: ''
        }
      }
      ,
      {
        label: 'Background',
        sass: '$papyrus-selection-bg',
        css: '--papyrus-selection-bg',
        input: {
          type: 'color',
          format: 'rgb',
          default: '255,255,255',
          value: '255,255,255'
        }
      }
    ]
  ]
  ,
  [

    'Line Highlight' /* ----------------------------- */
    ,
    [
      {
        label: 'Alpha',
        sass: '$papyrus-line-highlight-alpha',
        css: '--papyrus-line-highlight-alpha',
        input: {
          type: 'range',
          default: '0.05',
          value: '0.1',
          min: '0.01',
          max: '1',
          step: '0.01',
          unit: ''
        }
      }
      ,
      {
        label: 'Background',
        sass: '$papyrus-line-highlight-bg',
        css: '--papyrus-line-highlight-bg',
        input: {
          type: 'color',
          format: 'rgb',
          default: '171, 190, 206',
          value: '171, 190, 206'
        }

      }
      ,
      {
        label: 'Number',
        sass: '$papyrus-line-highlight-number',
        css: '--papyrus-line-highlight-number',
        input: {
          type: 'color',
          format: 'hex',
          default: '#fafafa',
          value: '#fafafa'
        }

      }
    ]

  ]
  ,
  [
    'Line Numbers' /* ----------------------------- */
    ,
    [
      {
        label: 'Width',
        sass: '$papyrus-line-number-width',
        css: '--papyrus-line-number-width',
        input: {
          type: 'range',
          default: '3.4',
          value: '3.4',
          min: '1',
          max: '7',
          step: '0.1',
          unit: 'em'
        }
      }
      ,
      {
        label: 'Numbers',
        sass: '$papyrus-line-number-color',
        css: '--papyrus-line-number-color',
        input: {
          type: 'color',
          format: 'hex',
          default: '#363d49',
          value: '#363d49'
        }
      }
      ,
      {
        label: 'Fence',
        sass: '$papyrus-line-fence-color',
        css: '--papyrus-line-fence-color',
        input: {
          type: 'color',
          format: 'hex',
          default: '#363d49',
          value: '#363d49'
        }
      }
    ]
  ]
  ,
  [
    'Invisibles' /* -------------------------------- */
    , [
      {
        label: 'Spaces',
        sass: '$papyrus-invisible-space-color',
        css: '--papyrus-invisible-space-color',
        input: {
          type: 'color',
          format: 'hex',
          default: '#42454D',
          value: '#42454D'
        }
      }
      ,
      {
        label: 'Tabs',
        sass: '$papyrus-invisible-tab-color',
        css: '--papyrus-invisible-tab-color',
        input: {
          type: 'color',
          format: 'hex',
          default: '#808080',
          value: '#808080'
        }
      }
      ,
      {
        label: 'Line Feed',
        sass: '$papyrus-invisible-lf-color',
        css: '--papyrus-invisible-lf-color',
        input: {
          type: 'color',
          format: 'hex',
          default: '#808080',
          value: '#808080'
        }
      }
      ,
      {
        label: 'Carriage Return',
        sass: '$papyrus-invisible-cr-color',
        css: '--papyrus-invisible-cr-color',
        input: {
          type: 'color',
          format: 'hex',
          default: '#808080',
          value: '#808080'
        }
      }
      ,
      {
        label: 'CRLF',
        sass: '$papyrus-invisible-crlf-color',
        css: '--papyrus-invisible-crlf-color',
        input: {
          type: 'color',
          format: 'hex',
          default: '#808080',
          value: '#808080'
        }
      }
    ]
  ]
];
