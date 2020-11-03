let viewAlertsTable = document.getElementById("viewAlertsTable");

//This function begins the sequence of steps required to get all users that need to self isolate
//It will simply request for the data on all "Alerts" and will then call upon the "getVenuesAlertsVisited" function
function getAlerts() {
    sendRequestForData("", "https://cloudindividualprojectfa.azurewebsites.net/api/getAlerts",getVenuesAlertsVisited)
}

//This function is given data on all the "Alerts" (IE People who have been reported to have Covid-19
//Given the data it will construct a query for the "CheckIns" table
//The query will return data on all venues that any "Alerts" visited in the last 14 days, and will return the datetime that they visited said venues
//This data is passed onto the next function in the sequence "givenVenuesGetUsersWhoNeedToSelfIsolate"
function getVenuesAlertsVisited(data) {
    let query = "";
    for(let a = 0; a < data.length; a++){
        let alert = data[a];
        let id = alert.PartitionKey;
        let alertDateTime = convertISODateTimeToDateObject(alert.RowKey);
        let alertDateTimeFortnightAgo = new Date(alertDateTime.setDate(alertDateTime.getDate()-14));

        query = query !== "" ? query + " or " : query;
        query = query + "(PartitionKey eq '" + id + "' and RowKey gt '" + alertDateTimeFortnightAgo.toISOString() + "')";
    }
    sendRequestForData(query,"https://cloudindividualprojectfa.azurewebsites.net/api/getCheckInDataForUser", givenVenuesGetUsersWhoNeedToSelfIsolate)

}

//Given data on the venues that all "Alerts" visited in the last 14 days, this function create a query that will get all users that were in the venue on the same day.
//These users will then be passed onto the final function that will put the appropriate data into the table.
function givenVenuesGetUsersWhoNeedToSelfIsolate(data) {
    let query = "";
    for(let b = 0; b < data.length; b++) {
        let venueData = data[b];
        let venueName = venueData.r1;
        let checkInDateTime = convertISODateTimeToDateObject(venueData.r2);
        let checkInDateTimeLowerBound = new Date(checkInDateTime.setHours(0,0,0,0));
        let checkInDateTimeUpperBound = new Date(checkInDateTime.setHours(23,59,59,999));

        query = query !== "" ? query + " or " : query;
        query = query + "(VenueName eq '" + venueName + "' and RowKey gt '" + checkInDateTimeLowerBound.toISOString() + "' and RowKey lt '" + checkInDateTimeUpperBound.toISOString() + "')";
    }
    sendRequestForData(query, "https://cloudindividualprojectfa.azurewebsites.net/api/getUsersWhoNeedToSelfIsolate", addSelfIsolateUserToTable)

}

//This function takes an ISODateTime string and converts it into a Date object.
//I decided not to use the parse method in the Date object as it is known to be unstable in certain browsers.
function convertISODateTimeToDateObject(isoDateTime){
    let splitdt = isoDateTime.replace("T","-").replace(":","-").split("-").map(x=>+x);
    return new Date(splitdt[0],splitdt[1]-1,splitdt[2],splitdt[3],splitdt[4]);
}

//This function will place the users who need to self isolate to the table.
//To avoid duplicate users, a Map is created that assigns each user to one value (where that value is the number of days since they came into contact with an "Alert")
function addSelfIsolateUserToTable(data) {
    let map = getMapOfSelfIsolatingUsersLastExposure(data);

    viewAlertsTable.innerHTML="";
    for(let id of map.keys()){
        let row = viewAlertsTable.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = id;
        cell2.innerHTML = "";
        cell3.innerHTML = map.get(id);
    }
}

//This function constructs a Map to assign each exposed user to the value that represents the SMALLEST number of days since they came into contact.
//EG if they came into contact with a Covid host 7 days ago and 3 days ago, they will be assigned the value 3
function getMapOfSelfIsolatingUsersLastExposure(data) {
    let map = new Map();
    for(let i = 0; i < data.length; i++){
        let element = data[i];
        let id = element.PartitionKey;
        let checkInDateTime = convertISODateTimeToDateObject(element.RowKey);
        let daysSinceExposure = (Math.floor((new Date().getTime() - checkInDateTime.getTime())/86400000));
        if(map.has(id)){
            map.set(id, daysSinceExposure < map.get(id) ? daysSinceExposure : map.get(id));

        }
        else{
            map.set(id,daysSinceExposure);
        }
    }
    return map;
}