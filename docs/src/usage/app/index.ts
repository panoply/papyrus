import relapse from 'relapse';
import papyrus from 'papyrus';

addEventListener('DOMContentLoaded', () => {

  relapse();
  papyrus();

  const other = papyrus.get('spx-2');

  papyrus.list().forEach(m => {

    m.onsave(v => {

      if (other) other.update(v);
      console.log(v);
    });

    m.onscroll(v => {

      if (other) other.scroll(v);

    });

    m.onselect(v => {

      if (other) other.select(v);

    });

    m.onresize(v => {

      if (other) other.height(v.height);

    });
  });

});
