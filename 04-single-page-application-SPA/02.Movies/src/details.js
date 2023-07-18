import { showView, spinner } from "./util.js";

const section = document.querySelector('#movie-example');

export function detailsPage(id) {
    showView(section);
    displayMovie(id);
}

async function displayMovie(id) {
    section.replaceChildren(spinner());
    const user = JSON.parse(localStorage.getItem('user'));

    const [movie, likes, ownLike] = await Promise.all([
        getMovie(id),
        getLikes(id),
        getOwnLike(id, user)
    ])

    section.replaceChildren(createMovieCard(movie, user, likes, ownLike));
}

function createMovieCard(movie, user, likes, ownLike) {

    const element = document.createElement('div');
    element.className = 'container';
    element.innerHTML = `
<div class="row bg-light text-dark">
    <h1>Movie title: ${movie.title}</h1>

    <div class="col-md-8">
        <img class="img-thumbnail" src="${movie.img}" alt="Movie">
    </div>
    <div class="col-md-4 text-center">
        <h3 class="my-3 ">Movie Description</h3>
        <p>${movie.description}</p>
        ${createControls(movie, user, likes, ownLike)}
    </div>
</div>`;
    const likeBtn = element.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e, movie._id))
    }
    return element;
}

function createControls(movie, user, likes, ownLike) {
    const isOwner = user && user._id == movie._ownerId;

    let controls = [];

    if (isOwner) {
        controls.push(`<a class="btn btn-danger" href="#">Delete</a>`)
        controls.push(`<a class="btn btn-warning" href="#">Edit</a>`);
        controls.push(`<span class="enrolled-span">Liked ${likes}</span>`)
    } else if (user && ownLike == false) {
        controls.push(`<a class="btn btn-primary like-btn" href="#">Like</a> `)
    } else if (user && ownLike) {
        controls.push(`<span class="enrolled-span">Liked ${likes}</span>`)
    }

    return controls.join('');
}

async function getMovie(id) {

    try {

        const res = await fetch(`http://localhost:3030/data/movies/${id}`);
        if (res.ok != true) {
            const err = await res.json();
            throw new Error(err.message)
        }

        const movie = await res.json();
        return movie;
    } catch (error) {
        alert(error.message);
    }
}

async function getLikes(id) {
    try {
        const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
        if (res.ok != true) {
            const err = await res.json();
            throw new Error(err.message);
        }

        const likes = res.json();
        return likes;
    } catch (error) {
        alert(error.message);
    }
}

async function getOwnLike(movieId, user) {
    if (!user) {
        return false;
    } else {
        const userId = user._id;
        try {
            const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }

            const ownLike = await res.json();
            return ownLike.length > 0
        } catch (error) {
            alert(error.message);
        }
    }
}


async function likeMovie(e, movieId){
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user'));

    try {
        const res = await fetch('http://localhost:3030/data/likes', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({movieId})
        })

        if (res.ok != true) {
            const err = await res.json();
            throw new Error(err.message)
        }

        detailsPage(movieId);
    } catch (error) {
        alert(error.message)
    }
    
}



// ${isOwner ? `
// <a class="btn btn-danger" href="#">Delete</a>
// <a class="btn btn-warning" href="#">Edit</a>` : `
// <a class="btn btn-primary" href="#">Like</a>
// <span class="enrolled-span">Liked 1</span>`
// } - mnogo qk operator, ama s funkciq e po-qko
