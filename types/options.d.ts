/* eslint-disable no-unused-vars */
import type { StrategyProps } from '@textcomplete/core';

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
  | 'treeview'
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
  autoIndentPairs: [ open: string, close: string ][];
  /**
   * The number of allowed lines, when this limit is exceeded
   * then a message will render on the editor.
   *
   * **Maximum of 5000**
   *
   * @default 1500
   */
  locLimit: number;
  /**
   * The line number to highlight upon initialisation.
   *
   * @default 1
   */
  lineNumber: number;
  /**
   * Whether or not to highlight the active line
   *
   * @default true
   */
  lineHighlight: boolean;
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
   * Whether or not to enable spell checking, best to keep this disabled.
   *
   * @default false
   */
  spellcheck: boolean;
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
  tabIndent: boolean;
  /**
   * Show Invisible whitespace characters, eg: ` `
   *
   * **IMPORTANT**
   *
   * Avoid space character insertion when leveraging Papyrus
   * for large edits. Only show spaces when working with 200 lines
   * or less. Space characters can be serious performance hit in Prism.
   *
   * This will default to using the `showSpace` value.
   *
   * @default false
   */
  renderSpace: boolean;
  /**
   * Show Invisible tab characters, eg: `\t`
   *
   * **IMPORTANT**
   *
   * Avoid space character insertion when leveraging Papyrus
   * for large edits. Only show spaces when working with 200 lines
   * or less. Space characters can be serious performance hit in Prism.
   *
   * This will default to using the `showTab` value.
   *
   * @default false
   */
  renderTab: boolean;
  /**
   * Completions are made possible using [TextComplete](https://yuku.takahashi.coffee/textcomplete)
   * by [Yuku Takahashi](https://github.com/yuku). Papyrus will pass `strategies` to the editor
   * runtime. Provide completions a per language id basis.
   */
  completions: {
    /**
     * Strategies are provided here, see [Stategy](https://yuku.takahashi.coffee/textcomplete/#strategy)
     */
    [language in Languages]?: StrategyProps[]
  }
}

export interface Options {
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
  /**
   * Whether or not to render a line fence (i.e: right border on the line count)
   *
   * @default true
   */
  lineFence: boolean;
  /**
   * Whether or not line numbers show
   *
   * @default true
   */
  lineNumbers: boolean;
  /**
   * Papyrus Editor
   *
   * Whether or not to enable the the editor upon mounting. Accepts a boolean
   * of `false` to not render the editor or `true` to render the editor with
   * default settings. Optionally, pass editor options.
   *
   * @default false
   */
  editor: boolean | EditorOptions;
  /**
   * Show Invisible whitespace characters, eg: ` `
   *
   * @default false
   */
  showSpace: boolean;
  /**
   * Show Invisible tab characters, eg: `\t`
   *
   * @default false
   */
  showTab: boolean;
  /**
   * Show CRLF characters ~ Overrides options defined on `highlight` option
   *
   * @default false
   */
  showCRLF: boolean;
  /**
   * Show LF characters ~ Overrides options defined on `highlight` option
   *
   * @default false
   */
  showLF: boolean;
  /**
   * Show LF characters ~ Overrides options defined on `highlight` option
   *
   * @default false
   */
  showCR: boolean;
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
