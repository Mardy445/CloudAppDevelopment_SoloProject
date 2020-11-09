document.getElementById('inputNewUser').addEventListener('submit', submitNewUser);
document.getElementById('inputNewVenue').addEventListener('submit', submitNewVenue);

let addUserAlerter = new ErrorMessageFunctionality("addUserAlertDiv");
let addVenueAlerter = new ErrorMessageFunctionality("addVenueAlertDiv");

function refreshUserInputs(){
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('email').value = "";
}

function refreshVenueInputs(){
    document.getElementById('vname').value = "";
    document.getElementById('postcode').value = "";
    document.getElementById('address').value = "";
}


//When the submit button is pressed...
//Attempts to submit the data for a new user to Azure
function submitNewUser(e) {
    e.preventDefault();
    let fname = document.getElementById('fname').value.toUpperCase();
    let lname = document.getElementById('lname').value.toUpperCase();
    let email = document.getElementById('email').value.toUpperCase();
    if(fname === "" || lname === "" || email === ""){
        addUserAlerter.alertError("All fields are required")
    }
    else {

        sendRequestForData('https://cloudindividualprojectfa.azurewebsites.net/api/InsertNewUser',
            (res) => res.status === 200 ? addUserAlerter.alertSuccess("Successfully added user") : res.status === 400 ? addUserAlerter.alertError("That is not a valid email address") : addUserAlerter.alertError("Failed to add user (" + res.status + ")"),
            JSON.stringify({
                fname: fname,
                lname: lname,
                email: email
            }), false)
    }

    refreshUserInputs();
}

//When the submit button is pressed...
//Attempts to submit the data for a new venue to Azure
function submitNewVenue(e) {
    e.preventDefault();

    let vname = document.getElementById('vname').value.toUpperCase();
    let postcode = document.getElementById('postcode').value.toUpperCase();
    let address = document.getElementById('address').value.toUpperCase();
    if(vname === "" || postcode === "" || address === ""){
        addVenueAlerter.alertError("All fields are required")
    }
    else {
        sendRequestForData('https://cloudindividualprojectfa.azurewebsites.net/api/InsertNewVenue',
            (res) => res.status === 200 ? addUserAlerter.alertSuccess("Successfully added venue") : res.status === 400 ? addUserAlerter.alertError("That is not a valid UK Postcode") : addUserAlerter.alertError("Failed to add venue (" + res.status + ")"),
            JSON.stringify({
                vname: vname,
                postcode: postcode,
                address: address
            }), false)
    }
    refreshVenueInputs();
}