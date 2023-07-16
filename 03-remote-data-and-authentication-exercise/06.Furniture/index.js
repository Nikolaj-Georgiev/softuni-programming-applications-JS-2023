window.addEventListener('load', () => onLoad());
const table = document.querySelector('table.table tbody');
const fragment = document.createDocumentFragment();
// const p = document.createElement('p');
// p.textContent = 'Loading...';
// table.replaceChildren(p);

function onLoad() {
    fetch('http://localhost:3030/data/furniture')
        .then(res => {
            if (res.ok != true) {
                const error = res.json();
                throw new Error(error.message);
            }
            return res.json()
        })
        .then(data => {
            data.forEach(element => {
                fragment.appendChild(createFurnitureItem(element));
            });
            table.replaceChildren(fragment);
        })
        .catch(err => err.message);
}
function createFurnitureItem(data) {
    const tr = document.createElement('tr');
    const furniture = `
    <td>
    <img
    src="${data.img}">
    </td>
    <td>
    <p>${data.name}</p>
    </td>
    <td>
    <p>${data.price}</p>
    </td>
    <td>
    <p>${data.factor}</p>
    </td>
    <td>
    <input type="checkbox" disabled/>
    </td>
    `;
    tr.innerHTML = furniture;
    return tr;
}