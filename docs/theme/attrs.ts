import { IOptions } from 'papyrus';

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
   * The color format to assign.
   */
  format: 'rgb' | 'hex'
  /**
   * The user defined value
   */
  value: string;
}

export interface IToken<T extends IColor | ISelect | ISwitch | IRange> {
  /**
   * Toggle info
   */
  toggle?: boolean;
  /**
   * Label of the token input
   */
  label: string;
  /**
   * An optional description for the token
   */
  description?: string;
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
  tokens: IToken<IColor | ISelect | ISwitch | IRange>[];
}

export interface IModel {
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

export type IEditor = Array<[ string, IToken<IColor | ISelect | ISwitch | IRange>[]]>

interface ICacheGet {

  (store: 'editor'): IEditor,
  (store: 'tokens'): IState

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
  papyrus?: IOptions;
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
   * Update cache
   */
  cache: {
    save(store: 'editor' | 'tokens'): void;
    reset(language?: Languages): void;
    get: ICacheGet
  }
  /**
   * The editor model
   */
  get editor(): IEditor;
  /**
   * The state models
   */
  get model(): IModel
}
