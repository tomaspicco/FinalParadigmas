// Importa la librería 'prompt-sync' para leer entradas del usuario desde la consola
import promptSync from "prompt-sync";
// Se exporta la función 'scanf'(prompt-sync) para usarse en el resto del código
export const scanf = promptSync();

// Función que limpia la pantalla de la consola
export function limpiarPantalla() {
  process.stdout.write("\x1Bc");
}

// Función para esperar que el usuario presione una tecla antes de continuar
export function Esperarscanf() {
  // Muestra un mensaje  y espera que el usuario presione una tecla
  scanf("Presione una tecla para seguir...");
}
