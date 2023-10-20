namespace Entidades
{
    export class auto
    {
        public marca : string;
        public patente : string;
        public color : string;
        public precio : number;

        public constructor(marca : string, patente : string,color : string, precio : number)
        {
            this.marca = marca;
            this.patente = patente;
            this.color = color;
            this.precio = precio;
        }

        public ToString(): string {
            const autoJson = {
                marca: this.marca,
                patente: this.patente,
                color: this.color,
                precio: this.precio
            };
        
            return JSON.stringify(autoJson);
        }

    }
}