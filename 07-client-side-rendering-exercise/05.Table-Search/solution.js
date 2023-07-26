import { html, render } from './node_modules/lit-html/lit-html.js';

const studentRow = (student) => html`
 <tr class=${student.match ? 'select' : ''}>
      <td>${student.item.firstName} ${student.item.lastName}</td>
      <td>${student.item.email}</td>
      <td>${student.item.course}</td>
</tr>
`;

const input = document.getElementById('searchField');
document.getElementById('searchBtn').addEventListener('click', onSearch);
let students;

start();

async function start() {
   const res = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await res.json()
   students = Object.values(data).map(s => ({item: s, match:false}));



   update();
}

function update() {
   // na lit-html move da se podava masiv i toj sam si vzima vsi1ki elementi i edin po edin si gi buta v tbody-to(ili kakyvto root sme mu dali)
   render(students.map(studentRow), document.querySelector('tbody'));
}

function onSearch() {
   const value = input.value.trim().toLocaleLowerCase();
   for (const holder of students) {
      holder.match = (Object.values(holder.item).some(x => value && x.toLocaleLowerCase().includes(value)));
      // value && x.toLocaleLowerCase().includes(value) - с това value и логичския съюз && правим проверка дали value е празен стринг и после правим останалата проверка.
   }

   update();
}