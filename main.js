

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