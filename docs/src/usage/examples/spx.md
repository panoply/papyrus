---
layout: usage.liquid
permalink: '/examples/spx/index.html'
title: '𓁁 Papyrus HTML SPX'
description: ''
---

# SPX

Syntax highlighting support for the [SPX](https://spx.js.org) (Single Page XHR) framework.

<!--prettier-ignore-->
```js
spx.component
spx.dom`
  <div>Foo</div>
  <section
    spx-component="foo"
    spx-component="foo as bar"
    spx@click="key.prop { once }"
    spx-node="ref.name"
    spx-ref:number="100"
    spx-ref:boolean="true"
    spx-ref:boolean="false"
    spx-ref:string="hello world"
    spx-ref:object="{ prop: 'string', num: 1000, bool: true }"
    spx-ref:array="['string', 'string']"
  >
    <div spx-node="ref.name">
      <span spx-bind="ref.string"></span>
    </div>

  </section>
`
```

<!--prettier-ignore-->
```html
<section
  spx-component="foo"
  spx-component="foo as bar"
  spx@click="key.prop { once }"
  spx-node="ref.name"
  spx-ref:number="100"
  spx-ref:boolean="true"
  spx-ref:boolean="false"
  spx-ref:string="hello world"
  spx-ref:object="{ prop: 'string', num: 1000, bool: true }"
  spx-ref:array="['string', 'string']"
>
  <div spx-node="ref.name">
    <span spx-bind="ref.string"></span>
  </div>

</section>
```

# Panel Example

<div class="row">
<div class="col-6">

<!--prettier-ignore-->
```html:1
<section
  spx@click="key.prop { once }"
  spx-node="ref.name"
  spx-ref:number="100"
  spx-ref:boolean="true"
  spx-ref:boolean="false"
  spx-ref:string="hello world"
  spx-ref:object="{ prop: 'string', num: 1000, bool: true }"
  spx-ref:array="['string', 'string']"
></section>
```

</div>

<div class="col-6">

<!--prettier-ignore-->
```html:2
<section
  spx@click="key.prop { once }"
  spx-node="ref.name"
  spx-ref:number="100"
  spx-ref:boolean="true"
  spx-ref:boolean="false"
  spx-ref:string="hello world"
  spx-ref:object="{ prop: 'string', num: 1000, bool: true }"
  spx-ref:array="['string', 'string']"
></section>
```

</div>
</div>
