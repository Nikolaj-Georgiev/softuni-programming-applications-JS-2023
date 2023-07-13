// x get all refs
// x add events
// x fix nav layout
// x make catches functionality

const aHome = document.querySelector('#home');
const userDiv = document.querySelector('#user');
userDiv.style.display = 'none';
const guestDiv = document.querySelector('#guest');
const pEmail = document.querySelector('.email');
const aLogout = document.querySelector('a#logout');
aLogout.addEventListener('click', onLogout);
const loadBtn = document.querySelector('button.load');
loadBtn.addEventListener('click', onLoad);
const addForm = document.querySelector('form#addForm');
const addBtn = document.querySelector('button.add');
const divCatches = document.querySelector('div#catches');
divCatches.replaceChildren();
const fieldSet = document.querySelector('#main');
addForm.addEventListener('submit', onAdd);
addForm.reset();

if (sessionStorage.accessToken != null) {
    guestDiv.style.display = 'none';
    userDiv.style.display = 'inline';
    console.log(sessionStorage.getItem('email'));
    pEmail.firstElementChild.textContent = sessionStorage.getItem('email');
    addBtn.disabled = false;
}

async function onLoad() {
    try {
        const res = await fetch('http://localhost:3030/data/catches');
        if (res.ok != true) {
            const err = await res.json();
            throw new Error(err.message);
        }
        const data = await res.json();
        console.log(data);

        const catches = data.map(createCatch);
        divCatches.replaceChildren(...catches);
        if (sessionStorage.accessToken != null) {
            const [...div] = document.querySelectorAll(`div[data-id="${sessionStorage.getItem('id')}"]`);
            div.forEach(d => {
                [...d.children].forEach(c => c.disabled = false);
                const buttonUpdate = d.children[d.children.length - 2];
                const buttonDelete = d.children[d.children.length - 1];
                buttonUpdate.addEventListener('click', onUpdate);
                buttonDelete.addEventListener('click', onDelete);
            })
        }
    } catch (error) {
        alert(error.message);
        return;
    }
};

function createCatch(catchObj) {
    const div = document.createElement('div');
    div.classList.add('catch');
    div.setAttribute('data-id', catchObj._ownerId);
    div.setAttribute('data-catchid', catchObj._id);
    const content = `
<label>Angler</label>
<input type="text" class="angler" value="${catchObj.angler}" disabled>
<label>Weight</label>
<input type="text" class="weight" value="${catchObj.weight}" disabled>
<label>Species</label>
<input type="text" class="species" value="${catchObj.species}" disabled>
<label>Location</label>
<input type="text" class="location" value="${catchObj.location}" disabled>
<label>Bait</label>
<input type="text" class="bait" value="${catchObj.bait}" disabled>
<label>Capture Time</label>
<input type="number" class="captureTime" value="${catchObj.captureTime}" disabled>
<button class="update" data-id="${catchObj._ownerId}" disabled>Update</button>
<button class="delete" data-id="${catchObj._ownerId}" disabled>Delete</button>
`
    div.innerHTML = content;
    return div;
}

async function onUpdate(e) {
    const catchId = e.target.parentElement.dataset.catchid;
    const catchParent = e.target.parentElement;
    const [angler, weight, species, location, bait, captureTime] = catchParent.querySelectorAll('input');
    const upCatch = {
        angler: angler.value,
        weight: weight.value,
        species: species.value,
        location: location.value,
        bait: bait.value,
        captureTime: captureTime.value
    };
    const options = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('accessToken')
        },
        body:JSON.stringify(upCatch)
    }
    try {
        const res = await fetch('http://localhost:3030/data/catches/' + catchId, options);
        if (res.ok != true) {
            const err = await res.json();
            throw new Error(err.message);
        }
        const data = await res.json();
        onLoad();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

async function onDelete(e) {
    const catchId = e.target.parentElement.dataset.catchid;
    const options = {
        method: 'delete',
        headers: {
            'X-Authorization': sessionStorage.getItem('accessToken')
        },
    }
    try {
        const res = await fetch('http://localhost:3030/data/catches/' + catchId, options);
        if (res.ok != true) {
            const err = await res.json();
            throw new Error(err.message);
        }
        const data = await res.json();
        onLoad();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

async function onAdd(e) {
    e.preventDefault();
    const formData = new FormData(addForm);

    if ([...formData.entries()].some(x => x[1] === '')) {
        alert('Напиши нещо в тез шибанички поленца');
        return;
    }

    const newCatch = {
        "angler": formData.get('angler'),
        "bait": formData.get('bait'),
        "captureTime": formData.get('captureTime'),
        "location": formData.get('location'),
        "species": formData.get('species'),
        "weight": formData.get('weight')
    }

    await addCatch(newCatch);
    addForm.reset();
    onLoad()
}

async function addCatch(catchObj) {
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify(catchObj)
    }
    try {
        const res = await fetch('http://localhost:3030/data/catches', options);
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





















async function logoutUser(token) {
    try {
        const res = await fetch('http://localhost:3030/users/logout', {
            headers: {
                'X-Authorization': token
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

