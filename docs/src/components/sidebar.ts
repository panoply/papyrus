import m from 'mithril';
import { file } from './icons';
import { IAttrs, Languages } from '../attrs';

export const Sidebar: m.Component<IAttrs> = {
  view: (
    {
      attrs
    }
  ) => m(
    '.col-auto.vh-100.p-0.br'
    , {
      style: {
        background: 'whitesmoke',
        width: '70px'
      }
    }
    , m(
      '.d-block.rel'
      , Object.entries(attrs.model).map(([ language, value ]) => language === 'editor' ? null : m(
        m.route.Link
        , {
          href: `/${language}`,
          class: `w-100 d-flex jc-center pb-3 hover-lang ${(language === 'html' || language === 'css') ? 'bright' : ''} ${attrs.language === language ? ' on' : ''}`,
          'data-tooltip': 'right',
          ariaLabel: value.language,
          style: {
            paddingTop: '15px'
          }
        }, file(language as Languages)
      ))
    )
  )
};