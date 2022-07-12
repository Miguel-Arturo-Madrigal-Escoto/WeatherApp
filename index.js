import { inquirerMenu, leerInput, listadoLugares, pause  } from './helpers/inquirer.js';
import colors from 'colors';
import Busquedas from './models/busquedas.js';
import 'dotenv/config';

const { green, red, cyan } = colors;


const main = async () => {
    let opt;
    const busquedas = new Busquedas();
    

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //! Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                //? Buscar los lugares desde la API
                const lugares = await busquedas.ciudades(termino);

                if (lugares.length > 0){
                    //* Seleccionar el lugar
                    /* Obtener el id que devuelve la promesa del listadoLugares del prompt (list) de los
                    lugares obtenidos de la API */
                    const id = await listadoLugares(lugares);

                    if (id === 0) continue;

                    const lugarSel = lugares.find(lugar => lugar.id === id)
    
                    // Guardar en DB
                    busquedas.agregarHistorial(lugarSel.nombre);

                    //? Clima
                    const climaData = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                
                    //! Mostrar resultados
                    console.clear();
                    console.log(green('\nInformación de la ciudad\n')); 
                    console.log('Ciudad: ', cyan(lugarSel.nombre));
                    console.log('Lat: ', lugarSel.lat);
                    console.log('Lng: ', lugarSel.lng);
                    console.log('Temperatura: ', climaData.temp);
                    console.log('Mínima: ', climaData.min);
                    console.log('Máxima: ', climaData.max);
                    console.log('Como está el clima: ', cyan(climaData.desc));
                    

                } else {
                    console.log(red(`El lugar ${ termino } no se encuentra en el mapa`));
                }

                break;

            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = cyan(`${ i + 1 }.`);
                    const lug_temp = lugar.slice(0, -1);
                    console.log(`${ idx } ${ lug_temp }`);
                })
                break;
        
            default:
                break;
        }

        if (opt !== 0) await pause();

    } while(opt !== 0);
}

main();



