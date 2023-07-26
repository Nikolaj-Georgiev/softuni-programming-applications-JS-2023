import { html, render } from './node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
const root = document.querySelector('div');
document.querySelector('form').addEventListener('submit', addItem);
const selectTemplate = (items) => html`
 <select id="menu">
    ${items.map(i => html`<option value=${i._id}>${i.text}</option>`)}
 </select>`

getData();

async function getData() {
    const res = await fetch(url);
    const data = await res.json();

    update(Object.values(data));
}


function update(items) {
    render(selectTemplate(items), root);
}

async function addItem(event) {
    event.preventDefault();
 
    const text = document.querySelector('#itemText').value.trim();
    event.currentTarget.reset();

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text})
    })
    getData();
}