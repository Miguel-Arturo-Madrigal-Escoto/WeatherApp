import axios from 'axios';


class Busquedas {

    historial = [];

    constructor(){
        //TODO: Leer de la DB si existe
    }

    ciudad = async(lugar = '') => {
        try {
            // Peticion http del lugar
            //console.log(lugar);
            const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/madrid.json?limit=5&proximity=ip&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiMmttaWd1ZWw2NCIsImEiOiJjbDVjMHB2ZDAwY3hrM3NwZDgyaXl0dm83In0.HYiG61nKK2ZBZeKWd9tTLQ');
            console.log(resp.data);
            
        } catch (error) {
            console.log('error');
        }

        //return []; // retornar lugares que coindicen
    }

};

export default Busquedas;