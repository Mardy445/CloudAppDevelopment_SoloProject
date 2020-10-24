document.getElementById('inputNewUser').addEventListener('submit', submitNewUser);
document.getElementById('inputNewVenue').addEventListener('submit', submitNewVenue);

function processResponse(response) {
    console.log(response.errorCode)
}

function submitNewUser(e) {
    e.preventDefault();
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
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
    }).then((res) => processResponse(res))
}

function submitNewVenue(e) {
    e.preventDefault();

    let vname = document.getElementById('vname').value;
    let postcode = document.getElementById('postcode').value;
    let address = document.getElementById('address').value;
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
    }).then((res) => processResponse(res))
}