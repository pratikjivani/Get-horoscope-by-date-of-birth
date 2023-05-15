'use strict'
const signs = ['ARI','TAU','GEM','CAN','LEO','VIR','LIB','SCO','SAG','CAP','AQU','PIS'];
let risingSignChart = {
    "6-8":{
        "ARI":"TAU",
        "TAU":"GEM",
        "GEM":"CAN",
        "CAN":"LEO",
        "LEO":"VIR",
        "VIR":"LIB",
        "LIB":"SCO",
        "SCO":"SAG",
        "SAG":"CAP",
        "CAP":"AQU",
        "AQU":"PIS",
        "PIS":"ARI"
        },
    "8-10":{
        "ARI":"GEM",
        "TAU":"CAN",
        "GEM":"LEO",
        "CAN":"VIR",
        "LEO":"LIB",
        "VIR":"SCO",
        "LIB":"SAG",
        "SCO":"CAP",
        "SAG":"AQU",
        "CAP":"PIS",
        "AQU":"ARI",
        "PIS":"TAU"
    },
    "10-12":{
        "ARI":"CAN",
        "TAU":"LEO",
        "GEM":"VIR",
        "CAN":"LIB",
        "LEO":"SCO",
        "VIR":"SAG",
        "LIB":"CAP",
        "SCO":"AQU",
        "SAG":"PIS",
        "CAP":"ARI",
        "AQU":"TAU",
        "PIS":"GEM"
    },
    "12-14":{
        "ARI":"LEO",
        "TAU":"VIR",
        "GEM":"LIB",
        "CAN":"SCO",
        "LEO":"SAG",
        "VIR":"CAP",
        "LIB":"AQU",
        "SCO":"PIS",
        "SAG":"ARI",
        "CAP":"TAU",
        "AQU":"GEM",
        "PIS":"CAN"
    },
    "14-16":{
        "ARI":"VIR",
        "TAU":"LIB",
        "GEM":"SCO",
        "CAN":"SAG",
        "LEO":"CAP",
        "VIR":"AQU",
        "LIB":"PIS",
        "SCO":"ARI",
        "SAG":"TAU",
        "CAP":"GEM",
        "AQU":"CAN",
        "PIS":"LEO"
    },
    "16-18":{
        "ARI":"LIB",
        "TAU":"SCO",
        "GEM":"SAG",
        "CAN":"CAP",
        "LEO":"AQU",
        "VIR":"PIS",
        "LIB":"ARI",
        "SCO":"TAU",
        "SAG":"GEM",
        "CAP":"CAN",
        "AQU":"LEO",
        "PIS":"VIR"
    },
    "18-20":{
        "ARI":"SCO",
        "TAU":"SAG",
        "GEM":"CAP",
        "CAN":"AQU",
        "LEO":"PIS",
        "VIR":"ARI",
        "LIB":"TAU",
        "SCO":"GEM",
        "SAG":"CAN",
        "CAP":"LEO",
        "AQU":"VIR",
        "PIS":"LIB"
    },
    "20-22":{
        "ARI":"SAG",
        "TAU":"CAP",
        "GEM":"AQU",
        "CAN":"PIS",
        "LEO":"ARI",
        "VIR":"TAU",
        "LIB":"GEM",
        "SCO":"CAN",
        "SAG":"LEO",
        "CAP":"VIR",
        "AQU":"LIB",
        "PIS":"SCO"
    },
    "22-0":{
        "ARI":"CAP",
        "TAU":"AQU",
        "GEM":"PIS",
        "CAN":"ARI",
        "LEO":"TAU",
        "VIR":"GEM",
        "LIB":"CAN",
        "SCO":"LEO",
        "SAG":"VIR",
        "CAP":"LIB",
        "AQU":"SCO",
        "PIS":"SAG"
    },
    "0-2":{
        "ARI":"AQU",
        "TAU":"PIS",
        "GEM":"ARI",
        "CAN":"TAU",
        "LEO":"GEM",
        "VIR":"CAN",
        "LIB":"LEO",
        "SCO":"VIR",
        "SAG":"LIB",
        "CAP":"SCO",
        "AQU":"SAG",
        "PIS":"CAP"
    },
    "2-4":{
        "ARI":"PIS",
        "TAU":"ARI",
        "GEM":"TAU",
        "CAN":"GEM",
        "LEO":"CAN",
        "VIR":"LEO",
        "LIB":"VIR",
        "SCO":"LIB",
        "SAG":"SCO",
        "CAP":"SAG",
        "AQU":"CAP",
        "PIS":"AQU"
    },
    "4-6":{
        "ARI":"ARI",
        "TAU":"TAU",
        "GEM":"GEM",
        "CAN":"CAN",
        "LEO":"LEO",
        "VIR":"VIR",
        "LIB":"LIB",
        "SCO":"SCO",
        "SAG":"SAG",
        "CAP":"CAP",
        "AQU":"AQU",
        "PIS":"PIS"
    }
};

$(document).ready(function(){
    $('#risingSunForm').validate({
        rules: {
            nameField: "required",
            PlacesDataList:"required",
            countryField:"required"
        },
        highlight: function (element) {
            $(element).css("border-color", "red");
            $(element).css("box-shadow", "0 0 0 0.2rem rgba(231, 76, 60,0.25)");
            $(element).closest(".error").css("color","red")
            
        },
        success: function(element){
            $(element).siblings(".form-control").removeAttr('style')
            $(element).addClass("d-none");
            if($(element).siblings(".errorDataList")){
                $("#errorDataList").addClass("d-none")
            }
        }
    });
    init();
});


let setEvents = ()=>{
    $("#risingSunForm").on('submit',handleSubmit);
    $("#countryField").on('change',(e) =>{setCities(e.target.value)});
    $("#closeButton").on('click', ()=>{
        var myModal = new bootstrap.Modal(document.getElementById('resultModal'))
        myModal.hide();
    })
}

let handleSubmit = (event)=>{
    event.preventDefault();
    let name = $("#nameField").val();
    let day = $("#DayField").val();
    let month =$("#MonthField").val();
    let year = $("#YearField").val();
    let hour = $("#HourField").val();
    let minute =  $("#MinuteField").val();
    let country = $("#countryField").val();
    let city = $("#PlacesDataList").val();
    
    let date = year+"-"+month+"-"+day
    if($("#risingSunForm").valid()){
        let zodiac = getZodiac(month+'-'+day);
        $('#zodiac').html(zodiac);
        getRisingSign(city, country,date,hour, minute, zodiac);
        // $("#RisingSign").html(risingSign);
    }
    
}
let setDate = () =>{
    const date = new Date();
    let year = parseInt(date.getFullYear());

    let options=`<option value='${year}'>${year}</option>`;
    for(const x of Array(100).keys()){
        year-=1;
        options += `<option value='${year}'>${year}</option>`;
    }
    $("#YearField").html(options);
}

let setCountries = () =>{
    $.ajax({url: "https://countriesnow.space/api/v0.1/countries/positions", success: function(result){
        let options = '<option value="">Please select your country</option>';
        result.data.forEach(element => {
            options += `<option id="${element.iso2}" value=${element.name}>${element.name}</option>`;
        });
        $("#countryField").html(options);
        $.get("https://ipinfo.io", function(response) {
            let element = $("#"+response.country);
            element.attr("selected","selected");
            setCities(element.val());
        }, "jsonp");
    }});
}

let setCities = (country) => {
    let cityOptions = '';
    let data = { country: country };
    $.post("https://countriesnow.space/api/v0.1/countries/cities",data,function(response){
        response.data.forEach(city=>{
            cityOptions+=`<option value=${city}>${city}</option>`;
        })
        $("#datalistOptions").html(cityOptions);
    });
}

let getRisingSign = (city, country,date,hour, minute, zodiac) => {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/geocoding?city=' + city,
        headers: { 'X-Api-Key': 'zF4CgGtnPM1GncMZA6I+uw==Ha69iB3ib7c1Xjc0'},
        contentType: 'application/json',
        success: function(result) {
             if(!result.length){
                $("#errorDataList").html("Please select the value from the list").removeClass("d-none")
                return
             }
             let lat = result[0].latitude;
             let lon = result[0].longitude;
             $.ajax({
                url:`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=${date}`,
                success: function (response){
                    let sunrise = response.results.sunrise;
                    console.log("Sunrise",sunrise)
                    let date = new Date();
                    let sunrise_hour = formatHour(sunrise);
                    console.log("Sunrise after format",sunrise_hour)
                    let offset = parseInt(date.getTimezoneOffset())/60;
                    console.log("Offset",offset)
                    sunrise_hour-=offset;
                    if (sunrise_hour >=24){
                        sunrise_hour-=24;
                    }
                    console.log("Sunrise after offset",sunrise_hour)
                    let timeslot;
                    if(sunrise_hour<=6){
                        hour-=3;
                    }
                    else if(sunrise_hour>6){
                        hour+=3
                    }

                    if(hour<0){
                        hour+=24;
                    }
                    
                    let time = parseInt(hour);
                    if(time>=6 && time<8){
                        timeslot = "6-8";
                    }
                    else if(time>=8 && time<10){
                        timeslot = "8-10"
                    }
                    else if(time>=10 && time<12){
                        timeslot ="10-12"
                    }
                    else if(time>=12 && time<14){
                        timeslot = "12-14";
                    }
                    else if(time>=14 && time<16){
                        timeslot = "14-16"
                    }
                    else if(time>=16 && time<18){
                        timeslot = "16-18"
                    }
                    else if(time>=18 && time<20){
                        timeslot ="18-20"
                    }
                    else if(time>=20 && time<22){
                        timeslot = "20-22"
                    }
                    else if(time>=22 && time<24){
                        timeslot = "22-0"
                    }
                    else if(time>=0 && time<2){
                        timeslot = "0-2"
                    }
                    else if(time>=2 && time<4){
                        timeslot = "2-4"
                    }
                    else if(time>=4 && time<6){
                        timeslot ="4-6"
                    }
                    let risingSign = risingSignChart[timeslot][zodiac];
                    let modalImage = `../assets/images/${signs.indexOf(risingSign)+1}.svg`;
                    let modalTitle = `<h3 class="modal-title text-center">Ascendant Sign</h5> <h4 class="text-center">${risingSign}</h4>`
                    let modalContent ="<img src='"+ modalImage + "'/>";
                    $("#modalTitle").html(modalTitle);
                    $("#modalBody").html(modalContent);
                    var myModal = new bootstrap.Modal(document.getElementById('resultModal'))
                    myModal.show();
                },
                error: (error)=>{
                    console.error("ERROR: ",error.responseText)
                }
             })
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
    
}
function getZodiac(date){
    var sign = Number(new Intl.DateTimeFormat('fr-TN-u-ca-persian', {month: 'numeric'}).format(new Date(date))) - 1;
    return signs[sign];
}

function formatHour(sunrise){
    var hours = Number(sunrise.match(/^(\d+)/)[1]);
    var minutes = Number(sunrise.match(/:(\d+)/)[1]);
    var AMPM = sunrise.match(/\s(.*)$/)[1];
    if(AMPM == "PM" && hours<12) hours = hours+12;
    if(AMPM == "AM" && hours==12) hours = hours-12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;

    return sHours;
}

function init(){
    setDate();
    setCountries();
    setEvents();
}
