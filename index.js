import { inquirerMenu, leerInput, listadoLugares, pause  } from './helpers/inquirer.js';
import colors from 'colors';
import Busquedas from './models/busquedas.js';
import 'dotenv/config';

const { green, red } = colors;


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
                    const lugarSel = lugares.find(lugar => lugar.id === id)
    
    
                    //? Clima
    
                
                    //! Mostrar resultados
                    console.log(green('\nInformación de la ciudad\n')); 
                    console.log('Ciudad: ', lugarSel.nombre);
                    console.log('Lat: ', lugarSel.lat);
                    console.log('Lng: ', lugarSel.lng);
                    console.log('Temperatura: ',);
                    console.log('Mínima: ',);
                    console.log('Máxima: ',);
                    
                } else {
                    console.log(red(`El lugar ${ termino } no se encuentra en el mapa`));
                }

                break;

            case 2:
                break;
        
            default:
                break;
        }

        if (opt !== 0) await pause();

    } while(opt !== 0);
}

main();



