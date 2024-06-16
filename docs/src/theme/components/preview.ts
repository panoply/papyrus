import m from 'mithril';
import { IAttrs } from '../attrs';
import JsonCompletions from '../states/completions/json';
import papyrus, { Model, Languages } from 'papyrus';
import { icons } from './icons';

export const SCSSVars: m.Component<IAttrs, { editor: Model }> = {
  view: ({
    attrs,
    state
  }) => m(
    'pre.papyrus.mt-0.rd-t-0'
    , { style: { height: '80vh', 'border-width': '0.01rem', 'border-color': 'rgb(60 64 73)' } }
    , m(
      'code'
      , {
        class: 'language-scss',
        oncreate: ({ dom }) => {
          state.editor = papyrus.mount(dom as HTMLPreElement, {
            id: 'sass-vars',
            language: 'scss',
            input: attrs.style.sass
          });
        }
      }
    )
  )
};

export const CSSVars: m.Component<IAttrs, { editor: Model }> = {
  view: ({
    attrs,
    state
  }) => m(
    'pre.papyrus.mt-0.rd-t-0'
    , { style: { height: '80vh', 'border-width': '0.01rem', 'border-color': 'rgb(60 64 73)' } }
    , m(
      'code'
      , {
        class: 'language-css',
        oncreate: ({ dom }) => {
          state.editor = papyrus.mount(dom as HTMLPreElement, {
            id: 'css-vars',
            language: 'css',
            input: attrs.style.css
          });

          m.redraw();
        }
      }
    )
  )
};

// comment
export const Preview: m.Component<IAttrs, {
  editor: Model,
  language: Languages,
  tab: number,
  loading: boolean
}> = {
  view: (
    {
      attrs,
      state
    }
  ) => m(
    '.col.vh-100.py-4.px-5.code-bg'
    , {
      style: {
        position: 'relative',
        background: attrs.preview.background
      }
    }
    , m(
      '.row.jc-between.mt-3.pr-3.rd-t.ml-auto.bg-code.hidden.px-5'
      , m('.col'
        , m('.row'
          , m(
            'button.btn-preview.btn.bb-0.fw-normal.fs-xs.upper.px-4.py-2.col-auto'
            , {
              onupdate: ({ dom }) => state.editor.mode === 'editor'
                ? dom.classList.add('fc-white')
                : dom.classList.remove('fc-white'),
              style: {
                'border-color': 'rgb(60 64 73)'
              },
              onclick: () => {

                const e = state.editor;

                if (e.mode === 'error') {
                  e.hideError();
                }

                e.editor.enable();

              }
            }
            , 'Editor'
          )
          , m(
            'button.btn-preview.btn.bb-0.fw-normal.fs-xs.upper.px-4.py-2.col-auto'
            , {
              onupdate: ({ dom }) => state.editor.mode === 'static'
                ? dom.classList.add('fc-white')
                : dom.classList.remove('fc-white'),
              style: {

                'border-color': 'rgb(60 64 73)',
                'border-left': '0',
                'border-right': '0'
              },
              onclick: () => {

                const e = state.editor;

                if (e.mode === 'error') {
                  e.hideError();
                }

                e.editor.disable();

              }
            }
            , 'Static'
          )
          , m(
            'button.btn-preview.btn.bb-0.fw-normal.fs-xs.upper.px-4.py-2.col-auto'
            , {
              onupdate: ({ dom }) => state.editor.mode === 'error'
                ? dom.classList.add('fc-white')
                : dom.classList.remove('fc-white'),
              style: {
                'border-color': 'rgb(60 64 73)'
              },
              onclick: () => {

                state.editor.showError('some bad code goes here or a snippet, accepts a stack trace', {
                  title: 'ERROR EXAMPLE',
                  heading: 'An Error Heading',
                  stack: 'line: 0\ncolumn: 1\ncode: 200'
                });

                console.log(state.editor);
              }
            }
            , 'Error'
          )))
      , m('.col-auto.pr-5'
        , attrs.preview.tabs.map(
          (
            tab,
            idx,
            arr
          ) => m(
            'button.btn-preview.btn.bb-0.fw-normal.fs-xs.upper.px-4.py-2.col-auto'
            , {
              onclick: () => {
                arr.forEach(t => (t.active = false));
                tab.active = true;
                attrs.preview.opened = idx;
              },
              style: idx === 2 ? {
                'border-color': 'rgb(60 64 73)'
              } : idx === 0 ? {
                'border-color': 'rgb(60 64 73)'
              } : {
                'border-color': 'rgb(60 64 73)',
                'border-left': '0',
                'border-right': '0'
              },
              class: (
                tab.active ? 'fc-white' : ''
              )
            }
            , tab.label
          )
        ))
    )

    , m(
      'div.d-flex.flex-col.ai-center.jc-center.mb-4.px-5.w-100.rel',
      attrs.preview.opened === 1 ? m(CSSVars, attrs) : null,
      attrs.preview.opened === 2 ? m(SCSSVars, attrs) : null,
      attrs.preview.opened === 0 ? m(
        'pre.papyrus.mt-0.rd-t-0'
        , { style: { height: '80vh', 'border-width': '0.01rem', 'border-color': 'rgb(60 64 73)' } }
        , m('code'
          , {
            class: `language-${attrs.state.alias || attrs.language}`,
            onupdate: () => {

              if (!state.editor || state.editor.mode === 'error') return;

              if (state.language !== attrs.state.alias || attrs.language) {

                state.language = attrs.state.alias || attrs.language;
                state.editor.update(attrs.state.sample, attrs.state.alias || attrs.language);
                state.loading = false;
                state.tab = attrs.preview.opened;

              }
            },
            oncreate: ({ dom }) => {

              attrs.papyrus.input = attrs.state.sample;
              attrs.papyrus.language = attrs.state.alias || attrs.language;
              state.language = attrs.language;
              state.loading = false;
              state.editor = papyrus.mount(dom as HTMLPreElement, {
                id: 'editor',
                language: attrs.state.alias || attrs.language,
                input: attrs.state.sample,
                editor: {
                  tabConvert: true,
                  completions: {
                    json: JsonCompletions
                  }
                },
                showSpace: false,
                showTab: false
              });

              m.redraw();
            }
          })
      ) : null

      , m('.mt-4', {
        style: {
          'font-size': '40px',
          color: '#2b3348'
        }
      }, '𓁁')
      // , m(
      //   'pre.papyrus.w-100'
      //   , { style: { height: '80vh' } }
      //   , m(
      //     'code'
      //     , {
      //       class: `language-${attrs.language}`,
      //       onupdate: () => {

      //         if (!state.editor) return;
      //         if (state.language !== attrs.language) {

      //           state.language = attrs.language;
      //           state.editor.update(attrs.state.sample, attrs.language);

      //         } else if (attrs.preview.opened !== state.tab) {

      //           if (attrs.preview.opened === 0) {

      //             state.tab = attrs.preview.opened;
      //             state.editor.update(attrs.state.sample, attrs.language);
      //             console.log(attrs.state);

      //           } else if (attrs.preview.opened === 1) {

      //             state.tab = attrs.preview.opened;
      //             state.editor.update(attrs.style.css, 'css');

      //           } else if (attrs.preview.opened === 2) {

      //             state.tab = attrs.preview.opened;
      //             state.editor.update(attrs.style.sass, 'scss');

      //           }

      //         }
      //       },
      //       oncreate: ({ dom }) => {

      //         state.tab = 0;
      //         state.language = attrs.language;
      //         attrs.papyrus.input = attrs.state.sample;
      //         attrs.papyrus.language = attrs.language;
      //         state.editor = papyrus.mount(dom.parentElement as HTMLPreElement, attrs.papyrus);

      //       }
      //     }

      //   )
      // )

    )
  )
};
