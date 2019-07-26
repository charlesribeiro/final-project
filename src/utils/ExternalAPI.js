const CLIENT_ID = "SOWI0WCWL54SREB4NZ3HG1VZZCVY4TELQQG5V2I1IHRFKDRI";
const CLIENT_SECRET = "3UZ45VHPQQAOUPKNN4FGJ0BKSOMZM0SKUXHTCCINPSQLM3UJ";
// const BASE_URL = "https://api.foursquare.com/v2/venues/explore";
const BASE_URL = "https://api.foursquare.com/v2/venues/search?";
const API_VERSION = "20190726";

export const getPlaces = () =>{

    const parameters ={
        client_id : CLIENT_ID,
        client_secret : CLIENT_SECRET,
        query: "sushi",
        near: "Curitiba",
        v: API_VERSION
    }

        return fetch(BASE_URL+new URLSearchParams(parameters))
        .then(res => {
            if (res.ok==false) 
            { throw res }
        console.log(res.json);
        return res.json()
        })
        .then(data => data.response.venues)
        .catch(error => {
            console.error(error)
            window.alert("Foursquare API failed...")
        })
}
