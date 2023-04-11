import m from 'mithril';
import { IAttrs, IColor, IRange, IToken } from '../attrs';
import relapse from 'relapse';
import { icons } from 'src/components/icons';

const ColorInput: m.Component<{
  token: IToken<IColor>,
  style: IAttrs['style']
}> = {
  view: (
    {
      attrs: {
        token,
        style
      }
    }
  ) => m(
    'input.fm-color.fm-sm'
    , {
      id: token.sass,
      type: 'color',
      value: token.input.value,
      oninput: (
        {
          target
        }
      ) => {
        token.input.value = target.value;
        style.map.set(token.css, token.input.value);
        style.write();
      }

    }
  )

};

const RangeInput: m.Component<{
  token: IToken<IRange>,
  style: IAttrs['style']
}> = {

  view: (
    {
      attrs: {
        token,
        style
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
        token.input.value = target.value;
        style.map.set(token.css, token.input.value + token.input.unit);
        style.write();
      }

    }
  )

};

export const Options: m.Component<IAttrs> = {
  view: (
    {
      attrs

    }
  ) => m(
    '.col-auto.vh-100.p-0'
    ,
    {
      style: {
        backgroundColor: 'whitesmoke',
        width: '450px',
        overflowY: 'scroll'
      }
    }
    ,
    [
      m(
        '.row.jc-between.ai-center.py-3'
        , [
          m(
            '.col-auto'
            , m(
              'h6.uncase.mb-0.pl-4.fw-bold.bg-smoke'
              , attrs.settings ? 'Editor Settings' : attrs.state.language
            )
          )
          , m(
            '.col-auto.pl-0.pr-4.mr-1[data-tooltip="left"]'
            , {
              ariaLabel: 'Editor Options'
            }
            , m(
              'button.btn'
              , {
                onclick: () => {
                  attrs.settings = !attrs.settings;
                }
              }
              , icons('gears', 25)
            )
          )
        ]
      )
      ,
      m(
        '.accordion.bl-0'
        , {
          oncreate: (
            {
              dom
            }
          ) => relapse(dom, {
            multiple: false,
            persist: true
          })
        }

        , [
          attrs.state.tokens.map(
            (
              [
                label,
                state
              ]
              , index
            ) => [
              m(
                'button.accordion-btn.py-2.pl-4[type="button"]'
                , {
                  class: attrs.settings ? 'd-none' : index === 0 ? 'initial opened' : ''
                }
                , label
              )
              , m(
                '.accordion-fold'
                , {
                  class: attrs.settings ? 'd-none' : ''
                }
                , m('.px-4', state.map(
                  token => m(
                    '.row.ai-center'
                    , m(
                      '.col-3.mb-2.pr-1'
                      , token.input.type === 'color' ? m(
                        ColorInput,
                        { token: token as IToken<IColor>, style: attrs.style }
                      ) : token.input.type === 'range' ? m(
                        RangeInput,
                        { token: token as IToken<IRange>, style: attrs.style }
                      ) : null
                    )
                    , m(
                      '.col-4.mb-3'
                      , m(
                        'label.fs-sm[data-tooltip="right"]'
                        , {
                          for: token.sass,
                          ariaLabel: token.input.value
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
                            token.input.value = token.input.default;
                            attrs.style.map.set(token.css, token.input.value);
                            attrs.style.write();
                          }
                        }
                        , icons('reset', 18)
                      )
                    ) : null
                  )
                ))
              )
            ]
          ),
          attrs.model.editor.map(
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
                  class: attrs.settings ? index === 0 ? 'initial opened' : '' : 'd-none'
                }
                , label
              )
              , m(
                '.accordion-fold'
                , {
                  class: attrs.settings ? '' : 'd-none'
                }
                , m(
                  '.px-4',
                  state.map(
                    token => m(
                      '.row.ai-center'
                      , m(
                        '.col-3.mb-2.pr-1'
                        , token.input.type === 'color' ? m(
                          ColorInput,
                          { token: token as IToken<IColor>, style: attrs.style }
                        ) : token.input.type === 'range' ? m(
                          RangeInput,
                          { token: token as IToken<IRange>, style: attrs.style }
                        ) : null
                      )
                      , m(
                        '.col-4.mb-3'
                        , m(
                          'label.fs-sm[data-tooltip="right"]'
                          , {
                            for: token.sass,
                            ariaLabel: token.input.value
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
                              token.input.value = token.input.default;
                              attrs.style.map.set(token.css, token.input.value);
                              attrs.style.write();
                            }
                          }
                          , icons('reset', 18)
                        )
                      ) : null
                    )
                  )
                )
              )
            ]
          )
        ]

      )
    ]
  )
};
