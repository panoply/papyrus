---
layout: usage.liquid
permalink: '/examples/sql/index.html'
title: '𓁁 Papyrus SIN'
description: ''
---

```sql
select
  blend_group_item_id,
  blend_id,
  playlist_id,
  p.playlist_release_id,
  p.name,
  weight,
  interval,
  every_n,
  spot,
  to_jsonb(schedules) as schedule,
  state.status
from blend_group_items bgi
join blends using(blend_id)
join playlists p using(playlist_id)
join playlist_tracks pt using(playlist_id)
left join lateral (
  select
    schedule_id,
    start_at,
    end_at,
    jsonb(recurrences) as recurrences
  from blend_schedules bs
  join schedules s using(schedule_id)
  left join schedule_recurrences using(schedule_id)
  left join recurrences using(recurrence_id)
  where bs.blend_id = bgi.blend_id
  group by schedule_id, s.start_at, s.end_at
  limit 1
) schedules on true
left join lateral (
  select
    coalesce(
      (
        select
          'upcoming'::text
        from blend_schedules bs_upcoming
        join schedules s_upcoming using(schedule_id)
        where bs_upcoming.blend_id = bgi.blend_id
          and s_upcoming.start_at::timestamp with time zone > now()
        limit 1
      ),
      (
        select
          'expired'::text
        from blend_schedules bs_concluded
        join schedules s_concluded using(schedule_id)
        where bs_concluded.blend_id = bgi.blend_id
          and s_concluded.end_at::timestamp with time zone < now()
        limit 1
      ),
      'active'::text
    ) as status
) state on true
where bgi.blend_group_id = ${ channel.blend_group_id } and blends.spot = false
group by
  blends.blend_id,
  blends.*,
  bgi.blend_group_item_id,
  p.name,
  p.playlist_release_id,
  schedules.*,
  schedules.start_at,
  state.status
order by
  array_position(array[interval, every_n, weight], coalesce(interval, every_n, weight)),
  bgi.position
```
