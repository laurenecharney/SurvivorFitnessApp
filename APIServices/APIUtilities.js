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
  return ret;
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

async function updateSession(sessionID, sessionInfo) {
  const jwt = await getItem();
  const res = await fetch(ENDPOINT + "/api/v1/sessions/"+sessionID, {
    method: "PUT",
    body: JSON.stringify(sessionInfo),
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json" // I added this line
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
  
  console.log("endpoint: ", ENDPOINT + "/api/v1/participants/" + id + "/all-notes")
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
  console.log("ENDPOINT:", ENDPOINT);
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

export async function addParticipant(participantInfo) {
  //temporary until required fields are decided
  let temp = participantInfo;
  temp["startDate"] = Date.now();
  temp["typeOfCancer"] = "unspecified";
  temp["formsOfTreatment"] = "unspecified";
  temp["surgeries"] = "unspecified";
  temp["physicianNotes"] = "";
  temp["trainerLocation"] = {id: 28};
  temp["dietitianLocation"] = {id: 30};

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
  
  console.log(JSON.stringify(_body));
  console.log(ENDPOINT + "/api/v1/participants");
  
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

  console.log(res);

  return res;
}