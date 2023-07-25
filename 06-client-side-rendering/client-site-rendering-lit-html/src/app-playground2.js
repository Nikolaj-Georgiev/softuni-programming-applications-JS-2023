import { html, render } from 'lit-html';


const template = (items, styleClass) => html`
<h1> Hello from lit html </h1>

    ${items.length == 0
        ? html`<p>No users</p>`
        : ''
    }

<ul class=${styleClass}>
    ${items.map(x => html`<li>${x}</li>`)}
</ul>

<button ?disabled=${items.length > 6} @click=${() => onClick()}>Add</button>
`;
const names = ['Pesho', 'Gosho', 'Stamat']
const root = document.getElementById('root');
render(template(names, 'vertical', false), root);


function onClick() {
    names.push('Misho_' + parseInt((Math.random() * 100)));
    render(template(names, 'vertical'), root);
}

