//This is the main file
//This file contains event listeners for elements relating to the navbar
//It also will contain any functions that are useful for multiple other files

//Each tab is given an event listener which will activate upon click
document.getElementById('alertsTab').addEventListener('click', alertsTabClicked);
document.getElementById('reportTab').addEventListener('click', reportTabClicked);
document.getElementById('addTab').addEventListener('click', addTabClicked);
document.getElementById('checkinTab').addEventListener('click', checkinTabClicked);
document.getElementById('viewTab').addEventListener('click', viewCheckInTabClicked);

alertsTabClicked();

/*
Each of the following function is called when its respective tab is pressed
 */
function alertsTabClicked() {
    getAlerts();
}

function checkinTabClicked() {
    emptyCheckInValues();
    checkinVenueSearchBarFunctionality.refreshSearch();
    checkinUserSearchBarFunctionality.refreshSearch();
    document.getElementById("checkinTimePicker").value = getCurrentTime();
}

function viewCheckInTabClicked() {
    clearTable();
    viewDataVenuesSearchBarFunctionality.refreshSearch();
    viewDataUsersSearchBarFunctionality.refreshSearch();
}

function reportTabClicked() {
    reportSearchBarFunctionality.refreshSearch();
    document.getElementById("reportTimePicker").value = getCurrentTime();
}

function getCurrentTime() {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    return hours + ":" + minutes
}

function addTabClicked(){
    refreshUserInputs();
    refreshVenueInputs();
}

//This function is used to call upon Azure API functions
//It exists in main.js as every other file may need to use it
function sendRequestToAzure(url, response, body, expectResult) {
    console.log("testtt")
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: body
    }).then((res) => {
        if(res.status === 200 && expectResult){
            res.json().then((data) => response(data))
        }
        else{
            response(res)
        }
    })
}