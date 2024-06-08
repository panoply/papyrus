import { ts } from 'language-literals';

export default ts`
import spx from 'spx';

export interface IAttrs {
  foo: string;
  bar: boolean;
}

export class Example extends spx.Component<typeof Example.connect> {

    static connect {
      nodes: [
        'button'
      ]
    }

    onInit () {
      this.buttonNode      // => HTMLButtonElement
      this.buttonNodes     // => HTMLButtonElement[]
      this.hasButtonNode   // => true or false
    }

    public buttonNode: HTMLButtonElement;
    public buttonNodes: HTMLButtonElement[];
    public hasButtonNode: boolean;

}

function example <T extends string>(param: IAttrs, arg: T): void {

  /**
   * JSDoc Comment
   *
   * @type string
   */
  let string: string

  const type: string[] = []

  if (param.prop === 1000) {

    const condition = param.foo ? false : true;

    return [
      {
        object: {
          foo: 'string'
        }
      }
    ]
  }
}


`;
