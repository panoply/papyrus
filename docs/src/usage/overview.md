---
layout: usage.liquid
permalink: '/overview/index.html'
title: '𓁁 Papyrus Overview'
description: ''
---

# What is Papyrus?

Papyrus is pre-packaged (15kb ~ gzipped) [PrismJS](https://prismjs.com) syntax highlighter with built-in text editing support for usage in the browser. The Papyrus module is designed for basic use case scenarios and is a great choice for projects that require both syntax highlighting and text editing capabilities. Papyrus provides support for a cherry-picked list of PrismJS languages. The languages are using customized or refined grammars so highlighting can target more complete structures.

### Key Features

- – Supports both CJS and ESM environments
- – Line numbers, line highlight and invisibles
- – Custom theming and syntax generation
- – Completions intelliSense capabilities
- – Auto Indentation and auto pairs
- – Key map support, including tabbed indent/dedent

### Why Papyrus?

Papyrus was created to help alleviate some of cumbersome configuration incurred for showcasing code snippets in [Æsthetic Documentation](https://æsthetic.dev). I wanted a lightweight alternative to Monaco and CodeMirror that could digest PrismJS grammars but also support basic level text editing capabilities. The value proposition for Papyrus over alternatives like PrismJS, Highlight.js or more advanced solutions (Monaco, CodeMirror etc) is mostly a matter of requirements and extensibility. Papyrus is a polished and refined variation that focuses on a small sub-set of languages and allows developers to have a customized drop-in solution for code samples.

### Theming

The default theme used by Papyrus is known as [Potion](https://github.com/panoply/vscode-potion-theme). You can create custom theming using the [Theme](/theme) generator or alternatively provide an existing Prism theme. It's typically preferred that you generate a custom theme as the grammars and highlight tokens differ on a per-language basis in Papyrus. You will need to include the [papyrus.css](#) CSS stylesheet into your project. For developers using SASS, they can import papyrus into the SCSS bundles (e.g: `@import "papyrus"`). The required styles can be customized using CSS (or SASS) variables.

### Browser Usage

Browser usage requires invocation and unlike PrismJS will not initialize as an IIFE. Papyrus is distributed in ESM and exposes a couple of methods on the default export.

<!-- prettier-ignore -->
```js
import papyrus from 'papyrus';

// Initialize

papyrus({ /* options */ });


console.log(window.papyrus); // Global scope holds all instances

```

### Node Usage

For usage in Node the `papyrus.static()` method is available and Papyrus will return string markup. Using the module in Node is common with solutions like [markdown-it](https://github.com/markdown-it/markdown-it) or when using a SSG like [11ty](https://www.11ty.dev/).

Basic example with markdown-it:

```js
const papyrus = require('papyrus');
const markdown = require('markdown-it');

const md = markdown({
  html: true,
  highlight: (code, language) => papyrus.static(code, { language })
});
```
