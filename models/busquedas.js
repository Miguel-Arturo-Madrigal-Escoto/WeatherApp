import fs from 'fs'; // node.js filesystem
import axios from 'axios';

class Busquedas {

    constructor(){
        this.historial = [];
        this.dbPath = `./db/database.json`;

        //TODO: Leer de la DB si existe
        this.leerDB();
    }

    get historialCapitalizado(){
        const arr = [];
        this.historial.forEach(lugar => {
            let aux = lugar.split(' ');
            let output = '';
            for(let i = 0; i < aux.length; i++){
                let temp = aux[i][0].toLocaleUpperCase() + aux[i].slice(1);
                output += temp + ' ';
            }
            arr.push(output);
        });
        
        return arr;
    }

    get paramsMapBox(){
        return {
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: 'es'
        }
    }

    get paramsOpenWeather(){
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
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
            console.log(error);
            return [];
        }
    }

    climaLugar = async(lat, lon) => {
        try {
            
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    lat,
                    lon,
                    ...this.paramsOpenWeather,
                }
            });

            const resp = await instance.get();
            const data = await resp.data;


            return {
                desc: data.weather[0].description,
                min: data.main.temp_min,
                max: data.main.temp_max,
                temp: data.main.temp
            };

        } catch (error) {
            console.log(error);
            return {
                desc: '',
                min: null,
                max: null,
                temp: null
            }
        }
    }

    agregarHistorial = (lugar = '') => {
        //TODO: Prevenir guardar el mismo lugar si se vuelve a buscar
        if (this.historial.includes(lugar.toLocaleLowerCase())) return;
        
        this.historial = this.historial.splice(0, 5);

        this.historial.unshift(lugar.toLocaleLowerCase());
        
        // Guardar en DB
        this.guardarDB();
    }

    guardarDB = () => {
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB = () => {
        // Leer la DB
        if (!fs.existsSync(`${ this.dbPath }`)) return;

        const data = fs.readFileSync(this.dbPath, {
            encoding: 'utf-8'
        });

        if (data){
            // Convertir la data (JSON en formato string) en un JSON
            const dataParsed = JSON.parse(data);
    
            // Almacenar en el arreglo
            this.historial = dataParsed.historial;
        }
    }

};

export default Busquedas;