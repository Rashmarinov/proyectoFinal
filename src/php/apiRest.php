<?php
include_once "cors.php";
include 'funciones.php';

$pdo = new Conexion();
header('Access-Control-Allow-Origin: *');

$tabla = $_GET['tabla'];

if($_SERVER['REQUEST_METHOD'] == 'GET') {
    if(isset($_GET['id'])) {
        $query = "SELECT * FROM $tabla WHERE id_" . $tabla . "=:id";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id', $_GET['id']);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 hay datos");
        echo json_encode($stmt->fetchAll());
        exit;
    } else {
        $query = "SELECT * FROM $tabla";
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 hay datos");
        echo json_encode($stmt->fetchAll());
        exit;
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if($tabla == 'partidas') {
        $query = "INSERT INTO partidas (juego, jugadores, fecha, hora, ubicacion) VALUES(:juego, :jugadores, :fecha, :hora, :ubicacion)";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':juego', $_POST['juego']);
        $stmt->bindValue(':jugadores', $_POST['jugadores']);
        $stmt->bindValue(':fecha', $_POST['fecha']);
        $stmt->bindValue(':hora', $_POST['hora']);
        $stmt->bindValue(':ubicacion', $_POST['ubicacion']);
        $stmt->execute();
    } else {
        $query = "INSERT INTO usuarios (nombre, direccion, email, contrasena) VALUES(:nombre, :direccion, :email, :contrasena)";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':nombre', $_POST['nombre']);
        $stmt->bindValue(':direccion', $_POST['direccion']);
        $stmt->bindValue(':email', $_POST['email']);
        $stmt->bindValue(':contrasena', $_POST['contrasena']);
        $stmt->execute();
    }
    $idPost = $pdo->lastInsertId();
    if($idPost) {
        header("HTTP/1.1 200 Ok");
        echo json_encode($idPost);
        exit;
    }
}

if($_SERVER['REQUEST_METHOD'] == 'PUT') {
    if($tabla == 'partidas') {
        $query = "UPDATE partidas SET juego=:juego, jugadores=:jugadores, fecha=:fecha, hora=:hora, ubicacion=:ubicacion WHERE id_partida=:id";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':juego', $_GET['juego']);
        $stmt->bindValue(':jugadores', $_GET['jugadores']);
        $stmt->bindValue(':fecha', $_GET['fecha']);
        $stmt->bindValue(':hora', $_GET['hora']);
        $stmt->bindValue(':ubicacion', $_GET['ubicacion']);
        $stmt->bindValue(':id', $_GET['id']);
        $stmt->execute();
        header("HTTP/1.1 200 Ok");
        exit;
    } else {
        $query = "UPDATE usuarios SET nombre=:nombre, direccion=:direccion, email=:email, contrasena=:contrasena WHERE id_usuarios=:id";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':nombre', $_GET['nombre']);
        $stmt->bindValue(':direccion', $_GET['direccion']);
        $stmt->bindValue(':email', $_GET['email']);
        $stmt->bindValue(':contrasena', $_GET['contrasena']);
        $stmt->bindValue(':id', $_GET['id']);
        $stmt->execute();
        header("HTTP/1.1 200 Ok");
        exit;
    }   
}

if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    if($tabla == 'partidas') {
    $query = "DELETE FROM partidas WHERE id_partida=:id";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':id', $_GET['id']);
    $stmt->execute();
    header("HTTP/1.1 200 Ok");
    exit;
}else{
    $query = "DELETE FROM usuarios WHERE id_usuarios=:id";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':id', $_GET['id']);
    $stmt->execute();
    header("HTTP/1.1 200 Ok");
    exit;
    }
}

header("HTTP/1.1 400 Bad Request");
exit();

?>