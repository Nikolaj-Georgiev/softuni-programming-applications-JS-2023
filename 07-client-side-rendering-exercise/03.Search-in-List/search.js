import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns as townNames } from "./towns.js";

const root = document.querySelector('#towns');
const towns = townNames.map(t => ({name: t, match: false}));

const listTemplate = (towns) => html`
<ul>
     ${towns.map(t => html`<li class=${t.match ? 'active' : ''} >${t.name}</li>`)}
</ul>
`
update()

const input = document.getElementById('searchText');
const output = document.getElementById('result');
document.querySelector('button').addEventListener('click', onSearch)

function update(){
   render(listTemplate(towns), root);
}

function onSearch(){
   const match = input.value.trim().toLocaleLowerCase();
   let matches = 0;
   for (const town of towns) {
      if (match && town.name.toLocaleLowerCase().includes(match)) {
         town.match = true;
         matches++;
      } else {
         town.match = false;
      }
   }
   output.textContent = `${matches} matches found`;
   update();
}