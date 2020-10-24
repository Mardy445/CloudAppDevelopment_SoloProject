class BootstrapSearchBarListFunctionality {
    constructor(venueSearchBar, userSearchBar, ulvenue, uluser, venueListElementListener, userListElementListener) {
        this.venueSearchBar = document.getElementById(venueSearchBar);
        this.userSearchBar = document.getElementById(userSearchBar);
        this.ulvenue = document.getElementById(ulvenue);
        this.uluser = document.getElementById(uluser);
        this.venueListElementListener = venueListElementListener;
        this.userListElementListener = userListElementListener;

        this.venueSearchBar.addEventListener('input',this.refreshVenueSearch);
        this.userSearchBar.addEventListener('input',this.refreshUserSearch);
    }

    //This function will take the value from the venueSearchBar, convert it into a query, and pass it to the request for data function
    refreshVenueSearch() {
        let input = this.venueSearchBar.value;
        let input2 = input.slice(0,-1) + String.fromCharCode(input.charCodeAt(input.length-1)+1);
        let query = input ? "PartitionKey ge '" + input + "' and PartitionKey lt '" + input2 + "'": input;
        this.sendRequestForData(query,"https://cloudindividualprojectfa.azurewebsites.net/api/getVenues",true)
    }

    //This function will take the value from the userSearchBar, convert it into a query, and pass it to the request for data function
    refreshUserSearch() {
        let input = this.userSearchBar.value;
        let input2 = input.slice(0,-1) + String.fromCharCode(input.charCodeAt(input.length-1)+1);
        let query = input ? "(PartitionKey ge '" + input + "' and PartitionKey lt '" + input2 + "') or (Surname ge '" + input + "' and Surname lt '" + input2 + "')": input;
        this.sendRequestForData(query,"https://cloudindividualprojectfa.azurewebsites.net/api/getUsers",false)
    }

    //Given an array of objects (data), take each object and convert it into a bootstrap list element
    //Each element is given an event listener and then appended to the venue list.
    fillVenueList(data) {
        this.ulvenue.innerHTML = "";
        for(let i = 0; i < data.length; i++){
            let value = data[i];
            let a = BootstrapSearchBarListFunctionality.createBootstrapListElement(value.PartitionKey + ", " + value.RowKey);
            a.addEventListener("click",(e => this.venueListElementListener(e,value)));
            this.ulvenue.append(a);
        }
    }

    //Given an array of objects (data), take each object and convert it into a bootstrap list element
    //Each element is given an event listener and then appended to the user list.
    fillUserList(data) {
        this.uluser.innerHTML = "";
        for(let i = 0; i < data.length; i++){
            let value = data[i];
            let a = BootstrapSearchBarListFunctionality.createBootstrapListElement(value.Surname + ", " + value.PartitionKey + ", " + value.RowKey);
            a.addEventListener("click",(e => this.userListElementListener(e,value)));
            this.uluser.append(a);
        }
    }

    //Given a string, returns a new bootstrap list element with that text
    static createBootstrapListElement(string) {
        let a = document.createElement("a");
        a.className = "list-group-item list-group-item-action";
        a.href = "#";
        a.appendChild(document.createTextNode(string));
        return a;
    }

    //Requests data from (url) with the (query)
    //A (responseFunc) is also passed to be called upon completion of the fetch promise
    sendRequestForData(query, url, responseFuncId) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
            })
        }).then((res) => res.json().then((data) => responseFuncId ? this.fillVenueList(data) : this.fillUserList(data)))
    }
}