<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php

    include 'funciones.php';

    session_start();
    
    $usuario = $_SESSION['usuario'];
    echo json_encode($usuario);
    
    ?>
</body>
</html>