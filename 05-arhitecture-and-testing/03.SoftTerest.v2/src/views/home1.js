
const section = document.querySelector('#homePage');
section.remove();
section.querySelector('#getStartedLink').addEventListener('click', (ev) => {
    ev.preventDefault();
    ctx.goTo('catalog');
})
let ctx = null;
export async function showHome(context) {
    ctx = context;
    ctx.showSection(section);
}