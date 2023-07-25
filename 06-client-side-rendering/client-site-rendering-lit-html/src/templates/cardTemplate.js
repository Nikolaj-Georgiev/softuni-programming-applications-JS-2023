import { html} from "../../node_modules/lit-html/lit-html.js";

export const cardCreator = (contact) => html`
<div class="card" style="width: 18rem;">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBYYRqKKOjMbwaH1VzgRaojjKsL7uBjFbPRbcvx_MHgb8mqAImsirX-E1msZ0NSIwaXD4&usqp=CAU" class="card-img-top" alt="Person image">
  <div class="card-body">
    <h5 class="card-title">${contact.person}</h5>
    <p class="card-text">${contact.phone}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;