import { deleteById, getById } from '../api/data.js';
import { html, nothing } from '../lib.js';

const detailsTemplate = (item, isOwner,onDelete) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${item.imageUrl}" />
  <p id="details-title">${item.title}</p>
  <p id="details-category">
    Category: <span id="categories">${item.category}</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${item.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span
        >${item.description}</span
      >
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span
        >${item.requirements}</span
      >
    </div>
  </div>
  <p>Applications: <strong id="applications">1</strong></p>

  ${isOwner ? html`<div id="action-buttons">
    <a href="/edit/${item._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete}href="javascript:void(0)" id="delete-btn">Delete</a>` : nothing}
  
    <!--Bonus - Only for logged-in users ( not authors )-->
    <a href="" id="apply-btn">Apply</a>
  </div>
</div>
</section>`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);

    let isOwner = false;
    if (ctx.user) {
        isOwner = ctx.user._id == item._ownerId;
    }
    ctx.render(detailsTemplate(item, isOwner,onDelete));

    async function onDelete(){
        const choice=confirm('Are you sure you want to delete this item?');
        if(choice){
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }
}
