<?php
use Joaquin\autoBD;

require_once 'clases/autoBD.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['auto_json']) && isset($_FILES['foto']) && $_FILES['foto']['error'] === UPLOAD_ERR_OK) {
        $autoJson = $_POST['auto_json'];
        $autoData = json_decode($autoJson, true);

        $foto = $_FILES['foto'];
        $fotoTmp = $foto['tmp_name'];

        $pathFoto = 'autos/imagenes'; // Nuevo path para la foto actual
        $pathFotoModificada = 'autos/autosmodificado'; // Path para la foto modificada

        $auto = new autoBD(
            $autoData['marca'],
            $autoData['patente'],
            $autoData['color'],
            $autoData['precio'],
            $pathFoto
        );

        $exitoModificar = $auto->modificar();

        if ($exitoModificar) {
            $rutaFotoOriginal = $auto->pathFoto;
            $nombreFotoModificada = $autoData['patente']  . '.modificado.' . date('His') . '.jpg';
            $rutaFotoModificada = $pathFotoModificada . '/' . $nombreFotoModificada;

            if (move_uploaded_file($fotoTmp, $rutaFotoModificada)) {
                if (file_exists($rutaFotoOriginal)) {
                    unlink($rutaFotoOriginal);
                }

                echo json_encode(array('exito' => true, 'mensaje' => 'Auto modificado exitosamente.'));
            } else {
                echo json_encode(array('exito' => false, 'mensaje' => 'No se pudo mover la foto.'));
            }
        } else {
            echo json_encode(array('exito' => false, 'mensaje' => 'No se pudo modificar el auto en la base de datos.'));
        }
    } else {
        echo json_encode(array('exito' => false, 'mensaje' => 'Datos insuficientes o problema con la foto.'));
    }
}
