/**
 * List of supported options
 */
export type Languages = (
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
)

export interface EditorOptions {
  /**
   * A list of characters to indent onto newlines
   *
   * @default
   * [
   *  ['(', ')'],
   *  ['{', '}']
   *  ['[', ']']
   * ]
   */
  autoClosingPairs: [ open: string, close: string ][];
  /**
   * A list of characters which insert an extra newline
   *
   * @default
   * [
   *  ['{', '}']
   *  ['[', ']']
   * ]
   */
  newlineIndentPairs: [ open: string, close: string ][];
  /**
   * Whether or not autoSave is enabled.
   *
   * **NOT YET AVAILABLE**
   *
   * @default true
   */
  autoSave: boolean;
  /**
   * The number of allowed lines
   *
   * **Maximum of 5000**
   *
   * @default 1500
   */
  locLimit: number;
  /**
   * Whether or not to highlight the active line
   *
   * @default true
   */
  lineHighlight: boolean;
  /**
   * Whether or not line numbers show
   *
   * @default true
   */
  lineNumbers: boolean;
  /**
   * Whether or not to enable spell checking, best to keep this disabled.
   *
   * @default false
   */
  spellcheck: boolean;
  /**
   * Preserve newline indentation
   *
   * @default true
   */
  lineIndent: boolean;
  /**
   * The indentation character
   *
   * @default ' '
   */
  indentChar: string;
  /**
   * The indentation size. This will determine how many
   * time the `indentChar` should repeat, for example:
   *
   * ```js
   * // The default indent character is a single space, eg:
   * ' '
   * // The default indent size is set to 2 which will result in:
   * '  '
   *
   * // If you were to set the indent character to tab, eg:
   * '\t'
   * // If you were to set the indent size to 2 it will result in:
   * '\t\t'
   * ```
   *
   * @default 2
   */
  indentSize: 2;
  /**
   * Whether or not `\t` tabs should convert. If you are using tab
   * indentation (i.e: the `indentChar` is set to `\t`) then this will
   * be ignored.
   *
   * @default true
   */
  tabConvert: boolean;
  /**
   * Whether or not multiline tab indent is supported
   *
   * @default true
   */
  indentMultiline: boolean;
  /**
   * Show Invisible whitespace characters, eg: ` `
   *
   * > **IMPORTANT**
   * >
   * > Avoid space character insertion when leveraging Papyrus
   * for large edits. Only show spaces when working with 200 lines
   * or less. Space characters can be serious performance hit in Prism.
   *
   * @default false
   */
  showSpace: boolean;
  /**
   * Show Invisible tab characters, eg: `\t`
   *
   * > **IMPORTANT**
   * >
   * > Avoid space character insertion when leveraging Papyrus
   * for large edits. Only show spaces when working with 200 lines
   * or less. Space characters can be serious performance hit in Prism.
   *
   *
   * @default false
   */
  showTab: boolean;
  /**
   * Show CRLF characters
   *
   * @default false
   */
  showCRLF: boolean;
  /**
   * Show LF characters
   *
   * @default false
   */
  showLF: boolean;
  /**
   * Show LF characters
   *
   * @default false
   */
  showCR: boolean;
}

export interface DOMOptions extends EditorOptions {
  /**
   * Whether or not to enable the the editor upon rendering
   *
   * @default false
   */
  editor: boolean;
  /**
   * Whether or not leading whitespace/newlines should be trimmed (stripped)
   *
   * @default true
   */
  trimStart: boolean;
  /**
   * Whether or not ending whitespace/newlines should be trimmed (stripped)
   *
   * @default true
   */
  trimEnd: boolean;
}

export interface MountOptions extends EditorOptions {
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
  language: Languages;
  /**
   * Unique Identifier
   *
   * This is optional in mount but will allow you to assign an identifier
   * reference for the code block. When omitted a UUID will be applied, unless
   * the `<pre>` element contains an `id=""` attribute.
   *
   * @default 'ABC123'
   */
  id: string;
  /**
   * Code Input
   *
   * This is optional in mount and you can provide input within the `<code>`
   * element directly. The value passed here will override input (if) any
   * exists within the mount target `<code>` element.
   *
   * @default ''
   */
  input: string;
  /**
   * Whether or not to enable the the editor upon mounting.
   *
   * @default false
   */
  editor: boolean;
  /**
   * Whether or not leading whitespace/newlines should be trimmed (stripped)
   *
   * @default true
   */
  trimStart: boolean;
  /**
   * Whether or not ending whitespace/newlines should be trimmed (stripped)
   *
   * @default true
   */
  trimEnd: boolean;
}

export interface CreateOptions extends Omit<MountOptions,
| 'input'
| 'autoClosingPairs'
| 'newlineIndentPairs'
| 'indentMultiline'
| 'tabConvert'
| 'lineHighlight'> {

  /**
   * The language name
   *
   * This is **required** when leveraging the render method.
   */
  language: Languages;
  /**
   * Apply additional classes to the `<pre>` and/or `<code>` elements when
   * generating the string output.
   *
   * ---
   *
   * **EXAMPLE**
   *
   * Below we instruct papyrus to apply classes when creating
   * the string output of `<pre>` and `<code>` elements.
   *
   * ```js
   *
   * papyrus.render('<h1>Hello World</h1>', {
   *   language: 'html',
   *   addClass: {
   *    pre: ['foo', 'bar'],
   *    code: ['baz']
   *   }
   * })
   *
   * ```
   *
   * ---
   *
   * **OUTPUT**
   *
   * The above would result in the following:
   *
   * ```html
   *
   * <pre class="papyrus foo bar">
   *   <code class="language-html baz">&lt;h1&gt;Hello World&lt;/h1&gt;</code>
   * </pre>
   *
   * ```
   */
  addClass: {
    /**
     * Apply additional classes to the `<pre>` element when creating the markup.
     *
     * @default []
     */
    pre: string[];
    /**
     * Additonal classes applied to `<code>`
     *
     * @default []
     */
    code: string[];
  };
  /**
   * Apply additional attributes to the `<pre>` and/or `<code>` elements when
   * generating the string output.
   *
   * ---
   *
   * **EXAMPLE**
   *
   * Below we instruct papyrus to apply attributes when creating
   * the string output of `<pre>` and `<code>` elements.
   *
   * ```js
   *
   * papyrus.render('<h1>Hello World</h1>', {
   *   language: 'html',
   *   addAttrs: {
   *    pre: ['id="foo"'],
   *   }
   * })
   *
   * ```
   *
   * ---
   *
   * **OUTPUT**
   *
   * The above would result in the following:
   *
   * ```html
   *
   * <pre id="foo" class="papyrus">
   * <code class="language-html baz">&lt;h1&gt;Hello World&lt;/h1&gt;</code>
   * </pre>
   *
   * ```
   */
  addAttrs: {
    /**
     * Apply attributes to the `<pre>` element when creating the markup.
     */
    pre: string[];
    /**
     * Apply attributes to the `<code>` element when creating the markup.
     */
    code: string[]
  };
}

export interface CombinedOptions extends DOMOptions, MountOptions, CreateOptions {}
