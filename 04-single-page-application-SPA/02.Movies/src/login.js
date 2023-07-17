import { showView, updateNav } from "./util.js";
import { homePage } from "./home.js";

const section = document.querySelector('#form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
form.reset();

export function loginPage() {
    showView(section);
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        alert('All fields are required!');
        return;
    }

    await login(email, password);
    form.reset();
    updateNav()
    homePage();
}

async function login(email, password) {
    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (res.ok != true) {
            const err = await res.json();
            throw new Error(err.message);
        }

        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        alert(error.message);
        throw error;
    }
}
