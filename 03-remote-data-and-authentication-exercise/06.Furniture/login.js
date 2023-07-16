const registerForm = document.querySelector('#register-form');
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', onLogin);
registerForm.addEventListener('submit', onRegister);

function onLogin(e) {
    e.preventDefault();

    const loginFormData = new FormData(loginForm);
    const user = { email, password } = Object.fromEntries(loginFormData);
    if (email === '' || password === '') {
        alert('All fields must be filled/stuffed or whatever suits you, but not empty');
        return;
    }
    loginForm.reset();

    fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            if (res.ok != true) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            sessionStorage.setItem('user', JSON.stringify(data));
            window.location.href = 'homeLogged.html';
            return;
        })
        .catch(err => {
            alert(err.message)
            return;
        })

}

function onRegister(e) {
    e.preventDefault();

    const registerFormData = new FormData(registerForm);
    const user = { email, password, rePass } = Object.fromEntries(registerFormData);
    if (email === '' || password === '') {
        alert('All fields must be filled/stuffed or whatever suits you, but not empty');
        return;
    }
    if (password !== rePass) {
        alert('Password and Repeat must match');
        return;
    }
    registerForm.reset();

    fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            if (res.ok != true) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            sessionStorage.setItem('user', JSON.stringify(data));
            window.location = 'homeLogged.html';
            return;
        })
        .catch(err => {
            alert(err.message)
            return;
        })
}
