

document.getElementById('checkinTab').addEventListener('click', checkinTabClicked);
document.getElementById('viewTab').addEventListener('click', viewCheckInTabClicked);

function checkinTabClicked() {
    emptyCheckInValues();
    checkinVenueSearchBarFunctionality.refreshSearch();
    checkinUserSearchBarFunctionality.refreshSearch();
}

function viewCheckInTabClicked() {
    viewDataVenuesSearchBarFunctionality.refreshSearch();
    viewDataUsersSearchBarFunctionality.refreshSearch();
}

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