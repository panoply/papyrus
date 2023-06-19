import { EditorOptions, Languages, MountOptions } from './options';
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
   * Return current number of lines
   */
  get lines(): number;
  /**
   * Returns the HTML `<pre>` element
   */
  get pre(): HTMLPreElement;
  /**
   * Return the HTML `<code>` element
   */
  get code(): HTMLElement;
  /**
   * Return the HTML `<textarea>` element
   */
  get textarea(): HTMLTextAreaElement;
  /**
   * The raw string of the `<code>` element, i.e: `codeElement.textContent`
   */
  get raw(): string;
  /**
   * Applies an error overlay to the editor.
   */
  showError: (input: string, context?: {
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
  }) => void;
  /**
   * Hide any errors that were previously shown.
   */
  hideError: () => void;
  /**
   * Enable the editor. Calling this method will transform the
   * `<code>` region into code editor.
   */
  enableEditor: () => void;
  /**
   * Disable the editor. Calling this method will transform the
   * `<code>` region back into a static region.
   */
  disableEditor: () => void;
  /**
   * Update the current editor options. This method exposes editor
   * specific configuration only.
   */
  options(options?: EditorOptions): MountOptions;
  /**
   * Update the current code input, optionally provide a language id
   * to change the language mode too.
   */
  update(input: string, language?: Languages): void;
  /**
   * onUpdate callback function which will invoke when the editor
   * input has changed. This will be called in the `onkeyup` event.
   *
   * You can optionally return a `string` to update or augment the code
   * input. Returning a boolean `false` will cancel changes.
   */
  onUpdate<T = any>(callback:(
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
