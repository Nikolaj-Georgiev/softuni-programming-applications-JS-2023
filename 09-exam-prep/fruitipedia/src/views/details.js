import {html} from '../../node_modules/lit-html/lit-html.js';
import { deleteFruit, getById } from '../data/fruits.js';
import { getUserData } from '../util.js';

const detailsTemplate = (fruit, onDelete) => html`
<section id="details">
        <div id="details-wrapper">
          <img id="details-img" src=${fruit.imageUrl} alt="example1" />
          <p id="details-title">${fruit.name}</p>
          <div id="info-wrapper">
            <div id="details-description">
              <p>${fruit.description}</p>
              <p id="nutrition">Nutrition</p>
              <p id="details-nutrition">${fruit.nutrition}</p>
            </div>
            <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
            ${fruit.canEdit ? html`
            <a href="/catalog/${fruit._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
          </div>
        </div>
      </section>`

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const fruit = await getById(id);

    const userData = getUserData();

    if (userData){
        fruit.canEdit = userData._id == fruit._ownerId;
    }

    update();
     
    function update() {
        ctx.render(detailsTemplate(fruit, onDelete));
    }

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await deleteFruit(id);
            ctx.page.redirect('/catalog');
        }
    }

  
}

/*
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${fruit.imageUrl} alt="example1" />
        <p id="details-title">${fruit.title}</p>
        <p id="details-category">
            Category: <span id="categories">${fruit.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${fruit.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${fruit.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${fruit.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${fruit.applications}</strong></p>

       
            ${fruit.canApply ? html`
            <a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>` : null}
        </div>` : null }

    </div>
</section>
*/
