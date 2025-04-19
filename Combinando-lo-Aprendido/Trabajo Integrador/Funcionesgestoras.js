// Importa las funciones necesarias desde otros módulos
import { Lista } from "./Lista.js"; // Lista que contiene las tareas
import { scanf, Esperarscanf, limpiarPantalla } from "./Funciones.js"; // Funciones para entrada, espera y limpieza de pantalla
import { funcion } from "./Funcionesingresar.js"; // Funciones para ingresar los atributos de la tarea
import {
  mostrarCoincidencias,
  mostrarDetallesTarea,
} from "./Funcionesmostrar.js"; // Funciones para mostrar tareas y detalles

const cambiarAtributo = (tareas, index, atributo, valor) =>
  tareas.map((tarea, i) =>
    [
      i === index && { ...tarea, [atributo]: valor },
      i !== index && tarea
    ].find(Boolean)
  );

export function editarTarea(ver) {
  const editar = scanf("Si deseas editarla presiona E, o presiona 0 para volver: ").toUpperCase();

  const acciones = new Map([
    [1, () => cambiarAtributoYConfirmar('titulo', funcion.ingresarTitulo(), "El título se cambió con éxito")],
    [2, () => cambiarAtributoYConfirmar('descripcion', funcion.ingresarDescripcion(), "La descripción se cambió con éxito")],
    [3, () => cambiarAtributoYConfirmar('estado', funcion.ingresarEstado(), "El estado se cambió con éxito")],
    [4, () => cambiarAtributoYConfirmar('dificultad', funcion.ingresarDificultad(), "La dificultad se cambió con éxito")],
    [5, () => cambiarAtributoYConfirmar('vencimiento', funcion.ingresarFechadeVencimiento(), "La fecha de vencimiento se cambió con éxito")],
  ]);

  const mostrarMenu = () => {
    console.log("¿Qué atributo deseas editar?");
    console.log("[1] Título\n[2] Descripción\n[3] Estado\n[4] Dificultad\n[5] Fecha de vencimiento\n[0] Volver");

    const opcion = parseInt(scanf("Ingresa una opción: "));

    const accion = acciones.get(opcion);

    return isNaN(opcion) || opcion < 0 || opcion > 5
      ? mostrarMenu() // llamada recursiva si la opción es inválida
      : opcion === 0
      ? console.log("Saliendo del editor...")
      : (accion(), Esperarscanf(), limpiarPantalla(), mostrarMenu());
  };

  const cambiarAtributoYConfirmar = (atributo, valor, mensaje) => {
    Lista.ListadeTareas = cambiarAtributo(Lista.ListadeTareas, ver - 1, atributo, valor);
    console.log(mensaje);
  };

  return editar === "E" ? mostrarMenu() : null;
}

// export function buscarTarea(cadena) {
//   const resultados = Lista.ListadeTareas.filter(tarea =>
//     tarea.titulo.toLowerCase().includes(cadena.toLowerCase())
//   );

//   const acciones = new Map([
//     [true, () => mostrarCoincidencias(resultados)],
//     [false, () => (console.log("No hay tareas relacionadas con la búsqueda."), Esperarscanf())]
//   ]);

//   acciones.get(resultados.length > 0)?.();
// }

export function buscarTarea(cadena) {
  // Filtrar tareas que contienen la cadena de búsqueda (sin importar mayúsculas/minúsculas)
  const resultados = Lista.ListadeTareas.filter(tarea =>
    tarea.titulo.toLowerCase().includes(cadena.toLowerCase())
  );

  // Mapa para manejar las acciones según si hay resultados o no
  const acciones = new Map([
    [true, () => gestionarResultados(resultados)], // Si hay resultados, ir a gestionar resultados
    [false, () => console.log("No hay tareas relacionadas con la búsqueda.")] // Si no hay resultados, mostrar mensaje
  ]);

  // Ejecutar la acción correspondiente según si hay resultados
  acciones.get(resultados.length > 0)(); 
}








// export function gestionarResultados(resultados) {
//   const pedirOpcion = () => parseInt(scanf("¿Qué deseas hacer?\n[1] Ver detalles de la tarea\n[0] Volver al menú principal\n"));

//   const mostrarYSeleccionarTarea = () => {
//     const indice = parseInt(scanf("Ingrese el número de la tarea para ver los detalles: ")) - 1;

//     return (indice >= 0 && indice < resultados.length)
//       ? mostrarDetallesTarea(resultados[indice])
//       : (console.log("Número inválido. Inténtelo nuevamente."), gestionarResultados(resultados));
//   };

//   const salir = () => {
//     // console.log("Volviendo al menú principal...");
//     return; // Termina la ejecución sin recursión
//   };

//   const acciones = new Map([
//     [1, mostrarYSeleccionarTarea],
//     [0, salir]
//   ]);

//   const opcion = pedirOpcion();

//   const accion = acciones.get(opcion);
//   return accion ? accion() : (console.log("Opción no válida."), gestionarResultados(resultados));
// }
export function gestionarResultados(resultados) {
  // Función para pedir la opción
  const pedirOpcion = () => parseInt(scanf("¿Qué deseas hacer?\n[1] Ver detalles de la tarea\n[0] Volver al menú principal\n"));

  // Función para mostrar las tareas encontradas con su índice real
  const mostrarTareas = () => {
    console.log("Tareas encontradas:");
    resultados.forEach((tarea, index) => {
      // Aquí mostramos el índice real del array
      console.log(`[${index + 1}] Título: ${tarea.titulo}`);  // Mostramos un índice basado en 1 para el usuario
    });
  };

  // Función para ver los detalles de una tarea
  const mostrarYSeleccionarTarea = () => {
    // Pedir al usuario que ingrese el número de la tarea (tenemos que restar 1 para obtener el índice real)
    const indice = parseInt(scanf("Ingrese el número de la tarea para ver los detalles: ")) - 1;

    // Verificar si el índice es válido
    const esIndiceValido = indice >= 0 && indice < resultados.length;

    // Mostrar detalles si el índice es válido
    if (esIndiceValido) {
      mostrarDetallesTarea(resultados[indice]);
    } else {
      console.log("Número inválido. Inténtelo nuevamente.");
      gestionarResultados(resultados); // Repetir la función si el índice es inválido
    }
  };

  // Función para salir y volver al menú principal
  const salir = () => {
    console.log("Volviendo al menú principal...");
    return; // Termina la ejecución sin recursión
  };

  // Mapa de acciones según la opción elegida
  const acciones = new Map([
    [1, mostrarYSeleccionarTarea], // Ver detalles de la tarea
    [0, salir] // Volver al menú principal
  ]);

  // Mostrar las tareas encontradas con su índice real
  mostrarTareas();

  // Pedir la opción al usuario
  const opcion = pedirOpcion();

  // Ejecutar la acción seleccionada o manejar la opción no válida
  const accionSeleccionada = acciones.get(opcion);

  if (accionSeleccionada) {
    accionSeleccionada(); // Ejecutar la acción seleccionada
  } else {
    console.log("Opción no válida.");
    gestionarResultados(resultados); // Repetir si la opción es inválida
  }
}
