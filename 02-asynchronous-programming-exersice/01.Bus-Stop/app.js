function getInfo() {
    const stopId = document.getElementById('stopId');
    const stopName = document.getElementById('stopName');
    const ulBuses = document.getElementById('buses');

    const baseURL = `http://localhost:3030/jsonstore/bus/businfo`;

    fetch(`${baseURL}/${stopId.value}`)
        .then(response => response.json())
        .then(data => {
            ulBuses.innerHTML ='';
            stopName.textContent = data.name;
            const buses = Object.keys(data.buses);
            buses.forEach(bus => {
                let li = document.createElement('li');
                li.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
                ulBuses.appendChild(li);
            });
        })
        .catch(error => {
            ulBuses.innerHTML = '';
            stopName.textContent = 'Error';
        })
}