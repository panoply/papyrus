import m from 'mithril';
import { IAttrs, Languages } from '../attrs';
import papyrus, { IModel } from 'papyrus';

// comment
export const Preview: m.Component<IAttrs, {
  editor: IModel,
  language: Languages,
  tab: number
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
      '.row.jc-center.py-2'
      , attrs.preview.tabs.map(
        (
          tab,
          idx,
          arr
        ) => m(
          'button.btn-preview.btn.bd.fs-xs.upper.px-4.py-1.col-auto'
          , {
            onclick: () => {
              arr.forEach(t => (t.active = false));
              tab.active = true;
              attrs.preview.opened = idx;
            },
            class: (
              tab.active ? 'bg-white ' : 'fc-white '
            ) + (idx === 0
              ? 'rd-l'
              : (arr.length - 1 === idx) ? 'rd-r' : 'rd-none')
          }
          , tab.label
        )

      )
    )
    , m(
      'div.d-flex.ai-center.jc-center.py-4.px-5.w-100'
      , m(
        'pre.papyrus.w-100'
        , { style: { height: '80vh' } }
        , m(
          'code'
          , {
            class: `language-${attrs.language}`,
            onupdate: () => {

              if (!state.editor) return;
              if (state.language !== attrs.language) {

                state.language = attrs.language;
                state.editor.update(attrs.state.sample, attrs.language);

              } else if (attrs.preview.opened !== state.tab) {

                if (attrs.preview.opened === 0) {

                  state.tab = attrs.preview.opened;
                  state.editor.update(attrs.state.sample, attrs.language);
                  console.log(attrs.state);

                } else if (attrs.preview.opened === 1) {

                  state.tab = attrs.preview.opened;
                  state.editor.update(attrs.style.css, 'css');

                } else if (attrs.preview.opened === 2) {

                  state.tab = attrs.preview.opened;
                  state.editor.update(attrs.style.sass, 'scss');

                }

              }
            },
            oncreate: ({ dom }) => {

              state.tab = 0;
              state.language = attrs.language;
              attrs.papyrus.input = attrs.state.sample;
              attrs.papyrus.language = attrs.language;
              state.editor = papyrus.mount(dom.parentElement as HTMLPreElement, attrs.papyrus);

            }
          }

        )
      )

    )
  )
};
