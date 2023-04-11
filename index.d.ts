
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

export interface InvisibleChars {
  /**
   * Whether or not space invisibles should show
   */
  space?: boolean;
  /**
   * Whether or not tab invisibles should show
   */
  tab?: boolean;
  /**
   * Whether or not CR invisibles should show
   */
  cr?: boolean;
  /**
   * Whether or not LF invisibles should show
   */
  lf?: boolean;
  /**
   * Whether or not CRLF invisibles should show
   */
  crlf?: boolean;
}

export interface IOptions {
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
   * Whether of not input should be trimmed
   *
   * @default true
   */
  trim?: boolean;
  /**
   * Whether or not editor mode is enabled.
   *
   * @default true
   */
  readonly?: boolean;
  /**
   * Whether or not autoSave is enabled.
   *
   * @default true
   */
  autoSave?: boolean;
  /**
   * The number of allowed lines
   *
   * @default 1000
   */
  lineLimit?: number;
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
   * @default
   * [
   *  ['{', '}'],
   *  ['[', ']'],
   *  ['"', '"'],
   *  ["'", "'"],
   * ]
   */
  autoClose?: string[];
  /**
   * Autoclosing pairs
   *
   * @default false
   */
  spellCheck?: boolean;
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
   * Invisible Options
   *
   * @default false
   */
  invisibles?: boolean | InvisibleChars
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
 * **PAPYRUS 𓁁**
 *
 * An embedded code editor leveraging PrismJS.
 */
export const Papyrus: {
  /**
   * Browser Usage
   */
  (options: Omit<IOptions, 'language'>): IModel[];
  /**
   * Text Editor Support
   */
  editor(dom: HTMLPreElement, options?: IOptions): IModel;
  /**
   * Highlight Code
   */
  highlight(code: string, options: IOptions): string;

};

export default Papyrus;
