let cinvname = document.getElementById("cin_vname");
let cinfname = document.getElementById("cin_fname");

let venue = null;
let users = [];

let checkinVenueSearchBarFunctionality = new BootstrapSearchBarListFunctionality("venueSearchBar","venueList",venueListElementListener,"https://cloudindividualprojectfa.azurewebsites.net/api/getVenues",(input,input2) => input ? "PartitionKey ge '" + input + "' and PartitionKey lt '" + input2 + "'": input, (value) => value.PartitionKey + ", " + value.RowKey);
let checkinUserSearchBarFunctionality = new BootstrapSearchBarListFunctionality("userSearchBar","userList",userListElementListener,"https://cloudindividualprojectfa.azurewebsites.net/api/getUsers",(input,input2) => input ? "(PartitionKey ge '" + input + "' and PartitionKey lt '" + input2 + "') or (Surname ge '" + input + "' and Surname lt '" + input2 + "')": input, (value) => value.Surname + ", " + value.PartitionKey + ", " + value.RowKey);

//If an element of the bootstrap venue list is clicked, replace the current selected venue with the clicked venue
function venueListElementListener(e,obj) {
    cinvname.value = obj.PartitionKey;
    venue = obj;
}

//If an element of the bootstrap user list is clicked, add the user to the array of selected users and to the output bootstrap list.
//If the selected user is already in the output list, do nothing
function userListElementListener(e,obj) {
    if(getIndexOfUser(obj) === -1) {
        let a = BootstrapSearchBarListFunctionality.createBootstrapListElement(obj.Surname + " " + obj.PartitionKey);
        cinfname.append(a);
        users.push(obj);
        a.addEventListener("click",(e => {cinfname.removeChild(a); removeUser(obj)}));
    }
}

//This function will clear the input boxes and clear all data stored about the selected inputs.
//In other words, it wipes the users selection clean.
function emptyCheckInValues() {
    cinvname.value = "";
    cinfname.innerHTML = "";
    venue = null;
    users = [];
}

//Removes a user from the array of selected users
function removeUser(obj) {
    let i = getIndexOfUser(obj);
    if(i > -1){users.splice(i,1);}
}

//Returns the index of a specified user in the selected user array
//If the user is not in the array,, returns -1
function getIndexOfUser(obj){
    for(let i = 0; i < users.length; i++){
        let user = users[i];
        if(user.PartitionKey === obj.PartitionKey && user.Surname === obj.Surname && user.RowKey === obj.RowKey){
            return i;
        }
    }
    return -1;
}

//This function is called when the submit button is pressed.
//Attempts to submit the user selected data to the CheckIn table on azure.
//An error message will be returns if no venue or users are selected.
function submitCheckIn() {
    if(venue === null){
        addErrorMessageAlertToCheckInSection("The form cannot be submitted unless you select a venue!")
    }
    else if(users.length === 0){
        addErrorMessageAlertToCheckInSection("The form cannot be submitted unless you select at least 1 user!")
    }
    else{
        for(let i = 0; i < users.length; i++){
            submitUserForCheckIn(users[i]);
        }
        emptyCheckInValues();
    }
}

//Given a user (user), attempts to check them in to the specified venue
function submitUserForCheckIn(user) {
    let pkey = user.Surname + "_" + user.RowKey;
    let rkey = document.getElementById("checkinDatePicker").value;
    let fname = user.PartitionKey;
    let vname = venue.PartitionKey

    fetch('https://cloudindividualprojectfa.azurewebsites.net/api/addNewCheckIn', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            pkey: pkey,
            rkey: rkey,
            fname: fname,
            vname: vname
        })
    }).then((res) => res.status===200 ? () => addSuccessMessageAlertToCheckInSection("Form Submitted!") : addErrorMessageAlertToCheckInSection("Error submitting form"))
}

//Displays an error message on the check in section screen with the given message
function addErrorMessageAlertToCheckInSection(msg) {
    document.getElementById("checkinAlertDiv").innerHTML = '<div class="alert alert-danger alert-dismissible padding" role="alert">' +
        msg +
        '</div>';
}

//Displays a success message on the check in section screen with the given message
function addSuccessMessageAlertToCheckInSection(msg) {
    document.getElementById("checkinAlertDiv").innerHTML = '<div class="alert alert-success alert-dismissible padding" role="alert">' +
        msg +
        '</div>';
}
