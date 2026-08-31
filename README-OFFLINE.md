# Crosslet — versión pulida, española y 100% local

Esta versión conserva íntegramente la lógica principal del juego (palabra
de 5 letras, 6 intentos, evaluación correct/present/absent) y añade una
capa de robustez, accesibilidad, audio y responsive sin introducir
dependencias externas.

## Estructura del proyecto

- `index.html` — menú principal.
- `game.html` — pantalla de juego.
- `info.html` — información y cómo jugar.
- `manifest.webmanifest` — manifest local para instalación como app.
- `css/style.css`, `css/layout.css`, `css/animations.css` — estilos.
- `js/app.js` — lógica del menú principal.
- `js/storage.js` — almacenamiento robusto compartido (estadísticas,
  partida guardada y ajustes de audio), con validación de tipos y
  recuperación ante datos corruptos.
- `js/audio.js` — `AudioManager`: sonidos generados con Web Audio API
  (sin archivos de audio externos), con desbloqueo tras la primera
  interacción y fallo silencioso si el audio no está disponible.
- `js/offline.js` — capa que confirma y expone el estado de conexión y
  disponibilidad de almacenamiento local.
- `gameplay/game.js` — motor completo del juego: diccionario de 1000
  palabras españolas, evaluación de intentos, teclado, animaciones,
  modales y estadísticas.
- `assets/fonts/CrossletSans.ttf` — tipografía local.

## Cambios de esta revisión

- Corregidas referencias rotas a un `js/music.js` inexistente en
  `index.html` y `game.html` (causaban error de carga en consola).
- Eliminadas 3 palabras duplicadas del diccionario de 1000 palabras.
- Corregido un selector CSS que impedía que la animación del menú
  principal se ejecutara nunca.
- Añadido un estado `isProcessing` que bloquea temporalmente el input
  durante la evaluación de un intento, evitando doble envío, escritura
  o borrado durante la animación.
- Sistema de sonido completo (escribir, borrar, enviar, error, letra
  correcta/presente/ausente, victoria, derrota) con controles ON/OFF
  persistentes en `localStorage`.
- Vibración háptica opcional (`navigator.vibrate`) en error, victoria y
  derrota, con fallo silencioso en navegadores sin soporte (p. ej. Safari).
- `navigator.share` con reserva a copiar al portapapeles o mostrar el
  texto si no está disponible.
- Accesibilidad: `aria-live` en el mensaje del juego, restauración de
  foco al cerrar modales, soporte de `prefers-reduced-motion`.
- Responsive: teclado con `clamp()` para no desbordarse en pantallas de
  320px, soporte de `env(safe-area-inset-*)` en el contenedor del juego
  y el teclado.
- Página `info.html` con explicación completa del juego.
- Sin fuentes, CDN, APIs, imágenes remotas ni URLs externas en
  HTML/CSS/JS.

## Ejecución

Abre `index.html` directamente en el navegador. El juego no necesita
instalación de paquetes, servidor, base de datos ni conexión a Internet.

El audio se genera localmente con Web Audio API y se activa tras la
primera interacción del usuario, respetando las políticas de reproducción
automática del navegador.
