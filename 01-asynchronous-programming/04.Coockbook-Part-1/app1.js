window.addEventListener('load', solve);

function solve() {

    const main = document.querySelector('main');
    let startP = document.querySelector('main>p');
    startP.remove();
    const baseUrl = 'http://localhost:3030/jsonstore/cookbook';

    fetchData(`${baseUrl}/recipes`)
        .then(data => Object.values(data))
        .then(recipes => {
          recipes.map(item => {
            let article = createElements('article', '', 'preview', item._id);
            let divTitle = createElements('div', '', 'title');
            let h2 = createElements('h2', item.name);
            divTitle.appendChild(h2);
            article.appendChild(divTitle);
            let divImg = createElements('div', '', 'small');
            let img = createElements('img', '','','','', item.img);
            divImg.appendChild(img);
            article.appendChild(divImg);
            article.addEventListener('click', toggleRecipes);
            main.appendChild(article);
            console.log(item)});

        })
        .catch(error => {
            console.error('Error:', error);
        });

    function fetchData(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Fetch error:', error);
                throw error;
            });
    }

    function toggleRecipes(event) {
        let article = event.currentTarget;
        let id = article.id;
        fetchData(`${baseUrl}/details/${id}`)
        .then(data => {
            let ingredientsArr = data.ingredients;
            let stepsArr = data.steps;
            
            article.innerHTML = ` 
            <h2>${data.name}</h2>
            <div class="band">
                <div class="thumb">
                    <img src="${data.img}">
                </div>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                        <li>${ingredientsArr[0]}</li>
                        <li>${ingredientsArr[1]}</li>
                        <li>${ingredientsArr[2]}</li>
                        <li>${ingredientsArr[3]}</li>
                    </ul>
                </div>
            </div>
            <div class="description">
                <h3>Preparation:</h3>
                <p>${stepsArr[0]}</p>
                <p>${stepsArr[1]}</p>
                <p>${stepsArr[2]}</p>
            </div>
        `;
        });
    }

    function createElements(type, content, className, id, attributeName, src) {
        const element = document.createElement(type);
        content ? element.textContent = content : '';
        className ? (className.includes(' ') ? className.split(' ').forEach(c => element.classList.add(c)) : element.classList.add(className)) : '';
        id ? element.id = id : '';
        attributeName ? element.setAttribute(attributeName.split('=')[0], attributeName.split('=')[1]) : '';
        type === 'img' ? element.src = src : '';
        return element;
    }
}