window.addEventListener('load', () => {
    onLoad();
})
const formCreate = document.querySelector('#create-form');
formCreate.addEventListener('submit', onCreate);
const table = document.querySelector('table.table tbody');
const buyBtn = document.querySelector('#buy');
buyBtn.addEventListener('click', onBuy);
const allOrdersBtn = document.querySelector('#all-orders-btn')
allOrdersBtn.addEventListener('click', onAllOrders);
const fragment = document.createDocumentFragment();
// const p = document.createElement('p');
// p.textContent = 'Loading...';
// table.replaceChildren(p);
const user = JSON.parse(sessionStorage.getItem('user'));
document.querySelector('#logoutBtn').addEventListener('click', onLogout);
const boughtProducts = document.querySelector('.orders p span');
const totalPrice = document.querySelectorAll('.orders p span')[1];


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
    <input type="checkbox"/>
    </td>
    `;
    tr.innerHTML = furniture;
    return tr;
}

function onCreate(e) {
    e.preventDefault();

    const formData = new FormData(formCreate);
    const furniture = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});
    if (Object.values(furniture).some(x => x == '')) {
        alert('All fields must be filled/stuffed or whatever suits you, but not empty');
        return;
    }
    if (isNaN(furniture.price) || isNaN(furniture.factor)) {
        alert('Цифрички, брат! Попълни цифрички в шибаничките поленца за цена и фактор');
        return;
    }

    formCreate.reset();

    fetch('http://localhost:3030/data/furniture', {
        method: 'post',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify(furniture)
    })
        .then(res => res.json())
        .then(data => table.appendChild(createFurnitureItem(data)))
        .catch(err => {
            alert(err.message)
        });
}

function onBuy() {
    // buyBtn.textContent = 'Loading';
    // buyBtn.disabled = true;
    const checked = [...table.querySelectorAll('input[type="checkbox"]')].filter(x => x.checked);
    if (checked.length == 0) {
        return;
    }
    const rows = checked.map(x => [...x.parentElement.parentElement.children]).forEach(row => {
        const order = {
            img: row[0].lastElementChild.attributes.src.nodeValue,
            name: row[1].innerText,
            price: row[2].innerText,
            factor: row[3].innerText
        }

        fetch('http://localhost:3030/data/orders', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify(order)
        })
            .then(res => {
                if (res.ok != true) {
                    throw new Error(res.statusText);
                }
            })
            .catch(err => alert(err.message))
    })
    // buyBtn.textContent = 'Buy';
    // buyBtn.textContent.disabled = false;
    checked.forEach(x => x.checked = false);
}

function onAllOrders(e) {
    e.preventDefault();
    // allOrdersBtn.textContent = 'Loading...';
    // allOrdersBtn.disabled = true;

    fetch(`http://localhost:3030/data/orders?where=_ownerId%3D"${user._id}"`)
        .then(res => {
            if (res.ok != true) {
                throw new Error(res.statusText);
            }
            return res.json()
        })
        .then(data => {
            boughtProducts.textContent = 'Zero!';
            totalPrice.textContent = '0';
            if (data.length != 0) {
                boughtProducts.textContent = data.map((c => c.name)).join(', ');
                totalPrice.textContent = `${data.reduce((a, c) => a + Number(c.price), 0)} $`;
            }
            boughtProducts.textContent = boughtProducts;
            totalPrice.textContent = `${totalPrice} $`;
        })
        .catch(err => alert(err.message));

    // allOrdersBtn.textContent = 'All orders';
    // allOrdersBtn.disabled = false;
}

function onLogout() {
    fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: { 'X-Authorization': user.accessToken }
    })
        .then(res => {
            if (res.status != 204) {
                throw new Error(res.statusText);
            }
        })
        .catch(err => err.message);
    sessionStorage.clear();
    window.location.href = 'index.html';
}