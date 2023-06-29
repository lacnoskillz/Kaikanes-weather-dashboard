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
var forecastbox = document.querySelector(".flex-3")
var lat;
var lon;
var today = dayjs();

//function to get city info of user input with openweather API
function APIfetch(userinput){
  
  cityAPI = "https://api.openweathermap.org/geo/1.0/direct?q="+userinput+"&limit=5&appid=1d3ae5500d8fcb7af62c6c542bf6a203";
fetch(cityAPI)

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
      //console.log('lat',lat);
      //console.log('lon',lon);
      cityname = data[0].name;
      //console.log("city",cityname);
      getweather(lat,lon,cityname);
      get5dayforecast(lat,lon);
    }});
  }
  //gets the weather info of the city the user searched for using open weather API
function getweather(lat,lon,cityname){
 weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+lon+'&appid=1d3ae5500d8fcb7af62c6c542bf6a203&units=imperial';
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      wind = data.wind.speed;
      temp = data.main.temp;
      humid = data.main.humidity;
      weather = data.weather[0].icon;
      currenttime = data.dt;
      //console.log("currenttime",currenttime);
      cityname= cityname;
      setcurrentweather(wind,temp,humid,weather,cityname);
})
}
//sets info of the current weather of the city in html "flex-2"
function setcurrentweather(wind,temp,humid,weather,cityname){
 // console.log("setcurrentweaher function");
 // console.log("h2",h2EL);
  iconURL = "https://openweathermap.org/img/wn/"+ weather +"@2x.png";
  iconEL = document.createElement('img');
  iconEL.src = iconURL;
  h2EL.innerHTML= cityname +(' ') + (today.format( '(MM, D, YYYY)'));
  h2EL.appendChild(iconEL);
  tempEL.innerHTML = "Tempature: "+temp +" °F";
  humidityEL.innerHTML = "Humidity: "+humid+"%";
  windEL.innerHTML = "Wind: " + wind +" MPH";
 
}
//runs this function if city cant be found
function citynotfound(userinput){
  h2EL.innerHTML= userinput +" is not a city in the data base";
  tempEL.innerHTML = "Tempature:"
  humidityEL.innerHTML = "Humidity"
  windEL.innerHTML = "Wind:"
  deleteListItem();
//console.log(userinput,"is not a city in the data base");
}
//this function gets weather for the next 5days then grabs and sets certain data into divs "flex-3"
function get5dayforecast(lat,lon){
  deleteListItem();
  weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+lon+'&appid=1d3ae5500d8fcb7af62c6c542bf6a203&units=imperial';
 fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("5day",data);
      var b = 1;
      for(let i=7; i<=39; i+=8){
        forecastbox.classList.remove("hide");
        //console.log("b",b);
        //console.log("i",i);
         forcastUL = 'forecast'+b;
         forecastEL = document.getElementById(forcastUL);
         //console.log("forecast",forecastEL);
         header5 = "date" +b;
         var forecastdate = document.getElementById(header5);
         forecastdate.innerHTML = "";
        date= data.list[i].dt_txt;
        temp = data.list[i].main.temp;
        wind = data.list[i].wind.speed;
        humid = data.list[i].main.humidity;
        weather = data.list[i].weather[0].icon;
         iconURL = "https://openweathermap.org/img/wn/"+ weather +"@2x.png";
   iconEL = document.createElement('img');
   iconEL.src = iconURL;
   date = date.slice(0,10);
   //console.log("date",date);
   forecastdate.append(date);
   forecastEL.appendChild(iconEL);
   var listitem = document.createElement('li');
   listitem.textContent = "Tempature: "+temp +" °F";
   forecastEL.appendChild(listitem);
   listitem = document.createElement('li');
   listitem.textContent = "Wind: "+wind +" MPH";
   forecastEL.appendChild(listitem);
   listitem = document.createElement('li');
   listitem.textContent = "Humidity: "+humid +" %";
   forecastEL.appendChild(listitem);
  b= b+1;

}
      
return;
      
    
      });
    }

//event listener to run when user clicks search button
submitbtn.addEventListener('click',Afunction);
function Afunction(event){
  event.preventDefault();
  userinput = citysearchEL.value;
  presearchhistory(userinput);
  console.log(userinput);
  if(userinput != null){
  APIfetch(userinput);
  }else{
    return;
  }
}
//made this so when a user enters a single letter the saved history will save as the city name asscociated with that letter
function presearchhistory(userinput){
  cityAPI = "https://api.openweathermap.org/geo/1.0/direct?q="+userinput+"&limit=5&appid=1d3ae5500d8fcb7af62c6c542bf6a203";
fetch(cityAPI)

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if(data[0] == undefined){
      return;
      }else{
        cityname = data[0].name;
     searchhistory(cityname);
      }
    })};
  

//function to make buttons containing users search. stores it locally. and makes a onclick function to run the APIfetch again.
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
//runs on start and grabs local storage items and displays them as buttons in history
init();
function init(){
      retrieveddata = localStorage.getItem("history");
      var storagearray = JSON.parse(retrieveddata);
      if(storagearray !== null){
      for(var i=0; i<storagearray.length; i++){
        var temp =storagearray[i]
        let btn = document.createElement("button");
btn.innerHTML = temp.city;
historyEL.appendChild(btn);
btnclick(btn);
      }}
   function btnclick(btn){   
btn.onclick = function () {
  x = this.innerHTML;
  APIfetch(x);
}
      }
    
    }
//function to clear 5day forecast so we only see the current citys forecast added hide class to hide h5
function deleteListItem(){
  forecast1EL.innerHTML ="";
  forecast2EL.innerHTML ="";
  forecast3EL.innerHTML ="";
  forecast4EL.innerHTML ="";
  forecast5EL.innerHTML ="";
  forecastbox.classList.add("hide");
  
  }

//event listener and logic to handle delete history
function delhistory(){
  localStorage.clear();
  location.reload();
}
const historybtn = document.getElementById("historybtn")
historybtn.addEventListener('click',delhistory);