import { editItem, getById } from '../api/data.js';
import {html} from '../lib.js';
import { createSubmitHandler } from '../util.js';

const editTemplate=(item,onEdit)=>html`
<section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                .value=${item.title}
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                .value=${item.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                .value=${item.category}
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                .value=${item.description}
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                .value=${item.requirements}
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                .value=${item.salary}

              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`;

export async function showEdit(ctx){
    const id=ctx.params.id;
    const item=await getById(id);

    ctx.render(editTemplate(item,createSubmitHandler(onEdit)));

    async function onEdit({title, imageUrl, category, description, requirements, salary}){
        if (title == '' || imageUrl == '' || category == '' ||
            description == '' || requirements == '' || salary == ''){
                return alert('All fields are required!');
            }
        await editItem(id,{
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary
        });

        ctx.page.redirect('/catalog/'+id);
    }
}