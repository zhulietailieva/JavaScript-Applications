import { filter } from '../api/data.js';
import {html} from '../lib.js';

const searchTemplate = (onSubmit, result, user) => html`
<section id="search">
    <h2>Search by Brand</h2>
    <form class="search-wrapper cf" @submit=${onSubmit}>
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
        <button type="submit">Search</button>
    </form>
    <h3>Results:</h3>
    <div id="search-container">
    <ul class="card-wrapper">
        ${result && result.length > 0 
        ? result.map(r => resultCard(r, user))
        : html`<h2>There are no results found.</h2>`}
    </ul>
    </div>
</section>
`

const resultCard = (item, user) => html`
<li class="card">
    <img src="${item.imageUrl}" alt="travis" />
    <p>
        <strong>Brand: </strong><span class="brand">${item.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${item.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
    ${user ? html`<a class="details-btn" href="/details/${item._id}">Details</a>` : null}
    </li>`

    export const showSearch = (ctx) => {
        const onSubmit = async (e) => {
            e.preventDefault();
            let searched = e.target.elements[0].value;
    
            let result = await filter(searched);
    
            ctx.render(searchTemplate (onSubmit, result, ctx.user))
        }
    
        ctx.render(searchTemplate(onSubmit));
    }