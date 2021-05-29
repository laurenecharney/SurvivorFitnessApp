//this should be an env. variable. Fix this later

//put 
const ENDPOINT = 
"http://192.168.0.15:8080";

//gets all participants
export async function getParticipants(){

        const res = await fetch(ENDPOINT + "/api/v1/participants",  
        {"method": "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'  // I added this line
        },
        }).then((res => res.json())).catch(err=>
          console.log(err));

          return res && res.participants ? res.participants : [];

         
}   // ,

//gets participant by id
export async function getParticipantByID(id){
  const res = await fetch(ENDPOINT + "/api/v1/participants/" + id,  
  {"method": "GET",
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'  // I added this line
  },
  })          .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
    return res.participants;
}

export async function getTrainers(){
  const res = await fetch(ENDPOINT + "/api/v1/trainers",  
  {"method": "GET",
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'  // I added this line
  },
  })          .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
    return res && res.specialists ? res.specialists : [];
}

//gets all available locations
export async function getLocations(){
  const res = await fetch(ENDPOINT + "/api/v1/locations/",  
  {"method": "GET",
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'  // I added this line
  },
  })          .then(response => response.json())
    .catch(err => {
      throw err;
    });
    return res && res.locations ? res.locations : [];
}

//retrieve specific location info
export async function getLocationByID(id){
  const res = await fetch(ENDPOINT + "/api/v1/locations/" + id,  
  {"method": "GET",
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'  // I added this line
  },
  })          .then(response => response.json())
    .catch(err => {
      throw err;
    });
    return res && res.location ? res.location : [];
}


//gets dietitians
export async function getDietitians(){
  const res = await fetch(ENDPOINT + "/api/v1/dietitians",  
  {"method": "GET",
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'  // I added this line
  },
  })          .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
    return res.specialists || {};
}
