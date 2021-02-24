require('colors');
const { saveDB, readDB } = require('./helpers/savefile');
const { menuColors, pauseMenu, readInput, showListCheckList, deleteTaks, confirm } = require('./helpers/msg');
const Tasks = require('./models/tasks');

const App = async() => {

    let opcion = ''; // variable vaci donde está el menú
    const tarea = new Tasks(); //constante de la tarea que me toma la clase
    const leerDB = readDB(); //constante para leer la base de datos

    if (leerDB) { // leer las tareas que hay en la base de datos
        tarea.loadingTaskArray(leerDB);
    }

    do {
        opcion = await menuColors(); //  se llama el menú

        switch (opcion) {
            case '1': //crear tarea
                const descrip = await readInput('Descripción: ');
                tarea.createTask(descrip);
                break;
            case '2': //listar tareas
                tarea.completeList();
                break;
            case '3': //listar tareas pendientes
                tarea.completePendingLists(false);
                break;
            case '4': //listar tareas Completas
                tarea.completePendingLists(true);
                break;
            case '5': // completadar tareas
                const ids = await showListCheckList(tarea.ListArray);
                tarea.taskComplete(ids);
                break;
            case '6': ///borrar tareas
                const id = await deleteTaks(tarea.ListArray);
                if (id !== '0') {
                    const ok = await confirm('¿Estás seguro de eliminar la tarea?');

                    if (ok) {
                        tarea.delete(id);
                        console.log('Tarea depurada de manera correcta');
                    }
                }
                break;
        }

        //saveDB(tarea.ListArray);

        await pauseMenu();

    }
    while (opcion !== '0');


}

App();