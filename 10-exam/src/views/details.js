import { html } from '../../node_modules/lit-html/lit-html.js';
import { like, getLikes, getUserLikes } from '../data/likes.js';
import { deleteFact, getById } from '../data/facts.js';
import { getUserData } from '../util.js';

const detailsTemplate = (fact, onDelete, onLike) => html`
      <section id="details">
        <div id="details-wrapper">
          <img id="details-img" src=${fact.imageUrl} alt="example1" />
          <p id="details-category">${fact.category}</p>
          <div id="info-wrapper">
            <div id="details-description">
              <p id="description">
                ${fact.description}
              </p>
              <p id="more-info">
                ${fact.moreInfo}
              </p>
            </div>

            <h3>Likes:<span id="likes">${fact.likes}</span></h3>

            ${fact.canEdit || fact.canLike ? html`
            <div id="action-buttons">
                ${fact.canEdit ? html`
                <a href="/catalog/${fact._id}/edit" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
                ${fact.canLike ? html`
                <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>` : null}
            </div>` : null}
        </div>
    </div>
</section>`

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const requests = [
        getById(id),
        getLikes(id)
    ];

    const userData = getUserData();

    if (userData) {
        requests.push(getUserLikes(id, userData._id))
    }

    const [fact, likes, hasLiked] = await Promise.all(requests);
    fact.likes = likes;

    if (userData) {
        fact.canEdit = userData._id == fact._ownerId;
        fact.canLike = fact.canEdit == false && hasLiked == 0;
    }

    update();

    function update() {
        ctx.render(detailsTemplate(fact, onDelete, onLike));
    }

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await deleteFact(id);
            ctx.page.redirect('/catalog');
        }
    }

    async function onLike() {
        await like(id);
        fact.likes++;
        fact.canLike = false;
        update();
    }
}

/*
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${fact.imageUrl} alt="example1" />
        <p id="details-title">${fact.title}</p>
        <p id="details-category">
            Category: <span id="categories">${fact.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${fact.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${fact.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${fact.requirements}</span>
            </div>
        </div>
        <p>likes: <strong id="likes">${fact.likes}</strong></p>

        ${fact.canEdit || fact.canLike ? html`
        <div id="action-buttons">
            ${fact.canEdit ? html`
            <a href="/catalog/${fact._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
            ${fact.canLike ? html`
            <a @click=${onLike} href="javascript:void(0)" id="like-btn">like</a>` : null}
        </div>` : null }

    </div>
</section>
*/