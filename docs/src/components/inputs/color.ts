import m from 'mithril';
import { IAttrs, IColor, IToken } from '../../attrs';
import invert from 'invert-color';
import papyrus from 'papyrus';

/**
 * Convert HEX to RGB
 */
const hexToRgb = (hex: string, fallback: string) => {

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : fallback;

};

/**
 * Convert RGB to HEX
 */
const rgbToHex = (rgb: string) => {

  const [ r, g, b ] = rgb.split(',').map(code => parseInt(code.trim()));

  return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
};

export const ColorInput: m.Component<{
  token: IToken<IColor>;
  store: 'editor' | 'tokens',
  style: IAttrs['style'],
  cache: IAttrs['cache']
}, {
  invert?: string;
  value?: string;
}> = {
  oninit: (
    {
      state,
      attrs: {
        token
      }
    }
  ) => {
    state.value = token.input.format === 'hex' ? token.input.value : rgbToHex(token.input.value);
    state.invert = invert(state.value, {
      black: '#000',
      white: '#fff',
      threshold: 0.3
    });
  },
  onupdate: (
    {
      dom,
      state,
      attrs: {
        token
      }
    }
  ) => {

    if (token.input.value === token.input.default) {

      state.value = token.input.format === 'hex' ? token.input.value : rgbToHex(token.input.value);
      state.invert = invert(state.value, {
        black: '#000',
        white: '#fff',
        threshold: 0.3
      });

      (dom as any).style = `--invert-color: ${state.invert}`;
      (dom as HTMLInputElement).value = state.value;
      dom.ariaLabel = state.value;

    }

  },
  view: (
    {
      state,
      attrs: {
        token,
        store,
        style,
        cache
      }
    }
  ) => m(
    'input.fm-color.fm-sm'
    , {
      id: token.sass,
      type: 'color',
      style: {
        '--invert-color': state.invert
      },
      ariaLabel: state.value,
      value: state.value,
      oninput: (
        {
          target
        }
      ) => {

        if (token.sass === '$papyrus-selection-bg') {
          const { textarea } = papyrus.get();
          textarea.setSelectionRange(100, 250);
          textarea.focus();
        }

        if (token.input.format === 'hex') {
          token.input.value = target.value;
          style.map.set(token.css, token.input.value);
          style.write();
        } else {
          token.input.value = hexToRgb(target.value, token.input.default);
          style.map.set(token.css, token.input.value);
          style.write();
        }

        state.value = token.input.format === 'hex' ? token.input.value : rgbToHex(token.input.value);
        state.invert = invert(state.value, {
          black: '#000',
          white: '#fff',
          threshold: 0.3
        });

        cache.save(store);
      }

    }
  )
};
