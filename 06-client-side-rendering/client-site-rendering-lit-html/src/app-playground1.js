import { html, render } from 'lit-html';


const template = (items, styleClass, isDisabled) => html`
<h1> Hello from lit html </h1>

    ${items.length == 0
        ? html`<p>No users</p>`
        : ''
    }

<ul class=${styleClass}>
    <li>${items[0]}</li>
    <li>${items[1]}</li>
    <li>${items[2]}</li>
</ul>

<button ?disabled=${isDisabled} @click=${() => onClick(items[2])}>Add</button>
`;

const root = document.getElementById('root');
render(template([1,2,3], 'horizontal', false), root);


function onClick(item) {
    console.log(item);

}

