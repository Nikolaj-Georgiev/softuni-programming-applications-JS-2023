import {render} from '../node_modules/lit-html/lit-html.js'
import { townUlMaker } from './townTemplate.js';

const root = document.querySelector('#root');


document.querySelector('form').addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const towns = formData.get('towns').split(', ');
    render(townUlMaker(towns), root);
}

