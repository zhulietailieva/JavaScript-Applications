import {html,render} from './node_modules/lit-html/lit-html.js';
const menu=document.getElementById('menu');
async function update(){
    let response=await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    let data=await response.json();
    let items=Object.values(data);
    let template=html`  
    ${items.map(item=>html`
    <option value=${item._id}>${item.text}</option>
    `)}
    `
    render(template,menu);
}
update();
let form=document.getElementsByTagName('form')[0];
form.addEventListener('submit',addItem);
    async function addItem(e) {
    e.preventDefault();
    let data=document.getElementById('itemText').value;
    console.log(data);
    let newItem={
        text:data
    };
    await fetch('http://localhost:3030/jsonstore/advanced/dropdown',
    {
        method: 'post',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newItem)
    });
    update();
    document.getElementById('itemText').value='';
}