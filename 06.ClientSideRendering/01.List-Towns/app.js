import {html,render} from './node_modules/lit-html/lit-html.js';
const root=document.getElementById('root');
const form=document.getElementsByTagName('form')[0];

form.addEventListener('click',onSubmit);
function onSubmit(e){
    e.preventDefault();
    let data=new FormData(form);
    let towns = [...data.values()][0].split(', ');
    let template=html`<ul>
    ${towns.map(town=>html`<li>${town}</li>`)}
    </ul>`;
    render(template,root);
}