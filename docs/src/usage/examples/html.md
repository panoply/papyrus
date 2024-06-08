---
layout: usage.liquid
permalink: '/examples/html/index.html'
title: '𓁁 Papyrus HTML'
description: ''
---

# HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <script src="/bundle.js" spx-eval="false" async="true"></script>
    <script>

      spx.connect({
        foo: bar;
      })
    </script>
  </head>
  <body>
    <section spx-component="counter">
      <!-- Element -->
      <h1>Count: <span spx-node="counter.count">0</span></h1>
      <!-- Buttons -->
      <button type="button" spx@click="counter.increment">+</button>
      <button type="button" spx@click="counter.decrement">-</button>
    </section>

    <div spx-bind="counter.number">
    <!--
    Some Comment
    -->
    <section
      spx@click="key.prop"
      spx-node="ref.name"
      spx-ref:number="100"
      spx-ref:xxx="0"
      spx-ref:boolean="true"
      spx-ref:boolean="false"
      spx-ref:string="hello world"
      spx-ref:object="{ prop: 'string', num: 1000, bool: true }"
      spx-ref:array="['string', 'string']"
    ></section>

    <main>
      <div>Hello World!</div>
    </main>

    <footer class="foo bar">
      <ul>
        <li>Foo Bar</li>
      </ul>
    </footer>
  </body>
</html>
```
