import { render, html } from './node_modules/lit-html/lit-html.js';
const tableBodyEl = document.getElementsByTagName('tbody')[0];
async function solve() {
   let response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   let data = await response.json();
   let entries = Array.from(Object.values(data));
   let template = html`
   ${entries.map(entry => html`
   <tr>
   <th>${entry.firstName} ${entry.lastName}</th>
   <th>${entry.email}</th>
   <th>${entry.course}</th>
   </tr>
   `)}
   `
   render(template, tableBodyEl);
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let searchText = document.getElementById('searchField');
      let items = Array.from(tableBodyEl.querySelectorAll('tr'));
      items.forEach(row => {
         let rowData = Array.from(row.children).map(x => x.textContent).join(' ');
         if (rowData.toLowerCase()
         .includes(searchText.value.toLowerCase())){
            row.classList.add('select');
         }else{
            row.classList.remove('select');
         }
      })
      searchText.value='';
   }
}
solve();