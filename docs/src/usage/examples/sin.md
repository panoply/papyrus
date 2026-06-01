---
layout: usage.liquid
permalink: '/examples/sin/index.html'
title: '𓁁 Papyrus SIN'
description: ''
---

# SIN

Syntax highlighting support for the [SIN](https://sinjs.com) full stack JavaScript framework.

```js
Copy`

  fd row-reverse   /* Places copy icon on the right */
  fs inherit       /* Override the font-size */

  .icon {}         /* Target the icon */
  .text {}         /* Target the visual text content */
`;

s`
  w 100
`;
s`
  w 100
`;
s`div
  bc hotpink
  p 10
  br 4
  ta center
  ff system-ui

  input {}
  p {}      /* some comment */

  .class {}
  .something {}
`;

s`
  w 100
`;
s`
  w 200
`(
  {
    dom: Tooltip(
      {
        position: 'top',
        arrow: true,
        adapt: true,
        gap: 8,
        margin: 12,
        padding: [4, 8],
        delay: 120,
        container: window,
        offset: 0,
        trigger: dom => []
      },
      'Hello World!'
    )
  },
  'Hover me to see tooltip!'
);

Checkbox`label.checkbox

  .label {}                 /* Target the { label: '' } */
  .content {}               /* Target the children[] */
`;

s`label.checkbox

  .label {}                 /* Target the { label: '' } */
  .content {}               /* Target the children[] */
`;

Checkbox({
  label: 'Checkbox Label', // -> Text rendered beside the checkbox, use children for multiline labels
  id: 'checkbox_id', // -> Optional id, defaults to name when omitted
  name: 'checkbox_name', // -> Name associated with the checkbox value
  value: 'checkbox_value', // -> Value returned through onsave
  checked: false, // -> Whether the checkbox is checked
  indeterminate: false, // -> Whether the checkbox renders in an indeterminate state
  required: false, // -> Whether the checkbox is required for form submission
  disabled: false, // -> Whether the checkbox is disabled or not
  onsave: x => {
    x.name; // -> The name of the checkbox
    x.checked; // -> true or false
    x.value; // -> The value of the checkbox
  }
});

import { Tooltip } from '@beat/ui';
s`
  w 200
`(
  {
    dom: Tooltip(
      {
        position: 'top',
        arrow: true,
        adapt: true,
        gap: 8,
        margin: 12,
        padding: [4, 8],
        delay: 120,
        container: window,
        offset: 0,
        trigger: dom => []
      },
      'Hello World!'
    )
  },
  'Hover me to see tooltip!'
);

Sidebar();
Sidebar.section();
const Div = s`div
  bc hotpink
  p 10
  br 4
  ta center
  ff system-ui
`;

s`div
  bc hotpink
  p 10
  br 4
  ta center
  ff system-ui

  input {}
  p {}      /* some comment */

  .class {}
  .something {}
`;

s`
  w 100
`;

const List = s`ul
 pl 10
 pb 5
 list-style-type none
 ff system-ui
`;

List`
  $gtc  2fr 2fr 2fr 1fr
  $gta "foo bar baz qux"

  @tablet {
    $gtc  1fr 1fr 1fr
    $gta "foo bar baz"
  }

  @mobile {
    $gtc  1fr 1fr
    $gta "foo bar"
  }
`(
  {
    data: [
      { a: 'Foo', b: 35, c: 'XX', d: 'YY' },
      { a: 'Bar', b: 40, c: 'XX', d: 'YY' },
      { a: 'Baz', b: 38, c: 'XX', d: 'YY' },
      { a: 'Qux', b: 45, c: 'XX', d: 'YY' }
    ],
    areas: {
      foo: ['Foo Title'], // -> Renders in all devices
      bar: ['Bar Title'], // -> Renders in all devices
      baz: s.is.mobile || ['Baz Title'], // -> Hidden in mobile devices
      qux: s.is.tablet || ['Qux Title'] // -> Hidden in tablet and mobile devices
    }
  },
  item =>
    s``(
      s` ga foo`(item.a),
      s` ga bar`(item.b),
      s.is.mobile || s` ga baz`(item.c), // -> Prevent rendering in mobile
      s.is.tablet || s` ga qux`(item.d) // -> Prevent rendering in mobile and tablet
    )
);

Button(
  {
    transparent: true,
    onclick: async () => {
      const tracks = await sql`
      select
        pt.playlist_track_id,
        pt.created_at,
        t.released_at,
        t.track_id,
        t.md5,
        t.name,
        row_number() over (order by pt.position)::int as position,
        position as real_position,
        a.md5 as cover,
        t.artist_name,
        a.name as album_name,
        duration
      from playlist_tracks pt
      join tracks t using(track_id)
      join albums a using(album_id)
      where pt.playlist_id = ${p.playlist_id}
    `;
      api.music.play(...tracks);
    }
  },
  Icon.play
),
  s.redrawing();
s.sleep();
s.with();
s.isAttrs();
s.isServer();
s.pathmode();
s.redraw();
s.mount();
```
