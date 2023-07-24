import { register } from "../api/data1.js";

const section = document.querySelector('#registerPage');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export async function showRegister(context) {
    ctx = context;
    ctx.showSection(section);
}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('repeatPassword').trim();

    if (!email || !password) {
        alert('All fields are required');
        form.reset();
        return;
    }

    if (rePass !== password) {
        alert('Password and Repeat Password must match');
        form.reset();
        return;
    }
    await register(email, password);
    form.reset();
    ctx.goTo('home');
    ctx.updateNav();
}