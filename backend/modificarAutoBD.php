<?php
use Joaquin\autoBD;

require_once 'clases/autoBD.php';
$obj = json_decode($_POST['auto_json']);

$newauto = new autoBD( $obj->marca, $obj->patente, $obj->color, $obj->precio);

$result = $newauto->modificar();

if($result == true){
    echo json_encode(array('exito' => true, 'mensaje' => 'se modifico correctamente.'));

}else {   
    echo json_encode(array('exito' => true, 'mensaje' => 'No se modifico correctamente.'));
}

?>
