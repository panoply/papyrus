/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import type Prism from 'prismjs';

export type Languages = (
  | 'html'
  | 'shell'
  | 'css'
  | 'scss'
  | 'liquid'
  | 'xml'
  | 'json'
  | 'javascript'
  | 'typescript'
  | 'jsx'
  | 'tsx'
  | 'yaml'
)

export interface IOptions {
  /**
   * Whether or not to use potion theme extension
   */
  potion?: boolean;
  /**
   * The language name
   */
  language?: Languages;
  /**
   * Optionally provide input code.
   *
   * @default ''
   */
  input?: string;
  /**
   * Whether or not leading should be trimmed
   *
   * @default true
   */
  trimStart?: boolean;
  /**
   * Whether or not ending should be trimmed
   *
   * @default true
   */
  trimEnd?: boolean;
  /**
   * Whether or not editor mode is enabled.
   *
   * @default true
   */
  editor?: boolean;
  /**
   * Whether or not autoSave is enabled.
   *
   * @default true
   */
  autoSave?: boolean;
  /**
   * The number of allowed lines
   *
   * **Maximum of 5000**
   *
   * @default 1500
   */
  locLimit?: number;
  /**
   * Whether or not to highlight the active line
   *
   * @default true
   */
  lineHighlight?: boolean;
  /**
   * Whether or not line numbers show
   *
   * @default true
   */
  lineNumbers?: boolean;
  /**
   * Autoclosing pairs
   *
   * @default false
   */
  spellcheck?: boolean;
  /**
   * Preserve newline indentation
   *
   * @default true
   */
  lineIndent?: boolean;
  /**
   * Whether or not tabbed indentation is enabled. This is disabled by default
   * to ensure large documents do not effect performance. Enable if you are using
   * Papyrus in documents which span less than 2000 lines
   *
   * @default false
   */
  tabIndent?: boolean;
  /**
   * The indentation character
   *
   * @default 'space'
   */
  indentChar?: 'tab' | 'space' | 'none';
  /**
   * The indentation size
   *
   * @default 2
   */
  indentSize?: number;
  /**
   * Show Invisible whitespace characters, eg: ` `
   *
   * @default false
   */
  showSpace?: boolean;
  /**
   * Show Invisible tab characters, eg: `\t`
   *
   * @default false
   */
  showTab?: boolean;
  /**
   * Show CRLF characters
   *
   * @default false
   */
  showCRLF?: boolean;
  /**
   * Show LF characters
   *
   * @default false
   */
  showLF?: boolean;
  /**
   * Show LF characters
   *
   * @default false
   */
  showCR?: boolean;
}

export interface IRenderOptions extends Omit<IOptions, 'input'> {
  /**
   * The language name
   */
  prism: typeof Prism;
  /**
   * The language name
   */
  language: Languages;
  /**
   * Whether or not to insert pre elmement
   *
   * @default true
   */
  insertPreElement?: boolean;
  /**
   * Whether or not to insert code token
   *
   * @default true
   */
  insertCodeElement?: boolean;
  /**
   * Whether or not to insert textarea
   *
   * @default true
   */
  insertTextArea?: boolean;
}

export interface IModel {
  /**
   * The Language Name as per the `class="language-xxx"`
   */
  get language(): Languages;
  /**
   * Update the language id - (use the `update()` method to change input)
   */
  set language(languageId: Languages)
  /**
   * The number of lines
   */
  get lines(): number;
  /**
   * The HTML `<pre>` element
   */
  get pre(): HTMLPreElement;
  /**
   * The HTML `<code>` element
   */
  get code(): HTMLElement;
  /**
   * The HTML `<textarea>` element
   */
  get textarea(): HTMLTextAreaElement;
  /**
   * The raw string of the `textarea`
   */
  get raw(): string;
  /**
   * Update the input, optionally provide a language id
   * to change the language mode.
   */
  update: (input: string, language?: Languages) => void;
  /**
   * Disable editor
   */
  disable: () => void;
  /**
   * Disable editor
   */
  enable: () => void;
}

/**
 * #### PAPYRUS 𓁁
 *
 * An embedded code editor leveraging PrismJS.
 */
export const Papyrus: {
  /**
   * #### Prism ⟁
   *
   * Define the PrismJS instance
   *
   * @example
   * import prism from 'prismjs';
   * import papyrus from 'papyrus';
   *
   * papyrus.prism = prism
   *
   * // Somewhere else in your bundle
   * papyrus({
   *   editor: false,
   *   lineNumbers: true,
   *   // etc etc ...
   * });
   *
   */
  prism: typeof Prism
  /**
   * Papyrus models within the DOM - Use the `papyus.get()` method
   * to obtain models.
   */
  models: Map<string, IModel>
  /**
   *
   * Retrive an active instance.
   *
   * @example
   * import prism from 'prismjs';
   * import papyrus from 'papyrus';
   *
   * // Returns the current model in DOM
   * //
   * papyrus.get(): IModel
   *
   * // Returns a papyrus model by id annotation.
   * // Requires, an ID be passed on pre element, eg:
   * //
   * // <pre id="foo" class="papyrus"></pre>
   * //
   * papyrus.get('foo'): IModel;
   *
   */
  get(id?: string): IModel;
  /**
   * #### BROWSER USAGE
   *
   * The default export is designed for usange in browser environments.
   * This method will initialize the editor by selecting all `<pre>` elements
   * using a `papyrus` className. When child `<code>` elements contain a `language-*`
   * className, Papyrus will assume language mode in accordance, otherwise provide
   * a language name in the options.
   *
   * ```html
   * <!-- # 1 - Inferring Language Mode via class name -->
   * <pre class="papyrus">
   *   <code class="language-css">
   *    .selector {
   *      color: #fff;
   *    }
   *   </code>
   * </pre>
   *
   * ---
   *
   * <!-- # 2 - Language Mode will be passed in options -->
   * <pre class="papyrus">
   *   <code>
   *    const foo = "bar";
   *   </code>
   * </pre>
   * ```
   *
   * @example
   * import prism from 'prismjs';
   * import papyrus from 'papyrus';
   *
   * // Using the above markup example
   * //
   * const code = papyrus(prism, {
   *  // When <code> element has no language-* class, code will be treated as JavaScript
   *   language: 'javascript',
   * });
   *
   * // Returns an array of code elements in the DOM
   * //
   * code[0] // Returns the papyrus model for # 1
   * code[1] // Returns the papyrus model for # 2
   */
  (options?: Omit<IOptions, 'language'>): IModel[];
  /**
   * #### POTION 🧝🏽‍♀️
   *
   * Extends PrismJS grammars to support Potion theming. Potion theming exposes
   * additional token captures.
   *
   * This method Expects an instance of PrismJS to be passed.
   *
   * @example
   * import prism from 'prismjs';
   * import papyrus from 'papyrus';
   *
   * // BROWSER USAGE
   * //
   * papyrus.potion(prism)({
   *  editor: true,
   *  lineNumbers: true,
   *  showSpace: true,
   *  // etc etc ....
   * })
   *
   * // NODE USAGE
   * //
   * papyrus.potion(prism).highlight('{{ object.prop }}', {
   *   language: 'liquid',
   *   lineNumbers: true,
   *   // etc etc ....
   * })
   */
  potion(prism: typeof Prism): Omit<typeof Papyrus, 'potion'>;
  /**
   * #### MOUNT
   *
   * The editor method can be used when you want to manually control
   * highlighting and execution of Papyrus. Unlike the default method,
   * you will need to provide the `<pre>` HTML element.
   *
   * @example
   * import prism from 'prismjs';
   * import papyrus from 'papyrus';
   *
   * // Provide PrismJS context manually
   * //
   * // The mount method requires PrismJS context.
   * // You can manually set this, eg:
   *
   * papyrus.prism = prism
   *
   * const code = papyrus.mount(document.querySelector('pre'), {
   *  editor: true,
   *  lineNumbers: true,
   *  showSpace: true,
   *  // etc etc ....
   * });
   *
   * // Returns a model, you can access different methods
   * //
   * code.pre: HTMLPreElement;
   * code.code: HTMLElement;
   * code.language: Language
   *
   * // You can also enable/disable editor modes
   * //
   * code.enable();
   * code.disable();
   *
   * // You may also update the input
   * //
   * code.update('{ "foo": "bar" }')
   *
   * // Optionally, provide a language id to switch modes
   * //
   * code.update('const foo: string = "bar";', 'typescript')
   *
   */
  mount(dom: HTMLPreElement, options?: IOptions): IModel;
  /**
   * #### RENDER
   *
   * This method is typically for NodeJS usage. It will return the generated
   * papyrus nodes according to options as a string. Use this when generating
   * static sites with an SSG.
   *
   * @example
   * import prism from 'prismjs';
   * import papyrus from 'papyrus';
   *
   * const input = `
   * <hr>
   * `;
   *
   * const output = papyrus.render(input, {
   *   language: 'html',  // Required
   *   editor: true,
   *   lineNumbers: true,
   *   trimEnd: false,   // optionally disable trims
   *   trimStart: false  // optionally disable trims
   * })
   *
   *  // The return value of `output` is:
   *
   *  `
   *  <pre class="papyrus">
   *  <code class="language-html">
   *  <span class="token delimiter"><</span>
   *  <span class="token tag">hr</span>
   *  <span class="token delimiter">></span>
   *  <span class="line-numbers">
   *  <span class="ln" data-line="1"></span>
   *  </span>
   *  </code>
   *  <textarea class="editor"></textarea>
   *  </pre>
   * `;
   */
  render(code: string, options: IRenderOptions): string;
};

declare global {

  interface Window {
    /**
     * #### PAPYRUS 𓁁
     */
    papyrus: typeof Papyrus
  }

  /**
   *#### PAPYRUS 𓁁
   */
  export const papyrus: typeof Papyrus;

}
