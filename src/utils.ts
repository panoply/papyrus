import { IOptions, IRenderOptions, Languages } from '../index';

/**
 * **Utility** ~ Trim Code Input
 */
export function trimInput (input: string, options: IOptions) {

  if (options.trimStart && options.trimStart) {
    return input.trim();
  } else if (options.trimStart === true && options.trimEnd === false) {
    return input.trimStart();
  } else if (options.trimStart === false && options.trimEnd === true) {
    return input.trimEnd();
  }

  return input;
}

/**
 * **Utility** ~ Extract the Language ID reference from className
 */
export function getLanguageFromClass (className: string, options: IOptions) {

  const language = className.indexOf('language-');
  const langName = {
    html: 'html',
    shell: 'shell',
    css: 'css',
    scss: 'scss',
    liquid: 'liquid',
    xml: 'xml',
    json: 'json',
    javascript: 'javascript',
    js: 'javascript',
    typescript: 'typescript',
    ts: 'typescript',
    jsx: 'jsx',
    tsx: 'tsx',
    yaml: 'yaml'
  }[className.slice(language + 9).split(' ')[0].trimEnd()] as Languages;

  if (langName) {
    if (options.language === null) options.language = langName;
    return langName;
  }

  if (options.language !== null) return options.language;

  return langName;

}

/**
 * **Utility** ~ Returns the correct language name
 */
export function getLanguageName (language: string): Languages {

  return {
    html: 'html',
    shell: 'shell',
    css: 'css',
    scss: 'scss',
    liquid: 'liquid',
    xml: 'xml',
    json: 'json',
    javascript: 'javascript',
    js: 'javascript',
    typescript: 'typescript',
    ts: 'typescript',
    jsx: 'jsx',
    tsx: 'tsx',
    yaml: 'yaml',
    plaintext: 'plaintext'
  }[language || 'plaintext'] as Languages;

}

/**
 * **Utility** ~ Returns the number of newline occurances
 */
export function getLineCount (code: string) {

  return code.split('\n').length;

}

/**
 * **Utility** ~ Returns the newline counter node
 */
export function getLineNumbers (count: number, hover?: boolean) {

  let nl = '';

  for (let i = 0; i < count; i++) nl += `<span class="${hover ? 'ln hover' : 'ln'}" data-line="${i + 1}"></span>`;
  return `<span class="line-numbers">${nl}</span>`;

}

/**
 * **Utility** ~ Merge options
 */
export function mergeOptions (config: IOptions) {

  const defaults = {
    autoSave: true,
    prism: null,
    editor: true,
    potion: true,
    indentChar: 'none',
    indentSize: 2,
    input: '',
    language: null,
    lineHighlight: true,
    lineIndent: true,
    lineNumbers: true,
    locLimit: 1500,
    tabIndent: false,
    spellcheck: false,
    showCRLF: false,
    showSpace: true,
    showCR: false,
    showLF: false,
    showTab: false,
    trimEnd: true,
    trimStart: true
  };

  for (const option in config) defaults[option] = config[option];

  return defaults;

}

export function mergeRenderOptions (config: IRenderOptions) {

  const defaults: IRenderOptions = {
    autoSave: true,
    prism: globalThis.Prism,
    editor: true,
    indentChar: 'none',
    indentSize: 2,
    potion: true,
    insertCodeElement: true,
    insertPreElement: true,
    insertTextArea: false,
    language: 'javascript',
    lineHighlight: true,
    lineIndent: true,
    lineNumbers: true,
    locLimit: 1500,
    tabIndent: false,
    spellcheck: false,
    showCRLF: false,
    showSpace: false,
    showCR: false,
    showLF: false,
    showTab: false,
    trimEnd: true,
    trimStart: true
  };

  for (const option in config) defaults[option] = config[option];

  defaults.language = getLanguageName(config.language);

  return defaults;

}
