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

export interface IRange {
  /**
   * The input type reference
   */
  readonly type: 'range'
  /**
   * The default value as per "potion" theme.
   */
  readonly default: string;
  /**
   * The user defined value
   */
  value: string;
  /**
   * The minimum range value
   */
  min: string;
  /**
   * The maximum range value
   */
  max: string;
  /**
   * The step increment
   */
  step: string;
  /**
   * The unit of measurement
   *
   * @default em
   */
  unit: string;
}

export interface ISelect {
  /**
   * The input type reference
   */
  readonly type: 'select'
  /**
   * The default value as per "potion" theme.
   */
  readonly default: string;
  /**
   * The user defined value
   */
  value: string;
  /**
   * The options available in the select list
   */
  options: string[]
}

export interface ISwitch {
  /**
   * The input type reference
   */
  readonly type: 'switch'
  /**
   * The default value as per "potion" theme.
   */
  readonly default: string;
  /**
   * The user defined value
   */
  value: string;
}

export interface IColor {
  /**
   * The input type reference
   */
  readonly type: 'color'
  /**
   * The default value as per "potion" theme.
   */
  readonly default: string;
  /**
   * The user defined value
   */
  value: string;
}

export interface IToken<T extends IColor | ISelect | ISwitch | IRange> {
  /**
   * Label of the token input
   */
  label: string;
  /**
   * CSS Variable
   */
  css: string;
  /**
   * SCSS Variable name
   */
  sass: string;
  /**
   * Input type
   */
  input: T
}

export interface IState {
  /**
   * The official language name, ie: `javascript` > `JavaScript`
   */
  language: string;
  /**
   * The sample string of the language
   */
  sample: string;
  /**
   * Token Inputs
   */
  tokens: Array<[ string, IToken<IColor | ISelect | ISwitch | IRange>[]]>;
  /**
   * The theme variable reference
   */
  theme: Map<string, string>
}

export interface IModel {
  /**
   * Editor Model
   */
  editor: Array<[ string, IToken<IColor | ISelect | ISwitch | IRange>[]]>;
  /**
   * HTML
   */
  html: IState;
  /**
   * XML
   */
  xml: IState;
  /**
   * Shell
   */
  shell: IState;
  /**
   * CSS
   */
  css: IState;
  /**
   * SCSS
   */
  scss: IState;
  /**
   * Liquid
   */
  liquid: IState;
  /**
   * JSON
   */
  json: IState;
  /**
   * JavaScript
   */
  javascript: IState;
  /**
   * TypeScript
   */
  typescript: IState;
  /**
   * JSX
   */
  jsx: IState;
  /**
   * TSX
   */
  tsx: IState;
  /**
   * Yaml
   */
  yaml: IState;
}

export interface IPreview {
  opened: number;
  /**
   * Background color
   */
  background: string;
  /**
   * Preview tabs - Appearing in order of array
   */
  tabs: Array<{
    /**
     * Whether or not the tab is open
     */
    active: boolean;
    /**
     * The tab label
     */
    label: string;
  }>;
}

export interface IEditor {
  /**
   * Whether or not editor mode is enabled.
   *
   * @default true
   */
  enabled: boolean;
  /**
   * Whether or not autoSave is enabled.
   *
   * @default true
   */
  autoSave: boolean;
  /**
   * The number of allowed lines
   *
   * @default 1000
   */
  lineLimit: boolean;
  /**
   * Whether or not editor mode is is set to toggle.
   *
   * @default false
   */
  toggle: boolean;
  /**
   * Whether or not line numbers show
   *
   * @default true
   */
  lineNumbers: boolean;
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
  autoClose: string[];
  /**
   * Autoclosing pairs
   *
   * @default false
   */
  spellCheck: boolean;
  /**
   * Preserve newline indentation
   *
   * @default true
   */
  lineIndent: boolean;
  /**
   * Whether or not tabbed indentation is enabled
   *
   * @default true
   */
  tabIndent: boolean;
  /**
   * The indentation characted
   *
   * @default 'space'
   */
  indentChar: 'tab' | 'space' | 'none';
  /**
   * The indentation size
   *
   * @default 2
   */
  indentSize: number;
  /**
   * Invisible Options
   */
  invisibles: {
    /**
     * Whether or not space invisibles should show
     */
    space: boolean;
    /**
     * Whether or not tab invisibles should show
     */
    tab: boolean;
    /**
     * Whether or not CR invisibles should show
     */
    cr: boolean;
    /**
     * Whether or not LF invisibles should show
     */
    lf: boolean;
    /**
     * Whether or not CRLF invisibles should show
     */
    crlf: boolean;
  }

}

export interface IAttrs {
  /**
   * The current language showing
   */
  language: Languages;
  /**
   * Preview Options
   */
  preview: IPreview;
  /**
   * Settings Options
   */
  settings: boolean;
  /**
   * Editor Options
   */
  editor?: IEditor;
  /**
   * The current state model
   */
  get state(): IState;
  /**
   * Update style variables
   */
  style: {
    write(): void;
    map: Map<string, string>;
    css: string;
    sass: string;
  }
  /**
   * The state models
   */
  model: IModel
}
