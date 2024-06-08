---
layout: usage.liquid
permalink: '/examples/typescript/index.html'
title: '𓁁 Papyrus TypeScript'
description: ''
---

# TypeScript

<!--prettier-ignore-->
```ts
import spx, { SPX } from 'spx';

function (param) {


}

function foo(param) {

}

import spx from 'spx';

spx.connect({
  annotate: false,
  hover: {
    trigger: 'href',
    threshold: 250
  },
  intersect: {
    rootMargin: '0px 0px 0px 0px',
    threshold: 0
  },
  proximity: {
    distance: 75,
    threshold: 250,
    throttle: 500
  }
});

import spx, { SPX } from 'spx';

export class Counter extends spx.Component<typeof Counter.connect> {

  public countNode: HTMLElement;

  static connect = {
    nodes: <const>['count' ],
    state: {
      count: Number
    }
  };

  increment () {
    this.countNode.innerText = `${++this.state.count}`;
  }

  decrement () {
    this.countNode.innerText = `${--this.state.count}`;
  }

}

export class Tabs extends spx.Component<typeof Tabs.connect> {

  public buttonNode: HTMLElement;
  public panelNodes: HTMLElement[];

  static connect = {
    nodes: <const>['button', 'panel'],
    state: {
      init: Number,
      open: Number
    }
  };

  oninit (param) {
    this.state.hasInit && this.toggle({
      attrs: {
        idx: this.state.init
      }
    });
  }

  open (idx: number, str: string) {
    this.buttonNode.children[idx].classList.add('active');
    this.panelNodes[idx].classList.remove('d-none');
  }

  close(idx: number) {
    this.buttonNode.children[idx].classList.remove('active');
    this.panelNodes[idx].classList.toggle('d-none', true);
  }

  toggle (event: SPX.Event<{ idx: number }>) {
    if (this.state.open !== event.attrs.idx) {
      this.state.open = event.attrs.idx;
      for (let idx = 0, len = this.panelNodes.length; idx < len; idx++) {
        idx === event,attrs.idx ? this.open(idx) : this.close(idx);
      }
    }
  }
}
```
