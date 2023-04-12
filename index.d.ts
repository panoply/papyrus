
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
