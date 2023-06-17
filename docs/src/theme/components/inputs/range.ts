import m from 'mithril';
import { IAttrs, IRange, IToken } from '../../attrs';
import papyrus from 'papyrus';

export const RangeInput: m.Component<{
  token: IToken<IRange>,
  store: 'editor' | 'tokens'
  style: IAttrs['style'],
  cache: IAttrs['cache']
}> = {
  onupdate: (
    {
      dom,
      attrs: {
        token
      }
    }
  ) => {

    (dom as HTMLInputElement).value = token.input.value;

  },
  view: (
    {
      attrs: {
        token,
        store,
        style,
        cache
      }
    }
  ) => m(
    'input.fm-range.fm-sm'
    , {
      id: token.sass,
      type: 'range',
      min: token.input.min,
      max: token.input.max,
      step: token.input.step,
      value: token.input.value,
      oninput: (
        {
          target
        }
      ) => {

        if (token.sass === '$papyrus-selection-alpha') {
          const { textarea } = papyrus.get();
          textarea.setSelectionRange(100, 250);
          textarea.focus();
        }
        if (target.value !== token.input.value) {
          token.input.value = target.value;
          style.map.set(token.css, token.input.value + token.input.unit);
          style.write();
          cache.save(store);
        }

      }

    }
  )

};
