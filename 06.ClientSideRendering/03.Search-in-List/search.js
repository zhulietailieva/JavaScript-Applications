import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';
const townsEl = document.getElementById('towns');
let template = html`
<ul>
${towns.map(town => html`
<li>${town}</li>
`)}
</ul>
`;
render(template, townsEl);
let searchBtn = document.getElementsByTagName('button')[0]
   .addEventListener('click', search);
function search() {
   let matches=0;
   let searchText=document.getElementById('searchText').value;
   let items=Array.from(townsEl.children[0].children);//li elements
   items.forEach(item=>
      {
         if((item.textContent)
         .includes(searchText)){
            item.classList.add('active');
            matches++;
         }else{
            item.classList.remove('active');
         }
      });
   let resEl=document.getElementById('result');
   resEl.textContent= `${matches} matches found`;
}
