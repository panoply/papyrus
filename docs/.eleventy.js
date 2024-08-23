const eleventy = require('@panoply/11ty');
const markdown = require('markdown-it');
const papyrus = require('papyrus');

/** @type {import('@liquify/papyrus')['Papyrus']} */
//const Papyrus = require('@liquify/papyrus')

function highlighter (md, raw, language) {

  let code = '';


  if (language) {

    try {

      if (language.endsWith(':1')) {
        code = papyrus.static(raw.trim(), { language: language.slice(0, -2), })
      } else if (language.endsWith(':2')) {
      code = papyrus.static(raw.trim(), {
        language: language.slice(0, -2),
        id: 'spx-2',
        readOnly: true,
        copyButton: false
      })
    } else {

      code = papyrus.highlight(raw.trim(), {
        language: language,
      })
    }


    } catch (err) {

      code = md.utils.escapeHtml(raw);

      console.error(
        'HIGHLIGHTER ERROR\n',
        'LANGUAGE: ' + language + '\n\n', err);
    }

  } else {

    code = md.utils.escapeHtml(raw);

  }


  return code

};


function codeinline (md) {

  function render (token) {
    const pull = token.indexOf('} ')
    const raw = token.slice(pull + 1).trimStart()
    const language = token.slice(1, pull)

    return papyrus.inline(raw, { language  })
  }

  function scan (state) {

    for (let x = state.tokens.length - 1; x >= 0; x--) {
      if (state.tokens[x].type !== 'inline') continue
      const token = state.tokens[x].children
      for (let i = token.length - 1; i >= 0; i--) {
        if (token[i].type !== 'code_inline') continue;
        if(!/^{\w+} /.test(token[i].content)) continue
        token[i].tag = ''
        token[i].type = 'html_block',
        token[i].markup = ''
        token[i].block = true,
        token[i].content = render(token[i].content);
      }
    }
  }


  md.core.ruler.push('inline_papyrus', scan)

}


/**
 * @type {import('./eleventy').LocalConfigFunction}
 */
module.exports = eleventy(function (config) {


  const md = markdown({
    html: true,
    highlight: (str, lang) => highlighter(md, str, lang)
   })
   .use(codeinline)
   .disable("code");

  config.addLiquidShortcode('version', function() {

    return require('../package.json').version

  })

  //config.addLiquidFilter('sorting', sorting);
  config.setBrowserSyncConfig();
  config.setLibrary('md', md);
  config.addPassthroughCopy('src/usage/assets')


  return {
    htmlTemplateEngine: 'liquid',
    passthroughFileCopy: false,
    markdownTemplateEngine: false,
    pathPrefix: '',
    templateFormats: [
      'liquid',
      'json',
      'md'
    ],
    dir: {
      input: 'src/usage',
      output: 'public',
      includes: 'include',
      layouts: 'layout',
      data: 'data'
    }
  };

});
