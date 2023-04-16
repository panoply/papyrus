import m from 'mithril';
import { IAttrs, IColor, IRange, IToken } from '../attrs';
import relapse from 'relapse';
import { icons } from './icons';
import { ColorInput } from './inputs/color';
import { RangeInput } from './inputs/range';

export const Editor: m.Component<IAttrs> = {

  oncreate: (
    {
      dom
    }
  ) => relapse(dom, {
    multiple: false,
    persist: true
  }),
  view: (
    {
      attrs
    }
  ) => m(
    '.accordion.bl-0'
    ,
    attrs.editor.map(
      (
        [
          label,
          state
        ],
        index
      ) => [
        m(
          'button.accordion-btn.py-2.pl-4[type="button"]'
          , {
            class: attrs.settings ? index === 1 ? 'initial opened' : '' : 'd-none'
          }
          , label
        )
        , m(
          '.accordion-fold'
          , {
            class: attrs.settings ? '' : 'd-none'
          }
          , m(
            '.px-4.py-3',
            state.map(
              token => [
                m(
                  '.row.ai-center'
                  , m(
                    token.input.type === 'range'
                      ? '.col-3.mb-2.pr-1'
                      : '.col-5.mb-2.pr-1'
                    , token.input.type === 'color'
                      ? m(
                        ColorInput,
                        {
                          token: token as IToken<IColor>,
                          style: attrs.style,
                          cache: attrs.cache,
                          store: 'editor'
                        }
                      )
                      : token.input.type === 'range' ? m(
                        RangeInput,
                        {
                          token: token as IToken<IRange>,
                          store: 'editor',
                          style: attrs.style,
                          cache: attrs.cache
                        }
                      ) : null
                  )
                  , token.input.type === 'range' ? m(
                    '.col-2.d-flex.jc-between.mb-3'
                    , m('.fs-xs', token.input.value + token.input.unit)
                  ) : null
                  , m(
                    '.col.mb-3'
                    , m(
                      'label.fs-sm'
                      , {
                        for: token.sass
                      }
                      , token.label
                    )
                  )
                  , token.input.default !== token.input.value ? m(
                    '.col-auto.mb-3[data-tooltip="right"][aria-label="Undo Changes"]'
                    , m(
                      'button.btn.py-0'
                      , {
                        onclick: () => {

                          if (token.input.type === 'range') {
                            token.input.value = token.input.default;
                            attrs.style.map.set(token.css, token.input.value);
                          } else {
                            token.input.value = token.input.default;
                            attrs.style.map.set(token.css, token.input.value);
                          }

                          attrs.style.write();
                          attrs.cache.save('editor');

                        }
                      }
                      , icons('reset', 18)
                    )
                  ) : null
                )
                , token.description ? m('.info-block', m.trust(token.description)) : null
              ]
            )
          )
        )
      ]
    )
  )
};
