---
layout: usage.liquid
permalink: '/usage/index.html'
title: '𓁁 Papyrus'
description: ''
---

# What is Papyrus?

Papyrus is a syntax highlighter and embedded web based text editor for code sample showcasing. Papyrus leverages [PrismJS](https://prismjs.com) and its editor features have been adapted from [CodeJar](https://github.com/antonmedv/codejar). The module exposes a simple API and provides developers with customized theming capabilities.

> The module was created for usage in the documentation of [Æsthetic](https://æsthetic.dev).

# Getting Started

Papyrus can be used in both CJS and ESM projects.

```
pnpm add papyrus
```

# Usage

Papyrus exposes 3 methods from it's default export. The `papyrus.render()` method is for usage within Node and will render a Papyrus code block, whereas the `papyrus.mount()` method is for usage within the web browser.

### Theme

The default theming used by Papyrus is known as [Potion](https://github.com/panoply/vscode-potion-theme). You can create custom theming using the [Theme Tool](/theme) or alternatively provide an existing Prism theme.

### Render

The `render` method is for usage within Node and will render a Papyrus code block. You will typically leverage this with a solution like [markdown-it](https://github.com/markdown-it/markdown-it).

```js
const papyrus = require('papyrus');
const markdown = require('markdown-it');

const md = markdown({
  html: true,
  highlight: (string, language) => papyrus.render(string, {
    language,
    autoSave: true,
    editor: true,
    indentChar: ' ',
    indentSize: 2,
    language: null,
    autoClosing: true,
    lineHighlight: true,
    lineIndent: true,
    lineNumbers: true,
    locLimit: 1500,
    history: true,
    newlineChars: [ '(', '{', '[' ],
    spellcheck: false,
    showCRLF: false,
    showSpace: true,
    showCR: false,
    showLF: false,
    showTab: false,
    trimEnd: true,
    trimStart: true,
    class: {
      pre: [],
      code: []
    },
    attrs: {
      pre: [],
      code: []
    }
  });

});

```

### Mount

The `mouth` method is for usage within the browser and can be used for enabling a basic text editor.

```js
import papyrus from 'papyrus';

const code = document.querySelector('pre');

papyrus.mount(string, {
  input: '',
  language: 'plaintext',
  autoSave: true,
  autoClosing: true,
  editor: true,
  indentChar: ' ',
  indentSize: 2,
  lineHighlight: true,
  lineIndent: true,
  lineNumbers: true,
  locLimit: 1500,
  history: true,
  newlineChars: ['(', '{', '['],
  spellcheck: false,
  showCRLF: false,
  showSpace: true,
  showCR: false,
  showLF: false,
  showTab: false,
  trimEnd: true,
  trimStart: true
});
```

### HTML

HTML Language

<!-- prettier-ignore-->
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <!--
    comment
  -->

  <main>
    <div>
      Hello World!
    </div>
  </main>

</body>
</html>
```

### Liquid

The Liquid Template Language

```liquid

<!--
  comment
-->

{%- if condition == assert -%}
  <div
    class="xxx"
    id="some-id">
      {% # comment %}
    <ul>
      <li
        class="some-class"
        data-attr="xxx"
        {% if xxx %}
          id="{{ object.prop }}"
        {% endif %}>
        {% for i in list %}
          <ul>
            <li data-attr="{{ i.xxx }}">
              {{ i.something
                | filter: 'some-filter'
                | append: 'some-append'
                | prepend: 'some-prepend'
                | example:
                  one: 1,
                  two: 2,
                  three: 3,
                  four: 4
              }}
            </li>
        </ul>
      {% endfor %}
      </li>
    </ul>
  </div>
{% endif %}

{% schema %}
  {
    "foo": "bar"
  }
{% endschema %}

```
