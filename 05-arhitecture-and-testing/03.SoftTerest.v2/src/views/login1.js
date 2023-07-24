import { login } from "../api/data1.js";

const section = document.querySelector('#loginPage');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit)

let ctx = null;

export async function showLogin(context) {
    ctx = context;
    ctx.showSection(section); 
}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    if (!email || !password) {
        alert('All fields are required');
        form.reset();
        return;
    }

    await login(email, password);
    form.reset();
    ctx.goTo('home');
    ctx.updateNav();
}