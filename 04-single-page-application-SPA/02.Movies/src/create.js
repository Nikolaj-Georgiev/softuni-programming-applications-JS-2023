import { homePage } from "./home.js";
import { showView } from "./util.js";

const section = document.querySelector('#add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);


export function createPage(){
    showView(section);
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    await createMovie(title, description, img);
    form.reset();
    homePage();

}

async function createMovie(title, description, img){
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        throw new Error('There is no user logged in');
    }
    try {
        
       const res = await fetch('http://localhost:3030/data/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({title, description, img})
        })

        if (res.ok != true){
            const err = res.json();
            throw new Error(err.message);
        }
    } catch (error) {
        alert(error.message);
    }
}