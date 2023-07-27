import { IColor, IToken } from '../../attrs';

export default <IToken<IColor>[]>[
  {
    label: 'Trunk Line Width',
    sass: '$papyrus-treeview-width',
    css: '--papyrus-treeview-width',
    input: {
      type: 'range',
      default: '0.017',
      value: '0.07',
      min: '0.01',
      max: '1',
      step: '0.01'
    }
  },
  {
    label: 'Trunk Color',
    sass: '$papyrus-treeview-color',
    css: '--papyrus-treeview-color',
    input: {
      type: 'color',
      format: 'hex',
      default: '#888888',
      value: '#888888'
    }
  }
];
