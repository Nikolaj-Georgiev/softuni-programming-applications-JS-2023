import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, updateFact } from '../data/facts.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (fact, onEdit) => html`
      <section id="edit">
        <div class="form">
          <h2>Edit Fact</h2>
          <form class="edit-form" @submit=${onEdit}>
            <input type="text" name="category" .value=${fact.category} id="category" placeholder="Category" />
            <input type="text" name="image-url" .value=${fact.imageUrl} id="image-url" placeholder="Image URL" />
            <textarea id="description" name="description" .value=${fact.description} placeholder="Description" rows="10" cols="50"></textarea>
            <textarea id="additional-info" name="additional-info" .value=${fact.moreInfo} placeholder="Additional Info" rows="10"
              cols="50"></textarea>
            <button type="submit">Post</button>
          </form>
        </div>
      </section>`;

export async function editPage(ctx) {
    const id = ctx.params.id;

    const fact = await getById(id);

    ctx.render(editTemplate(fact, createSubmitHandler(onEdit)));

    async function onEdit({'image-url': imageUrl, category, description, 'additional-info': moreInfo }) {
        
        if ([imageUrl, category, description, moreInfo].some(f => f == '')) {
            return alert('All fields are required!');
        }

       await updateFact(id, { imageUrl, category, description, moreInfo });

       ctx.page.redirect('/catalog/' + id);
    }
}