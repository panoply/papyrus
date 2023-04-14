import m from 'mithril';
import { IAttrs, IColor, IRange, IToken } from '../attrs';
import relapse from 'relapse';
import { icons } from 'src/components/icons';
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

const ColorInput: m.Component<{
  token: IToken<IColor>,
  style: IAttrs['style'],
  cache: IAttrs['cache']
}, {
  invert: string;
  value: string;
}> = {
  oninit: (
    {
      state,
      attrs: {
        token,
        style
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
        token,
        style
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
      attrs,
      attrs: {
        token,
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

        cache.save();
      }

    }
  )
};

const RangeInput: m.Component<{
  token: IToken<IRange>,
  style: IAttrs['style'],
  cache: IAttrs['cache']
}> = {
  onupdate: (
    {
      dom,
      attrs: {
        token,
        style,
        cache
      }
    }
  ) => {

    (dom as HTMLInputElement).value = token.input.value;

  },
  view: (
    {
      attrs: {
        token,
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
          cache.save();
        }

      }

    }
  )

};

let accordion: ReturnType<typeof relapse>;
let toggler: number;

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
        '#accordion-tokens.accordion.bl-0'
        , {
          oncreate: (
            {
              dom,
              state
            }
          ) => {
            accordion = relapse(dom, {
              multiple: false,
              persist: true
            });

          }
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
                , m('.px-4.py-3', state.map(
                  token => m(
                    '.row.ai-center'
                    , token.describe ? m(
                      'button.info-btn.btn.uncase.col-auto.d-flex.jc-between.mb-3'
                      , {
                        class: token.toggle ? 'active' : '',
                        onclick: () => {

                          if (token.toggle) {
                            const i = accordion.active;
                            const h = accordion.folds[i].content.scrollHeight;
                            accordion.folds[i].content.style.maxHeight = `${h - toggler}px`;
                            token.toggle = false;
                          } else {
                            token.toggle = true;
                          }

                        }
                      }
                      , icons('info', 12)
                    ) : null
                    , m(
                      '.col-5.mb-2.pr-1'
                      , token.input.type === 'color' ? m(
                        ColorInput,
                        { token: token as IToken<IColor>, style: attrs.style, cache: attrs.cache }
                      ) : token.input.type === 'range' ? m(
                        RangeInput,
                        { token: token as IToken<IRange>, style: attrs.style, cache: attrs.cache }
                      ) : null
                    )
                    , m(
                      '.col-4.d-flex.jc-between.mb-3'
                      , [
                        m(
                          'label.fs-sm'
                          , { for: token.sass }
                          , token.label
                        )
                      ]
                    )
                    , token.input.type === 'range' ? m(
                      '.col-2.d-flex.jc-between.mb-3'
                      , m('.fs-sm', token.input.value + token.input.unit)
                    ) : null
                    , token.input.default !== token.input.value ? m(
                      '.col-auto.mb-3[data-tooltip="right"][aria-label="Undo Changes"]'
                      , m(
                        'button.btn.py-0'
                        , {
                          onclick: () => {

                            if (token.input.type === 'range') {
                              token.input.value = token.input.default + token.input.unit;
                              attrs.style.map.set(token.css, token.input.value);
                            } else {
                              token.input.value = token.input.default;
                              attrs.style.map.set(token.css, token.input.value);
                            }

                            attrs.style.write();
                            attrs.cache.save();

                          }
                        }
                        , icons('reset', 18)
                      )
                    ) : null

                    , token.toggle
                      ? m(
                        '.info-block'
                        , {
                          oncreate: (
                            {
                              dom
                            }
                          ) => {

                            const i = accordion.active;
                            const h = accordion.folds[i].content.scrollHeight;
                            toggler = dom.scrollHeight;
                            accordion.folds[i].content.style.maxHeight = `${h + toggler}px`;

                          }
                        }
                        , m.trust(token.describe)
                      )
                      : null
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
                        , token.describe ? m(
                          'button.info-btn.btn.uncase.col-auto.d-flex.jc-between.mb-3'
                          , {
                            class: token.toggle ? 'active' : '',
                            onclick: () => {

                              if (token.toggle) {
                                const i = accordion.active;
                                const h = accordion.folds[i].content.scrollHeight;
                                accordion.folds[i].content.style.maxHeight = `${h - toggler}px`;
                                token.toggle = false;
                              } else {
                                token.toggle = true;
                              }

                            }
                          }
                          , icons('info', 12)
                        ) : null
                        , m(
                          token.input.type === 'range'
                            ? '.col-3.mb-2.pr-1'
                            : '.col-5.mb-2.pr-1'
                          , token.input.type === 'color' ? m(
                            ColorInput,
                            { token: token as IToken<IColor>, style: attrs.style, cache: attrs.cache }
                          ) : token.input.type === 'range' ? m(
                            RangeInput,
                            { token: token as IToken<IRange>, style: attrs.style, cache: attrs.cache }
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
                                attrs.cache.save();

                              }
                            }
                            , icons('reset', 18)
                          )
                        ) : null
                      ),
                      token.toggle
                        ? m(
                          '.info-block'
                          , {
                            oncreate: (
                              {
                                dom
                              }
                            ) => {

                              const i = accordion.active;
                              const h = accordion.folds[i].content.scrollHeight;
                              toggler = dom.scrollHeight;
                              accordion.folds[i].content.style.maxHeight = `${h + toggler}px`;

                            }
                          }
                          , m.trust(token.describe)
                        )
                        : null
                    ]
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
