import navbarTemplate from "./navbar.js";
import { contactListTemplate } from "./contactList.js";

export const mainTemplate = (data) => `
    <header>
        ${navbarTemplate()}
    </header>
    <main>
        ${contactListTemplate(data.contacts)}
    </main>
`;