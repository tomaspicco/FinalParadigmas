// Importación de funciones desde otros módulos
import { opcion1, opcion2, opcion3 } from "./FuncionesPrincipales.js"; // Funciones que ejecutan las opciones principales
import { menu } from "./Menúes.js"; // Función para mostrar el menú principal

let opcionMenu; // Variable para almacenar la opción seleccionada por el usuario

do {
  // Muestra el menú principal y captura la opción seleccionada
  opcionMenu = menu.menuPrincipal();

  // Dependiendo de la opción seleccionada, ejecuta la función correspondiente
  switch (opcionMenu) {
    case 1:
      opcion1(); // Ejecuta la primera opción
      break;
    case 2:
      opcion2(); // Ejecuta la segunda opción
      break;
    case 3:
      opcion3(); // Ejecuta la tercera opción
      break;
    case 0:
      console.log("Saliendo del programa."); // Mensaje de salida cuando se elige la opción 0
      break;
    default:
      // Mensaje de error si se ingresa una opción no válida
      console.log("Opción no válida.");
  }
} while (opcionMenu !== 0); // El ciclo continúa hasta que se seleccione la opción 0 para salir
