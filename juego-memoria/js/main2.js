const MAXIMOS_INTENTOS = 5,
    COLUMNAS = 4,
    SEGUNDOS_ESPERA_VOLTEAR_IMAGEN = 1,
    NOMBRE_IMAGEN_OCULTA = "https://i.postimg.cc/02Cmh8R4/bloquear.png";
new Vue({
    el: "#app",
    data: () => ({
        imagenes: [
            "https://i.postimg.cc/jjHR31Ps/hongo-rojo.webp",
            "https://i.postimg.cc/13NmwXzV/hongo-verde.webp",
            "https://i.postimg.cc/XvSV8WZH/princess-peach.png",
            "https://i.postimg.cc/zBq8skFT/yoshi.png",
            "https://i.postimg.cc/Bb6s6Qy6/Luigi.png",
            "https://i.postimg.cc/hjMcc726/mariobros.png",
        ],
        memorama: [],
        ultimasCoordenadas: {
            indiceFila: null,
            indiceImagen: null,
        },
        NOMBRE_IMAGEN_OCULTA: NOMBRE_IMAGEN_OCULTA,
        MAXIMOS_INTENTOS: MAXIMOS_INTENTOS,
        intentos: 0,
        aciertos: 0,
        esperandoTimeout: false,
    }),
    methods: {
        mostrarCreditos() {
            Swal.fire({
                title: "Acerca de",
                html: `Creado por <a href="//parzibyte.me/blog">Luis Cabrera Benito</a>
                <br>
                <strong>Créditos</strong>
                <br>
                Imagen de signo de interrogación: 
                <div>Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> 
                    from <a rel="nofollow" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> 
                    is licensed by 
                    <a rel="nofollow" href="http://creativecommons.org/licenses/by/3.0/" 
                    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
                </div>
                `,
                confirmButtonText: "Cerrar",
                allowOutsideClick: false,
                allowEscapeKey: false,
            });
        },
        indicarFracaso() {
            Swal.fire({
                title: "Perdiste",
                html: `
                <img class="img-fluid" src="./gif/lost.gif" alt="Perdiste">
                <p class="h4">Agotaste tus intentos</p>`,
                confirmButtonText: "Jugar de nuevo",
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
                .then(this.reiniciarJuego)
        },
        indicarVictoria() {
            Swal.fire({
                title: "¡Ganaste!",
                html: `
                <img class="img-fluid" src="./gif/win.gif" alt="Ganaste">
                <p class="h4">Muy bien hecho</p>`,
                confirmButtonText: "Jugar de nuevo",
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
                .then(this.reiniciarJuego)
        },
        haGanado() {
            return this.memorama.every(arreglo => arreglo.every(imagen => imagen.acertada));
        },
        mezclarArreglo(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        },
        aumentarIntento() {
            this.intentos++;
            if (this.intentos >= MAXIMOS_INTENTOS) {
                this.indicarFracaso();
            }
        },
        voltear(indiceFila, indiceImagen) {
            if (this.esperandoTimeout) {
                return;
            }
            if (this.memorama[indiceFila][indiceImagen].acertada) {
                return;
            }
            if (this.ultimasCoordenadas.indiceFila === null && this.ultimasCoordenadas.indiceImagen === null) {
                this.memorama[indiceFila][indiceImagen].mostrar = true;
                this.ultimasCoordenadas.indiceFila = indiceFila;
                this.ultimasCoordenadas.indiceImagen = indiceImagen;
                return;
            }
            let imagenSeleccionada = this.memorama[indiceFila][indiceImagen];
            let ultimaImagenSeleccionada = this.memorama[this.ultimasCoordenadas.indiceFila][this.ultimasCoordenadas.indiceImagen];
            if (indiceFila === this.ultimasCoordenadas.indiceFila &&
                indiceImagen === this.ultimasCoordenadas.indiceImagen) {
                this.memorama[indiceFila][indiceImagen].mostrar = false;
                this.ultimasCoordenadas.indiceFila = null;
                this.ultimasCoordenadas.indiceImagen = null;
                this.aumentarIntento();
                return;
            }

            this.memorama[indiceFila][indiceImagen].mostrar = true;
            if (imagenSeleccionada.ruta === ultimaImagenSeleccionada.ruta) {
                this.aciertos++;
                this.memorama[indiceFila][indiceImagen].acertada = true;
                this.memorama[this.ultimasCoordenadas.indiceFila][this.ultimasCoordenadas.indiceImagen].acertada = true;
                this.ultimasCoordenadas.indiceFila = null;
                this.ultimasCoordenadas.indiceImagen = null;
                if (this.haGanado()) {
                    this.indicarVictoria();
                }
            } else {
                this.esperandoTimeout = true;
                setTimeout(() => {
                    this.memorama[indiceFila][indiceImagen].mostrar = false;
                    this.memorama[indiceFila][indiceImagen].animacion = false;
                    this.memorama[this.ultimasCoordenadas.indiceFila][this.ultimasCoordenadas.indiceImagen].mostrar = false;
                    this.ultimasCoordenadas.indiceFila = null;
                    this.ultimasCoordenadas.indiceImagen = null;
                    this.esperandoTimeout = false;
                }, SEGUNDOS_ESPERA_VOLTEAR_IMAGEN * 1000);
                this.aumentarIntento();
            }
        },
        reiniciarJuego() {
            let memorama = [];
            this.imagenes.forEach((imagen, indice) => {
                let imagenDeMemorama = {
                    ruta: imagen,
                    mostrar: false,
                    acertada: false,
                };
                memorama.push(imagenDeMemorama, Object.assign({}, imagenDeMemorama));
            });

            this.mezclarArreglo(memorama);

            let memoramaDividido = [];
            for (let i = 0; i < memorama.length; i += COLUMNAS) {
                memoramaDividido.push(memorama.slice(i, i + COLUMNAS));
            }
            this.intentos = 0;
            this.aciertos = 0;
            this.memorama = memoramaDividido;
        },
        precargarImagenes() {
            Swal.fire({
                title: "Cargando",
                html: `Cargando imágenes...`,
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
                .then(this.reiniciarJuego)
            Swal.showLoading();

            let total = this.imagenes.length,
                contador = 0;
            let imagenesPrecarga = Array.from(this.imagenes);
            imagenesPrecarga.push(NOMBRE_IMAGEN_OCULTA);
            imagenesPrecarga.forEach(ruta => {
                const imagen = document.createElement("img");
                imagen.src = ruta;
                imagen.addEventListener("load", () => {
                    contador++;
                    if (contador >= total) {
                        this.reiniciarJuego();
                        Swal.close();
                    }
                });
                document.body.appendChild(imagen);
                document.body.removeChild(imagen);
            });
        },
    },
    mounted() {
        this.precargarImagenes();
    },
});

const select = document.getElementById('exampleSelect');

select.addEventListener('change', function () {
    const selectedValue = this.value;
    if (selectedValue == 'futbol') {
        document.body.classList.add('smooth-scrolling');
        setTimeout(() => {
            window.location.href = './index.html';
        }, 1000); 

        // Opcionalmente, puedes agregar código para eliminar la clase después de la transición
        // Esto depende de cómo estés manejando el cambio de página
        setTimeout(() => {
            document.body.classList.remove('smooth-scrolling');
        }, 1100); // Eliminar la clase después de 1.1 segundos
    } else if (selectedValue == 'mario') {
        document.body.classList.add('smooth-scrolling');
        setTimeout(() => {
            window.location.href = './mario.html';
        }, 1000); 

        // Opcionalmente, puedes agregar código para eliminar la clase después de la transición
        // Esto depende de cómo estés manejando el cambio de página
        setTimeout(() => {
            document.body.classList.remove('smooth-scrolling');
        }, 1100); // Eliminar la clase después de 1.1 segundos
    }
});