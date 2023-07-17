import { detailsPage } from "./details.js";
import { showView, spinner } from "./util.js";

const section = document.querySelector('#home-page');
const catalog = section.querySelector('#movie .card-deck.d-flex.justify-content-center');
catalog.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        event.preventDefault();
        const id = event.target.dataset.id;
        detailsPage(id);
    }
})

export function homePage() {
    showView(section);
    displayMovies();
}

async function getMovies() {
    try {
        const res = await fetch('http://localhost:3030/data/movies');
        if (res.ok != true) {
            const err = await res.json();
            throw new Error(err.message);
        }

        const data = await res.json();
        return data;

    } catch (error) {
        alert(error.message);
    }
}

async function displayMovies() {
    catalog.replaceChildren(spinner());
    const movies = await getMovies();
    catalog.replaceChildren(...movies.map(createMoviePreview));
}

function createMoviePreview(movie) {
    const div = document.createElement('div');
    div.className = 'card mb-4';
    div.innerHTML = `
<img class="card-img-top" src="${movie.img}"
alt="Card image cap" width="400">
<div class="card-body">
    <h4 class="card-title">${movie.title}</h4>
</div>
<div class="card-footer">
    <a href="/details/${movie._id}">
        <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
    </a>
</div>
`;
    return div;
}

/* <div class="card mb-4">


</div> */













// window.getMovies = getMovies; - това е за да можеш да си извикаш функцията в конзолата и да си тестваш заявката.