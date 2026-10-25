document.addEventListener('DOMContentLoaded', verificarEstadoSesion);

function verificarEstadoSesion() {
    const estaLogeado = localStorage.getItem('usuarioLogeado') === 'true';
    const login = document.getElementById('login');
    const milista = document.getElementById('milista');
    const miperfil = document.getElementById('miperfil');
    const logout = document.getElementById('logout');
    const btnMiLista = document.getElementById('btnMiLista'); 

    if (login && milista && miperfil && logout) {
        if (estaLogeado) {
            login.style.display = 'none';
            milista.style.display = 'inline-block';
            miperfil.style.display = 'inline-block';
            logout.style.display = 'inline-block';
            if (btnMiLista) btnMiLista.style.display = 'inline-block';
        } else {

            login.style.display = 'inline-block';
            milista.style.display = 'none';
            miperfil.style.display = 'none';
            logout.style.display = 'none';
            if (btnMiLista) btnMiLista.style.display = 'none';
        }
    }
}


function simularLogout(event) {
    event.preventDefault(); 
    

    localStorage.removeItem('usuarioLogeado');
    

    window.location.href = 'index.html'; 
}

function catalogoPeliculas() {
    return {
        peliculas: [],      // Aquí se guardarán las películas del JSON
        busqueda: '',       // Conectado al buscador con x-model
        cargando: true,     // Estado de carga (Punto 08 de la entrega)
        error: null,        // Estado de error (Punto 08 de la entrega)
        mostrarAyuda: false,// Para la sección de ayuda con x-show (Punto 06)
        detalleAbierto: null,

        // Esta función la llamaremos automáticamente al abrir la página
        alternarDetalle(id) {
        this.detalleAbierto = (this.detalleAbierto === id) ? null : id;
        },
        async cargarDatos() {
            this.cargando = true;
            this.error = null;
            try {
                const respuesta = await fetch('peliculas.json');
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar el archivo peliculas.json');
                }
                this.peliculas = await respuesta.json();
            } catch (err) {
                this.error = err.message;
            } finally {
                this.cargando = false;
            }
        },

        // Filtra automáticamente las películas según lo que se escriba en el buscador
        get peliculasFiltradas() {
            if (this.busqueda.trim() === '') {
                return this.peliculas;
            }
            return this.peliculas.filter(peli =>
                peli.titulo.toLowerCase().includes(this.busqueda.toLowerCase())
            );
        }
    }
}


function mostrarMensajeLista() {
    alert("¡'Avengers: Endgame Encore' se ha añadido a tu lista personal exitosamente!");
}


function loginAlpine() {
    return {
        usuario: '',
        password: '',
        mensaje: '',
        exito: false,
        cargando: false,
        errores: {},

        validar() {
            const e = {};
            if (!this.usuario.trim()) e.usuario = 'Ingresa tu usuario.';
            if (!this.password) e.password = 'Ingresa tu contraseña.';
            this.errores = e;
            return Object.keys(e).length === 0;
        },

        async iniciarSesion() {
            this.mensaje = '';
            if (!this.validar()) {
                this.exito = false;
                this.mensaje = 'Completa los campos requeridos.';
                return;
            }

            this.cargando = true;
            try {
                const respuesta = await fetch('usuarios.json');
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar usuarios.json');
                }
                const usuarios = await respuesta.json();

                const encontrado = usuarios.find(u =>
                    u.usuarios === this.usuario.trim() &&
                    u.password === this.password &&
                    u.activo === true
                );

                if (encontrado) {
                    this.exito = true;
                    this.mensaje = '¡Inicio de sesión exitoso! Redirigiendo...';
                    localStorage.setItem('usuarioLogeado', 'true');
                    setTimeout(() => window.location.href = 'index.html', 1000);
                } else {
                    this.exito = false;
                    this.mensaje = 'Usuario o contraseña incorrectos.';
                    this.password = '';
                }
            } catch (error) {
                this.exito = false;
                this.mensaje = 'Error al conectar con la base de usuarios.';
            } finally {
                this.cargando = false;
            }
        }
    }
}
