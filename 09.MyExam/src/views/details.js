import { deleteById, getById } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { like, getLikes, getOwnLikes } from '../api/likes.js';


const detailsTemplate = (album, likes, hasUser, canLike, isOwner, onDelete, onLike) => html`
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Album Details</p>
  <div id="img-wrapper">
    <img src="${album.imageUrl}" alt="example1" />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${album.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
  </div>
  <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

  <!--Edit and Delete are only for creator-->

  ${hasUser ?
    html`<div id="action-buttons">
     ${isOwner ?
        html`<a href="/edit/${album._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete}href="javascript:void(0)" id="delete-btn">Delete</a>` :
        html` 
        ${canLike ? html`<a @click=${onLike}href="" id="like-btn">Like</a>`
            : nothing}
        `}   
  </div>`: nothing} 

</div>
</section>`;


export async function showDetails(ctx) {
  const id = ctx.params.id;
  //const album = await getById(id);
  //console.log(album);

  const requests = [
    getById(id),
    getLikes(id),
  ];

  const hasUser = Boolean(ctx.user);

  if (hasUser) {
    requests.push(getOwnLikes(id, ctx.user._id));
  }

  const [album, likes, hasLike] = await Promise.all(requests);

  //const isOwner = hasUser && ctx.user._id == album._ownerId;

  //const canDonate = !isOwner && hasDonation == 0;

  const isOwner = hasUser && ctx.user._id == album._ownerId;
  const canLike = !isOwner && hasLike == 0;

  ctx.render(detailsTemplate(album, likes, hasUser, canLike, isOwner, onDelete, onLike));

  async function onDelete() {
    const choice = confirm('Are you sure you want to delete this album?');

    if (choice) {
      await deleteById(id);
      ctx.page.redirect('/catalog');
    }
  }

  async function onLike() {
    await like(id);
    ctx.page.redirect('/catalog/' + id);
  }
  
}
