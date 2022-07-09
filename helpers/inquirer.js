import inquirer from 'inquirer';
import colors from 'colors';

const { cyan, white, green } = colors;

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${ green('1') }. Buscar ciudad`
            },
            {
                value: 2,
                name: `${ green('2') }. Historial`
            },
            {
                value: 0,
                name: `${ green('0') }. Salir`
            },
        ]
    }
]


const inquirerMenu = async() => {

    console.clear();

    console.log(cyan(' ============================= '));
    console.log(white('     SELECCIONE UNA OPCIÓN '));
    console.log(cyan(' ============================= '));

    // espera a resolver la promesa con el await, es la respuesta del input
   
    const { opcion } = await inquirer.prompt(questions);

    return opcion;
}



const pause = () => {
    const pauseQst = {
        type: 'input',
        name: 'confirmacion',
        message: `Presiona ENTER para continuar`
    };

    return inquirer.prompt(pauseQst);
};

const leerInput = async ( message ) => {
    const question = {
        type: 'input',
        name: 'descripcion',
        message,
        validate(value) {
            if (value.length === 0){
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    };

    const { descripcion } = await inquirer.prompt(question);

    return descripcion;
}

const listadoLugares = async(lugares = []) => {
    const choices_lugares = lugares.map((lugar, index) => (
        { 
            value: lugar.id,
            name: `${ green( (index + 1) + '.') } ${ lugar.nombre }`
        }
    ));

    choices_lugares.unshift({
        value: 0,
        name: green('0. ') + 'Salir'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices: choices_lugares
        }
    ];

    // Muestra el listado de seleccion de preguntas y devuele el id del seleccionado (name: 'id').
    const { id } = await inquirer.prompt(preguntas);

    return id;
}

const confirmar = async ( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);

    return ok;
}

const listadoTareasCheckBox = async(tareas = []) => {
    const choices = tareas.map((tarea, index) => (
        { 
            value: tarea.id,
            name: `${ green( (index + 1) + '.') } ${ tarea.desc }`,
            checked: (!tarea.completadoEn)? false : true
        }
    ));


    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];
    const { ids } = await inquirer.prompt(preguntas);

    return ids;
}


export {
    inquirerMenu, 
    pause, 
    leerInput, 
    confirmar, 
    listadoTareasCheckBox,
    listadoLugares
}