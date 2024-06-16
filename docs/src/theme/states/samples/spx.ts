import { html } from 'language-literals';

export default html`
  <main>
    <div
      spx@click="key.prop { once }"
      spx@window:click="key.prop { once }"
      spx-node="ref.name"
      spx-ref:number="100"
      spx-ref:boolean="true"
      spx-ref:boolean="false"
      spx-ref:string="hello world"
      spx-ref:object="{ prop: 'string', num: 1000, bool: true }"
      spx-ref:array="['string', 'string']">


      <section spx-node="ref.foo ref.bar"></section>

      <button spx@click="ref.method { passive, once }"></button>

      <span spx-bind="ref.qux"></span>

    </div>
  </main>
`;
