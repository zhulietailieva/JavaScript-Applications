import {html,render} from './node_modules/lit-html/lit-html.js'
import{cats} from './catSeeder.js';
const catsSection=document.getElementById('allCats');
let catTemplate=html`
<ul>
${cats.map(cat=>html`
<li>
<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
<div class="info">
<button @click=${onClick} class="showBtn">Show status code</button>
<div class="status" style="display: none" id="${cat.id}}">
    <h4>Status Code: ${cat.statusCode}</h4>
    <p>${cat.statusMessage}</p>
</div>
</div>
</li>
`)}
</ul>
`
render(catTemplate,catsSection);
function onClick(e){
    if(e.target.textContent=="Show status code"){
        e.target.textContent="Hide status code";
        e.target.parentElement.children[1].style.display="block";
    }else {
        e.target.target="Show status code";
        e.target.parentElement.children[1].style.display="none";
    }
}


