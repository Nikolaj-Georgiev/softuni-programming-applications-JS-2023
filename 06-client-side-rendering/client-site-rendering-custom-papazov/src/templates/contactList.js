import { cardCreator } from "./cardTemplate.js";

export const contactListTemplate = (contacts) => `
<div class="contact-list" style="display: flex; justify-content: space-around">
    ${contacts.map(cardCreator).join('')}
</div>

`