let viewDataTable = document.getElementById("viewdata_table");
let viewDataTableColumns = document.getElementById("viewdata_table_columns")

//let viewDataSearchBarFunctionality = new BootstrapSearchBarListFunctionality('venueDataSearchBar','userDataSearchBar','see_venue_data_list','see_user_data_list',venueDataListElementListener,userDataListElementListener);
let viewDataVenuesSearchBarFunctionality = new BootstrapSearchBarListFunctionality("venueDataSearchBar", "see_venue_data_list",venueDataListElementListener,"https://cloudindividualprojectfa.azurewebsites.net/api/getVenues",(input,input2) => input ? "PartitionKey ge '" + input + "' and PartitionKey lt '" + input2 + "'": input, (value) => value.PartitionKey + ", " + value.RowKey);
let viewDataUsersSearchBarFunctionality = new BootstrapSearchBarListFunctionality("userDataSearchBar","see_user_data_list",userDataListElementListener,"https://cloudindividualprojectfa.azurewebsites.net/api/getUsers",(input,input2) => input ? "(PartitionKey ge '" + input + "' and PartitionKey lt '" + input2 + "') or (Surname ge '" + input + "' and Surname lt '" + input2 + "')": input, (value) => value.Surname + ", " + value.PartitionKey + ", " + value.RowKey);


function venueDataListElementListener(e,obj) {
    viewDataTableColumns.innerHTML = "<th scope=\"col\">Venue</th>\n<th scope=\"col\">Datetime</th>"
    sendRequestForData("VenueName eq '" + obj.PartitionKey + "'", "https://cloudindividualprojectfa.azurewebsites.net/api/getVisitorDataForVenue", filTable)
}

function userDataListElementListener(e,obj) {
    viewDataTableColumns.innerHTML = "<th scope=\"col\">User</th>\n<th scope=\"col\">Datetime</th>"
    sendRequestForData("PartitionKey eq '" + obj.Surname + "_" + obj.RowKey + "'", "https://cloudindividualprojectfa.azurewebsites.net/api/getCheckInDataForUser", filTable)

}

function filTable(data){
    viewDataTable.innerHTML = "";
    for(let i = 0; i < data.length; i++){
        let element = data[i];
        let row = viewDataTable.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = element.r1;
        cell2.innerHTML = element.r2;
    }
}