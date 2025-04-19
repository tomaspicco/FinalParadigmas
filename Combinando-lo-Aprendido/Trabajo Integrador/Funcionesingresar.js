// Importa la función scanf
import { scanf } from "./Funciones.js";

// Objeto que contiene funciones para ingresar atributos de las tareas
export const funcion = {
  // Función para ingresar el título de la tarea
  ingresarTitulo: function () {
    const pedirTitulo = () => {
      const titulo = scanf("1- Ingrese el título (es obligatorio): ");
      return titulo === "" ? pedirTitulo() : titulo;
    };
  
    return pedirTitulo();
  },
  
  ingresarEstado: function () {
    const pedirEstado = () => {
      const estado = scanf("Ingrese el estado: [P]endiente/[EC]en curso/[T]erminada/[C]ancelada: ").toUpperCase();
      return ['P', 'EC', 'T', 'C'].includes(estado) ? estado : pedirEstado();
    };
  
    return pedirEstado();
  },

  ingresarDificultad: function () {
    const dificultadMap = new Map([
      ["F", "⭐"],
      ["M", "⭐⭐"],
      ["D", "⭐⭐⭐"]
    ]);
  
    const pedirDificultad = () => {
      const input = scanf(
        "4- Ingrese la dificultad, por defecto fácil: [F]ácil(⭐)/[M]edio(⭐⭐)/[D]ifícil(⭐⭐⭐): "
      ).toUpperCase();
  
      return dificultadMap.has(input) ? dificultadMap.get(input) : pedirDificultad();
    };
  
    return pedirDificultad();
  },

  ingresarFechadeVencimiento: function () {
    const FechaActual = new Date(); // Fecha actual
  
    // Función auxiliar recursiva pura
    const pedirFechaValida = () => {
      const fechaVencimiento = this.PedirFechadeVencimiento();
      return fechaVencimiento <= FechaActual
        ? pedirFechaValida()
        : fechaVencimiento;
    };
    return pedirFechaValida();
  },

  // Función para ingresar una descripción para la tarea (opcional)
  ingresarDescripcion: function () {
    let descripcion = scanf("2- Ingrese una descripcion: ");
    // Si no se ingresa una descripción, asigna "Sin Descripcion"
    return descripcion || "Sin Descripcion";
  },

  PedirFechadeVencimiento: function () {
    // Función para determinar si un año es bisiesto
    const annoBisiesto = (anno) => anno % 4 === 0 && anno % 100 !== 0;
    // Mapa de días por mes
    const diasPorMes = new Map([
      [1, 31], [3, 31], [5, 31], [7, 31], [8, 31], [10, 31], [12, 31],
      [4, 30], [6, 30], [9, 30], [11, 30],
      [2, annoBisiesto ? 29 : 28]
    ]);
  
    // Funciones para pedir año, mes, día, y hora
    const pedirAnno = (anno) => anno >= 1000 && anno <= 9999 ? anno : undefined;
    const pedirMes = (mes) => mes >= 1 && mes <= 12 ? mes : undefined;
  
    // Solicitar un día según el mes y el año (si es bisiesto)
    const pedirDia = (mes, anno, dia) => {
      const diasDelMes = diasPorMes.get(mes);
      return dia >= 1 && dia <= diasDelMes ? dia : undefined;
    };
  
    const pedirHora = (hora) => hora >= 0 && hora <= 23 ? hora : undefined;
  
    // Función recursiva que pide y valida todos los valores
    const pedirFechaValida = () => {
      const anno = parseInt(scanf("Ingrese el año de vencimiento (debe estar entre 1000 y 9999): "));
      const mes = parseInt(scanf("Ingrese el mes de vencimiento (1-12): "));
      const dia = parseInt(scanf(`Ingrese el día de vencimiento (1-${diasPorMes.get(mes)}): `));
      const hora = parseInt(scanf("Ingrese la hora de vencimiento (0-23): "));
  
      // Validaciones: Si algún campo es inválido, la función recursiva vuelve a ejecutarse
      const resultadoAnno = pedirAnno(anno);
      const resultadoMes = pedirMes(mes);
      const resultadoDia = resultadoMes ? pedirDia(resultadoMes, resultadoAnno, dia) : undefined;
      const resultadoHora = pedirHora(hora);
  
      // Si todas las entradas son válidas, crea y retorna la fecha
      return resultadoAnno && resultadoMes && resultadoDia && resultadoHora
        ? new Date(resultadoAnno, resultadoMes - 1, resultadoDia, resultadoHora)
        : pedirFechaValida(); // Si no, solicita los datos nuevamente
    };
  
    // Inicia el proceso de solicitar la fecha válida
    let fechaVencimiento = pedirFechaValida();
  
    return fechaVencimiento.toLocaleDateString("es-ES"); // Devuelve la fecha en formato "es-ES"
  },
}