const Task = require('./task');

class Tasks {

    _list = {}; // almacenamiento de mi lista de objetos

    get ListArray() { // metodo get para la lista del array que tenemos

        const list = []; //creamos el array donde almacenemos toda la lista del objeto
        Object.keys(this._list).forEach(key => {
            const tarea = this._list[key];
            list.push(tarea);
        });
        return list;
    }

    constructor() { //constructto del la lista de objeto
        this._list = {};
    }

    createTask(descrip = '') { //Método de crear una nueva tarea con argumento vacio
        const tarea = new Task(descrip); // constante de la tarea y su descripción
        this._list[tarea.id] = tarea; // indicativo de la tarea con identifiación del id
    }

    loadingTaskArray(tareas = []) { //método para listar las tareas que se crean

        tareas.forEach(tarea => { // se recorren las tareas
            this._list[tarea.id] = tareas; // se discriminan por id
        });
    }

    completeList() { //metodo para ver el listado completo de las tareas
        this.ListArray.forEach((tarea, i) => {
            const index = `${i + 1}.`.yellow;
            const { descrip, completeOn } = tarea; // destructuración de la tarea
            const estado = (completeOn) ? //validador de estado
                'Completado'.green :
                'Pendiente'.red;

            console.log(`${index} ${descrip} :: ${estado}`);
        });
    }

    completePendingLists(completadas = true) { // métoo para saber la lista de tareas pendientes y completas

        let contador = 0; // se inicia el contador 

        this.ListArray.forEach(tarea => { // recorremos el array con el argumento de la tarea

            const { descrip, completeOn } = tarea; // destructuraciónn de la tarea
            const estado = (completeOn) ? // validador de estado
                'Completado'.green :
                'Pendiente'.red;

            if (completadas) { // condición del argumento del metodo

                if (completeOn) { // estado de latarea
                    contador += 1;
                    console.log(`${(contador+'.').yellow} ${descrip} :: ${completeOn.green}`);
                }
            } else {
                if (!completeOn) {
                    contador += 1;
                    console.log(`${(contador+'.').yellow} ${descrip} :: ${estado.magenta}`);
                }
            }
        });
    }

    taskComplete(ids = []) { //metodo de completado

        ids.forEach(id => { //recorremos cada uno de los id

            const tarea = this._list[id]; //extraemos el datos del constructor
            if (!tarea.completeOn) { //si es diferente al completado 
                tarea.completeOn = new Date().toDateString(); // imprimoa la tarea con su fecha
            }
        });

        this.ListArray.forEach(tarea => { /// recorremos la lista de tareas con el argumento de la tarea

            if (!ids.includes(tarea.id)) { /// si el id es diferente a la inclusión del la tareas con el id
                this._list[tarea.id].completeOn = null; /// entonces extraemos el id desde l tarea de constructor con su estado completado y lo igualamos a null
            }
        });
    }

    delete(id = '') { //metodo de eliminación de tareas
        if (this._list[id]) { // codición para buscar su id
            delete this._list[id];
        }
    }

}

module.exports = Tasks;