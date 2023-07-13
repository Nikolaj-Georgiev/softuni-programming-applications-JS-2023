// x get all the references
// x attach events
// x make request functions
// x store token
// x fix nav buttons
// x redirect user
// x if user is logged and he comes to this site we need to check and display different buttons!

const loginForm = document.querySelector('#login-view');
const pNotification = document.querySelector('.notification');
const aHome = document.querySelector('#home');
const userDiv = document.querySelector('#user');
userDiv.style.display = 'none';
const guestDiv = document.querySelector('#guest');
const pEmail = document.querySelector('.email');
const aLogout = document.querySelector('a#logout');
aLogout.addEventListener('click', onLogout);

if(sessionStorage.accessToken != null) {
    guestDiv.style.display = 'none';
    userDiv.style.display = 'inline';
    pEmail.firstElementChild.textContent = sessionStorage.getItem('email');
}
loginForm.addEventListener('submit', onLogin)

async function loginUser(userObj) {
    const options = { 
        method:'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
    }
    try {
        const res = await fetch('http://localhost:3030/users/login', options);
        if (res.ok != true) {
            const err = await res.json();
            throw new Error (err.message);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        alert(error.message);
        return;
    }
}

async function onLogin(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if ([...formData.entries()].some(x => x[1] === '')){
        pNotification.textContent = 'Напиши нещо в тез шибанички поленца';
        return;
    }
    pNotification.textContent = '';
    const user = {
        'email': formData.get('email'),
        'password': formData.get('password') 
    }
 
    const userData = await loginUser(user);
    sessionStorage.setItem('accessToken', userData.accessToken);
    sessionStorage.setItem('email', userData.email);
    sessionStorage.setItem('id', userData._id);
    guestDiv.style.display = 'none';
    pEmail.firstElementChild.textContent = userData.email;    
    pEmail.setAttribute('data-id', userData._id);
    window.location = './index.html';
    e.target.reset();
}

async function logoutUser(token) {
    try {
        const res = await fetch('http://localhost:3030/users/logout', {
            headers:{
                'X-Authorization':token
            }
        });
    
        if (res.status !== 204) {
            throw new Error(res.status);
        }
        
        return res.status
    } catch (error) {
        error.message
    }
}

async function onLogout() {
    const response = await logoutUser(sessionStorage.getItem('accessToken'));

    if (response === 204) {
        sessionStorage.clear();
        window.location = './index.html'
    }

}