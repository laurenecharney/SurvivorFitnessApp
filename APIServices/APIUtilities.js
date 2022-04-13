import { getItem } from "./deviceStorage";
import {ENDPOINT} from './developerEndpoint.js';
import { InteractionManager } from "react-native";

export async function getMeasurements(participantID, sessionID) {
  const jwt = await getItem();

  const res = await fetch(ENDPOINT + "/api/v1/participants/" + participantID + "/all-notes", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json());
  let i = 0;
  while(res.trainerSessions[i]) {
    if(res.trainerSessions[i].sessionIndexNumber == sessionID) {
      let ret =  res.trainerSessions[i].measurements ?  res.trainerSessions[i].measurements : {};
    }
    ++i;
  }
  return ret;
}

export async function createUser(user){
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/users/", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json" // I added this line
    }
  })
    .then(response => response.json());
  return res;
}

//change password functionality (response will be success or error)
export async function changePassword(id, currentPassword, newPassword){
  const passwordInfo = {
    "currentPassword": currentPassword,
    "newPassword": newPassword
  }
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/users/" + id + "/change_password", {
    method: "POST",
    body: JSON.stringify(passwordInfo),
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json" // I added this line
    }
  })
  //.then(response => response.json());
  return res;
}

export async function resetPassword(_email) {
  const jwt = await getItem();
  const url = ENDPOINT + "/api/v1/users/request_password_reset?email=" + _email;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json" // I added this line
    }
  })
   // .then(response => response.json());
  return res;
}

//gets participants with optional query params passed in
export async function exportData() {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/export-data", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json" // I added this line
    }
  })
    //.then(res => res.json());
  return res
} // ,

//Update profile information
export async function updateProfile(_user, id) {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/users/" + id, {
    method: "PUT",
    body: JSON.stringify(_user),
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json" 
    }
  })
    .then(response => response.json());
    return res
}

export async function logTrainerSession(curSessionInfo, date) {
  const newSessionInfo = {
    "id": curSessionInfo.id,
    "initialLogDate": date,
    "specialistNotes": curSessionInfo.specialistNotes,
    "adminNotes": curSessionInfo.adminNotes,
    "sessionIndexNumber": curSessionInfo.sessionIndexNumber,
    "whoseNotes": "TRAINER",
    "participantId": curSessionInfo.participantId,
    "measurements": curSessionInfo.measurements
}
const res = await updateSession(newSessionInfo.id, newSessionInfo);
return res;
}

export async function updateSingleMeasurement(measurementInfo) {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/measurements/" + measurementInfo.id, {
    method: "PUT",
    body: JSON.stringify(measurementInfo),
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json" 
    }
  })
    .then(response => response.json());
    return res
}

async function updateSession(sessionID, sessionInfo) {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/sessions/"+sessionID, {
    method: "PUT",
    body: JSON.stringify(sessionInfo),
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json());
  return res.session;
}

//gets participants with optional query params passed in
export async function getParticipants(paramName, paramValue) {
  const jwt = await getItem();
  const query =
    paramName && paramValue ? "?" + paramName + "=" + paramValue : "";

  const res = await fetch(ENDPOINT + "/api/v1/participants" + query, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json());
  return res && res.participants ? res.participants : [];
} // ,

// transform back-end participant to front-end participant object
export function formatParticipants(rawParticipants) {
  let i = 0;
  let formattedParticipants = rawParticipants.map(item => {
    
    let tempItem = assignValue(item);
    tempItem = assignKey(tempItem);
    tempItem = assignSpecialists(tempItem);
    tempItem.gym = item.trainerLocation.name ? item.trainerLocation.name : "unassigned";
    tempItem.trainer = item.trainer ? item.trainer : "unassigned";
    tempItem.nutritionist = item.nutritionist ? item.nutritionist : "unassigned";
    tempItem.office = item.dietitianLocation.name ? item.dietitianLocation.name : "unassigned";
    // tempItem.trainer = item.trainer ? item.trainer.firstName + " " + item.trainer.lastName : '';
    if (i == 0) {
      i++; 
      console.log(tempItem)
    }
    return tempItem;
  })
  // console.log(formattedParticipants);
  return formattedParticipants;
}

// helper method for transforming back-end object to front-end object
export function assignValue(item) {
  if (item.firstName && item.lastName) {
    item.value = item.firstName + " " + item.lastName;
  } else {
    item.value = ""
  }
  return item
}

// helper method for transforming back-end object to front-end object
export function assignKey(item) {
  item.key = parseInt(item.id);
  return item
}

// helper method for transforming back-end object to front-end object
export function assignSpecialists(item) {
  if (item.trainer) {
    item.trainer = item.trainer.firstName + " " + item.trainer.lastName;
  } else {
    item.trainer = "";
  }
  if (item.dietitian) {
    item.nutritionist = item.dietitian.firstName + " " + item.dietitian.lastName;
  } else {
    item.nutritionist = "";
  }
  return item
}

//gets participant by id
export async function getParticipantByID(id) {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/participants/id", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json());
  return res.participant;
}

export async function updateParticipant(__participant, id) {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/participants/" + id, {
    method: "PUT",
    body: JSON.stringify(__participant),
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json());
  return res.session;
}

export async function getParticipantSessions(id) {
  const jwt = await getItem();
  
  const res = await fetch(ENDPOINT + "/api/v1/participants/" + id + "/all-notes", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json" 
    }
  })
    .then(response => response.json());
  return res;
} 

export async function getTrainers(_locationId) {
  const jwt = await getItem();
  const query = _locationId ? "?locationId=" + _locationId : "";
  const url = ENDPOINT + "/api/v1/trainers" + query;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json());
  return res && res.specialists ? res.specialists : [];
}

//gets all available 
export async function getLocations() {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/locations/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
  return res && res.locations ? res.locations : [];
}

//Update profile information
export async function updateLocation(_location, id) {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/locations/" + id, {
    method: "PUT",
    body: JSON.stringify(_location),
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json" 
    }
  })
    .then(response => response.json());
    return res
}

//retrieve specific location info
export async function getLocationByID(id) {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/locations/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
  return res && res.location ? res.location : [];
}

//retrieve specific location info
export async function getSpecificUser(id) {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/users/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
  return res;
}

export async function getSpecialists(_locationId, _specialistType) {
  const jwt = await getItem();
  const query = _locationId ? "?locationId=" + _locationId : "";
  const url = ENDPOINT + "/api/v1/" + _specialistType + query;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json());
  return res.specialists || {};
}

//gets dietitians
export async function getDietitians(_locationId) {
  const jwt = await getItem();
  const query = _locationId ? "?locationId=" + _locationId : "";
  const url = ENDPOINT + "/api/v1/dietitians" + query;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json());
  return res.specialists || {};
}

//login
export async function authenticate(_username, _password) {
  const _body = {
    username: _username,
    password: _password
  };
  const res = await fetch(ENDPOINT + "/api/v1/authenticate", {
    method: "POST",
    body: JSON.stringify(_body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json());
  return res;
}

export async function addParticipant(participantInfo) {
  let temp = participantInfo;
  temp["startDate"] = Date.now();

  let _body = {
    "participant": temp,
    "numberOfTrainerSessions": 24,
    "numberOfDietitianSessions": 3,
    "sessionsIndicesWhenMeasurementsAreTaken": [1, 12, 24],
    "measurements": [
      {
        "name": "Weight",
        "category": "General Data",
        "unit": "lbs"
    },
    {
        "name": "BMI",
        "category": "General Data",
        "unit": "kg/m^2"
    },
    {
        "name": "Body Fat Percentage",
        "category": "General Data",
        "unit": "%"
    },
    {
        "name": "Lean Mass",
        "category": "General Data",
        "unit": "lbs"
    },
    {
        "name": "Blood Pressure",
        "category": "General Data",
        "unit": "mm Hg"
    },
    {
        "name": "Range of Motion",
        "category": "General Data",
        "unit": "degree"
    },
    {
        "name": "Abdominal Skin Fold",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "name": "Chest Skin Fold",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "name": "Midaxillary",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "name": "Subscapular",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "name": "Supraillac",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "name": "Thigh",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "name": "Tricep",
        "category": "Skin Fold Tests",
        "unit": "unit"
    },
    {
        "name": "Abdominal Girth",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "name": "Bicep Girth",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "name": "Calf Girth",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "name": "Chest Girth",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "name": "Hip Girth",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "name": "Thigh Girth",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "name": "Waist Girth",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "name": "Total Inches Lost",
        "category": "Girth Measurements",
        "unit": "unit"
    },
    {
        "name": "Distance",
        "category": "Treadmill Tests",
        "unit": "unit"
    },
    {
        "name": "Speed",
        "category": "Treadmill Tests",
        "unit": "unit"
    },
    {
        "name": "HR",
        "category": "Treadmill Tests",
        "unit": "unit"
    },
    {
        "name": "BR",
        "category": "Treadmill Tests",
        "unit": "unit"
    }
    ]
  };

  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/participants", {
    method: "POST",
    body: JSON.stringify(_body),
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json());
  return res;
}

export async function createLocation(locationInfo) {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/locations", {
    method: "POST",
    body: JSON.stringify(locationInfo),
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json());
  return res;
}

export async function getAllSpecialists() {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/users", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json());
  return res;
}