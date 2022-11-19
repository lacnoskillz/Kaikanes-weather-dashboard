submitbtnEL = document.getElementById('submitbtn');
citysearchEL = document.getElementById('citysearch');
historyEL = document.getElementById('history');
var h2EL = document.getElementById("currentcity");
var tempEL = document.getElementById('templist')
var windEL = document.getElementById('windlist')
var humidityEL = document.getElementById('humiditylist')
var forecast1EL = document.getElementById("forecast1");
var forecast2EL = document.getElementById("forecast2");
var forecast3EL = document.getElementById("forecast3");
var forecast4EL = document.getElementById("forecast4");
var forecast5EL = document.getElementById("forecast5");
var forecastdate1 = document.getElementById("date1");
var forecastdate2 = document.getElementById("date2");
var forecastdate3 = document.getElementById("date3");
var forecastdate4 = document.getElementById("date4");
var forecastdate5 = document.getElementById("date5");

var j = 0;
var lat;
var lon;
var today = dayjs();


function APIfetch(userinput){
  
  test = "http://api.openweathermap.org/geo/1.0/direct?q="+userinput+"&limit=5&appid=1d3ae5500d8fcb7af62c6c542bf6a203";
fetch(test)

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("citydata",data);
    
     
     if(data[0] == undefined){
      citynotfound(userinput);
     }else{
      lat = data[0].lat
     lon = data[0].lon
      console.log('lat',lat);
      console.log('lon',lon);
      cityname = data[0].name;
      console.log("city",cityname);
      getweather(lat,lon,cityname);
      get5dayforecast(lat,lon);
    }});
  }
function getweather(lat,lon,cityname){
 weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+lon+'&appid=1d3ae5500d8fcb7af62c6c542bf6a203&units=imperial';
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("weatherdata",data);
      wind = data.wind.speed;
      console.log("wind",wind);
      temp = data.main.temp;
      console.log("temp",temp);
      humid = data.main.humidity;
      console.log("humid",humid);
      weather = data.weather[0].icon;
      console.log("weather",weather);
      currenttime = data.dt;
      console.log("currenttime",currenttime);
      dayjs.unix(currenttime);
      cityname= cityname;
      setcurrentweather(wind,temp,humid,weather,currenttime,cityname);

      

})
}
function setcurrentweather(wind,temp,humid,weather,currenttime,cityname){
  console.log("setcurrentweaher function");
  console.log("h2",h2EL);
  iconURL = "http://openweathermap.org/img/wn/"+ weather +"@2x.png";
  iconEL = document.createElement('img');
  iconEL.src = iconURL;
  h2EL.innerHTML= cityname +(' ') + (today.format( '(MM, D, YYYY)'));
  h2EL.appendChild(iconEL);
  tempEL.innerHTML = "Tempature: "+temp +" F";
  humidityEL.innerHTML = "Humidity: "+humid+"%";
  windEL.innerHTML = "Wind: " + wind +" MPH";
  searchhistory(cityname)
 
}
//runs this function if city cant be found
function citynotfound(userinput){
  h2EL.innerHTML= userinput +" is not a city in the data base";
  tempEL.innerHTML = "Tempature:"
  humidityEL.innerHTML = "Humidity"
  windEL.innerHTML = "Wind:"
console.log(userinput,"is not a city in the data base");
}
//this function gets weather for the next 5days then grabs and sets certain data into divs
function get5dayforecast(lat,lon){
  deleteListItem();
  weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+lon+'&appid=1d3ae5500d8fcb7af62c6c542bf6a203&units=imperial';
 fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("5day",data);
      //box1 day2
      date1 = data.list[1].dt_txt;
      wind1 = data.list[1].wind.speed;
      temp1 = data.list[1].main.temp;
      humid1 = data.list[1].main.humidity;
      weather1 = data.list[1].weather[0].icon;
      forecastdate1.textContent = date1;
      iconURL = "http://openweathermap.org/img/wn/"+ weather1 +"@2x.png";
      iconEL = document.createElement('img');
      iconEL.src = iconURL;
      forecast1EL.appendChild(iconEL);
      var listitem = document.createElement('li');
      listitem.textContent = "Wind: "+wind1 +" MPH";
      forecast1EL.appendChild(listitem);
      var listitem = document.createElement('li');
      listitem.textContent = "Tempature: "+temp1 +" F";
      forecast1EL.appendChild(listitem);
      var listitem = document.createElement('li');
      listitem.textContent = "Humidity: "+humid1 +" %";
      forecast1EL.appendChild(listitem);
      
      

      
      //box2 day3
      date2 = data.list[9].dt_txt;
      wind2 = data.list[9].wind.speed;
      temp2 = data.list[9].main.temp;
      humid2 = data.list[9].main.humidity;
      weather2 = data.list[9].weather[0].icon;
      forecastdate2.textContent = date2;
      iconURL = "http://openweathermap.org/img/wn/"+ weather2 +"@2x.png";
      iconEL = document.createElement('img');
      iconEL.src = iconURL;
      forecast2EL.appendChild(iconEL);
      var listitem = document.createElement('li');
      listitem.textContent = "Wind: "+wind2 +" MPH";
      forecast2EL.appendChild(listitem);
      var listitem = document.createElement('li');
      listitem.textContent = "Tempature: "+temp2 +" F";
      forecast2EL.appendChild(listitem);
      var listitem = document.createElement('li');
      listitem.textContent = "Humidity: "+humid2 +" %";
      forecast2EL.appendChild(listitem);
      
      //box3 day 4
      wind3 = data.list[18].wind.speed;
      date3 = data.list[18].dt_txt;
      temp3 = data.list[18].main.temp;
      humid3 = data.list[18].main.humidity;
      weather3 = data.list[18].weather[0].icon;
      forecastdate3.textContent = date3;
      iconURL = "http://openweathermap.org/img/wn/"+ weather3 +"@2x.png";
      iconEL = document.createElement('img');
      iconEL.src = iconURL;
      forecast3EL.appendChild(iconEL);
      var listitem = document.createElement('li');
      listitem.textContent = "Wind: "+wind3 +" MPH";
      forecast3EL.appendChild(listitem);
      var listitem = document.createElement('li');
      listitem.textContent = "Tempature: "+temp3 +" F";
      forecast3EL.appendChild(listitem);
      var listitem = document.createElement('li');
      listitem.textContent = "Humidity: "+humid3 +" %";
      forecast3EL.appendChild(listitem);
      
      //box4 day 5
      date4 = data.list[27].dt_txt;
      wind4 = data.list[27].wind.speed;
      temp4 = data.list[27].main.temp;
      humid4 = data.list[27].main.humidity;
      weather4 = data.list[27].weather[0].icon;
      forecastdate4.textContent = date4;
      iconURL = "http://openweathermap.org/img/wn/"+ weather4 +"@2x.png";
      iconEL = document.createElement('img');
      iconEL.src = iconURL;
      forecast4EL.appendChild(iconEL);
      var listitem = document.createElement('li');
      listitem.textContent = "Wind: "+wind4 +" MPH";
      forecast4EL.appendChild(listitem);
      var listitem = document.createElement('li');
      listitem.textContent = "Tempature: "+temp4 +" F";
      forecast4EL.appendChild(listitem);
      var listitem = document.createElement('li');
      listitem.textContent = "Humidity: "+humid4 +" %";
      forecast4EL.appendChild(listitem);
      
      //box5 day 6
      date5 = data.list[38].dt_txt;
      wind5 = data.list[38].wind.speed;
      temp5 = data.list[38].main.temp;
      humid5 = data.list[38].main.humidity;
      weather5 = data.list[38].weather[0].icon;
      forecastdate5.textContent = date5;
      iconURL = "http://openweathermap.org/img/wn/"+ weather5 +"@2x.png";
      iconEL = document.createElement('img');
      iconEL.src = iconURL;
      forecast5EL.appendChild(iconEL);
      var listitem = document.createElement('li');
      listitem.textContent = "Wind: "+wind5 +" MPH";
      forecast5EL.appendChild(listitem);
      var listitem = document.createElement('li');
      listitem.textContent = "Tempature: "+temp5 +" F";
      forecast5EL.appendChild(listitem);
      var listitem = document.createElement('li');
      listitem.textContent = "Humidity: "+humid5 +" %";
      forecast5EL.appendChild(listitem);
      

      
    
      });
    }

//event listener to run when user clicks search button
submitbtn.addEventListener('click',Afunction);
function Afunction(event){
  event.preventDefault();
  userinput = citysearchEL.value;
  console.log(userinput);
  if(userinput != null){
  APIfetch(userinput);
  }else{
    return;
  }
}
function searchhistory(cityname){
  var storedcitys = JSON.parse(localStorage.getItem('history')) || [];
  var searchedcitys = {
      city: cityname,
  };
  storedcitys.push(searchedcitys);
  localStorage.setItem('history', JSON.stringify(storedcitys));
  let btn = document.createElement("button");
btn.innerHTML = cityname;
historyEL.appendChild(btn);
btn.onclick = function () {
  x = this.innerHTML;
  APIfetch(x);
};
}

init();
function init(){
      retrieveddata = localStorage.getItem("history");
      var storagearray = JSON.parse(retrieveddata);
      for(var i=0; i<storagearray.length; i++){
        var temp =storagearray[i]
        let btn = document.createElement("button");
btn.innerHTML = temp.city;
historyEL.appendChild(btn);
btnclick(btn);
      }
   function btnclick(btn){   
btn.onclick = function () {
  x = this.innerHTML;
  APIfetch(x);
}
      }
    
    }

function deleteListItem(){
  const list = document.getElementById("cast1items");
  while (list.hasChildNodes()) {
    console.log("kai");
    list.removeChild(list.firstChild);
  }
  
  }

//old history storer
    // var listitem = document.createElement('li');
    // listitem.textContent = cityname;
    // historyEL.appendChild(listitem);

//attempt at a function to store 5 day weather forecast
//  for(let i=0; i<39; i+8){
  //       var b = 1;
  //        forcastdiv = 'forecast'+b;
  //        forecastEL = document.getElementById(forcastdiv);
  //        console.log("forecast",forecastEL);
  //       date= data.list[i].dt_txt;
  //       console.log(date);
  //       temp = data.list[i].main.temp;
  //       wind = data.list[i].wind.speed;
  //       humid = data.list[i].main.humidity;
  //       weather = data.list[i].weather[0].icon;
  //        iconURL = "http://openweathermap.org/img/wn/"+ weather +"@2x.png";
  //  iconEL = document.createElement('img');
  //  iconEL.src = iconURL;
  //  forecastEL.appendChild(iconEL);
  // b++;