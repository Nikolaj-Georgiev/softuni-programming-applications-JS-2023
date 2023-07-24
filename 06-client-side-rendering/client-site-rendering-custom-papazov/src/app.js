import { mainTemplate } from "./templates/main.js";
import { getContacts } from "./api.js";
import { render } from "./render.js";

const rootElement = document.getElementById('root');

const contacts = await getContacts();

render(mainTemplate({contacts}), rootElement);

window.addContact = function () {
    fetch('http://localhost:3030/jsonstore/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ person: 'Sasho', phone: '+359885346444' })
    })
        .then(res => res.json())
        .then(contact => render(mainTemplate({contacts: [...contacts, contact]}), rootElement))
}



