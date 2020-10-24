

document.getElementById('checkinTab').addEventListener('click', checkinTabClicked);

function checkinTabClicked() {
    emptyCheckInValues();
    checkinSearchBarFunctionality.refreshVenueSearch();
    checkinSearchBarFunctionality.refreshUserSearch();
}