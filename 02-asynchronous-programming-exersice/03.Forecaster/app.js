function attachEvents() {

    const inputTown = document.getElementById('location');
    const submitBtn = document.getElementById('submit');
    const divForecast = document.getElementById('forecast');
    const divCurrent = document.getElementById('current');
    const divUpcoming = document.getElementById('upcoming');
    const divLabel =  document.getElementsByClassName('label')[0];

    const wetherIcons = {
        "Sunny": '&#x2600',
        "Partly sunny": '&#x26C5',
        "Overcast": '&#x2601',
        "Rain": '&#x2614',
        "Degrees": '&#176'
    };

    let code = '';
    const divCurrentForecast = document.createElement('div');
    const divUpcomingForecast = document.createElement('div');
    divCurrentForecast.setAttribute('class', 'forecasts');
    divUpcomingForecast.setAttribute('class', 'forecast-info');

    const baseUrl = 'http://localhost:3030/jsonstore/forecaster';

    submitBtn.addEventListener('click', (e) => {

        divCurrentForecast.innerHTML = '';
        divUpcomingForecast.innerHTML = '';


        divCurrent.appendChild(divCurrentForecast);
        divUpcoming.appendChild(divUpcomingForecast);

        divForecast.style.display = 'inline';


        fetch(`${baseUrl}/locations`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Hujnjata ja njama');
                }

                return res.json()
            })
            .then(data => {
                let hujnja = true;
                data.forEach(locInfoObj => {
                    if (locInfoObj.name === inputTown.value) {
                        hujnja = false;
                        return code = locInfoObj.code;
                    }
                });
                if(hujnja){
                    throw new Error('Njama takava hujnja');
                }

                fetch(`${baseUrl}/today/${code}`)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Hujnjata ja njama');
                        }

                        return res.json()
                    })
                    .then(data => {
                        const spanConditionSymbol = document.createElement('span');
                        spanConditionSymbol.setAttribute('class', 'condition symbol');
                        spanConditionSymbol.innerHTML = wetherIcons[data.forecast.condition];
                        const spanCondition = document.createElement('span');
                        spanCondition.setAttribute('class', 'condition');
                        const spanTown = document.createElement('span');
                        const spanTemp = document.createElement('span');
                        const spanWeather = document.createElement('span');
                        spanTown.setAttribute('class', 'forecast-data');
                        spanTemp.setAttribute('class', 'forecast-data');
                        spanWeather.setAttribute('class', 'forecast-data');
                        spanTown.textContent = data.name;
                        spanTemp.innerHTML = `${data.forecast.low}${wetherIcons['Degrees']}/${data.forecast.high}${wetherIcons['Degrees']}`;
                        spanWeather.textContent = data.forecast.condition;
                        spanCondition.appendChild(spanTown);
                        spanCondition.appendChild(spanTemp);
                        spanCondition.appendChild(spanWeather);
                        divCurrentForecast.appendChild(spanConditionSymbol);
                        divCurrentForecast.appendChild(spanCondition);

                    });


                fetch(`${baseUrl}/upcoming/${code}`)
                    .then(res =>  res.json())
                    .then(data => {

                        let nextDays = data.forecast;

                        nextDays.forEach(day => {
                            const spanUpcoming = document.createElement('span');
                            spanUpcoming.setAttribute('class', 'upcoming');
                            const spanSymbol = document.createElement('span');
                            const spanTemp = document.createElement('span');
                            const spanWeather = document.createElement('span');
                            spanSymbol.setAttribute('class', 'symbol');
                            spanSymbol.innerHTML = wetherIcons[day.condition];
                            spanTemp.setAttribute('class', 'forecast-data');
                            spanTemp.innerHTML = `${day.low}${wetherIcons['Degrees']}/${day.high}${wetherIcons['Degrees']}`;
                            spanWeather.setAttribute('class', 'forecast-data');
                            spanWeather.textContent = day.condition;
                            spanUpcoming.appendChild(spanSymbol);
                            spanUpcoming.appendChild(spanTemp);
                            spanUpcoming.appendChild(spanWeather);
                            divUpcomingForecast.appendChild(spanUpcoming);
                        });
                    })
            })
            .catch(error => {
                // divForecast.textContent = 'Error';         
                divLabel.textContent = 'Error'
            })
    })

}

attachEvents();