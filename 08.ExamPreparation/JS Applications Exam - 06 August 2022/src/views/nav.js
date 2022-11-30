import { logout } from '../api/user.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';

const nav = document.querySelector('header');

const navTemplate = (user) => html`
<a id="logo" href="/"
><img id="logo-img" src="./images/logo.jpg" alt=""/></a>
<nav>
<div>
  <a href="/catalog">Dashboard</a>
</div>
${user ? html`
<div class="user">
  <a href="/create">Create Offer</a>
  <a @click=${onLogout}href="javascript:void(0)">Logout</a>
</div>
`: html`
<div class="guest">
  <a href="/login">Login</a>
  <a href="/register">Register</a>
</div>`}
</nav>`;

export function updateNav() {
  const user = getUserData();
  render(navTemplate(user), nav);
}
function onLogout() {
  logout();
  updateNav();
  page.redirect('/catalog');
}