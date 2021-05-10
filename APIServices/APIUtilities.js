
const ENDPOINT = "http://192.168.0.13:8080";

//gets all participants
export default async function getParticipants(){
        const res = await fetch(ENDPOINT + "/api/v1/participants",  
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


//gets participant by id
export default async function getParticipantByID(id){
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

