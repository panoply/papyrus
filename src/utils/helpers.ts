import { Options, Papyrus } from '../../';
import { decompressFromEncodedURIComponent } from 'lz-string';

export const isNode = !!(typeof process !== 'undefined' && process.versions != null);

export const { assign } = Object;
/**
 * **Utility** ~ Check if property exists in object
 */
export function has<T extends object> (prop: string, object: T): boolean {

  return prop in object;

}

/**
 * **Utility** ~ Trim Code Input
 */
export function trimInput (input: string, trimStart: boolean, trimEnd: boolean) {

  if (trimStart === true && trimEnd === true) {
    return input.trim();
  } else if (trimStart === true && trimEnd === false) {
    return input.trimStart();
  } else if (trimStart === false && trimEnd === true) {
    return input.trimEnd();
  }

  return input;
}

export function getLanguageFromCode (preEl: HTMLElement) {

  const codeEl = preEl.querySelector('code');

  if (codeEl && codeEl.hasAttribute('class')) {

    const className = codeEl.className.indexOf('language-');

    if (className > 0) {
      return getLanguageName(codeEl.className.slice(className + 9).split(' ')[0].trimEnd());
    }
  } else if (preEl.hasAttribute('class')) {

    const className = preEl.className.indexOf('language-');

    if (className > 0) {
      return getLanguageName(preEl.className.slice(className + 9).split(' ')[0].trimEnd());
    }
  }

  return 'plaintext';

}

/**
 * **Utility** ~ Extract the Language ID reference from className
 */
export function getLanguageFromClass (className: string) {

  const language = className.indexOf('language-');

  return getLanguageName(className.slice(language + 9).split(' ')[0].trimEnd());

}

export function getFlems (url: string) {

  return `<a href="${url}" target="_blank" style="display:flex;align-items:flex-start;justify-content:flex-end"><button type="button" dir="ltr" style="display:none" class="pce-copy" aria-label="Flems"><svg width="1.2em" viewBox="0 0 48 48" overflow="visible" stroke-width="4" stroke-linecap="round" fill="none" stroke="currentColor"><path d="M985.5 465.1 759.1 238.7c-4.6-4.6-11-7.3-17.5-7.3h-27.5c-34.5 0-65.2 22.1-76 54.9l-42.7 128.9c-3.3 10 4.1 20.4 14.7 20.4h76.2c10.5 0 17.9 10.3 14.6 20.2l-30.4 91.6c-3.4 10.1-12.8 17-23.5 17h-83.1c-10.7 0-20.2 6.8-23.5 17l-61.2 184.5c-18.8 56.4-61 99.5-114.5 119.4 11.7 11.7 21.1 12 28.5 12H613c6.6 0 12.9-2.6 17.5-7.3l355.2-355.2c19.1-19.2 19.1-50.4-.2-69.7zm-582 119.4c3.3-9.9-4.1-20.1-14.5-20.1h-74.6c-10.2 0-17.5-10-14.3-19.7l30.5-92.1c3.4-10.1 12.8-17 23.5-17H435c10.7 0 20.2-6.8 23.5-17l61.1-184.1c18.7-56.5 61-99.9 114.6-119.8-11.7-11.7-21.1-12-28.5-12H387.2c-6.6 0-12.9 2.6-17.5 7.3L14.5 465.1c-19.3 19.3-19.3 50.6 0 69.9l226.4 226.4c4.6 4.6 11 7.3 17.5 7.3h26.2c34.6 0 65.2-22.2 76.1-55l42.8-129.2z"/></svg></button></a>`;

}

export function getCopy () {

  return `<div style="display:flex;align-items:flex-start;justify-content:flex-end"><button onclick="this.setAttribute('aria-label','Copied!');C=document.createElement('textarea');document.body.appendChild(C);C.value=this.parentElement.parentElement.parentElement.innerText;C.select();document.execCommand('copy');document.body.removeChild(C);" onpointerenter="this.setAttribute('aria-label','Copy')" type="button" dir="ltr" style="display:none" class="pce-copy"><svg width="1.2em" viewBox="0 0 48 48" overflow="visible" stroke-width="4" stroke-linecap="round" fill="none" stroke="currentColor"><rect x="16" y="16" width="30" height="30" rx="3"></rect><path d="M32 9V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v24a3 3 0 0 0 3 3h4"></path></svg></button></div>`;

}

/**
 * **Utility** ~ Returns the correct language name
 */
export function getLanguageName (language: string): Papyrus.Languages | null {

  if (language === null || language === undefined) return null;

  const map = {
    html: 'html',
    shell: 'bash',
    bash: 'bash',
    cli: 'bash',
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
    toml: 'toml',
    yml: 'yaml',
    plaintext: 'plaintext',
    treeview: 'treeview',
    tree: 'treeview'
  };

  if (language in map) return map[language];

  console.error(`𓁁 Papyprus: Unsupported language "${language}" provided, will fallback to "plaintext"`);

  return null;

}

export function glue (string: string[], char = ' ') {

  return string.join(char).trimEnd();
}

export function decompress (json: string) {

  const config: Options.Default = JSON.parse(decompressFromEncodedURIComponent(json));

  config.selfCloseRegex = new RegExp(config.selfCloseRegex);

  return config;
}

/**
 * Return a UUID
 */
export function uuid () {

  return Math.random().toString(36).slice(2);

}
