import { render, page } from "./lib.js";
import { getUserData } from "./util.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { updateNav } from "./views/nav.js";
import { showRegister } from "./views/register.js";

const main = document.getElementById('wrapper').children[1];

page(decorateContext);
page('/', showHome);
page('/catalog', showCatalog);
page('/catalog/:id', showDetails);
page('/edit/:id', showEdit);
page('/create', showCreate);
page('/search', () => console.log('search'));
page('/login',showLogin);
page('/register', showRegister);

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





