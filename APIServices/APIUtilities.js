import { getItem } from "./deviceStorage";

const ENDPOINT = "http://ec2-34-235-137-139.compute-1.amazonaws.com:8080";


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
    console.log("GET PARTICIPANTS QUERY")
    console.log(paramName + " " + paramValue);
  return res && res.participants ? res.participants : [];
} //

//gets participant by id
export async function getParticipantByID(id) {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/participants/194", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json" // I added this line
    }
  })
    .then(response => response.json());
    console.log("GET PARTICIPANTS ID QUERY")
  return res.participant;
}

export async function getAllSessionNotesByParticipantID(id) {
  const jwt = await getItem();
  console.log("endpoint: ", ENDPOINT + "/api/v1/participants/" + id + "/trainer-notes")
  const res = await fetch(ENDPOINT + "/api/v1/participants/" + id + "/trainer-notes", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json" 
    }
  })
    .then(response => response.json());
  console.log(res);
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
  console.log(res);
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
  console.log(res);
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
