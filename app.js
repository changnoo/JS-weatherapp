window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector(".temperature-degree")
    let locationTimezone = document.querySelector('.location-timezone')
    let forecastIcon = document.querySelector(".location-icon")
    let temperatureSection = document.querySelector(".temperature")
    const temperatureSpan = document.querySelector('.temperature span')
    
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.lattitude;

            const api = `http://api.weatherapi.com/v1/current.json?key=dee0b03a356f474483a50256221601&q=Vancouver&aqi=no`

            fetch(api)
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                const {temp_c, temp_f} = data.current;
                const condition = data.current.condition.text;

                //set DOM elements from the API
                temperatureDegree.textContent = temp_c;
                temperatureDescription.textContent = condition;
                locationTimezone.textContent = data.location.tz_id;
                forecastIcon.src = data.current.condition.icon;

                
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === 'F') {
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = temp_c;
                    }
                    else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temp_f;
                    } 
                })
                
            })
        });


    }

})