window.addEventListener('load', solve);

function solve() {
    const main = document.querySelector('main');
    let startP = document.querySelector('main>p');
    startP.remove();
    const baseUrl = 'http://localhost:3030/jsonstore/cookbook';

    fetchData(`${baseUrl}/recipes`)
        .then(data => Object.values(data))
        .then(recipes => {
            recipes.forEach(item => {
                main.appendChild(createRecipeCard(item));
            });
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

    function createRecipeCard(recipe) {
        const article = document.createElement('article');
        article.classList.add('preview');
        article.id = recipe._id;

        const content = `
            <div class="title">
                <h2>${recipe.name}</h2>
            </div>
            <div class="small">
                <div class="thumb">
                    <img src="${recipe.img}" alt="${recipe.name}">
                </div>
            </div>
        `;
        article.innerHTML = content;
        article.addEventListener('click', toggleRecipes);

        return article;
    }

    function toggleRecipes(event) {
        const article = event.currentTarget;
        const id = article.id;

        fetchData(`${baseUrl}/details/${id}`)
            .then(data => {
                const ingredientsArr = data.ingredients;
                const stepsArr = data.steps;

                const ingredientsList = ingredientsArr.map(ingredient => `<li>${ingredient}</li>`).join('');
                const stepsList = stepsArr.map(step => `<p>${step}</p>`).join('');

                const content = `
                    <h2>${data.name}</h2>
                    <div class="band">
                        <div class="thumb">
                            <img src="${data.img}" alt="${data.name}">
                        </div>
                        <div class="ingredients">
                            <h3>Ingredients:</h3>
                            <ul>
                                ${ingredientsList}
                            </ul>
                        </div>
                    </div>
                    <div class="description">
                        <h3>Preparation:</h3>
                        ${stepsList}
                    </div>
                `;

                article.innerHTML = content;
            })
            .catch(error => {
                console.error('Error fetching recipe details:', error);
            });
    }
}