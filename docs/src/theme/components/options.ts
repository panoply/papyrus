import m from 'mithril';
import { IAttrs } from '../attrs';
import { icons } from './icons';
import { Tokens } from './tokens';
import { Editor } from './editor';

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
          m('.col-auto.pl-4.ml-3.mt-2.pointer', {
            onclick: () => m.route.set('/')
          }, icons('logo', 100, '2')),
          m(
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
              , attrs.settings ? icons('close', 25) : icons('gears', 25)
            )
          ),
          m(
            '.col-12.my-2'
            , m(
              'h6.mb-0.mt-4.pl-4.fw-bold.bg-smoke.upper'
              , attrs.settings ? 'Editor Settings' : attrs.state.language
            )
          )
        ]
      )
      // , attrs.state.tokens.map(token => m(
      //   '.row.ai-center'
      //   , token.describe ? m(
      //     'button.info-btn.btn.uncase.col-auto.d-flex.jc-between.mb-3'
      //     , {
      //       class: token.toggle ? 'active' : '',
      //       onclick: () => {

      //         if (token.toggle) {
      //           const i = accordion.active;
      //           const h = accordion.folds[i].content.scrollHeight;
      //           accordion.folds[i].content.style.maxHeight = `${h - toggler}px`;
      //           token.toggle = false;
      //         } else {
      //           token.toggle = true;
      //         }

      //       }
      //     }
      //     , icons('info', 12)
      //   ) : null
      //   , m(
      //     '.col-5.mb-2.pr-1'
      //     , token.input.type === 'color' ? m(
      //       ColorInput,
      //       { token: token as IToken<IColor>, style: attrs.style, cache: attrs.cache }
      //     ) : token.input.type === 'range' ? m(
      //       RangeInput,
      //       { token: token as IToken<IRange>, style: attrs.style, cache: attrs.cache }
      //     ) : null
      //   )
      //   , m(
      //     '.col-4.d-flex.jc-between.mb-3'
      //     , [
      //       m(
      //         'label.fs-sm'
      //         , { for: token.sass }
      //         , token.label
      //       )
      //     ]
      //   )
      //   , token.input.type === 'range' ? m(
      //     '.col-2.d-flex.jc-between.mb-3'
      //     , m('.fs-sm', token.input.value + token.input.unit)
      //   ) : null
      //   , token.input.default !== token.input.value ? m(
      //     '.col-auto.mb-3[data-tooltip="right"][aria-label="Undo Changes"]'
      //     , m(
      //       'button.btn.py-0'
      //       , {
      //         onclick: () => {

      //           if (token.input.type === 'range') {
      //             token.input.value = token.input.default + token.input.unit;
      //             attrs.style.map.set(token.css, token.input.value);
      //           } else {
      //             token.input.value = token.input.default;
      //             attrs.style.map.set(token.css, token.input.value);
      //           }

      //           attrs.style.write();
      //           attrs.cache.save();

      //         }
      //       }
      //       , icons('reset', 18)
      //     )
      //   ) : null

      //   , token.toggle
      //     ? m(
      //       '.info-block'
      //       , {
      //         oncreate: (
      //           {
      //             dom
      //           }
      //         ) => {

      //           const i = accordion.active;
      //           const h = accordion.folds[i].content.scrollHeight;
      //           toggler = dom.scrollHeight;
      //           accordion.folds[i].content.style.maxHeight = `${h + toggler}px`;

      //         }
      //       }
      //       , m.trust(token.describe)
      //     )
      //     : null
      // ))
      , attrs.settings ? m(Editor, attrs) : m(Tokens, attrs)
    ]
  )
};
