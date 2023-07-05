function getInfo() {
    let submitBtn = document.getElementById('submit');
    let busList = document.getElementById('buses');
    let stop = document.getElementById('stopName');
 
    submitBtn.addEventListener('click', () => {
        let idVal = document.getElementById('stopId').value;
        let url = `http://localhost:3030/jsonstore/bus/businfo/${idVal}`;
 
 
        fetch(url)
            .then(data => data.json())
            .catch(err => {stop.textContent = 'Error'})
            .then(data => {
                stop.textContent = '';
                busList.innerHTML = '';
                stop.textContent = data.name;
                for (entry in data.buses) {
                    let listEl= document.createElement('li');
                    listEl.textContent = `Bus ${entry} arrives in ${data.buses[entry]} minutes`
                    busList.appendChild(listEl);
                }
 
            })
            // Not sure if this catch is needed, but want to make sure that we don't have invalid entry in bus.json
            .catch(err => {stop.textContent = 'Error'})
 
 
    })
}