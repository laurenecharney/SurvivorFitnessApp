import { getItem } from "./deviceStorage";
import {ENDPOINT} from './developerEndpoint.js';

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

  //for debugging
  console.log(ret);
  return ret;

  return {};
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
  const url = ENDPOINT + "/api/v1/users/reset_password?email=" + _email;
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


export async function logTrainerSession(curSessionInfo, date) {
  // console.log("old participantid", curSessionInfo)
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
      "Content-Type": "application/json" // I added this line
    }
  })
    .then(res => res.json());
  return res && res.participants ? res.participants : [];
} // ,

//gets participant by id
export async function getParticipantByID(id) {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/participants/id", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json" // I added this line
    }
  })
    .then(response => response.json());
  return res.participant;
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
      "Content-Type": "application/json" // I added this line
    }
  })
    .then(response => response.json());
  return res && res.specialists ? res.specialists : [];
}

//gets all available locations
export async function getLocations() {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/locations/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json" // I added this line
    }
  }).then(response => response.json());
  // console.log(res);
  return res && res.locations ? res.locations : [];
}

//retrieve specific location info
export async function getLocationByID(id) {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/locations/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json" // I added this line
    }
  }).then(response => response.json());
  // console.log(res);
  return res && res.location ? res.location : [];
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
      "Content-Type": "application/json" // I added this line
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
      "Content-Type": "application/json" // I added this line
    }
  })
    .then(response => response.json());
  return res;
}