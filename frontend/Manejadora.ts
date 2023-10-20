
namespace PrimerParcial
{
    export class Manejadora implements IParte2, IParte3
    {    
        static xhr : XMLHttpRequest = new XMLHttpRequest();

        public static AgregarAutoJSON() 
        {
            
            let form : FormData = Manejadora.PedirDatos();

            Manejadora.xhr.open('POST', "../backend/AltaAutoJSON.php", true);
            
            Manejadora.xhr.send(form);

            Manejadora.xhr.onreadystatechange = function()
            {
                if (Manejadora.xhr.readyState === XMLHttpRequest.DONE)
                {
                    if (Manejadora.xhr.status === 200) 
                    {
                    console.log('Éxito:', Manejadora.xhr.responseText);
                    } 
                    else 
                    {
                    console.error('Error:', Manejadora.xhr.status);
                    }
                }
            };         
        }

      public static MostrarAutosJSON()
      {
          
            Manejadora.xhr.open('GET', '../backend/listadoAutosJSON.php', true);
        
            Manejadora.xhr.onreadystatechange = function () 
            {
            if (Manejadora.xhr.readyState === XMLHttpRequest.DONE) 
            {
                if (Manejadora.xhr.status === 200) {

                const obj_array = JSON.parse(Manejadora.xhr.responseText); 
                
                let div = <HTMLDivElement>document.getElementById("divTabla");
                let tabla = `<table class="table table-hover">
                                <tr>
                                    <th>Marca</th><th>Patente</th><th>Color</th><th>Precio</th>
                                </tr>`;
                            if(obj_array.length < 1){
                                tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td>
                                    <td>---</td></tr>`;
                            }
                            else {
                                for (let index = 0; index < obj_array.length; index++) 
                                {
                                    const dato = obj_array[index];
                                    tabla += `<tr><td>${dato.marca}</td><td>${dato.patente}</td><td>${dato.color}</td><td>${dato.precio}</td></tr>`;
                                }  
                            }
                tabla += `</table>`;
                div.innerHTML = tabla;      

                } else {
            
                console.error('Error:', Manejadora.xhr.status);
                }
            }
            };
    
            Manejadora.xhr.send();
        }
  
        public static VerificarAutoJSON()
        {
        
            let form : FormData = Manejadora.PedirDatos();

            Manejadora.xhr.open('POST', "../backend/verificarAutoJSON.php", true);
            
            Manejadora.xhr.send(form);

            Manejadora.xhr.onreadystatechange = function()
            {
                if (Manejadora.xhr.readyState === XMLHttpRequest.DONE)
                {
                    if (Manejadora.xhr.status === 200) 
                    {
                    console.log('Éxito: ', Manejadora.xhr.responseText);
                    alert('Éxito: '+ Manejadora.xhr.responseText);
                    } 
                    else 
                    {
                    console.error('Error: ', Manejadora.xhr.status);
                    alert('Error: '+ Manejadora.xhr.status);
                    }
                }
            };
            
        }

        public static AgregarAutoSinFoto()
        {                          
            Manejadora.xhr.open('POST', "../backend/agregarAutoSinFoto.php", true);

            let formData : FormData = Manejadora.PedirDatos();

            let info: string = '{"marca":"' + formData.get("marca") + '","patente":"' + formData.get("patente") + '","color":"' + formData.get("color") + '","precio":"' + formData.get("precio") + '"}';
            let form : FormData = new FormData();
            form.append('auto_json', info);

            Manejadora.xhr.send(form);

            Manejadora.xhr.onreadystatechange = function()
            {
                if (Manejadora.xhr.readyState === XMLHttpRequest.DONE)
                {
                    if (Manejadora.xhr.status === 200) 
                    {
                    console.log('Éxito: ', Manejadora.xhr.responseText);
                    alert('Éxito: '+ Manejadora.xhr.responseText);
                    } 
                    else 
                    {
                    console.error('Error: ', Manejadora.xhr.status);
                    alert('Error: '+ Manejadora.xhr.status);
                    }
                }
            };
        }

        public static MostrarAutosBD() : void
        {
            Manejadora.xhr.open('GET', '../backend/listadoAutosBD.php?tabla=mostrar', true);
         
            Manejadora.xhr.send();

            Manejadora.xhr.onreadystatechange = function () 
            {
            if (Manejadora.xhr.readyState === XMLHttpRequest.DONE) 
            {
                if (Manejadora.xhr.status === 200) {

                let retorno = Manejadora.xhr.responseText;      
                let div = <HTMLDivElement>document.getElementById("divTabla");        
                div.innerHTML = retorno;  

                } else {
            
                console.error('Error:', Manejadora.xhr.status);
                }
            }
            };
        }
       
        static EliminarAuto(auto : any): void
        {                
            let info: string = '{"marca":"' + auto.marca + '","patente":"' + auto.patente + '","color":"' + auto.color + '","precio":"' + auto.precio + '"}';
            let form : FormData = new FormData();
            form.append('auto_json', info);
            const confirmacion = confirm(`¿Seguro que deseas eliminar el auto de patente ${auto.patente} y marca ${auto.marca}?`);
            if(confirmacion)
            {
                let form : FormData = new FormData();
                form.append('auto_json', info);

                Manejadora.xhr.open('POST', "../backend/eliminarAutoBD.php", true);          
                Manejadora.xhr.send(form);
                Manejadora.xhr.onreadystatechange = function()
                {
                    if (Manejadora.xhr.readyState === XMLHttpRequest.DONE)
                    {
                        if (Manejadora.xhr.status === 200) 
                        {
                            console.log('Éxito: ', Manejadora.xhr.responseText);
                            alert('Éxito: '+ Manejadora.xhr.responseText);
                            Manejadora.MostrarAutosBD();
                        } 
                        else 
                        {
                        console.error('Error: ', Manejadora.xhr.status);
                        alert('Error: '+ Manejadora.xhr.status);
                        }
                    }
                };
            }       
        }
        
        static ModificarAuto(auto : any): void
        {
            
            let formData : FormData = Manejadora.PedirDatos();

            let info = {
                marca: formData.get("marca"),
                patente: auto.patente,
                color: formData.get("color"),
                precio: formData.get("precio")
              };       
              
            let infoString = JSON.stringify(info);
            let form : FormData = new FormData();
            form.append('auto_json', infoString);

            Manejadora.xhr.open('POST', "../backend/modificarAutoBD.php", true);          
            Manejadora.xhr.send(form);
            Manejadora.xhr.onreadystatechange = function()
            {
                if (Manejadora.xhr.readyState === XMLHttpRequest.DONE)
                {
                    if (Manejadora.xhr.status === 200) 
                    {
                        console.log('Éxito: ', Manejadora.xhr.responseText);
                        alert('Éxito: '+ Manejadora.xhr.responseText);
                        Manejadora.MostrarAutosBD();
                    } 
                    else 
                    {
                    console.error('Error: ', Manejadora.xhr.status);
                    alert('Error: '+ Manejadora.xhr.status);
                    }
                }
            };
        }

        static  VerificarAutoBD(): void
        {
            let patenteInput: HTMLInputElement = <HTMLInputElement>document.getElementById("patente");
            let patente: string = patenteInput.value;

            let info = {
                patente: patente
            };      

            let infoString = JSON.stringify(info);
            let form : FormData = new FormData();
            form.append('obj_auto', infoString);

            Manejadora.xhr.open('POST', "../backend/verificarAutoBD.php", true);          
            Manejadora.xhr.send(form);
            Manejadora.xhr.onreadystatechange = function()
            {
                if (Manejadora.xhr.readyState === XMLHttpRequest.DONE)
                {
                    if (Manejadora.xhr.status === 200) 
                    {
                        console.log('Éxito: ', Manejadora.xhr.responseText);
                        alert('Éxito: '+ Manejadora.xhr.responseText);
                    } 
                    else 
                    {
                    console.error('Error: ', Manejadora.xhr.status);
                    alert('Error: '+ Manejadora.xhr.status);
                    }
                }
            };
        }
        static AgregarAutoFoto(): void
        {
            let formData : FormData = Manejadora.PedirDatos();
            let foto: any = (<HTMLInputElement>document.getElementById("imagen"));

            if (foto.files && foto.files[0])
            {
                formData.append('foto', foto.files[0]);
                Manejadora.xhr.open('POST', "../backend/agregarAutoBD.php", true); 
                Manejadora.xhr.send(formData);
                Manejadora.xhr.onreadystatechange = function()
                {
                    if (Manejadora.xhr.readyState === XMLHttpRequest.DONE)
                    {
                        if (Manejadora.xhr.status === 200) 
                        {
                        console.log('Éxito: ', Manejadora.xhr.responseText);
                        alert('Éxito: '+ Manejadora.xhr.responseText);
                        } 
                        else 
                        {
                        console.error('Error: ', Manejadora.xhr.status);
                        alert('Error: '+ Manejadora.xhr.status);
                        }
                    }
                };
            }else
            {
                Manejadora.AgregarAutoSinFoto();
            }
          
        }

        static BorrarAutoFoto(auto : any): void 
        {                 
            const confirmacion = confirm(`¿Seguro que deseas eliminar el auto de patente ${auto.patente} y marca ${auto.marca}?`);

            if(confirmacion)
            {
                let info = {
                    marca: auto.marca,
                    patente: auto.patente,
                    color: auto.color,
                    precio: auto.precio,
                    foto: auto.foto
                }; 

                let form : FormData = new FormData();
                form.append('auto_json', JSON.stringify(info));

                Manejadora.xhr.open('POST', "../backend/eliminarAutoBDFoto.php", true);          
                Manejadora.xhr.send(form);
                Manejadora.xhr.onreadystatechange = function()
                {
                    if (Manejadora.xhr.readyState === XMLHttpRequest.DONE)
                    {
                        if (Manejadora.xhr.status === 200) 
                        {
                            console.log('Éxito: ', Manejadora.xhr.responseText);
                            alert('Éxito: '+ Manejadora.xhr.responseText);
                            Manejadora.MostrarAutosBD();
                        } 
                        else 
                        {
                        console.error('Error: ', Manejadora.xhr.status);
                        alert('Error: '+ Manejadora.xhr.status);
                        }
                    }
                };
            }   
        }
        static ModificarAutoBDFoto(auto : any): void 
        { 
            let foto: any = (<HTMLInputElement>document.getElementById("imagen"));

            if (foto.files && foto.files[0])
            {
                let form : FormData = new FormData();
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
                Manejadora.xhr.onreadystatechange = function()
                {
                    if (Manejadora.xhr.readyState === XMLHttpRequest.DONE)
                    {
                        if (Manejadora.xhr.status === 200) 
                        {
                            console.log('Éxito: ', Manejadora.xhr.responseText);
                            alert('Éxito: '+ Manejadora.xhr.responseText);
                            Manejadora.MostrarAutosBD();
                        } 
                        else 
                        {
                        console.error('Error: ', Manejadora.xhr.status);
                        alert('Error: '+ Manejadora.xhr.status);
                        }
                    }
                };
            }
        }       

        private static PedirDatos() 
        {
            let marcaInput: HTMLInputElement = <HTMLInputElement>document.getElementById("marca");
            let patenteInput: HTMLInputElement = <HTMLInputElement>document.getElementById("patente");
            let colorInput: HTMLInputElement = <HTMLInputElement>document.getElementById("color");
            let precioInput: HTMLInputElement = <HTMLInputElement>document.getElementById("precio");
            
            let marca: string = marcaInput.value;
            let patente: string = patenteInput.value;
            let color: string = colorInput.value;
            let precio: string = precioInput.value;
    
            let form : FormData = new FormData()
            form.append('marca', marca);
            form.append('patente', patente);
            form.append('color', color);
            form.append('precio', precio);

            return form;
           
        }

        public static Eliminar(auto : any)
        {
            
            if (auto.foto == null || auto.foto == "" || auto.foto == 0) 
            {
                Manejadora.EliminarAuto(auto);
            }else
            {
                Manejadora.BorrarAutoFoto(auto);
            }
        }

    }
}