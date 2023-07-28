import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllFruits, searchFruit } from '../data/fruits.js';
import { createSubmitHandler } from '../util.js';
import { fruitCard } from './catalog.js';

const searchTemplate = (onSearch, fruits) => html`
<section id="search">

<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit=${onSearch}>
    <input type="text" name="search" id="search-input" />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
${fruits ? html`
<div class="search-result">
 ${fruits.map(fruitCard)} 
</div>`
    : html`<p class="no-result">No result.</p>`}
</section>`

export async function searchPage(ctx) {

    const allFruits = await getAllFruits();

    ctx.render(searchTemplate(createSubmitHandler(onSearch)));

    async function onSearch({ search }, form) {
        if (search.trim() == '') {
            form.reset();
            return alert('Fill the field!');
        }

        let result = allFruits.filter(f => f.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

        if (result.length == 0) {
            return alert('No matches found!')
        }
        ctx.returnedFruits = await searchFruit(search);
        console.log(ctx.returnedFruits);
        ctx.render(searchTemplate(null, ctx.returnedFruits))

        // ctx.page.redirect('/catalog');
    }
}
