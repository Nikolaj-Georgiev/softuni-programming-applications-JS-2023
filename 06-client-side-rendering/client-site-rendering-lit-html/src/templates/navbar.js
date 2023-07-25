import { html} from "../../node_modules/lit-html/lit-html.js";

const navbarTemplate = (ctx) => html`
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                 <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
                ${ctx.contacts.length > 6 
                ? html`<span>Cannot ADD</span>`
                : html`
                <form action="" @submit=${ctx.addContactHandler}>
                    <input type="text" name="person">
                    <input type="text" name="phone">
                    <button class="nav-link">Add Contact</button>
                </form>
                `}
            </li>
        </ul>
        </div>
    </div>
</nav>`;

export default navbarTemplate;