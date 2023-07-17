import { createPage } from "./create.js";
import { homePage } from "./home.js";
import { loginPage } from "./login.js";
import { registerPage } from "./register.js";
import { updateNav } from "./util.js";

// [x] improve HTML structure
// [x] create app.js module
// [x] create util.js containing hide and display of view 
// [x] placeholders for all views

// implement views
// - create request logic
// - DOM manipulation login
// [x] catalog
// [x] login
// [] register
// [] create
// [] details
// [] like
// [] edit
// [] delete

// showView('#home-page');

const routes = {
    '/': homePage,
    '/login': loginPage,
    '/register': registerPage,
    '/logout': logout,
    '/create': createPage

}

document.querySelector('nav').addEventListener('click', onNavigate);
document.querySelector('#add-movie-button a').addEventListener('click', onNavigate);


function onNavigate(event) {
    if (event.target.tagName === 'A' && event.target.href) {
        event.preventDefault();
        const url = new URL(event.target.href)
        const view = routes[url.pathname];
        if (typeof view == 'function') {
            view();
        }
    }
}

function logout() {
    fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization': JSON.parse(localStorage.getItem('user')).accessToken 
        }
    })
    localStorage.removeItem('user');
    updateNav();
    homePage();
}

// Start program with homePage view
homePage();
updateNav();