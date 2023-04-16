import m from 'mithril';
import { IAttrs, IColor, IToken } from '../attrs';
import { icons } from './icons';
import { ColorInput } from './inputs/color';

export const Tokens: m.Component<IAttrs> = {
  view: (
    {
      attrs: {
        state,
        style,
        cache
      }
    }
  ) => state.tokens.map((token: IToken<IColor>) => m(
    '.row.ai-center.px-4'
    ,
    token.description
      ? m(
        'button.info-btn.btn.uncase.col-auto.d-flex.jc-between.mb-3'
        , { class: token.toggle ? 'active' : '' }
        , icons('info', 12)
      )
      : null
    ,
    m(
      '.col-4.mb-2.pr-1'
      , m(ColorInput, {
        store: 'tokens',
        token,
        cache,
        style
      })
    )
    , m(
      '.col-5.d-flex.jc-between.mb-3'
      , [
        m(
          'label.fs-sm'
          , { for: token.sass }
          , token.label
        )
      ]
    )
    ,
    token.input.default !== token.input.value ? m(
      '.col-auto.mb-3[data-tooltip="right"][aria-label="Undo Changes"]'
      , m(
        'button.btn.py-0'
        , {
          onclick: () => {

            token.input.value = token.input.default;
            style.map.set(token.css, token.input.value);

            style.write();
            cache.save('tokens');
          }
        }
        , icons('reset', 18)
      )
    ) : null

    , token.toggle ? m('.info-block', m.trust(token.description)) : null
  ))
};
