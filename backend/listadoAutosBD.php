<?php
    use Joaquin\autoBD;

    require_once 'clases/autoBD.php';


    $tabla = isset($_GET["tabla"]) ? $_GET["tabla"] : "sin tabla";
    $autos = autoBD::traer();

  if($tabla == "mostrar")
  {
      echo   '<script src="../frontend/Manejadora.js"></script>';

      echo '<table><thead><tr><th>Marca</th><th>Patente</th><th>Color</th><th>Precio</th><th>Foto</th><th>Accion</th></tr></thead><tbody>';
      foreach ($autos as $auto) {
          echo "<tr>";
          echo "<td>" . $auto->marca . "</td>";
          echo "<td>" . $auto->patente . "</td>";
          echo "<td>" . $auto->color. "</td>";
          echo "<td>" . $auto->precio . "</td>";
          echo "<td><img src='" ."../backend/".$auto->pathFoto . "' alt='Foto del auto' width='50' height='50'></td>";
          echo '<td>
          <button type="button" class="btn btn-info" onclick="PrimerParcial.Manejadora.Modificar(' . htmlspecialchars(json_encode($auto)) . ')">
            Modificar
          </button>
          <button type="button" class="btn btn-danger" onclick="PrimerParcial.Manejadora.Eliminar(' . htmlspecialchars(json_encode($auto)) . ')">
            Eliminar
          </button>
          </td>';
          echo "</tr>";
      }
      echo '</tbody></table>';
  }else
  {
    echo json_encode($autos);
  }

  






