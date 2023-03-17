<?php
include_once "cors.php";
include 'funciones.php';

$pdo = new Conexion();

$tabla = $_GET['tabla'];

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['email']) && isset($_GET['contrasena'])) {
        $query = "SELECT * FROM $tabla WHERE email=:email AND contrasena=:contrasena";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':email', $_GET['email']);
        $stmt->bindValue(':contrasena', $_GET['contrasena']);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 Ok");
        echo json_encode($stmt->fetch());
        exit;
    } else if (isset($_GET['id'])) {
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


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['email'])) {
        // Comprobar si el correo electrónico ya existe
        $query = "SELECT * FROM usuarios WHERE email=:email";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':email', $data['email']);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
    
        if ($stmt->rowCount() > 0) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("mensaje" => "El correo electrónico ya está registrado."));
            exit();
        }
    }

    if (isset($data['id_partida']) && isset($data['id_usuario'])) {
            $query = "SELECT * FROM partida_jugador WHERE id_partida = :id_partida AND id_usuario = :id_usuario";
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(':id_partida', $data['id_partida']);
            $stmt->bindValue(':id_usuario', $data['id_usuario']);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            if ($stmt->rowCount() > 0) {
                header("HTTP/1.1 400 Bad Request");
                echo json_encode(array("mensaje" => "Ya estás apuntado en esta partida."));
                exit();
            }
    }
    

    if ($tabla == 'partidas') {
        $query = "INSERT INTO partidas (juego, fecha, hora, ubicacion, max_jugadores) VALUES(:juego, :fecha, :hora, :ubicacion, :max_jugadores)";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':juego', $data['juego']);
        $stmt->bindValue(':fecha', $data['fecha']);
        $stmt->bindValue(':hora', $data['hora']);
        $stmt->bindValue(':ubicacion', $data['ubicacion']);
        $stmt->bindValue(':max_jugadores', $data['max_jugadores']);
        $stmt->execute();

    } elseif ($tabla == 'usuarios') {
        $query = "INSERT INTO usuarios (nombre, direccion, email, contrasena) VALUES(:nombre, :direccion, :email, :contrasena)";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':nombre', $data['nombre']);
        $stmt->bindValue(':direccion', $data['direccion']);
        $stmt->bindValue(':email', $data['email']);
        $stmt->bindValue(':contrasena', $data['contrasena']);
        $stmt->execute();
    } elseif ($tabla == 'partida_jugador') {
        $query = "INSERT INTO partida_jugador (id_partida, id_usuario) VALUES(:id_partida, :id_usuario)";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id_partida', $data['id_partida']);
        $stmt->bindValue(':id_usuario', $data['id_usuario']);
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
    $data = json_decode(file_get_contents("php://input"), true);
    if($tabla == 'partidas') {
        $query = "UPDATE partidas SET juego=:juego, fecha=:fecha, hora=:hora, ubicacion=:ubicacion, max_jugadores=:max_jugadores WHERE id_partidas=:id";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':juego', $data['juego']);
        $stmt->bindValue(':fecha', $data['fecha']);
        $stmt->bindValue(':hora', $data['hora']);
        $stmt->bindValue(':ubicacion', $data['ubicacion']);
        $stmt->bindValue(':max_jugadores', $data['max_jugadores']);
        $stmt->bindValue(':id', $data['id']);
        $stmt->execute();
        header("HTTP/1.1 200 Ok");
        exit;
    } elseif ($tabla == 'usuarios') {
        $query = "UPDATE usuarios SET nombre=:nombre, direccion=:direccion, email=:email WHERE id_usuarios=:id";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':nombre', $data['nombre']);
        $stmt->bindValue(':direccion', $data['direccion']);
        $stmt->bindValue(':email', $data['email']);
        // $stmt->bindValue(':contrasena', $data['contrasena']);
        $stmt->bindValue(':id', $data['id']);
        $stmt->execute();
        header("HTTP/1.1 200 Ok");
        exit;
    } elseif ($tabla == 'partida_jugador') {
        $query = "UPDATE partida_jugador SET id_partida=:id_partida, id_usuario=:id_usuario WHERE id_partida=:id_partida AND id_usuario=:id_usuario";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id_partida', $data['id_partida']);
        $stmt->bindValue(':id_usuario', $data['id_usuario']);
        $stmt->bindValue(':id', $data['id']);
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

