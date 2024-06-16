import m from 'mithril';
import { Languages } from 'papyrus';
import { IAttrs } from '../attrs';
import { Options } from './options';
import { Preview } from './preview';
import { Sidebar } from './sidebar';

export function Layout (attrs: IAttrs) {

  return <m.RouteResolver<IAttrs>>{
    onmatch: (args, path, route) => {

      const language = path.slice(1) as Languages;

      if (language in attrs.model) {

        attrs.language = language;
        console.log(args, path, route);

      }

    },
    render: () => m(
      '.container-fluid'
      , {
        oncreate: (
          {
            dom
          }
        ) => (dom.parentElement.style.overflow = 'hidden')
      },
      m(
        '.row'
        ,
        m(Sidebar, attrs),
        m(Options, attrs),
        m(Preview, attrs)
      )
    )
  };
};
