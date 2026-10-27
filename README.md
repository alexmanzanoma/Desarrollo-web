DESCRIPCIÓN DEL PROYECTO

Metfly es una plataforma web de películas. Tiene tres vistas relacionadas entre sí:

  - Inicio (index.html): portada con una película destacada y un catálogo de
    películas populares.
  - Inicio de sesión (login.html): formulario para entrar con un usuario de prueba.
  - Reseñas (reseña.html): ficha de una película con su calificación y reseñas de
    ejemplo.

En esta tarea, el catálogo y el inicio de sesión pasaron a funcionar con Alpine.js.
Los datos de las películas ya no están escritos en el HTML: se leen desde un archivo
JSON.


TECNOLOGÍAS UTILIZADAS Y CÓMO SE INCORPORA ALPINE.JS

  - HTML, CSS y JavaScript.
  - Bootstrap 5.3.8 (estilos), Bootstrap Icons y Font Awesome, cargados por CDN.
  - Alpine.js 3, cargado por CDN con "defer" en el <head> de index.html y de
    login.html:
      <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

El estado y los métodos de cada componente están en funciones de script.js que
devuelven un objeto, y se conectan al HTML con x-data:

  - Catálogo (index.html):
      en el HTML:       x-data="catalogoPeliculas()" y x-init="cargarDatos()"
      en script.js:     función catalogoPeliculas()

  - Login (login.html):
      en el HTML:       x-data="loginAlpine()"
      en script.js:     función loginAlpine()

Directivas de Alpine utilizadas: x-data, x-init, x-for, :key, x-model, x-show,
x-text, @click, @submit.prevent, :src, :alt, :class y :disabled.


ESTRUCTURA GENERAL DE CARPETAS

index.html        Inicio y catálogo de películas (Alpine.js)
login.html        Inicio de sesión (Alpine.js)
reseña.html       Reseña de una pelicula
script.js         Lógica: catálogo, login, sesión y cierre de sesión
style.css         Estilos propios
peliculas.json    Datos del catálogo
usuarios.json     Usuarios de prueba para el login
img/              Imágenes utilizadas


FUNCIONALIDADES AGREGADAS EN LA TAREA 2


  - Datos separados del HTML: las películas estan en peliculas.json y los usuarios
    en usuarios.json.
  - Carga asíncrona con fetch() al iniciar el catálogo.
  - Listado dinámico con x-for y :key, usando el id de cada película.
  - Búsqueda con x-model: filtra por título mientras se escribe, sin distinguir
    mayúsculas ni minúsculas, y trabaja sobre los datos ya cargados sin volver a
    pedir el JSON.
  - Sección de ayuda que se muestra u oculta con x-show (botón "Ayuda").
  - Detalles de cada película (sinopsis y director) que se muestran u ocultan con
    x-show (botón "Ver detalles" / "Ocultar detalles").
  - Estados de la interfaz: carga en curso, error al cargar el JSON y búsqueda sin
    coincidencias.
  - Formulario interactivo (inicio de sesión) con x-model y @submit.prevent: valida
    que usuario y contraseña no estén vacíos, marca los campos con error y muestra
    un mensaje claro si los datos son válidos o inválidos.


UBICACIÓN Y ESTRUCTURA DEL ARCHIVO JSON

peliculas.json y usuarios,json estan en la raíz del sitio.
http://52.73.99.173/peliculas.json
http://52.73.99.173/usuarios.json

	peliculas.json
  {
    "id": 1,
    "titulo": "Spider-Man: No Way Home",
    "imagen": "img/nowayhomenuevo.png",
    "año": 2021,
    "director": "Jon Watts",
    "sinopsis": "Sinopsis."
  }

Campos:

  id          número   Identificador único (se usa como :key del listado y para
                       abrir los detalles).
  titulo      texto    Nombre que se muestra y sobre el que busca el filtro.
  imagen      texto    Ruta de la imagen.
  año         número   Año de estreno.
  director    texto    Se muestra en los detalles.
  sinopsis    texto    Se muestra en los detalles.

usuarios.json guarda los usuarios del login (_id, nombre, usuarios, password,
activo). Son datos ficticios de prueba.



FLUJO DE CARGA Y FILTRADO DE DATOS


  1. Al abrir index.html, Alpine crea el componente catalogoPeliculas() y ejecuta
     cargarDatos() (por x-init).
  2. cargarDatos() pone cargando = true, pide peliculas.json con fetch() y guarda la
     respuesta en "peliculas". Si algo falla, guarda el mensaje en "error". Al
     terminar pone cargando = false.
  3. La lista se dibuja con x-for sobre peliculasFiltradas, una propiedad calculada.
  4. peliculasFiltradas devuelve todas las películas si el buscador está vacío. Si
     no, devuelve solo las que contienen el texto de "busqueda" en el título
     (comparando en minúsculas).
  5. Cada vez que cambia "busqueda", Alpine recalcula la lista y actualiza la
     pantalla. No se vuelve a pedir el JSON.
  6. Los detalles usan la variable detalleAbierto, que guarda el id de la película
     seleccionada. alternarDetalle(id) la abre o la cierra, y
     x-show="detalleAbierto === pelicula.id" decide qué tarjeta muestra su
     sinopsis.


CÓMO PROBAR CADA PARTE

Abre el sitio por HTTP, no
haciendo doble clic en el archivo.

LISTADO
  Al abrir index.html debe aparecer el texto "Cargando..." un instante y luego
  5 películas.

BÚSQUEDA
  - Escribe "spider": queda 1 película.
  - Escribe "xyz": aparece el mensaje de que no se encontraron películas que
    coincidan.

SECCIÓN QUE SE MUESTRA U OCULTA
  - Pulsa "Ayuda": aparece la explicación del catálogo. Al pulsarlo de nuevo se oculta.
  - Pulsa "Ver detalles" en una película: aparecen su sinopsis y su director, y el
    botón cambia a "Ocultar detalles". Si abres otra película, la anterior se cierra.

FORMULARIO (INICIO DE SESIÓN), en login.html
  - Pulsa "Iniciar sesión" con los campos vacíos: los campos se marcan en rojo con un
    mensaje bajo cada uno y aparece "Completa los campos requeridos."
  - Usa un usuario válido con una contraseña incorrecta: aparece "Usuario o
    contraseña incorrectos."
  - Usa el usuario inactivo "luis" (contraseña "ejemplo789"): también lo rechaza.
  - Usa un usuario activo, por ejemplo "ayudante" con "ayudante" o "profesor" con "profesor": aparece "¡Inicio de
    sesión exitoso! Redirigiendo..." y vuelve al inicio con la sesión iniciada.


CÓMO COMPROBAR EL ESTADO DE ERROR DE CARGA

Con cualquiera de estas dos formas, el catálogo muestra un recuadro rojo con el
mensaje de error en lugar del listado:

  - Renombrar el archivo: cambia el nombre de peliculas.json (por ejemplo a
    peliculas2.json) y recarga la página. Devuélvele su nombre para volver a la
    normalidad.
  - Bloquear la petición: abre las herramientas del navegador (F12), pestaña
    Network, bloquea la URL de peliculas.json ("Block request URL") y recarga.

Para el login, renombra usuarios.json y envía el formulario con datos completos:
aparece "Error al conectar con la base de usuarios."


DIRECCIÓN PÚBLICA UTILIZADA PARA EL DESPLIEGUE

  Sitio:  http://52.73.99.173/login.html
  Datos:  http://52.73.99.173/usuarios.json

Publicado en una instancia EC2 de AWS con Nginx, por HTTP en el puerto 80,
con una Elastic IP asociada a la instancia.


LIMITACIONES CONOCIDAS

  - Qué se pierde al recargar la página: el texto de la búsqueda, la ayuda abierta,
    los detalles abiertos y los mensajes del formulario de login. Todo vuelve a su
    estado inicial.
  - El formulario no guarda registros. El formulario de la aplicación es el de inicio
    de sesión: solo valida y comprueba datos, no agrega ni modifica películas.
  - localStorage: se usa solo para recordar que hay una sesión iniciada
    (usuarioLogeado). Esa información queda guardada en el navegador de cada
    persona, no en el servidor, y se borra al cerrar sesión.
  - El inicio de sesión no es seguridad real. La comprobación se hace en el
    navegador, comparando con usuarios.json, que es un archivo público. Ocultar
    enlaces o secciones con JavaScript tampoco protege nada. Las contraseñas de
    usuarios.json son ficticias, creadas solo para probar la aplicación.
  - Los datos son de solo lectura. Cargar un JSON con fetch() no es una API: no se
    pueden guardar cambios en el servidor.
  - La búsqueda solo considera el título, no el director ni la sinopsis.
  - Datos de ejemplo: los títulos, directores y sinopsis de las películas son
    información pública con fines académicos, sin datos privados. Las reseñas de la
    página reseña.html son textos de ejemplo escritos para el proyecto, no opiniones
    reales.
  - Partes de maqueta: en reseña.html, la sección "Otras películas" y sus botones
    "Ver detalles" son estáticos, y los enlaces "Mi lista", "Mi perfil",
    "¿Olvidaste tu contraseña?" y "Regístrate aquí" todavía no tienen una función
    completa.
