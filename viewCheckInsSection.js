let viewDataTable = document.getElementById("viewdata_table");
let viewDataTableColumns = document.getElementById("viewdata_table_columns")

let viewDataSearchBarFunctionality = new BootstrapSearchBarListFunctionality('venueDataSearchBar','userDataSearchBar','see_venue_data_list','see_user_data_list',venueDataListElementListener,userDataListElementListener);

function venueDataListElementListener(e,obj) {
    viewDataTableColumns.innerHTML = ""
}

function userDataListElementListener(e,obj) {
    viewDataTableColumns.innerHTML = ""
}