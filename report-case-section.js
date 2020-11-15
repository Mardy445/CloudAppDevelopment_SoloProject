//selectedUserForReporting will hold the object representing the currently selected user
let selectedUserForReporting = null;
let reportCaseAlerter = new ErrorMessageFunctionality("reportCaseAlertDiv");
document.getElementById("reportCaseForm").addEventListener("submit",submitReportedCase);

//An instance of BootsrapSearchBarListFunctionality to link a search bar to a Bootstrap list
let reportSearchBarFunctionality = new BootstrapSearchBarListFunctionality("reportCaseSearchBar","reportCaseUserList",userSelectedForReportingCase,"https://cloudindividualprojectfa.azurewebsites.net/api/getUsers",(input,input2) => input ? "(PartitionKey ge '" + input + "' and PartitionKey lt '" + input2 + "') or (Surname ge '" + input + "' and Surname lt '" + input2 + "')": input, (value) => value.Surname + ", " + value.PartitionKey + ", " + value.RowKey.toLowerCase());

//When a user is clicked in the Bootstrap list...
//Sets the visual output box to be said user, and set the selectedUserForReporting value to also be this user
function userSelectedForReportingCase(e,obj){
    document.getElementById("reportUserFinalInput").value = obj.Surname + " " + obj.PartitionKey;
    selectedUserForReporting = obj
}

//When the submit button is pressed...
//Attempts to send the alert to the Azure function addAlert
//Will not send if no user selected
function submitReportedCase(e) {
    let reportDate = document.getElementById("reportDatePicker").value;
    let reportTime = document.getElementById("reportTimePicker").value;
    let rkey = reportDate + "T" + reportTime;

    if(selectedUserForReporting===null){
        reportCaseAlerter.alertError("Please selected a user");
    }
    else if(reportDate === "" || reportTime=== ""){
        reportCaseAlerter.alertError("Please select a date and time")
    }
    else if(rkey > new Date().toISOString()){
        reportCaseAlerter.alertError("Cannot select date in the future")
    }
    else {
        document.getElementById("reportUserFinalInput").value = "";

        let pkey = selectedUserForReporting.Surname + "_" + selectedUserForReporting.RowKey;

        sendRequestToAzure('https://cloudindividualprojectfa.azurewebsites.net/api/addAlert',
            (res) => res.status === 200 ? reportCaseAlerter.alertSuccess("Successfully added alert") : reportCaseAlerter.alertError("ERROR: Failed to add alert (" + res.status + ")"),
            JSON.stringify({
                pkey: pkey,
                rkey: rkey
            }), false);

        selectedUserForReporting = null;
        document.getElementById("reportDatePicker").value = "";
        document.getElementById("reportTimePicker").value = "";
    }
}