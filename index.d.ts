/* eslint-disable no-unused-vars */
import type { LiteralUnion, Merge, MergeDeep } from 'type-fest';
import type { EditorExtension, InputCommandCallback, InputSelection, KeyCommandCallback, PrismEditor } from 'prism-code-editor';
import { BracketMatcher } from 'prism-code-editor/match-brackets';
import { Cursor } from 'prism-code-editor/cursor';
import { TagMatcher } from 'prism-code-editor/match-tags';
import { SearchWidget } from 'prism-code-editor/search';
import { IndentGuides } from 'prism-code-editor/guides';
import { ReadOnlyCodeFolding } from 'prism-code-editor/code-folding';
import { EditHistory } from 'prism-code-editor/commands';
import { TokenStream } from 'prism-code-editor/prism';

/**
 * List of supported options
 */
type Language = LiteralUnion<(
  | 'html'
  | 'bash'
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
  | 'plaintext'
  | 'treeview'
), string>

interface ISharedOptions {
  /**
   * Unique Identifier
   *
   * This is optional in mount but will allow you to assign an identifier
   * reference for the code block. When omitted a UUID will be applied, unless
   * the `<pre>` element contains an `id=""` attribute.
   *
   * @default 'ABC123'
   */
  id?: string;
  /**
   * A flems playground link. When defined, a flems hover button is rendered.
   *
   * @default null
   */
  flems?: string;
  /**
   * The language name.
   *
   * This is optional in mount and you can provide the language name
   * to code (e.g: `<code class="language-js">`) class elements. When
   * you provide a language name here, it will override the class (if)
   * one exists on the `<code>` element.
   *
   * If no language class is provided on the `<code>` element and this
   * is undefined then it will default to using `plaintext`.
   *
   * @default 'plaintext'
   */
  language: Language;
  /**
   * Tabsize for the editor.
   *
   * @default 2
   */
  tabSize?: number;
  /**
   * Whether the editor should insert spaces or tabs for indentation.
   *
   * @default false
   */
  useTabs?: boolean;
  /**
   * Whether the editor uses right to left directionality
   *
   * @default false
   */
  rtl?: boolean;
  /**
   * Whether or not to render a line fence (i.e: right border on the line numbers count).
   *
   * > **NOTE**
   * >
   * > This option is only available if `indentGuides` is `false` or `readOnly` is `true`
   *
   * @default false
   */
  lineFence?: boolean;
  /**
   * Whether line numbers should be shown.
   *
   * @default true
   */
  lineNumbers?: boolean;
  /**
   * Whether the editor should have word wrap.
   *
   * @default false
   */
  wordWrap?: boolean;
  /**
   * Whether or not leading whitespace/newlines should be trimmed (stripped)
   *
   * @default true
   */
  trimStart?: boolean;
  /**
   * Whether or not ending whitespace/newlines should be trimmed (stripped)
   *
   * @default true
   */
  trimEnd?: boolean;
  /**
   * Renders a copy button to the code block region
   *
   * @default true
   */
  copyButton?: boolean;
  /**
   * Auto-expand height of editor
   *
   * @default true
   */
  autoHeight?: boolean;
  /**
   * Apply additional classes to the `<pre>` element when creating the markup.
   *
   * @default []
   */
  preClass?: string[];
  /**
   * Apply attributes to the `<pre>` element when creating the markup.
   */
  preAttrs?: string[];
  /**
   * Additonal classes applied to `<code>`
   *
   * @default []
   */
  codeClass?: string[];
  /**
   * Apply attributes to the `<code>` element when creating the markup.
   */
  codeAttrs?: string[];
}

interface ISharedExtensions {
   /**
   * Renders widget for search and replace functionality.
   *
   * @default true
   */
  searchWidget?: boolean;
  /**
   * Extension that highlights selection matches in an editor.
   *
   * @default true
   */
  matchSelected?: boolean;
  /**
   * Pairs of self-closing brackets and quotes.
   *
   * **Must be an array of strings with 2 characters each.**
   *
   * @default
   * ['""', "''", '``', '()', '[]', '{}']
   */
  selfClosePairs?: string[];
  /**
   * Regex controlling whether or not a bracket/quote should
   * automatically close based on the character before and after the cursor.
   *
   * @default
   * /([^$\w'"`]["'`]|.[[({])[.,:;\])}>\s]|.[[({]`/s
   */
  selfCloseRegex?: RegExp;
  /**
   * Extension that adds an active-tagname class to matching HTML/XML/JSX tags
   * when the cursor is on either tag. If the editor doesn't have a TagMatcher,
   * one is created. Use the CSS selector .active-tagname to style the elements.
   * Obviously don't add this if the languages used don't have tags.
   *
   * @default true
   */
  matchTags?: boolean;
  /**
   * Extension adding a selectionChange handler to highlight the closest bracket pair.
   * You must to add a BracketMatcher to your editor for this extension to work.
   * The .active-bracket CSS selector can be used to highlight the brackets.
   *
   * @default true
   */
  bracketPairs?: boolean;
  /**
   * History extension that overrides the undo/redo behavior of the browser.
   *
   * Without this extension, the browser's native undo/redo is used, which can be sufficient
   * in some cases.
   *
   * It should be noted that the history stack is not automatically cleared when the editors
   * value is changed programmatically using `editor.setOptions` Instead you can clear the
   * stack any time using {@link EditHistory.clear}.
   *
   * Once added to an editor, this extension can be accessed from `editor.extensions.history`.
   *
   * If you want to create a new editor with different extensions while keeping the undo/redo
   * history of an old editor, you can! Just add the old editor's history extension instance
   * to the new editor. Keep in mind that this will fully break the undo/redo behavior of the
   * old editor.
   *
   * @default 999
   */
  editHistory?: number;
}

interface IndentGuidesEnabled extends Omit<ISharedExtensions, 'indentGuides' | 'lineFence'> {
  /**
   * Renders indentation guides
   *
   * @default true
   */
  indentGuides?: true;
}

interface IndentGuidesDisabled extends Omit<ISharedExtensions, 'indentGuides' | 'lineFence'> {
  /**
   * Renders indentation guides
   *
   * @default true
   */
  indentGuides?: false;
  /**
   * Whether or not to render a line fence (i.e: right border on the line numbers count).
   *
   * > **NOTE**
   * >
   * >This option is only available if `indentGuides` is `false`.
   *
   * @default false
   */
  lineFence?: boolean;
}

type ExtensionOptions = Merge<
  ISharedExtensions,
  IndentGuidesEnabled
> | Merge<
  ISharedExtensions,
  IndentGuidesDisabled
>

type ReadOnlyEnabled = Merge<ISharedOptions, {
  /**
   * Optionally provide code input to set as the initial value
   *
   * @default ''
   */
  input?: string;
  /**
   * Whether or not to render a line fence (i.e: right border on the line numbers count).
   *
   * @default false
   */
  lineFence?: boolean;
  /**
   * Whether the editor should be read only. When `false` editor will mount and activate
   * converting the static `<pre><code></code></pre>` structure into an editor.
   *
   * @default false
   */
  readOnly?: true;
}>

type ReadOnlyDisable = Merge<ExtensionOptions, {
  /**
   * Optionally provide code input to set as the initial value
   *
   * @default ''
   */
  input?: string;
  /**
   * Whether the editor should be read only. When `false` editor will mount and activate
   * converting the static `<pre><code></code></pre>` structure into an editor.
   *
   * @default false
   */
  readOnly?: false;
 /**
   * LoC Limit, if the number of lines exceeds the limit defined, Papyrus will show warning.
   *
   * @default 1500
   */
  locLimit?: number;
}>

export declare namespace Options {

  /**
   * Shared Options
   */
  export type Shared = ISharedOptions;

  /**
   * Extensions Options
   */
  export type Extensions = ExtensionOptions

  /**
   * Default Options
   *
   * ```js
   * import papyrus from 'papyrus';
   *
   * // Options will be used as defaults if hydrating an editor occurance
   * //
   * papyrus({})
   *
   * // Used with mount method
   * //
   * papyrus.mount('#foo', {})
   * ```
   */
  export interface Default extends ISharedOptions, ISharedExtensions {
    /**
     * Internal reference describing the type of code block region
     *
     * @default 'editor'
     */
    type?: 'editor' | 'static' | 'mount';
    /**
     * Optionally provide code input to set as the initial value
     *
     * @default ''
     */
    input?: string;
    /**
     * Renders indentation guides
     *
     * @default true
     */
    indentGuides?: boolean;
    /**
     * Whether or not to render a line fence (i.e: right border on the line numbers count).
     *
     * @default false
     */
    lineFence?: boolean;
    /**
     * Whether the editor should be read only. When `false` editor will mount and activate
     * converting the static `<pre><code></code></pre>` structure into an editor.
     *
     * @default false
     */
    readOnly?: boolean;
    /**
     * LoC Limit, if the number of lines exceeds the limit defined, Papyrus will show warning.
     *
     * @default 1500
     */
    locLimit?: number;
  }
  /**
   * Default Options
   *
   * ```js
   * import papyrus from 'papyrus';
   *
   * // Used with mount method
   * //
   * papyrus.mount('#foo', {})
   * ```
   */
   export type Mount = Default

  /**
    * Static Editor Rendering Options (typicall used in nodejs)
    *
    * ```js
    * import papyrus from 'papyrus';
    *
    * // Editor method will be hydrated and mounted
    * //
    * papyrus.static('<h1>Hello</h1>', {})
    * ```
    */
  export type Static = Omit<Default, 'input'>;

  /**
   * Renders a readonly code block. Editor mounting is not possible with static
   *
   * ```js
   * import papyrus from 'papyrus';
   *
   * papyrus.highlight('<h1>Hello</h1>', {})
   * ```
   */
  export type Highlight = Omit<ISharedOptions, 'id'>;

  /**
   * Inline Options. Editor mounting is not possible with inline
   *
   * ```js
   * import papyrus from 'papyrus';
   *
   * papyrus.inline('<h1>Hello</h1>', {
   *  language: 'html', // Required
   *  trimStart: false, // Optional
   *  trimeEnd: false,  // Optional
   *  addAttrs: [],     // Optional
   *  addClass: []      // Optional
   * })
   * ```
   */
  export interface Inline extends Pick<ISharedOptions, 'language' | 'trimStart' | 'trimEnd'> {
    /**
     * Add additional attributes to the `<code>` element
     *
     * @default []
     */
    addAttrs?: string[];
    /**
     * Add additional classes to the `<code class="">` element
     *
     * @default []
     */
    addClass?: string[]
  }

}

interface Instance {
  /**
   * This is the outermost element of the editor.
   *
   * ```html
   * <div class="language-html"> <!-- THIS -->
   * ...
   * </div>
   * ```
   */
  readonly container: HTMLDivElement;
  /**
   * Element wrapping the lines and overlays.
   *
   * ```html
   * <div class="language-html">
   *   <div class="wrapper"> <!-- THIS -->
   *   ...
   *   </div>
   * </div>
   * ```
   */
  readonly wrapper: HTMLDivElement;
  /**
    * Element containing overlays that are absolutely positioned ontop or behind the code.
    * It is completely safe to append your own overlays to this element, but they will get
    * some default styles.
    *
    * ```html
    * <div class="language-html">
    *   <div class="wrapper">
    *     <div class="overlays"> <!-- THIS -->
    *      ...
    *     </div>
    *     ...
    *   </div>
    * </div>
    * ```
    */
  readonly overlays: HTMLDivElement;
  /**
   * Underlying `<textarea>` in the editor.
   *
   * ```html
   * <div class="language-html">
   *   <div class="wrapper">
   *     <div class="overlays">
   *       ...
   *       <textarea></textarea> <!-- THIS -->
   *     </div>
   *     ...
   *   </div>
   * </div>
   * ```
   */
  readonly textarea: HTMLTextAreaElement;
  /**
   * The line the cursor is currently on.
   *
   * ```html
   * <div class="language-html">
   *   <div class="wrapper">
   *     <div class="overlays">
   *       ...
   *       <textarea></textarea>
   *     </div>
   *     ...
   *     <div class="active-line" data-line="1">...</div> <!-- THIS -->
   *     <div class="pce-line" data-line="2">...</div>
   *   </div>
   * </div>
   * ```
   */
  readonly activeLine: HTMLDivElement;
  /**
   * The line number of the active line.
   */
  readonly lineNumber: number;
  /**
   * The language id of the editor
   */
  readonly language: Language;
  /**
   * Whether the `textarea` is focused.
   */
  readonly focused: boolean;
  /**
   * The unique identifier for the instance
   */
  readonly id: string;
  /**
   * The initial code input before any changes
   */
  readonly initial: string;
  /**
   * Current code in the editor. Same as `textarea.value`.
   */
  readonly input: string;
  /**
   * Record mapping an input to a function called when that input is typed.
   */
  readonly inputCommandMap: Record<string, InputCommandCallback | null | undefined>;
  /**
   * Record mapping KeyboardEvent.key to a function called when that key is pressed.
   */
  readonly keyCommandMap: Record<string, KeyCommandCallback | null | undefined>;
  /**
   * True if the remove method has been called.
   */
  readonly removed: boolean;
  /**
   * Tokens currently displayed in the editor.
   */
  readonly tokens: TokenStream;
  /**
   * Object storing some of the extensions added to the editor.
   */
  readonly extensions: {
    matchBrackets?: BracketMatcher;
    matchTags?: TagMatcher;
    cursor?: Cursor;
    searchWidget?: SearchWidget;
    indentGuides?: IndentGuides;
    codeFold?: ReadOnlyCodeFolding;
    history?: EditHistory;
  };
  /**
   * Get or Sets the selection for the `textarea` and synchronously runs the selectionChange listeners.
   * If you don't want to synchronously run the listeners, use `textarea.setSelectionRange` instead.
   *
   * Omitting parameters will return `selectionStart`, `selectionEnd` and `selectionDirection` for the `textarea`
   *
   * @param start New selectionStart.
   * @param end New selectionEnd. Defaults to `start`.
   * @param direction New direction.
   */
  select(this: void, start?: number, end?: number, direction?: 'backward' | 'forward' | 'none'): InputSelection;
  /**
   * Adds extensions to the editor and calls their update methods.
   */
  addExtensions(this: void, ...extensions: EditorExtension[]): void;
  /**
   * Disable editor mode
   */
  disable(): void;
  /**
   * Enable editor mode
   */
  enable(): void;
  /**
   * Enable editor mode
   */
  error: {
    /**
     * Render an error overlay on the editor. Optionally provide some basic
     * UX customisations for making better readability when generating errors.
     */
    show(input: string, context?: {
      /**
       * Render an error title
       *
       * @default 'Error has occured'
       */
      title?: string;
      /**
       * Applied to the header of the error message
       *
       * @default 'ERROR'
       */
      heading?: string;
      /**
       * Render error stack trace message
       *
       * @default ''
       */
      stack?: string;
    }): void;
    /**
     * Hide a current shown error
     */
    hide(): void;
  }
  /**
   * Reset input
   */
  reset(clearHistory?: boolean): void;
  /**
   * Removes the editor from the DOM and marks the editor as removed.
   */
  remove(this: void): void;
  /**
   * Update the current code input, optionally change the language mode and clear history.
   */
  update(input: string, language?: Language, clearHistory?: boolean): void;
  /**
   * Adjust scroll
   */
  scroll(position?: { y?: number, x?: number }): void;
  /**
   * Set the editor height
   */
  height:(y?: number, reset?: boolean) => number
  /**
   * Update the current editor options. Set new options for the editor.
   * Ommitted properties will use their old value.
   */
  options(options?: Options.Default): Options.Default;
  /**
   * Triggers when active line number has changed.
   */
  onselect<T = any>(callback:(
    this: MergeDeep<T, { editor: Instance; }>,
    /**
     * The input Selection
     */
    inputSelection?: InputSelection,

  ) => void,
    /**
     * Optionally pass `this` scope context to bind to the callback.
     */
    scope?: T

  ): void;
  /**
   * onUpdate callback function which will invoke when the editor
   * input has changed. This will be called in the `onkeyup` event.
   *
   * You can optionally return a `string` to update or augment the code
   * input. Returning a boolean `false` will cancel changes.
   */
  onupdate<T = any>(callback:(
    this: MergeDeep<T, { editor: Instance; }>,
    /**
     * The `<code>` text content
     */
    input?: string,
  ) => void | string | false,
    /**
     * Optionally pass `this` scope context to bind to the callback.
     */
    scope?: T

  ): void;
  /**
   * onsave callback function which will invoke when the editor
   * input has changed. This will be called when cmd + s was executed
   *
   * You can optionally return a `string` to update or augment the code
   * input. Returning a boolean `false` will cancel changes.
   */
  onresize<T = any>(callback:(
    this: MergeDeep<T, { editor: Instance; }>,
    bounding: {
      /**
       * The current `offsetHeight`
       */
      height: number,
      /**
       * The current `offsetWidth`
       */
      width: number,
      /**
       * The current `scrollLeft`
       */
      scrollX: number,
      /**
       * The current `scrollTop`
       */
      scrollY: number
    }
  ) => void,
    /**
     * Optionally pass `this` scope context to bind to the callback.
     */
    scope?: T

  ): void;
  /**
   * onsave callback function which will invoke when the editor
   * input has changed. This will be called when cmd + s was executed
   *
   * You can optionally return a `string` to update or augment the code
   * input. Returning a boolean `false` will cancel changes.
   */
  onsave<T = any>(callback:(
    this: MergeDeep<T, { editor: Instance; }>,
    /**
     * The `<code>` text content
     */
    input?: string,

  ) => void,
    /**
     * Optionally pass `this` scope context to bind to the callback.
     */
    scope?: T

  ): void;
 /**
  * onscroll callback function which will trigger onscroll adjustments
  */
 onscroll<T = any>(callback:(
    this: MergeDeep<T, { editor: Instance; }>,
    position: {
      /**
       * The Scroll Y
       */
      y?: number,
      /**
       * The Scroll X
       */
      x?: number
    }
  ) => void,
    /**
     * Optionally pass `this` scope context to bind to the callback.
     */
    scope?: T
  ): void;
}

interface Cache {
  /**
   * The raw string
   */
  type: 'static' | 'highlight' | 'inline';
  /**
   * The raw string
   */
  input: string;
  /**
   * The raw HTML Markup
   */
  markup: string;
  /**
   * Options
   */
  config: Options.Default
}

interface API<T extends Cache | Instance> {
  /**
   * #### Model 𓁁
   *
   * Map store reference of all current Papyrus instances on the page.
   */
  get model (): Map<string, T>
  /**
   * #### Get 𓁁
   *
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
   * const editor = papyrus.get('foo');
   *
   * editor.wrapper // => HTMLElement
   *
   */
  get(id: string): T;
  /**
   * #### List 𓁁
   *
   * Retrive all active code instances tracked by Papyrus in the
   * current document. By default, Papyrus will assign elements with
   * UUID references.
   *
   * If you want refined controll, you can override that behaviour and
   * pass a unqiue `id` value on the `<pre>` element, then from here
   * query it with this method.
   *
   * @see {@link Model}
   * @example
   * import papyrus from 'papyrus';
   *
   * // Returns a list of all current code regions in the DOM
   * //
   * papyrus.list(): Instance[]
   *
   */
  list(): T[];
  /**
   * #### Static 𓁁
   *
   * This method is typically for NodeJS usage. It will create static markup and
   * return a `string` of what was generated. Use this when generating for static sites,
   * leveraging a SSG such as 11ty or module like markdown-it.
   *
   * > **NOTE**
   * >
   * > This method will prevent editor mounting. Use `papyrus.static()` method for mounting.
   *
   * @example
   * import papyrus from 'papyrus';
   *
   * const input = `<h1>Hello World</h1>`;
   *
   * const output = papyrus.highlight(input, {
   *   language: 'html', // REQUIRED
   * })
   */
  highlight(code: string, options: Options.Highlight): string;
  /**
   * #### Editor 𓁁
   *
   * This method is typically for NodeJS usage. It will be used to prepare a code block
   * for editor hydration and mounting in the browser.
   *
   * @example
   * import papyrus from 'papyrus';
   *
   *
   * // in NodeJS
   * const output = papyrus.static(`<h1>Hello World</h1>`, {
   *   language: 'html', // REQUIRED
   *   readOnly: false,  // ENABLE IF HYDRATING
   * })
   *
   * // In Browser
   * papyrus()
   */
  static(code: string, options: Options.Static): string;
  /**
   * #### Inline 𓁁
   *
   * This method can be used to apply inline syntax highlighting.
   *
   * ```md
   * `{js} some.method()`
   * ```
   *
   * Inline highlights take code input and return a `<code class="language-{name}"></code>`
   * HTML string (where `{name}` represents a language id.).
   *
   * > **NOTE**
   * >
   * > Inline code blocks are **readonly**.
   *
   * @example
   * import papyrus from 'papyrus';
   *
   * const inline = papyrus.inline(`<h1>Hello World</h1>`, {
   *   language: 'html', // REQUIRED
   *   trimStart: false, // optional
   *   trimEnd: false,   // optional
   *   addAttrs: [],     // optional
   *   addClass: []      // optional
   * });
   */
  inline(code: string, options: Options.Inline): string;
}

interface BrowserAPI extends API<Instance> {
  /**
   * #### BROWSER USAGE
   *
   * The default export is designed for usage in browser environments.
   * This method will initialize Papyrus by selecting all code block elements
   * for editor mounting.
   *
   * Papyrus will carry out analysis for all code block elements to determine how
   * it should proceed and whether or hydration applies, etc.
   *
   * @example
  * import papyrus from 'papyrus';
  *
  * //
  * const code = papyrus({});
  *
  * // Returns an array of code elements in the DOM
  * //
  * code[0] // Returns the papyrus model for # 1
  * code[1] // Returns the papyrus model for # 2
  *
  * // If only 1 element in the DOM is will return that
  *
  * code // Returns the papyrus model
  */
 (options?: Options.Default): Instance[];
  /**
   * #### Mount 𓁁
   *
   * This method will create editor instance/s and can be used when you want to
   * manually control the highlighting and execution mode of Papyrus. Unlike the default
   * `papyrus()` method, you will need to provide a selector or HTML element/s.
   *
   * > Papyrus will check the elements an apply necessary annotations for you if none
   * are provided.
   *
   * @example
   * import papyrus from 'papyrus';
   *
   * const code = papyrus.mount(document.querySelector('pre'));
   *
   * // Returns a model, you can access different methods
   * //
   * code.onupdate(() => {})
   */
  mount?:<T extends Instance | Instance[]>(dom: string | HTMLElement | Element, options?: Options.Mount) => T
}

interface NodeAPI extends API<Cache> {}

export declare namespace Papyrus {

  /**
   * #### PAPYRUS 𓁁
   *
   * Language IDs (Type)
   *
   * A Literal union of the current supported languages.
   */
  type Languages = Language

  /**
   * #### PAPYRUS 𓁁
   *
   * Model Instance (Type)
   *
   * The Papyrus instance returning type from which
   * methods and additional control is available.
   */
  type Model = Instance;

  /**
   * #### PAPYRUS 𓁁
   *
   * The available options of Papyrus when auto-invoking via the
   * default export of `papyrus`
   */
  type Options = Options.Default;

  /**
   * #### PAPYRUS 𓁁
   *
   * An embedded code editor leveraging [PrismJS](https://prismjs.com/)
   * together with [Prism Code Editor](https://prism-code-editor.netlify.app/).
   */
  type Node = NodeAPI

  /**
   * #### PAPYRUS 𓁁
   *
   * An embedded code editor leveraging [PrismJS](https://prismjs.com/)
   * together with [Prism Code Editor](https://prism-code-editor.netlify.app/).
   */
  type Browser = BrowserAPI
}

declare global {

  interface Window {
    /**
     * #### PAPYRUS 𓁁
     *
     * Map store reference of current Papyrus code regions
     */
    get papyrus(): Map<string, Papyrus.Model>
  }

}

/**
 * #### PAPYRUS 𓁁
 *
 * Enhanced syntax highlighting leveraging [Prism](https://prismjs.com/)
 * with embedded code editing using [Prism Code Editor](https://prism-code-editor.netlify.app/).
 */
declare const papyrus: Papyrus.Browser;

// @ts-expect-error
export = papyrus
