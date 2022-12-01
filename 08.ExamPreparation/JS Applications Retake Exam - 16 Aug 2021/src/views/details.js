import { deleteById, getById } from '../api/data.js';
import { html, nothing } from '../lib.js';

const detailsTemplate = (game, isOwner, onDelete) => html`
<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">
    <div class="game-header">
        <img class="game-img" src="${game.imageUrl}" />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
    </div>
    <p class="text">${game.summary}</p>

    ${isOwner
        ? html`<div class="buttons">
        <a href="/edit/${game._id}" class="button">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a></div>`
        : nothing}
    
</div>

</section>`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const game = await getById(id);

    let isOwner = false;
    if (ctx.user) {
        isOwner = ctx.user._id == game._ownerId;
    }

    ctx.render(detailsTemplate(game, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this game?');

        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/');
        }
    }
}