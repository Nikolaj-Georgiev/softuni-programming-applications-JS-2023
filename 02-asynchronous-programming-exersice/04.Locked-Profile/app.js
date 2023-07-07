function lockedProfile() {

    const main = document.getElementById('main');

    async function fetchProfiles() {
        // try {
            const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
            const data = await response.json();
            const profData = Object.values(data);
            return profData;

        // } catch (error) {
        //     // console.log('Error', error);
        // }
    }

    fetchProfiles()
        .then(result => {
            main.innerHTML ='';
            result.forEach((profile, i) => {
              const divContainer = createProfile(profile, i+1);
              main.appendChild(divContainer);
            });
        })
        // .catch(error => console.log(error));


    function createProfile(profData, id) {
        const divContainer = createElements('div', '', 'profile');
        const img = createElements('img', '', 'userIcon', '', '', './iconProfile2.png');
        divContainer.appendChild(img);
        const labelLock = createElements('label', 'Lock');
        divContainer.appendChild(labelLock);
        const white1 = document.createTextNode(' ');
        divContainer.appendChild(white1);
        const inputLock = createInputEl(createElements('input'), {type:'radio', name:`user${id}Locked`, value:'lock', checked:''});
        divContainer.appendChild(inputLock);
        const white2 = document.createTextNode(' ');
        divContainer.appendChild(white2);
        const labelUnlock = createElements('label', 'Unlock');
        divContainer.appendChild(labelUnlock);
        const white3 = document.createTextNode(' ');
        divContainer.appendChild(white3);
        const inputUnlock = createInputEl(createElements('input'), {type:'radio', name:`user${id}Locked`, value:'unlock'});
        divContainer.appendChild(inputUnlock);
        const br = document.createElement('br');
        divContainer.appendChild(br);
        const hr = document.createElement('hr');
        divContainer.appendChild(hr);
        const labelUsername = createElements('label', 'Username');
        divContainer.appendChild(labelUsername);
        const inputUsername = createInputEl(createElements('input'), {type:'text', name:`user${id}Username`, value:`${profData.username}`, disabled:'', readonly:''});
        divContainer.appendChild(inputUsername);

        const divUser = createElements('div', '', '', `user${id}HiddenFields`);
        const hr1 = document.createElement('hr');
        divUser.appendChild(hr1);
        const labelEmail = createElements('label', 'Email:');
        divUser.appendChild(labelEmail);
        const inputEmail = createInputEl(createElements('input'), {type:'email', name:`user${id}Email`, value:`${profData.email}`, disabled:'', readonly:''});
        divUser.appendChild(inputEmail);
        const white4 = document.createTextNode(' ');
        divUser.appendChild(white4);
        const labelAge = createElements('label', 'Age:');
        divUser.appendChild(labelAge);
        const inputAge = createInputEl(createElements('input'), {type:'text', name:`user${id}Age`, value:`${profData.age}`, disabled:'', readonly:''});
        divUser.appendChild(inputAge);
        divUser.style.display = 'none';
        divContainer.appendChild(divUser);

        const button = createElements('button', 'Show more');
        button.addEventListener('click', onClick);
        divContainer.appendChild(button);
        return divContainer;
    }

    function createElements(type, content, className, id, attributeName, src) {
        const element = document.createElement(type);
        content ? element.textContent = content : '';
        className ? (className.includes(' ') ? className.split(' ').forEach(c => element.classList.add(c)) : element.classList.add(className)) : '';
        id ? element.id = id : '';
        attributeName ? element.setAttribute(attributeName.split('=')[0], attributeName.split('=')[1]) : '';
        type === 'img' ? element.src = src : '';
        return element;
    }

    function createInputEl(element, attributesObj){
        let attributes = Object.entries(attributesObj || {});
        attributes.forEach(kvp => {
            element.setAttribute(kvp[0], kvp[1]);
        });

        return element;
    }

    function onClick(e){
        const button = e.target;
        const hiddenElements = button.previousSibling;
        const parent = e.target.parentElement;
        const unlock = parent.querySelector('input[type="radio"][value="unlock"]');
        if(unlock.checked) {
            if (button.textContent === 'Hide it' && unlock.checked) {
                button.textContent = 'Show more';
                hiddenElements.style.display = 'none';
                return
            }
            hiddenElements.style.display = 'block';
            button.textContent = 'Hide it';
        }
    }
}