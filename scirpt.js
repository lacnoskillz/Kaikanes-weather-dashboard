weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={1d3ae5500d8fcb7af62c6c542bf6a203}';
fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    });