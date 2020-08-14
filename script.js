

var searchButton = $("#searchButton")


$(searchButton).on("click", function(event){
    event.preventDefault();
    var inputCity = $(".inputField").val()
    console.log(inputCity)

    
    
     
    localStorage.setItem("cities", JSON.stringify(inputCity) );
    var cities = JSON.parse(localStorage.getItem('cities'))
    
    
    var ourQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&APPID=98c6bb55a308a516a74756820c25e107";
    
    $.ajax({
        url: ourQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response.weather[0].icon )
        var temperature = (response.main.temp - 273.15) * (1.8) + 32 
        $("#cityName").html(response.name )
        $("#temperature").html("Temperature: " + temperature + " &#8457;") 
        $("#humidity").html("Humidity: " + response.main.humidity + " %")
        $("#windSpeed").html("Wind Speed: " + response.wind.speed + " MPH")
        var latitude = response.coord.lat
        var longitude = response.coord.lon
        getUV (latitude,longitude)
    })
    
    function getUV (latitude,longitude){
    //   console.log(latitude)
    //   console.log(longitude)
     var ourQueryURL =  "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,daily&appid=98c6bb55a308a516a74756820c25e107"
     
      
     $.ajax({
        url: ourQueryURL,
        method: "GET"
    }).then(function(secondResponse){
        console.log(secondResponse)
        $("#UV").html("UV Index: " + secondResponse.current.uvi)
        
    })

}

function fiveDayForecast (){

}
$("#cities").append("<br>" + cities)


    
    


















})