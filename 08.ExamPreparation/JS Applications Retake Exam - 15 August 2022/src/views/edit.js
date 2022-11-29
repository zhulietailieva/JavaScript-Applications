import { editItem, getById } from '../api/data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (item,onEdit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form @submit=${onEdit}class="edit-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                value=${item.brand}
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                value=${item.model}
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                value=${item.imageUrl}
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                value=${item.release}
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                value=${item.designer}
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                value=${item.value}
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`;

export async function showEdit(ctx) {
  const id = ctx.params.id;
  const item = await getById(id);
  console.log(item);
  ctx.render(editTemplate(item,createSubmitHandler(onEdit)));

  async function onEdit({ brand, model, imageUrl, release, designer, value }) {

    if (brand == '' || model == '' || imageUrl == '' || imageUrl == '' ||
      release == '' || designer == '' || value == '') {
      return alert('All fields are required!');
    }

    await editItem(id, {
      brand,
      model,
      imageUrl,
      release,
      designer,
      value
    });

    ctx.page.redirect('/catalog/'+id);

  }
}