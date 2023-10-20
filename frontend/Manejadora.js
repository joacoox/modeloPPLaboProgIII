"use strict";
var PrimerParcial;
(function (PrimerParcial) {
    class Manejadora {
        static AgregarAutoJSON() {
            let form = Manejadora.PedirDatos();
            Manejadora.xhr.open('POST', "../backend/AltaAutoJSON.php", true);
            Manejadora.xhr.send(form);
            Manejadora.xhr.onreadystatechange = function () {
                if (Manejadora.xhr.readyState === XMLHttpRequest.DONE) {
                    if (Manejadora.xhr.status === 200) {
                        console.log('Éxito:', Manejadora.xhr.responseText);
                    }
                    else {
                        console.error('Error:', Manejadora.xhr.status);
                    }
                }
            };
        }
        static MostrarAutosJSON() {
            Manejadora.xhr.open('GET', '../backend/listadoAutosJSON.php', true);
            Manejadora.xhr.onreadystatechange = function () {
                if (Manejadora.xhr.readyState === XMLHttpRequest.DONE) {
                    if (Manejadora.xhr.status === 200) {
                        const obj_array = JSON.parse(Manejadora.xhr.responseText);
                        let div = document.getElementById("divTabla");
                        let tabla = `<table class="table table-hover">
                                <tr>
                                    <th>Marca</th><th>Patente</th><th>Color</th><th>Precio</th>
                                </tr>`;
                        if (obj_array.length < 1) {
                            tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td>
                                    <td>---</td></tr>`;
                        }
                        else {
                            for (let index = 0; index < obj_array.length; index++) {
                                const dato = obj_array[index];
                                tabla += `<tr><td>${dato.marca}</td><td>${dato.patente}</td><td>${dato.color}</td><td>${dato.precio}</td></tr>`;
                            }
                        }
                        tabla += `</table>`;
                        div.innerHTML = tabla;
                    }
                    else {
                        console.error('Error:', Manejadora.xhr.status);
                    }
                }
            };
            Manejadora.xhr.send();
        }
        static VerificarAutoJSON() {
            let form = Manejadora.PedirDatos();
            Manejadora.xhr.open('POST', "../backend/verificarAutoJSON.php", true);
            Manejadora.xhr.send(form);
            Manejadora.xhr.onreadystatechange = function () {
                if (Manejadora.xhr.readyState === XMLHttpRequest.DONE) {
                    if (Manejadora.xhr.status === 200) {
                        console.log('Éxito: ', Manejadora.xhr.responseText);
                        alert('Éxito: ' + Manejadora.xhr.responseText);
                    }
                    else {
                        console.error('Error: ', Manejadora.xhr.status);
                        alert('Error: ' + Manejadora.xhr.status);
                    }
                }
            };
        }
        static AgregarAutoSinFoto() {
            Manejadora.xhr.open('POST', "../backend/agregarAutoSinFoto.php", true);
            let formData = Manejadora.PedirDatos();
            let info = '{"marca":"' + formData.get("marca") + '","patente":"' + formData.get("patente") + '","color":"' + formData.get("color") + '","precio":"' + formData.get("precio") + '"}';
            let form = new FormData();
            form.append('auto_json', info);
            Manejadora.xhr.send(form);
            Manejadora.xhr.onreadystatechange = function () {
                if (Manejadora.xhr.readyState === XMLHttpRequest.DONE) {
                    if (Manejadora.xhr.status === 200) {
                        console.log('Éxito: ', Manejadora.xhr.responseText);
                        alert('Éxito: ' + Manejadora.xhr.responseText);
                    }
                    else {
                        console.error('Error: ', Manejadora.xhr.status);
                        alert('Error: ' + Manejadora.xhr.status);
                    }
                }
            };
        }
        static MostrarAutosBD() {
            Manejadora.xhr.open('GET', '../backend/listadoAutosBD.php?tabla=mostrar', true);
            Manejadora.xhr.send();
            Manejadora.xhr.onreadystatechange = function () {
                if (Manejadora.xhr.readyState === XMLHttpRequest.DONE) {
                    if (Manejadora.xhr.status === 200) {
                        let retorno = Manejadora.xhr.responseText;
                        let div = document.getElementById("divTabla");
                        div.innerHTML = retorno;
                    }
                    else {
                        console.error('Error:', Manejadora.xhr.status);
                    }
                }
            };
        }
        static EliminarAuto(auto) {
            let info = '{"marca":"' + auto.marca + '","patente":"' + auto.patente + '","color":"' + auto.color + '","precio":"' + auto.precio + '"}';
            let form = new FormData();
            form.append('auto_json', info);
            const confirmacion = confirm(`¿Seguro que deseas eliminar el auto de patente ${auto.patente} y marca ${auto.marca}?`);
            if (confirmacion) {
                let form = new FormData();
                form.append('auto_json', info);
                Manejadora.xhr.open('POST', "../backend/eliminarAutoBD.php", true);
                Manejadora.xhr.send(form);
                Manejadora.xhr.onreadystatechange = function () {
                    if (Manejadora.xhr.readyState === XMLHttpRequest.DONE) {
                        if (Manejadora.xhr.status === 200) {
                            console.log('Éxito: ', Manejadora.xhr.responseText);
                            alert('Éxito: ' + Manejadora.xhr.responseText);
                            Manejadora.MostrarAutosBD();
                        }
                        else {
                            console.error('Error: ', Manejadora.xhr.status);
                            alert('Error: ' + Manejadora.xhr.status);
                        }
                    }
                };
            }
        }
        static ModificarAuto(auto) {
            let formData = Manejadora.PedirDatos();
            let info = {
                marca: formData.get("marca"),
                patente: auto.patente,
                color: formData.get("color"),
                precio: formData.get("precio")
            };
            let infoString = JSON.stringify(info);
            let form = new FormData();
            form.append('auto_json', infoString);
            Manejadora.xhr.open('POST', "../backend/modificarAutoBD.php", true);
            Manejadora.xhr.send(form);
            Manejadora.xhr.onreadystatechange = function () {
                if (Manejadora.xhr.readyState === XMLHttpRequest.DONE) {
                    if (Manejadora.xhr.status === 200) {
                        console.log('Éxito: ', Manejadora.xhr.responseText);
                        alert('Éxito: ' + Manejadora.xhr.responseText);
                        Manejadora.MostrarAutosBD();
                    }
                    else {
                        console.error('Error: ', Manejadora.xhr.status);
                        alert('Error: ' + Manejadora.xhr.status);
                    }
                }
            };
        }
        static VerificarAutoBD() {
            let patenteInput = document.getElementById("patente");
            let patente = patenteInput.value;
            let info = {
                patente: patente
            };
            let infoString = JSON.stringify(info);
            let form = new FormData();
            form.append('obj_auto', infoString);
            Manejadora.xhr.open('POST', "../backend/verificarAutoBD.php", true);
            Manejadora.xhr.send(form);
            Manejadora.xhr.onreadystatechange = function () {
                if (Manejadora.xhr.readyState === XMLHttpRequest.DONE) {
                    if (Manejadora.xhr.status === 200) {
                        console.log('Éxito: ', Manejadora.xhr.responseText);
                        alert('Éxito: ' + Manejadora.xhr.responseText);
                    }
                    else {
                        console.error('Error: ', Manejadora.xhr.status);
                        alert('Error: ' + Manejadora.xhr.status);
                    }
                }
            };
        }
        static AgregarAutoFoto() {
            let formData = Manejadora.PedirDatos();
            let foto = document.getElementById("imagen");
            if (foto.files && foto.files[0]) {
                formData.append('foto', foto.files[0]);
                Manejadora.xhr.open('POST', "../backend/agregarAutoBD.php", true);
                Manejadora.xhr.send(formData);
                Manejadora.xhr.onreadystatechange = function () {
                    if (Manejadora.xhr.readyState === XMLHttpRequest.DONE) {
                        if (Manejadora.xhr.status === 200) {
                            console.log('Éxito: ', Manejadora.xhr.responseText);
                            alert('Éxito: ' + Manejadora.xhr.responseText);
                        }
                        else {
                            console.error('Error: ', Manejadora.xhr.status);
                            alert('Error: ' + Manejadora.xhr.status);
                        }
                    }
                };
            }
            else {
                Manejadora.AgregarAutoSinFoto();
            }
        }
        static BorrarAutoFoto(auto) {
            const confirmacion = confirm(`¿Seguro que deseas eliminar el auto de patente ${auto.patente} y marca ${auto.marca}?`);
            if (confirmacion) {
                let info = {
                    marca: auto.marca,
                    patente: auto.patente,
                    color: auto.color,
                    precio: auto.precio,
                    foto: auto.foto
                };
                let form = new FormData();
                form.append('auto_json', JSON.stringify(info));
                Manejadora.xhr.open('POST', "../backend/eliminarAutoBDFoto.php", true);
                Manejadora.xhr.send(form);
                Manejadora.xhr.onreadystatechange = function () {
                    if (Manejadora.xhr.readyState === XMLHttpRequest.DONE) {
                        if (Manejadora.xhr.status === 200) {
                            console.log('Éxito: ', Manejadora.xhr.responseText);
                            alert('Éxito: ' + Manejadora.xhr.responseText);
                            Manejadora.MostrarAutosBD();
                        }
                        else {
                            console.error('Error: ', Manejadora.xhr.status);
                            alert('Error: ' + Manejadora.xhr.status);
                        }
                    }
                };
            }
        }
        static ModificarAutoBDFoto(auto) {
            let foto = document.getElementById("imagen");
            if (foto.files && foto.files[0]) {
                let form = new FormData();
                alert(auto.patente);
                let info = {
                    marca: auto.marca,
                    patente: auto.patente,
                    color: auto.color,
                    precio: auto.precio,
                    foto: foto.files[0]
                };
                form.append('auto_json', JSON.stringify(info));
                Manejadora.xhr.open('POST', "../backend/modificarAutoBDFoto.php", true);
                Manejadora.xhr.send(form);
                Manejadora.xhr.onreadystatechange = function () {
                    if (Manejadora.xhr.readyState === XMLHttpRequest.DONE) {
                        if (Manejadora.xhr.status === 200) {
                            console.log('Éxito: ', Manejadora.xhr.responseText);
                            alert('Éxito: ' + Manejadora.xhr.responseText);
                            Manejadora.MostrarAutosBD();
                        }
                        else {
                            console.error('Error: ', Manejadora.xhr.status);
                            alert('Error: ' + Manejadora.xhr.status);
                        }
                    }
                };
            }
        }
        static PedirDatos() {
            let marcaInput = document.getElementById("marca");
            let patenteInput = document.getElementById("patente");
            let colorInput = document.getElementById("color");
            let precioInput = document.getElementById("precio");
            let marca = marcaInput.value;
            let patente = patenteInput.value;
            let color = colorInput.value;
            let precio = precioInput.value;
            let form = new FormData();
            form.append('marca', marca);
            form.append('patente', patente);
            form.append('color', color);
            form.append('precio', precio);
            return form;
        }
        static Eliminar(auto) {
            if (auto.foto == null || auto.foto == "" || auto.foto == 0) {
                Manejadora.EliminarAuto(auto);
            }
            else {
                Manejadora.BorrarAutoFoto(auto);
            }
        }
    }
    Manejadora.xhr = new XMLHttpRequest();
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=Manejadora.js.map