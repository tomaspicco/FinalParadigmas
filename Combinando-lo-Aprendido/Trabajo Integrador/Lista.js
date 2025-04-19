import { tarea } from "./Tarea.js";

// Objeto que gestiona la lista de tareas
export const Lista = {
  ListadeTareas: [], // Arreglo que contiene todas las tareas

  // Función para ordenar las tareas por título
  ordenarTareas: function () {
    let tareaTemp; // Variable temporal para intercambiar elementos

    // Recorre el arreglo de tareas
    for (let i = 0; i < this.ListadeTareas.length; i++) {
      for (let j = 0; j < this.ListadeTareas.length - 1; j++) {
        // Comparar los títulos de las tareas adyacentes
        if (this.ListadeTareas[j].titulo > this.ListadeTareas[j + 1].titulo) {
          // Intercambiamos las tareas si el título de la tarea actual es mayor
          tareaTemp = this.ListadeTareas[j];
          this.ListadeTareas[j] = this.ListadeTareas[j + 1];
          this.ListadeTareas[j + 1] = tareaTemp;
        }
      }
    }
  },
};
