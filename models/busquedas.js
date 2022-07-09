import axios from 'axios';

class Busquedas {

    historial = [];

    constructor(){
        //TODO: Leer de la DB si existe
    }

    get paramsMapBox(){
        return {
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: 'es'
        }
    }

    ciudades = async(lugar = '') => {
        try {
            // Peticion http del lugar
            // ?limit=5&proximity=ip&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiMmttaWd1ZWw2NCIsImEiOiJjbDVjMHB2ZDAwY3hrM3NwZDgyaXl0dm83In0.HYiG61nKK2ZBZeKWd9tTLQ
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();

            // Los lugares vienen en el arreglo de features
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
            
        } catch (error) {
            return [];
        }
    }

};

export default Busquedas;