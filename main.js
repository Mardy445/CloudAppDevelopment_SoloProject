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
}

function viewCheckInTabClicked() {
    viewDataVenuesSearchBarFunctionality.refreshSearch();
    viewDataUsersSearchBarFunctionality.refreshSearch();
}

function reportTabClicked() {
    reportSearchBarFunctionality.refreshSearch();
}

function addTabClicked(){

}

//This function is used to call upon Azure API functions
//It exists in main.js as every other file may need to use it
function sendRequestForData(query, url, response) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            query: query,
        })
    }).then((res) => res.json().then((data) => response(data)))
}