document.getElementById('inputNewUser').addEventListener('submit', submitNewUser);
document.getElementById('inputNewVenue').addEventListener('submit', submitNewVenue);

let addUserAlerter = new ErrorMessageFunctionality("addUserAlertDiv");
let addVenueAlerter = new ErrorMessageFunctionality("addVenueAlertDiv");

//When the submit button is pressed...
//Attempts to submit the data for a new user to Azure
function submitNewUser(e) {
    e.preventDefault();
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    if(fname === "" || lname === "" || email === ""){
        addUserAlerter.alertError("All fields are required")
    }
    else {
        fetch('https://cloudindividualprojectfa.azurewebsites.net/api/InsertNewUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                fname: fname,
                lname: lname,
                email: email
            })
        }).then((res) => res.status === 200 ? addUserAlerter.alertSuccess("Successfully added user") : addUserAlerter.alertError("ERROR: Failed to add user (" + res.status + ")"))
    }
}

//When the submit button is pressed...
//Attempts to submit the data for a new venue to Azure
function submitNewVenue(e) {
    e.preventDefault();

    let vname = document.getElementById('vname').value;
    let postcode = document.getElementById('postcode').value;
    let address = document.getElementById('address').value
    if(vname === "" || postcode === "" || address === ""){
        addVenueAlerter.alertError("All fields are required")
    }
    else {
        fetch('https://cloudindividualprojectfa.azurewebsites.net/api/InsertNewVenue', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                vname: vname,
                postcode: postcode,
                address: address
            })
        }).then((res) => res.status === 200 ? addVenueAlerter.alertSuccess("Successfully added venue") : addVenueAlerter.alertError("ERROR: Failed to add venue (" + res.status + ")"))
    }
}