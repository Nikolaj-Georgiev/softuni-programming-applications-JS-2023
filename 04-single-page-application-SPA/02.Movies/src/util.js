const views = [...document.querySelectorAll('.view-section')];
const guests = [...document.querySelectorAll('.guest')];
const users = [...document.querySelectorAll('.user')];


function hideAll() {
    views.forEach(v => v.style.display = 'none');
}

export function showView(section) {
    hideAll()
    section.style.display = 'block';
}

export function spinner() {
    const element = document.createElement('p');
    element.innerHTML = 'Loading &hellip;';

    return element
}

export function updateNav() {

    const user = JSON.parse(localStorage.getItem('user'));
    const msgContainer = document.querySelector('#welcome-msg');
    if (user) {
        guests.forEach(x => x.style.display = 'none');
        users.forEach(x => x.style.display = 'inline-block');
        msgContainer.textContent = `Welcome, ${user.email}`;
    } else {
        users.forEach(x => x.style.display = 'none');
        guests.forEach(x => x.style.display = 'inline-block');
        msgContainer.textContent = '';
    }
}