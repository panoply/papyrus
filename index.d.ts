/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */

import type Prism from 'prismjs';
import * as M from './types/model';
import * as O from './types/options';
import { PartialDeep, SetRequired } from 'type-fest';
import type { StrategyProps } from '@textcomplete/core';

declare namespace Papyrus {

  /**
   * #### PAPYRUS 𓁁
   *
   * Completion Strategies (Type)
   *
   * Completions are made possible using [TextComplete](https://yuku.takahashi.coffee/textcomplete)
   * by [Yuku Takahashi](https://github.com/yuku). Papyrus will pass `strategies` to the editor
   * runtime. Provide completions a per language id basis.
   */
  type Completions = StrategyProps

  /**
   * #### PAPYRUS 𓁁
   *
   * Model Instance (Type)
   *
   * The Papyrus instance returning type from which
   * methods and additional control is available.
   */
  type Model = M.Model

  /**
   * #### PAPYRUS 𓁁
   *
   * Languages (Type)
   *
   * A Literal union of the current supported languages.
   */
  type Languages = O.Languages

  /**
   * #### PAPYRUS 𓁁
   *
   * DOM Options (Type)
   *
   * The available options of Papyrus when auto-invoking via the
   * default export of `papyrus`
   */
  type EditorOptions = PartialDeep<O.EditorOptions>

  /**
   * #### PAPYRUS 𓁁
   *
   * DOM Options (Type)
   *
   * The available options of Papyrus when auto-invoking via the
   * default export of `papyrus`
   */
  type Options = PartialDeep<O.Options>

  /**
   * #### PAPYRUS 𓁁
   *
   * Create Options (Type)
   *
   * The available options of Papyrus when creating a code element
   * via the `papyrus.create` method. The `create` method is Typically
   * used in NodeJS environments and returns a string.
   */
  type StaticOptions = Omit<SetRequired<PartialDeep<O.Options>, 'language'>, 'input'>;

  /**
   * #### PAPYRUS 𓁁
   *
   * An embedded code editor leveraging PrismJS.
   */
  interface Instance {
    /**
     * Map store reference of all current Papyrus instances on the page.
     */
    get model (): Map<string, Model>
    /**
     * Retrive an active code instance by `id` tracked by Papyrus in the
     * current document. By default, Papyrus will assign elements with
     * UUID references.
     *
     * If you want refined controll, you can override that behaviour and
     * pass a unqiue `id` value on the `<pre>` element, then from here
     * query it with this method.
     *
     * @example
     * import papyrus from 'papyrus';
     *
     * // Returns a papyrus model by id annotation
     * // Requires, an ID be passed on pre element, eg:
     * //
     * // <pre id="foo" class="papyrus"></pre>
     * //
     * papyrus.get('foo'): Model;
     *
     */
    get(id: string): M.Model;
    /**
     * Retrive all active code instances tracked by Papyrus in the
     * current document. By default, Papyrus will assign elements with
     * UUID references.
     *
     * If you want refined controll, you can override that behaviour and
     * pass a unqiue `id` value on the `<pre>` element, then from here
     * query it with this method.
     *
     * @see {@link M.Model}
     * @example
     * import papyrus from 'papyrus';
     *
     * // Returns a list of all current code regions in the DOM
     * //
     * papyrus.get(): Model[]
     *
     */
    list(): M.Model[];
    /**
     * #### BROWSER USAGE
     *
     * The default export is designed for usage in browser environments.
     * This method will initialize the Papyrus by selecting all `<pre>` elements
     * with a `papyrus` class name.
     *
     * When child `<code>` elements contain a `language-*` class name then Papyrus will
     * apply highlighting in accordance, if no language class exists then the default
     * `plaintext` will be used.
     *
     * ```html
     *
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
     *
     *
     * ```
     *
     * @example
     * import papyrus from 'papyrus';
     *
     * // Using the above markup example
     * //
     * const code = papyrus({
     *  // When <code> element has no language-* class, code will be treated as JavaScript
     *   language: 'javascript',
     * });
     *
     * // Returns an array of code elements in the DOM
     * //
     * code[0] // Returns the papyrus model for # 1
     * code[1] // Returns the papyrus model for # 2
     */
    (options?: Omit<Options, 'language' | 'input'>): M.Model[];
    /**
     * #### MOUNT
     *
     * This method can be used when you want to manually control the highlighting and
     * execution mode of Papyrus. Unlike the default method, you will need to provide
     * a `<pre>`, `<code>` or HTML element.
     *
     * > Papyrus will check the elements an apply necessary annotations for you if none
     * are provided.
     *
     * @example
     * import papyrus from 'papyrus';
     *
     * const code = papyrus.mount(document.querySelector('pre'), {
     *
     * // Create with editor mode enabled, disabled by default.
     *  editor: {
     *    lineNumber: 5,
     *    renderSpace: false
     *  },
     *  lineNumbers: true,
     *  showSpace: true
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
     * code.enableEditor();
     * code.disableEditor();
     *
     * // You may also update the input
     * //
     * code.update('{ "foo": "bar" }')
     *
     * // Optionally, provide a language id to switch modes
     * //
     * code.update('const foo: string = "bar";', 'typescript')
     *
     * // Callback event upon change
     * //
     * code.onupdate(function(input, language) {
     *
     *   console.log(input)
     *   console.log(language)
     *
     *   // Available in scope
     *   this.lineNumber
     *   this.element
     *
     *
     * })
     */
    mount(dom: string | HTMLElement, options?: Options): M.Model;
    /**
     * #### CREATE
     *
     * This method is typically for NodeJS usage. It will create static markup and
     * return a `string` of what was generated. Use this when generating for static sites,
     * leveraging a SSG such as 11ty or module like markdown-it.
     *
     * @example
     * import papyrus from 'papyrus';
     *
     * const input = `
     * <hr>
     * `;
     *
     * const output = papyrus.static(input, {
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
     *  <code class="language-html lines" contenteditable="plaintext-only">
     *  <span class="token delimiter"><</span>
     *  <span class="token tag">hr</span>
     *  <span class="token delimiter">></span>
     *  <span class="line-numbers">
     *  <span class="ln"></span>
     *  <span class="ln"></span>
     *  <span class="ln"></span>
     *  </span>
     *  </code>
     *  </pre>
     * `;
     */
    static(code: string, options: StaticOptions): string;
    /**
     * #### RENDER
     *
     * Render works identical to `papyrus.create` method but will return
     * a document element (HTMLPreElement) instead of a string.
     *
     * @example
    * import papyrus from 'papyrus';
    *
    * const input = `
    * <hr>
    * `;
    *
    * const output = document.querySelector('#element')
    *
    * papyrus.render(input, output, {
    *   language: 'html',  // Required
    *   editor: true,
    *   lineNumbers: true,
    *   trimEnd: false,   // optionally disable trims
    *   trimStart: false  // optionally disable trims
    * })
    *
    */
    render(code: string, output: string | HTMLElement, options?: Options): Model
  }
}

declare global {

  interface Window {
    /**
     * #### Prism ⟁ via Papyrus 𓁁
     *
     * The Papyrus instance of PrismJS.
     */
    Prism: typeof Prism;
    /**
     * #### PAPYRUS 𓁁
     *
     * Map store reference of current Papyrus code regions
     */
    get Papyrus(): Map<string, Papyrus.Model>
  }

}

/**
 * #### PAPYRUS 𓁁
 *
 * An embedded code editor leveraging PrismJS.
 */
declare const Papyrus: Papyrus.Instance;

export = Papyrus
