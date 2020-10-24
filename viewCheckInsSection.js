let viewDataTable = document.getElementById("viewdata_table");
let viewDataTableColumns = document.getElementById("viewdata_table_columns")

//let viewDataSearchBarFunctionality = new BootstrapSearchBarListFunctionality('venueDataSearchBar','userDataSearchBar','see_venue_data_list','see_user_data_list',venueDataListElementListener,userDataListElementListener);
let viewDataVenuesSearchBarFunctionality = new BootstrapSearchBarListFunctionality('venueDataSearchBar', 'see_venue_data_list',venueDataListElementListener,"https://cloudindividualprojectfa.azurewebsites.net/api/getVenues",(input,input2) => input ? "PartitionKey ge '" + input + "' and PartitionKey lt '" + input2 + "'": input, (value) => value.PartitionKey + ", " + value.RowKey);
let viewDataUsersSearchBarFunctionality = new BootstrapSearchBarListFunctionality('userDataSearchBar','see_user_data_list',userDataListElementListener,"https://cloudindividualprojectfa.azurewebsites.net/api/getUsers",(input,input2) => input ? "(PartitionKey ge '" + input + "' and PartitionKey lt '" + input2 + "') or (Surname ge '" + input + "' and Surname lt '" + input2 + "')": input, (value) => value.Surname + ", " + value.PartitionKey + ", " + value.RowKey);


function venueDataListElementListener(e,obj) {
    viewDataTableColumns.innerHTML = ""
}

function userDataListElementListener(e,obj) {
    viewDataTableColumns.innerHTML = ""
}