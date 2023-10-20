namespace Entidades
{
    export class autoBD extends auto
    {
        public pathFoto : string;


        public constructor(marca : string, patente : string,color : string, precio : number, pathfoto : string) 
        {
            super(marca , patente,color,precio);
            this.pathFoto = pathfoto;

        }

        public ToJson(): JSON {
            const autoJson = {
                ...JSON.parse(this.ToString()), 
                pathfoto: this.pathFoto
            };
        
            return autoJson;
        }



    }
}