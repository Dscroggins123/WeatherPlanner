var date = new Date();
var currentDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
var searchButton = $("#searchButton")
var Saved = () => {
    $("#cities").html("")
cities.forEach(element => {
 $("#cities").append(`<button class="btn btn-primary mb-1 added-cities" value=${element}>${element}</button>`)
});

}
var cities = [];
if(localStorage.getItem("cities")){
   cities = JSON.parse(localStorage.getItem('cities'))
}
Saved()
$(document).on("click", ".added-cities", (e) => {
    e.preventDefault()
    const inputCity = e.target.value
    var ourQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&APPID=98c6bb55a308a516a74756820c25e107";
    searchAndRender(ourQueryURL, inputCity);
})

$(searchButton).on("click", function(event){
    $("<div>").hide("fast", function City(){
        event.preventDefault();
    
    var inputCity = $(".inputField").val()
    console.log(inputCity)

    
    
    
    
    var ourQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&APPID=98c6bb55a308a516a74756820c25e107";
    console.log(ourQueryURL)
        searchAndRender(ourQueryURL, inputCity)
    
})


})

function searchAndRender(url, city) {
        
    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response){
        if(!cities.includes(city)){
           cities.push(city) 
        }
        localStorage.setItem("cities", JSON.stringify(cities) );
        Saved()
        console.log(response)
        var temperature = Math.round((response.main.temp - 273.15) * (1.8) + 32 )
        $("#cityName").html(response.name + " (" + currentDate + ")" + "<img src=https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png" + ">")
        $("#cityName")
        $("#temperature").html("Temperature: " + temperature + " &#8457;") 
        $("#humidity").html("Humidity: " + response.main.humidity + " %")
        $("#windSpeed").html("Wind Speed: " + response.wind.speed + " MPH")
        var latitude = response.coord.lat
        var longitude = response.coord.lon
        getUV (latitude,longitude)
    })
}

function getUV (latitude,longitude){
    //   console.log(latitude)
    //   console.log(longitude)
    $("#fiveday").empty();
     var ourQueryURL =  "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&units=imperial&appid=98c6bb55a308a516a74756820c25e107"
     
    
     $.ajax({
        url: ourQueryURL,
        method: "GET"
    }).then(function(secondResponse){
        secondResponse.daily.forEach((day, i) => {
            if(i < 5){ $("#fiveday").append
                $("#fiveday").append(`<div class="card col-2" style="width: 130px;" style="height: 100px;" >
                <div style="height: 130px;">
                  <h5 class="card-title date" style="font-size:15px">${currentDate.replace(/\/(.+)\//, a=> `/${+a.replace(/\//g, "")+i+1}/`)}</h5>
                  
                  <p class="card-text temperature" style="font-size:12px" >${"Temp: " + Math.round(day.temp.day) + "&#8457;"}</h6>
                  <p class="card-text humidity" style="font-size:12px"> ${"Humidity: " + day.humidity + "%"}</p>
                  
                </div>
              </div>`)
            }
        });
        
        console.log(secondResponse)
        $("#UV").text("UV Index: " + secondResponse.current.uvi)
        
    })
    
}


    
    

















