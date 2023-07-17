import { showView, updateNav } from "./util.js";
import { homePage } from "./home.js";

const section = document.querySelector('section#form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
form.reset();

export function registerPage() {
    showView(section);
}

async function onSubmit(e) {
    e.preventDefault();

    console.log('bajhuj');
    const formData = new FormData(form);
    console.log(formData);
    const user = { email, password, repeatPassword } = Object.fromEntries(formData);
    console.log(user);

    if (!email || !password || !repeatPassword) {
        alert('All fields are required!');
        form.reset();
        registerPage();
        return;
    }

    if (password != repeatPassword) {
        alert('Password and Repeat Password fields must match!');
        registerPage();
        return;
    }

    form.reset();

    await registerFn(email, password);
    updateNav()
    homePage();
}

async function registerFn(email, password) {
    try {
        const res = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
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

