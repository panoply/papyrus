import m from 'mithril';
import { icons, file } from './icons';
import data from '../static/content';
import papyrus from 'papyrusjs';
import { ts, liquid } from 'language-literals';
import { Languages } from 'src/attrs';

export const Landing: m.Component = {
  view: () => m(
    '.container-fluid',
    m(
      '.abs.w-100.fc-black'
      , {
        style: {
          right: '30px',
          top: '30px',
          width: '50px'
        }
      }
      , icons('github', 30)
    ),
    m(
      '.row.jc-center.ac-center.vh-100',

      m(
        '.col-4.fc-black.tc.pl-0'
        , {
          style: {
            opacity: '1'
          }
        }
        , m(
          'ul.d-inline-flex',
          [

            // m('li.d-inline', m('h1.tc.my-2.d-inline', ' 𓁁 ')),
            m('li.d-inline', icons('logo', 240))

          ]
        )
      ),
      m(
        '.col-12.mt-5.fc-black.tc'
        , m.trust(
          `
          An embedded code editor with textarea enhancements leveraging PrismJS.<br>
          The drop-in solution for documentation and code sample showcases.

          `
        )
      ),

      m(
        '.col-12.tc',
        m(
          m.route.Link
          , {
            href: '/liquid',
            class: 'btn btn-outline-black rd-1 bc-black px-4 py-1 mt-5 mr-2',
            selector: 'a[data-tooltip="left"][aria-label="Generate Theme"]'
          }
          , 'Theme'
        ),
        m(
          'a'
          , {
            href: '/usage/',
            class: 'btn btn-outline-black rd-1 bc-black px-4 py-1 mt-5 mx-2',
            selector: 'a[data-tooltip="right"][aria-label="Usage Examples"]'
          }
          , 'Usage'
        )
      )
      // m(
      //   '.col-4.pb-5'
      //   , m(
      //     '.row.jc-between.my-5.pb-5'
      //     , Object.entries({

      //       liquid: {
      //         language: 'Liquid Template Language',
      //         sample: liquid,
      //         colors: []
      //       },
      //       html: {
      //         language: 'HTML',
      //         sample: '',
      //         colors: []
      //       },
      //       css: {
      //         language: 'CSS',
      //         sample: '',
      //         colors: []
      //       },
      //       javascript: {
      //         language: 'JavaScript',
      //         sample: '',
      //         colors: []
      //       },
      //       jsx: {
      //         language: 'JSX',
      //         sample: '',
      //         colors: []
      //       },
      //       typescript: {
      //         language: 'TypeScript',
      //         sample: '',
      //         colors: []
      //       },
      //       tsx: {
      //         language: 'TSX',
      //         sample: '',
      //         colors: []
      //       },
      //       scss: {
      //         language: 'SCSS',
      //         sample: '',
      //         colors: []
      //       },
      //       shell: {
      //         language: 'Shell',
      //         sample: '',
      //         colors: []
      //       },
      //       json: {
      //         language: 'JSON',
      //         sample: '',
      //         colors: []
      //       },
      //       yaml: {
      //         language: 'YAML',
      //         sample: '',
      //         colors: []
      //       }
      //     }).map(([ language, value ]) => m(
      //       m.route.Link
      //       , {
      //         href: `/${language}`,
      //         class: `col-auto hover-lang ${(language === 'html' || language === 'css') ? 'bright' : ''} `,
      //         'data-tooltip': 'right',
      //         ariaLabel: value.language,
      //         style: {
      //           paddingTop: '15px'
      //         }
      //       }, file(language as Languages)
      //     ))
      //   )
      // )
    )

    // m(
    //   '.row.jc-center.ac-center.landing-cover',
    //   m(
    //     '.col-4'
    //     , m(
    //       'pre.papyrus.line-numbers.no-lf.w-100'
    //       , {
    //         class: 'language-typescript',
    //         style: {
    //           height: '400px',
    //           '--papyrus-code-bg': '#282a36'
    //         }
    //       }
    //       , m(
    //         'code'
    //         , {
    //           class: 'language-typescript',
    //           oncreate: ({ dom }) => {

    //             const i = papyrus.editor(dom.parentElement as HTMLPreElement, {
    //               input: ts`
    //               import papyrus from 'papyrus';

    //               papyrus({
    //                 readonly: false,
    //                 editorToggle: true,
    //                 lineNumbers: true,
    //                 invisibles: true,
    //                 trim: true,
    //                 preserveIndent: true
    //               });

    //               `,
    //               language: 'typescript',
    //               invisibles: true,
    //               trimEnd: false
    //             });

    //             console.log(i);

    //           }
    //         }

    //       )
    //     )
    //   ),
    //   m(
    //     '.col-4'
    //     , m(
    //       'pre.papyrus.line-numbers.no-lf.w-100'
    //       , {
    //         class: 'language-liquid',
    //         style: {
    //           height: '400px',
    //           '--papyrus-code-bg': '#282a36'
    //         }
    //       }
    //       , m(
    //         'code'
    //         , {
    //           class: 'language-liquid',
    //           oncreate: ({ dom }) => {

    //             const i = papyrus.editor(dom.parentElement as HTMLPreElement, {
    //               input: liquid`
    //               <div class="foo-bar">
    //                 <ul {{ object.prop | filter: 'string' }}>
    //                 {% if condition == assertion %}
    //                   <li class="xxx {{ object.prop }}">
    //                     {% render 'snippet' %}
    //                   </li>
    //                 {% endif %}
    //                 </ul>
    //               </div>
    //               `,
    //               language: 'liquid',
    //               invisibles: true,
    //               trimEnd: false
    //             });

    //             console.log(i);

    //           }
    //         }

    //       )
    //     )
    //   )
    // )
  )
};
