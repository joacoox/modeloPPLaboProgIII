<?php

namespace Joaquin
{

    class auto
    {
  
        public string $marca;
        public string $patente;
        public string $color;
        public float $precio;

        function __construct(string $marca, string $patente, string $color, float $precio )
        {
            $this->marca = $marca;
            $this->patente = $patente;
            $this->color = $color;
            $this->precio = $precio;
        
        }

        
        function ToJSON()
        {
            $retorno = array(
                'marca' => $this->marca,
                'patente' => $this->patente,
                'color' => $this->color,
                'precio' => $this->precio
            );

            return json_encode($retorno, true);
        }

        function guardarJSON($path)
        {
            $obj = new \stdClass();
            $obj->exito = false;
            $obj->mensaje = "Error al guardar.";

            $contenidoActual = file_get_contents($path);

            $archivo = fopen($path, "w");

            $objetosExistente = json_decode($contenidoActual);
            
            $objetosExistente[] = json_decode($this->ToJSON());

            $retorno = file_put_contents($path, json_encode($objetosExistente, JSON_PRETTY_PRINT));

            if($retorno !== false)
            {
                $obj->exito = true;
                $obj->mensaje = "Guardado con éxito.";
            }

            fclose($archivo);
            return json_encode($obj);
        }
        
        
             
        static function traerJSON(string $archivo): array
        {
       
            if (file_exists($archivo)) {
            
                $jsonString = file_get_contents($archivo);     
                $usuarios = json_decode($jsonString , false);
      
                return $usuarios;
            } 

        }
        
        static function verificarautoJSON($patente, $path)
        {
            $retorno = array(
                'éxito' => false,
                'mensaje' => 'El auto no está registrado.'
            );

            $array = auto::traerJSON($path);

            foreach($array as $autoAComprobar)
            {
                if( $autoAComprobar->patente == $patente)
                {
                    $retorno = array(
                        'éxito' => true,
                        'mensaje' => 'El auto esta registrado.'
                    );
                    break;
                }
            }
                  
            return json_encode($retorno);
            
        }

    }
}