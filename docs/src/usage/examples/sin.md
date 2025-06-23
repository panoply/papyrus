---
layout: usage.liquid
permalink: '/examples/sin/index.html'
title: '𓁁 Papyrus SIN'
description: ''
---

# SIN

Syntax highlighting support for the [SIN](https://sinjs.com) full stack JavaScript framework.

```js
const Div = s`div
  bc hotpink
  p 10
  br 4
  ta center
  ff system-ui
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
