async function solution() {
    const mainWrapper = document.getElementById('main');

    const baseUrl = 'http://localhost:3030/jsonstore/advanced/articles';
   
        const resp = await fetch(`${baseUrl}/list`);
        const data = await resp.json();

        data.forEach(async (element) => {
            const response = await fetch(`${baseUrl}/details/${element._id}`);
            const articleObject = await response.json();
            const divAccordion = elementCreator(articleObject);
            mainWrapper.appendChild(divAccordion);
            divAccordion.querySelector('button.button').addEventListener('click', (e) => {
                const btn = e.target;
                const divExtra = divAccordion.querySelector('div.extra');
                if (btn.textContent === 'More') {
                    btn.textContent = 'Less';
                    divExtra.style.display = 'block';
                    return;
                }
                btn.textContent = 'More';
                divExtra.style.display = 'none';
            });
        });
    
    function elementCreator(obj){
        const element = document.createElement('div');
        element.className = 'accordion';
       const content = `
<div class="head">
    <span>${obj.title}</span>
    <button class="button" id="${obj._id}">More</button>
</div>
<div class="extra">
    <p>${obj.content}</p>
</div>
`;
     element.innerHTML = content;   
     return element;
    }
};

solution();