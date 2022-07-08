import { inquirerMenu, leerInput, pause  } from './helpers/inquirer.js';
import colors from 'colors';
import Busquedas from './models/busquedas.js';

const { green } = colors;

const main = async () => {
    let opt;
    const busquedas = new Busquedas();
    

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                // Buscar los lugares
                await busquedas.ciudad(lugar);
                // Seleccionar el lugar

                //Clima

            
                //Mostrar resultados
                console.log(green('\nInformación de la ciudad\n')); 
                console.log('Ciudad: ',);
                console.log('Lat: ',);
                console.log('Lng: ',);
                console.log('Temperatura: ',);
                console.log('Mínima: ',);
                console.log('Máxima: ',);
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



