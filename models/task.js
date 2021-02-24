const { v4: uuidv4 } = require('uuid');

///identificación de la tarea con su descripción
class Task {
    id = '';
    descrip = '';
    completeOn = null;

    constructor(descrip) { //constructor de la tarea
        this.id = uuidv4();
        this.descrip = descrip;
    }
}

module.exports = Task;