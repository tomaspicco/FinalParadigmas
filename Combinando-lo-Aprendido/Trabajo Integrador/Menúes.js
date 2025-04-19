import { limpiarPantalla, scanf } from "./Funciones.js";

// Objeto para gestionar los menús de la aplicación
export const menu = Object.create(null);

// Menú principal donde el usuario puede elegir qué hacer
menu.menuPrincipal = function () {
  limpiarPantalla(); // Limpia la pantalla antes de mostrar el menú
  console.log("¡Hola Olivia!\t\n¿Qué deseas hacer?");
  console.log(
    "[1] Ver mis tareas.\n[2] Buscar una tarea.\n[3] Agregar una tarea.\n[0] Salir.");

  // Solicita una opción del usuario y la valida
  let opcion = parseInt(scanf("Ingrese una opción: "));
  while (opcion < 0 || opcion > 3) {
    // Si la opción no es válida, solicita otra opción
    opcion = parseInt(
      scanf("La opción ingresada no es válida.\nIngrese otra: "));
  }
  return opcion; // Devuelve la opción elegida
};

// Menú para agregar una tarea, donde se le permiten al usuario ingresar datos de la tarea
menu.menuAgregarTarea = function () {
  console.log("Ingresó a crear una tarea\n");
  console.log("Para ingresar los datos, seleccione una opción: ");
  console.log(`[1] Ingresar título`);
  console.log(`[2] Ingresar descripcion`);
  console.log(`[3] Ingresar estado`);
  console.log(`[4] Ingresar dificultad`);
  console.log(`[5] Ingresar vencimiento`);
  console.log("Presione 0 para guardar los datos ingresados\n");

  // Solicita al usuario una opción y la valida
  let opcion = parseInt(scanf("Ingresa una opcion: "));
  while (opcion < 0 || opcion > 5) {
    // Si la opción no es válida, la vuelve a pedir
    opcion = parseInt(scanf("La opción ingresada no es válida.\nIngrese otra: "));
  }
  return opcion; // Devuelve la opción elegida
};

// Menú para ver las tareas filtradas por estado
menu.menuVerTareas = function () {
  limpiarPantalla(); // Limpia la pantalla antes de mostrar el menú
  console.log("¿Qué tareas deseas ver?\n[1] Todas\n[2] Pendientes\n[3] Curso\n[4] Terminadas\n[0] Volver");

  // Solicita una opción del usuario y valida que sea un número válido
  let opcion = parseInt(scanf("Ingrese una opción: "));
  while (opcion < 0 || opcion > 4) {
    // Si la opción no es válida, La vuelve a pedir
    opcion = parseInt(
      scanf("La opción ingresada no es válida.\nIngrese otra: "));
  }
  return opcion; // Devuelve la opción elegida
};
