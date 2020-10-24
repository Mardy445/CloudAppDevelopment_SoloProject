class BootstrapSearchBarListFunctionality {
    constructor(searchBar, ul, listElementListener, url, queryFunction, stringFormatterFunction) {
        this.searchBar = document.getElementById(searchBar);
        this.ul = document.getElementById(ul);
        this.listElementListener = listElementListener;
        this.url = url;
        this.queryFunction = queryFunction;
        this.sff = stringFormatterFunction;

        this.searchBar.addEventListener('input',this.refreshSearch);
    }

    //This function will take the value from the venueSearchBar, convert it into a query, and pass it to the request for data function
    refreshSearch() {
        let input = this.searchBar.value;
        let input2 = input.slice(0,-1) + String.fromCharCode(input.charCodeAt(input.length-1)+1);
        let query = this.queryFunction(input,input2);
        this.sendRequestForData(query,this.url)
    }

    //Given an array of objects (data), take each object and convert it into a bootstrap list element
    //Each element is given an event listener and then appended to the venue list.
    fillList(data) {
        this.ul.innerHTML = "";
        for(let i = 0; i < data.length; i++){
            let value = data[i];
            let a = BootstrapSearchBarListFunctionality.createBootstrapListElement(this.sff(value));
            a.addEventListener("click",(e => this.listElementListener(e,value)));
            this.ul.append(a);
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
    sendRequestForData(query, url) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
            })
        }).then((res) => res.json().then((data) => this.fillList(data)))
    }
}