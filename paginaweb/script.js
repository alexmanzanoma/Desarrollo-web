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


function procesarLogin(event) {
    event.preventDefault(); 

    const emailIngresado = document.getElementById('email').value;
    const passwordIngresada = document.getElementById('password').value;


    if (emailIngresado === 'admin@admin' && passwordIngresada === 'admin') {

        localStorage.setItem('usuarioLogeado', 'true');

        window.location.href = 'index.html'; 
    } else {

        alert('Correo o contraseña incorrectos. Intenta nuevamente.');
    }
}


function simularLogout(event) {
    event.preventDefault(); 
    

    localStorage.removeItem('usuarioLogeado');
    

    window.location.href = 'index.html'; 
}

function filtrarPeliculas() {

    const textoBusqueda = document.getElementById('buscador').value.toLowerCase();
    

    const listaTarjetas = document.querySelectorAll('.seccion-catalogo .col-md-3');

    listaTarjetas.forEach(tarjeta => {
        const tituloElemento = tarjeta.querySelector('.title');
        if (tituloElemento) {
            const tituloTexto = tituloElemento.textContent.toLowerCase();


            if (tituloTexto.includes(textoBusqueda)) {
                tarjeta.style.display = "";
            } else {
                tarjeta.style.display = "none";
            }
        }
    });
}


function mostrarMensajeLista() {
    alert("¡'Avengers: Endgame Encore' se ha añadido a tu lista personal exitosamente!");
}
