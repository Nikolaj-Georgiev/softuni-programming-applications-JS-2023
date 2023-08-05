import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllFacts } from '../data/facts.js';

const catalogTemplate = (facts) => html`
<h2>Fun Facts</h2>
<section id="dashboard">

${facts.length > 0 ? facts.map(factCard) : html` <h2>No Fun Facts yet.</h2>`}
                    
</section>`;

const factCard = (fact) => html`
<div class="fact">
    <img src=${fact.imageUrl} alt="example1" />
    <h3 class="category">${fact.category}</h3>
    <p class="description">${fact.description}</p>
    <a class="details-btn" href="/catalog/${fact._id}">More Info</a>
</div>
`

export async function catalogPage(ctx) {
    const facts = await getAllFacts();
    ctx.render(catalogTemplate(facts));
}

