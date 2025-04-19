import { tarea } from "./Tarea.js";
import { limpiarPantalla, scanf, Esperarscanf } from "./Funciones.js";
import { menu } from "./Menúes.js";
import { Lista } from "./Lista.js";
import { mostrarTodasTareas, verTareasPorEstado } from "./Funcionesmostrar.js";
import { buscarTarea } from "./Funcionesgestoras.js";
import { funcion } from "./Funcionesingresar.js";

// Función para manejar la opción 1 del menú (Ver tareas)
export function opcion1() {
  limpiarPantalla(); // Limpiar pantalla antes de mostrar opciones
  let opcion = menu.menuVerTareas(); // Mostrar el menú de ver tareas y obtener la opción del usuario
  switch (opcion) {
    case 1:
      limpiarPantalla();
      mostrarTodasTareas(); // Mostrar todas las tareas
      break;
    case 2:
      limpiarPantalla();
      console.log("Estas son tus tareas pendientes:");
      verTareasPorEstado("P"); // Ver tareas pendientes
      break;
    case 3:
      limpiarPantalla();
      console.log("Estas son tus tareas en proceso:");
      verTareasPorEstado("EC"); // Ver tareas en proceso
      break;

    case 4:
      limpiarPantalla();
      console.log("Estas son tus tareas terminadas:");
      verTareasPorEstado("T"); // Ver tareas terminadas
      break;

    default:
      console.log("Opción no válida."); // Manejar caso de opción no válida
  }
}

// Función para manejar la opción 3 del menú (Agregar tarea)
export function opcion3() {
  let menuAgregar = -1; // Variable para controlar el menú de agregar tarea
  let tareaNueva = Object.create(tarea); // Crear una nueva tarea basada en el objeto "tarea"
  
  // Bucle para mantener abierto el menú de agregar tarea hasta que se elija salir
  do {
    limpiarPantalla(); // Limpiar pantalla antes de mostrar el menú de agregar tarea
    menuAgregar = menu.menuAgregarTarea(
      tareaNueva.titulo,
      tareaNueva.descripcion,
      tareaNueva.estado,
      tareaNueva.dificultad,
      tareaNueva.vencimiento
    ); // Mostrar el menú de agregar tarea y obtener la opción seleccionada

    limpiarPantalla();
    switch (menuAgregar) {
      case 1:
        tareaNueva.titulo = funcion.ingresarTitulo(); // Ingresar el título de la tarea
        break;
      case 2:
        tareaNueva.descripcion = funcion.ingresarDescripcion(); // Ingresar la descripción de la tarea
        break;
      case 3:
        tareaNueva.estado = funcion.ingresarEstado(); // Ingresar el estado de la tarea
        break;
      case 4:
        tareaNueva.dificultad = funcion.ingresarDificultad(); // Ingresar la dificultad de la tarea
        break;
      case 5:
        tareaNueva.vencimiento = funcion.ingresarFechadeVencimiento(); // Ingresar la fecha de vencimiento
        break;
      case 0:
        // Validar si la tarea tiene título antes de agregarla
        if (tareaNueva.titulo === "Sin título") {
          menuAgregar = -1;
          console.log("No se puede agregar la tarea sin título.");
          Esperarscanf(); // Esperar que el usuario presione una tecla antes de continuar
        } else {
          Lista.ListadeTareas.push(tareaNueva); // Agregar la nueva tarea a la lista
          Lista.ordenarTareas(); // Ordenar las tareas si es necesario
          console.log("¡Tarea creada con éxito!");
          Esperarscanf(); // Esperar que el usuario presione una tecla antes de continuar
        }
        break;
      default:
        console.log("Opción inválida.");
        Esperarscanf(); // Esperar que el usuario presione una tecla antes de continuar
        break;
    }
  } while (menuAgregar != "0"); // Continuar mostrando el menú hasta que se elija salir
}

// Función para manejar la opción 2 del menú (Buscar tareas)
export function opcion2() {
  console.log("Introduzca una palabra o frase para buscar tareas: ");
  let cadenaBusqueda = scanf(); // Obtener la cadena de búsqueda del usuario

  if (cadenaBusqueda.trim() === "") {
    console.log("La búsqueda no puede estar vacía. Inténtelo nuevamente.");
    return; // Terminar la función si la búsqueda está vacía
  }

  buscarTarea(cadenaBusqueda); // Buscar las tareas que coincidan con la cadena de búsqueda
}
