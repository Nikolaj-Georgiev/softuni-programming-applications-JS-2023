const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

async function onSubmit(ev){
    ev.preventDefault()

    formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        if (response.ok != true) {
            console.log('.I.');
            const err = await response.json();
            throw new Error(err.message);
        }

        const data = await response.json();

        const token = data.accessToken;

        sessionStorage.setItem('accessToken', token);

        window.location = './index.html';
        
    } catch (error) {
        alert(error.message)
    }

}