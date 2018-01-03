// Load functions that populate html when widnow loads
window.onload =  function(){
    fetchDays();
    totalHours();
    totalMade()
};

// listen for form submit on todays haul button
document.getElementById('myForm').addEventListener('submit', saveDay);

// list for deleteWeek submit
document.getElementById('weekDelete').addEventListener('submit', deleteWeek);


// save day
function saveDay(p){
    // get form values
    var e = document.getElementById('day'); 
    var currentDay = e.options[e.selectedIndex].value;
    var hours = document.getElementById('hour').value;
    var made = document.getElementById('made').value;
    var notes = document.getElementById('notes').value;

    if (!validateForm(currentDay,made)){
        return false;
    }

    // variable to submit to local storage
    var day = {
        day: currentDay,
        hours: hours,
        made: made,
        notes: notes
    }
    console.log(day)

    // Tests for days
    if(localStorage.getItem('days') === null){
        // Init days array for storage
        var days = [];
        // adds day to array
        days.push(day);
        // set to local storage
        localStorage.setItem('days', JSON.stringify(days));
    } else{
        // get days from local storage
        var days = JSON.parse(localStorage.getItem('days'));
        // Add day to array
        days.push(day);
        // reset back to local storage
        localStorage.setItem('days', JSON.stringify(days));

    }

    // Clear form
    document.getElementById('myForm').reset();

    // Re-fetch days
    fetchDays();

    // Get Total hours
    totalHours();
    // Get total made
    totalMade();
    // prevents form from submitting
    p.preventDefault();
}


// Delete Day
function deleteDay(day){
    console.log(day);
    // get days from local storage
    var days = JSON.parse(localStorage.getItem('days'));
    // Loop through days
    for(var i = 0; i < days.length; i++){
        if(days[i].day == day){
            // remove day from array
            days.splice(i, 1);
        }
    }
    // reset back to local storage
    localStorage.setItem('days', JSON.stringify(days));

    // Re-fetch days
    fetchDays();
}


// Deletes entire week and clears local storage
function deleteWeek(){
    console.log('delete');
    // Clears local storage
    localStorage.clear();
    // Refetches days
    fetchDays();
}


// produces weekly hour total
function totalHours(){
    // Get week total output id
    var hourTotal = document.getElementById('hourTotal') ;
    // get days from local storage
    var days = JSON.parse(localStorage.getItem('days'));
    var sumHours = 0;

    days.forEach(function(ele){
        sumHours+=Number(ele.hours)
       })

    console.log(sumHours);

    
    hourTotal.innerHTML = '<p class="mb-1">.:: TOTOAL HOURS ::.</p>' +
                           '<span class="mb-3 text-info">' + sumHours + '</span>' +
                           '<br>';
       

}


// produces weekly hour total
function totalMade(){
    // Get week total output id
    var cashTotal = document.getElementById('cashTotal') ;
    // get days from local storage
    var days = JSON.parse(localStorage.getItem('days'));
    var sumCash = 0;

    days.forEach(function(ele){
        sumCash+=Number(ele.made)
       })

    console.log(sumCash);

    
    cashTotal.innerHTML = '<p class="mb-1">.:: TOTAL MADE ::.</p>' +
                           '<p class="mb-3 text-info">' + sumCash + '</p>';
}


// Fetch days
function fetchDays(){
    // get days from local storage
    var days = JSON.parse(localStorage.getItem('days'));
    // Get days output id
    var daysResults = document.getElementById('daysResults');

    // Build the output
    daysResults.innerHTML = '';

    for(var i = 0; i < days.length; i++){
        var day = days[i].day;
        var hours = days[i].hours;
        var made = days[i].made;
        var notes = days[i].notes;

        daysResults.innerHTML += '<div href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +
        '<div class="d-flex w-100 justify-content-between">' +
        '<h5 class="mb-1">' + day + '</h5>' +
        '</div>' +
        '<p class="mb-1 text-info font-weight-light">Hours :: ' + hours + '</p>' +
        '<p class="mb-1 text-info font-weight-light">Cash :: ' + made + '</p>' +
        '<p class="text-muted font-weight-light">' + notes + '</p>' +
        ' <p><a onclick="deleteDay(\''+ day +'\')" class="btn btn-outline-danger btn-sm" href="#">Delete</a></p> ' +
        '</div>';
    }
}

// validate form
function validateForm(currentDay, made){
    if(!currentDay || !made){
        alert('Please fill in the day and how much you made!');
        return false;
    }
    return true;
}