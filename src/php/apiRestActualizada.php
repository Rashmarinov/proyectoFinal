<?php
include_once "cors.php";
include 'funciones.php';

$pdo = new Conexion();

$tabla = $_GET['tabla'];

if($_SERVER['REQUEST_METHOD'] == 'GET') {
    if(isset($_GET['id'])) {
        if ($tabla == 'partida_jugador') {
            $query = "SELECT usuarios.* FROM usuarios JOIN partida_jugador ON usuarios.id_usuarios = partida_jugador.id_usuario WHERE partida_jugador.id_partida=:id";
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(':id', $_GET['id']);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 Ok");
            echo json_encode($stmt->fetchAll());
            exit;
        } else {
            $query = "SELECT * FROM $tabla WHERE id_" . $tabla . "=:id";
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(':id', $_GET['id']);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 Ok");
            echo json_encode($stmt->fetchAll());
            exit;
        }
    } else {
        $query = "SELECT * FROM $tabla";
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 Ok");
        echo json_encode($stmt->fetchAll());
        exit;
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if($tabla == 'partidas') {
        $query = "INSERT INTO partidas (juego, fecha, hora, ubicacion) VALUES(:juego, :fecha, :hora, :ubicacion)";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':juego', $_POST['juego']);
        $stmt->bindValue(':fecha', $_POST['fecha']);
        $stmt->bindValue(':hora', $_POST['hora']);
        $stmt->bindValue(':ubicacion', $_POST['ubicacion']);
        $stmt->execute();
    } elseif ($tabla == 'usuarios') {
        $query = "INSERT INTO usuarios (nombre, direccion, email, contrasena) VALUES(:nombre, :direccion, :email, :contrasena)";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':nombre', $_POST['nombre']);
        $stmt->bindValue(':direccion', $_POST['direccion']);
        $stmt->bindValue(':email', $_POST['email']);
        $stmt->bindValue(':contrasena', $_POST['contrasena']);
        $stmt->execute();
    } elseif ($tabla == 'partida_jugador') {
        $query = "INSERT INTO partida_jugador (id_partida, id_usuario) VALUES(:id_partida, :id_usuario)";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id_partida', $_POST['id_partida']);
        $stmt->bindValue(':id_usuario', $_POST['id_usuario']);
        $stmt->execute();
    }
    $idPost = $pdo->lastInsertId();
    if($idPost) {
        header("HTTP/1.1 200 Ok");
        header("content-type:aplication/json");
        echo json_encode($idPost);
        exit;
    }
}

if($_SERVER['REQUEST_METHOD'] == 'PUT') {
    if($tabla == 'partidas') {
        $query = "UPDATE partidas SET juego=:juego, fecha=:fecha, hora=:hora, ubicacion=:ubicacion WHERE id_partidas=:id";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':juego', $_GET['juego']);
        $stmt->bindValue(':fecha', $_GET['fecha']);
        $stmt->bindValue(':hora', $_GET['hora']);
        $stmt->bindValue(':ubicacion', $_GET['ubicacion']);
        $stmt->bindValue(':id', $_GET['id']);
        $stmt->execute();
        header("HTTP/1.1 200 Ok");
        exit;
    } elseif ($tabla == 'usuarios') {
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
    } elseif ($tabla == 'partida_jugador') {
        $query = "UPDATE partida_jugador SET id_partida=:id_partida, id_usuario=:id_usuario WHERE id_partida=:id_partida AND id_usuario=:id_usuario";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id_partida', $_GET['id_partida']);
        $stmt->bindValue(':id_usuario', $_GET['id_usuario']);
        $stmt->bindValue(':id', $_GET['id']);
        $stmt->execute();
        header("HTTP/1.1 200 Ok");
        exit;
    }   
}

if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    if($tabla == 'partidas') {
        $query = "DELETE FROM partidas WHERE id_partidas=:id";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id', $_GET['id']);
        $stmt->execute();
        header("HTTP/1.1 200 Ok");
        exit;
    } elseif ($tabla == 'usuarios') {
        $query = "DELETE FROM usuarios WHERE id_usuarios=:id";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id', $_GET['id']);
        $stmt->execute();
        header("HTTP/1.1 200 Ok");
        exit;
    } elseif ($tabla == 'partida_jugador') {
        $query = "DELETE FROM partida_jugador WHERE id_partida=:id_partida AND id_usuario=:id_usuario";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id_partida', $_GET['id_partida']);
        $stmt->bindValue(':id_usuario', $_GET['id_usuario']);
        $stmt->execute();
        header("HTTP/1.1 200 Ok");
        exit;
    }
}

header("HTTP/1.1 400 Bad Request");
exit();

?>

