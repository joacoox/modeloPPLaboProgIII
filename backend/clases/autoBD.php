<?php
namespace Joaquin
{
    require_once("accesoDatos.php");
    require_once("auto.php");
    require_once("interface_parte1.php");    
    require_once("interface_parte2.php");
    require_once("interface_parte3.php");
   
    use IParte1;
    Use Exception;
    use IParte2;
    use IParte3;
    use PDOException;
    use Poo\AccesoDatos;
    use PDO;

    class autoBD extends auto implements IParte1 , IParte2, IParte3
    {
       
        public string $pathFoto;
     

        function __construct(string $marca, string $patente, string $color, float $precio = 0, string $pathFoto = "")
        {
            parent::__construct($marca, $patente,$color,  $precio);
            $this->pathFoto = $pathFoto;            
        }

        function ToJSON()
        {
            $retorno = array(
                'marca' => $this->marca,
                'patente' => $this->patente,
                'color' => $this->color,
                'precio' => $this->precio,
                'pathFoto' => $this->pathFoto
            );

            return json_encode($retorno, true);
        }

        function agregar(): bool
        {
            $retorno = false;
    
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            
            $consulta =$objetoAccesoDato->retornarConsulta("INSERT INTO autos ( marca, patente, color,  precio, foto)"
                                                        . "VALUES(:marca, :patente,:color,:precio, :foto)");
            
            
            $consulta->bindValue(':marca', $this->marca, PDO::PARAM_STR);
            $consulta->bindValue(':patente', $this->patente, PDO::PARAM_STR);
            $consulta->bindValue(':color', $this->color, PDO::PARAM_STR);
            $consulta->bindValue(':precio', $this->precio, PDO::PARAM_STR);
            $consulta->bindValue(':foto', $this->pathFoto, PDO::PARAM_STR);
        

            $consulta->execute();

            if($consulta->rowCount() != 0)
            {
                $retorno = true;
            }
    
            return $retorno;
           
        }

        public static function traer(): array
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta = $objetoAccesoDato->retornarConsulta("SELECT marca, patente, color, precio, foto FROM autos");
            $consulta->execute();

            $autos = [];

            while ($row = $consulta->fetch(PDO::FETCH_ASSOC)) 
            {
                $auto = new autoBD($row["marca"], $row["patente"],$row["color"], $row["precio"] );

                if ($row["foto"] != null) 
                {
                $auto->pathFoto = $row["foto"];
                }

                $autos[] = $auto;
            }

            return $autos;
        }

        public static function eliminar($patente): bool
        {
            try
            {       
                $pdo = new PDO("mysql:host=localhost;dbname=garage_bd", "root",""); 
                $sql = $pdo->prepare("DELETE FROM `autos` WHERE patente = :patente");
                $sql->bindParam(":patente",$patente, PDO::PARAM_STR,20);
    
                if($sql->execute())
                {
                    echo "todo ok";
                    return true;
                }else
                {
                    echo "todo no ok";
                    return false;
                }
                   
            }catch(PDOException $exc)
            {
                echo $exc->getMessage() . "<br>";
                return false;
            }
        }



        function modificar(): bool
        {
            try
            {
                
                $pdo = new PDO("mysql:host=localhost;dbname=garage_bd", "root",""); 
    
                $sql = $pdo->prepare("UPDATE `autos` SET 
                `marca`=:marca,`color`=:color,`precio`=:precio,
                `foto`=:foto WHERE patente = :patente");
    
                $sql->bindParam(":marca",$this->marca, PDO::PARAM_STR,30);
                $sql->bindParam(":color",$this->color, PDO::PARAM_STR,20);
                $sql->bindParam(":precio",$this->precio, PDO::PARAM_STR,20);
                $sql->bindParam(":foto",$this->pathFoto, PDO::PARAM_INT);
                $sql->bindParam(":patente",$this->patente, PDO::PARAM_STR,20);
    
                if($sql->execute())
                {
                    echo "todo ok";
                    return true;
                }else
                {
                    echo "todo no ok";
                    return false;
                }
                   
            }catch(Exception $exc)
            {
                echo $exc->getMessage() . "<br>";
                return false;
            }
        }

      
        static function existe($patente) : bool
        {
            $retorno = false;

            $array = autoBD::traer();

            foreach($array as $comprobar)
            {
                if($patente == $comprobar->patente)
                {
                    $retorno = true;
                    break;
                }
            }

            return $retorno;
        }
        

        
        public function guardarEnArchivo() : string
        {
            $archivo = fopen("./archivos/autosbd_borrados.txt", "a");
            $exito = false;
            $mensaje = "No se pudo guardar en el archivo";

            if($archivo != false)
            {

                fwrite($archivo, $this->marca ."-". $this->patente."-" . $this->color."-" . $this->precio."-" . $this->pathFoto . "\r\n");
                $exito = true;
                $mensaje = "Se guardo correctamente en el archivo";
            }

            fclose($archivo);            
            
            return json_encode(array('exito' => $exito, 'mensaje' => $mensaje));
        }
        

     


        public static function mostrarBorradosJSON()
        {
            $archivo = "./archivos/autosbd_borrados.txt";
    
            if (file_exists($archivo)) 
            {
                $contenido = file_get_contents($archivo);
        
                if ($contenido) 
                {
                    echo $contenido;
                }
                else 
                {
                    echo "El archivo está vacío.";
                }
            } 
            else 
            {
                echo "El archivo no existe.";
            }
        }   

public static function mostrarModificados()
{
    $directorio = "./autosModificados/";
    
    if (is_dir($directorio)) 
    {
        $archivos = scandir($directorio);
        
        if ($archivos !== false) 
        {
            echo '<table>';
            
            foreach ($archivos as $archivo) 
            {
                if ($archivo != "." && $archivo != "..") 
                {
                    echo '<tr>';
                    echo '<td><img src="' . $directorio . $archivo . '" width="50" height="50"></td>';
                    echo '</tr>';
                }
            }
            
            echo '</table>';
        } 
        else 
        {
            echo "No se pudieron obtener los archivos del directorio.";
        }
    } 
    else 
    {
        echo "El directorio no existe.";
    }
}

    }
}

?>