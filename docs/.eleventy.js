const eleventy = require('@panoply/11ty');
const markdown = require('markdown-it');
const papyrus = require('../dist/index.cjs');

/** @type {import('@liquify/papyrus')['Papyrus']} */
//const Papyrus = require('@liquify/papyrus')

function highlighter (md, raw, language) {

  let code = '';


  if (language) {

    try {


      code = papyrus.render(raw, {
        language,
        insertCodeElement: true,
        trimStart: true,
        trimEnd: true,
        insertPreElement: true,
        lineNumbers: true,
        lineIndent: true,
        showTab: true,
        spellcheck: false,
        tabIndent: true,
        indentSize: 2,
        editor: false,
        insertTextArea: false,
        lineHighlight: true,
        showSpace: true,
        indentChar: 'space'
      });



    } catch (err) {

      code = md.utils.escapeHtml(raw);

      console.error(
        'HIGHLIGHTER ERROR\n',
        'LANGUAGE: ' + language + '\n\n', err);
    }

  } else {

    code = md.utils.escapeHtml(raw);
  }

  let height = 0

  code.split('\n').forEach(() => height = height + 24.1)

  return code

};


/**
 * @type {import('./eleventy').LocalConfigFunction}
 */
module.exports = eleventy(function (config) {


  const md = markdown({
    html: true,
    highlight: (str, lang) => highlighter(md, str, lang)
   }).disable("code");

  config.addLiquidShortcode('version', function() {
    return require('../package.json').version
  })

  //config.addLiquidFilter('sorting', sorting);
  config.setBrowserSyncConfig();
  config.setLibrary('md', md);


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
      input: 'usage',
      output: 'public',
      includes: 'include',
      layouts: 'layout',
      data: 'data'
    }
  };

});
