import { render, page } from "./lib.js";
import { getUserData } from "./util.js";
import { showHome } from "./views/home.js";
import { updateNav } from "./views/nav.js";

const main = document.getElementById('wrapper').children[1];

page(decorateContext);
page('/', showHome);
page('/catalog', () => console.log('catalog'));
page('/catalog/:id', () => console.log('details'));
page('/edit/:id', () => console.log('edit'));
page('/create', () => console.log('create'));
page('/search', () => console.log('search'));
page('/login', () => console.log('login'));
page('/register', () => console.log('register'));

updateNav();
page.start();

function renderMain(content) {
    render(content, main);
}

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav=updateNav;
    
    const user=getUserData();
    if(user){
        ctx.user=user;
    }
    next();
}





