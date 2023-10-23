import { EditorOptions } from './options';

export type Editor = {
  (options?: EditorOptions, partial?: boolean): void;
  disable: () => void;
  enable: () => void;
};

export type ErrorFn = {
  (newInput: string, opts: { title?: string; stack?: string; heading?: string; }): void;
  hide: () => void;
}
