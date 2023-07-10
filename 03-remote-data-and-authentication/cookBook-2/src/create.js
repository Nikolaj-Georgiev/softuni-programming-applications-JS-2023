document.querySelector('form').addEventListener('submit', onCreate);

async function onCreate(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get('name').trim();
    const img = formData.get('img').trim();
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');

    if (name == '' || img == '' || ingredients == '' || steps == '') {
        alert('All fields must be filled with valid input!');
        return
    }
    const token = sessionStorage.getItem('accessToken');
    if (token == null) {
        alert('Please login!')
        window.location = './login.html';
        return;
    }

    try {

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({ name, img, ingredients, steps })
        }

        const res = await fetch('http://localhost:3030/data/recipes', options)

        if (res.ok != true) {
            const err = await res.json();
            throw new Error(err.message);
        }

        await res.json();
        window.location = './index.html';


    } catch (error) {
        alert(error.message)
    }

}