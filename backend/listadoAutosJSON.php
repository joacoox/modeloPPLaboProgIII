<?php
use Joaquin\auto;
require_once './clases/auto.php';

$accion = isset($_GET["accion"]) ? $_GET["accion"] : "sin accion";
$resultado = auto::traerJSON('./archivos/autos.json');

if ($resultado !== null) 
{
    echo json_encode($resultado);
} 
else 
{
    echo "No se pudo cargar el archivo JSON.";
}
