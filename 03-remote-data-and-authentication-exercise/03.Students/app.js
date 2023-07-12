const form = document.querySelector('#form');
const table = document.querySelector('table#results tbody');
document.querySelector('#submit').addEventListener('click', onSubmit);
const notification = document.querySelector('p.notification');
onLoad();

async function onSubmit(e) {
    e.preventDefault();
    const form = e.target.parentElement;
    const formData = new FormData(form);
    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});
    console.log(data);

    if (Object.values(data).some(x => x == '')){
        notification.textContent = 'Bez prazni hujni';
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }

        await response.json();
        form.reset()
        onLoad();

    } catch (error) {
        alert(error.message);
    }
}

async function onLoad() {
    const res = await fetch('http://localhost:3030/jsonstore/collections/students');
    const data = await res.json();
    // const rows = createRow(Object.values(data));
    table.replaceChildren(...createRow(Object.values(data)));
}

function createRow(studentsData) {
    let student = '';
    const students = studentsData.map(x => {
        const tr = document.createElement('tr');
        student = `
<tr>
    <td>${x.firstName}</td>
    <td>${x.lastName}</td>
    <td>${x.facultyNumber}</td>
    <td>${x.grade}</td>
</tr>
`;
        tr.innerHTML = student;
        return tr
    })
    return students;
}