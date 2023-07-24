import { showCatalog } from "./views/catalog1.js";
import { showCreate } from "./views/create1.js";
import { showDetails } from "./views/details1.js";
import { showHome } from "./views/home1.js";
import { showLogin } from "./views/login1.js";
import { showRegister } from "./views/register1.js";
import { showSection } from "./api/dom.js";
import { logout } from "./api/data1.js";

// тук хващаш линковете, на които си добавил id и срещу тях слагаш ключовите думи на вюто, което искаш
const links = {
    'homeLink': 'home',
    'getStartedLink': 'home',
    'loginLink': 'login',
    'registerLink': 'register',
    'catalogLink': 'catalog',
    'createLink': 'create',
}

// тук слагаш за ключ вюто, а срещу него слагаш функцията, която се изпълнява за съответното вю
const views = {
'home': showHome,
'catalog': showCatalog,
'login': showLogin,
'register': showRegister,
'create': showCreate,
'details': showDetails
}
// идеята е да може да се направи проверка, ако има име, да прави нещо, ако няма име, да не прави нищо

const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);
nav.querySelector('#logoutBtn').addEventListener('click', async (ev) => {
    ev.preventDefault();
    await logout();
    updateNav();
    goTo('home');
})

const ctx = {
    goTo,
    showSection,
    updateNav
}

function onNavigate(event){
    const name = links[event.target.id];
    if (name) {
        event.preventDefault();
        goTo(name);
    }
}

function goTo(name, ...params) {
    const view = views[name];
    if (typeof view == 'function') {
        view(ctx, ...params);
    }
}

updateNav();
// start application in home view
goTo('home');


function updateNav(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData != null) {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
    }
}
