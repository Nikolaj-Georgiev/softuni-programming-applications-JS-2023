document.querySelector('form').addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repass = formData.get('rePass').trim();

    if (email == '') {
        alert('Please, provide valid email!');
        document.querySelector('[name="email"]').style.border = '1px solid red';
        return;
    } else {
        document.querySelector('[name="email"]').style.border = '';
    }

    if (password == '') {
        alert('Password can\'t be an empty field!');
        document.querySelector('[name="password"]').style.border = '1px solid red';
        return;
    } else {
        document.querySelector('[name="password"]').style.border = '';
    }

    if (password != repass) {
        alert('Passwords don\'t match!');
        document.querySelector('[name="password"]').style.border = '1px solid red';
        document.querySelector('[name="rePass"]').style.border = '1px solid red';
        return;
    } else {
        document.querySelector('[name="password"]').style.border = '';
        document.querySelector('[name="rePass"]').style.border = '';
    }

    try {
        const data = {
            email,
            password
        }

        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message)
        }

        const respData = await response.json();
        const token = respData.accessToken;
        sessionStorage.setItem('accessToken', token);

        window.location = './index.html';
        
    } catch (err) {
        alert(err.message)
    } 
}
);