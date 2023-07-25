import { html, render } from 'lit-html';


const template = ([first, second, third], styleClass, isDisabled) => html`
<h1> Hello from lit html </h1>
<ul class=${styleClass}>
    <li>${first}</li>
    <li>${second}</li>
    <li>${third}</li>
</ul>
<input type="text" value=${first}>
<input type="text" .value=${second}>
<button ?disabled=${isDisabled} @click=${onClick}>Add</button>
<button ?disabled=${isDisabled} @click=${() => onClick1(third)}>Add</button>
`;

const tutku = (a = 5) => {
    return a > 6;
}
const root = document.getElementById('root');
render(template(['Pesho', 'Gosho', 'Stamat'], 'horizontal', tutku(3)), root);


function onClick(e) {
    console.log(e.target.previousElementSibling.value);
    console.log(e.target.previousElementSibling.previousElementSibling.value);
}

function onClick1(item) {
    console.log(item);
}