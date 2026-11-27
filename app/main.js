// Boot for Indonesia in Numbers: hash routing, one page at a time.
// Every link in the header is a real route; an unknown route falls back
// to the overview instead of showing a blank page.

import { PAGES } from './views.js';

const app = document.getElementById('app');
const links = [...document.querySelectorAll('[data-nav]')];

function route() {
  const key = location.hash.replace(/^#\/?/, '').split('/')[0];
  return PAGES[key] ? key : '';
}

function render() {
  const key = route();
  const page = PAGES[key]();
  app.innerHTML = page.html;
  links.forEach((a) => a.classList.toggle('on', a.dataset.nav === key));
  document.title = key
    ? `${key[0].toUpperCase()}${key.slice(1)} — Indonesia in Numbers`
    : 'Indonesia in Numbers — National Statistics';
  page.draw();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
