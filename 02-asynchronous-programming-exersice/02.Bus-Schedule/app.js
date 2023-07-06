function solve() {

    const infoSign = document.querySelector('.info');
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');
    infoSign.textContent = 'Babalugaaaa';

    let busStop = {
        next: 'depot'
    }

    function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                busStop = JSON.parse(JSON.stringify(data));
                infoSign.textContent = `Next stop ${busStop.name}`;
                departBtn.disabled = true;
                arriveBtn.disabled = false;
            })
            .catch(error => {
                infoSign.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            })
    }

    function arrive() {
        infoSign.textContent = `Arriving at ${busStop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();