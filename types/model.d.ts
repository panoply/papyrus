import { EditorOptions, Languages } from './options';
import { Textcomplete } from '@textcomplete/core';
import { Merge } from 'type-fest';

export interface Model {
  /**
   * The current mode papyrus is operating in
   *
   * **static**
   *
   * Rendering a code block with editing disabled.
   *
   * **error**
   *
   * Showing an error message overwrite
   *
   * **editing**
   *
   * Editing is enabled in the code block
   */
  get mode(): 'static' | 'error' | 'editing';
  /**
   * Returns the current language of the code region (as per the `class="language-xxx"`)
   */
  get language(): Languages;
  /**
   * The current number of lines
   */
  get lines(): number;
  /**
   * The Papyrus HTML `<pre>` element
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
   * The initial input raw string before any edits
   */
  get initial(): string;
  /**
   * The raw string of the `<code>` element. This will only show
   * the most recent input state, use `onupdate` method to obtain
   * realtime edits being made.
   */
  get raw(): string;
  /**
   * Reference to the [TextComplete](https://yuku.takahashi.coffee/textcomplete)
   * instance, otherwise `undefined` if no completion strategies are defined.
   */
  get complete(): Textcomplete;
  /**
   * Render an error overlay on the editor. Optionally provide some basic
   * UX customisations for making better readability when generating errors.
   */
  showError(input: string, context?: {
    /**
     * Render an error title
     *
     * @default 'Error has occured'
     */
    title?: string;
    /**
     * Render error stack trace message
     *
     * @default ''
     */
    stack?: string;
    /**
     * Applied to the header of the error message
     *
     * @default 'ERROR'
     */
    heading?: string;
  }): void;
  /**
   * Hide any errors that were previously shown.
   */
  hideError: () => void;
  /**
   * Enable the editor. Calling this method will transform the
   * `<code>` region into a `<textarea>` ~ Optionally provide
   * custom editor options
   */
  editor: {
    (options?: EditorOptions): () => void;
    /**
     * Disable editor mode
     */
    disable: () => void;
    /**
     * Enable editor mode
     */
    enable: () => void;
  }
  /**
   * Update the current editor options. This method exposes editor
   * specific configuration only.
   */
  options(options?: EditorOptions): EditorOptions;
  /**
   * Update the current code input, optionally provide a language id
   * to change the language mode too. When changing language, you can
   * also provide an additional third parameter to clear history which
   * defaults to `false`.
   */
  update(input: string, language?: Languages, clearHistory?: boolean): void;
  /**
   * onUpdate callback function which will invoke when the editor
   * input has changed. This will be called in the `onkeyup` event.
   *
   * You can optionally return a `string` to update or augment the code
   * input. Returning a boolean `false` will cancel changes.
   */
  onupdate<T = any>(callback:(
    this: Merge<T, {
      /**
       * The `<code>` element
       */
      element: HTMLElement;
      /**
       * The current line number
       */
      lineNumber: HTMLElement;
    }>,
    /**
     * The `<code>` text content
     */
    code?: string,
    /**
     * The current language name
     */
    language?: Languages

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
  onsave<T = any>(callback:(
    this: Merge<T, {
      /**
       * The `<code>` element
       */
      element: HTMLElement;
      /**
       * The current line number
       */
      lineNumber: HTMLElement;
    }>,
    /**
     * The `<code>` text content
     */
    code?: string,
    /**
     * The current language name
     */
    language?: Languages

  ) => void | string | false,
    /**
     * Optionally pass `this` scope context to bind to the callback.
     */
    scope?: T

  ): void;
}
