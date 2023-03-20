<?php
include_once "cors.php";
include 'funciones.php';

session_start();

$pdo = new Conexion();
$tabla = $_GET['tabla'];

/**********************************/
/*************** GET **************/
/**********************************/

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Código para manejar las solicitudes GET con email y contraseña
    if (isset($_GET['email']) && isset($_GET['contrasena'])) {
        $query = "SELECT * FROM $tabla WHERE email=:email AND contrasena=:contrasena";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':email', $_GET['email']);
        $stmt->bindValue(':contrasena', $_GET['contrasena']);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $usuario = $stmt->fetch();

        //Inicio de sesión
            if ($usuario) {
                $_SESSION['usuario'] = $usuario;
                header("HTTP/1.1 200 Ok");
                echo json_encode($usuario);
                exit;
            } else {
                header("HTTP/1.1 400 Bad Request");
                echo json_encode(array("mensaje" => "Email o contraseña incorrectos"));
                exit;
            }
        // Código para manejar la solicitud GET con id_partidas y obtener la información
    } else if (isset($_GET['id']) && isset($_GET['tabla']) && $_GET['tabla'] == 'partidas') {
        $ids = explode(',', $_GET['id']);
        $placeholders = rtrim(str_repeat('?,', count($ids)), ',');
        $query = "SELECT * FROM partidas WHERE id_partidas IN ($placeholders)";
        $stmt = $pdo->prepare($query);
        $stmt->execute($ids);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 Ok");
        echo json_encode($stmt->fetchAll());
        exit;

    // Código para manejar las solicitudes GET con id
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
    // Código para manejar las solicitudes GET con los datos de la sesión del usuario
    } else if (isset($_GET['sesionUsuario']) && $_GET['sesionUsuario'] == 'ok') {
        if (isset($_SESSION['usuario'])) {
            $id_usuario = $_SESSION['usuario']['id_usuarios'];
            $query = "SELECT id_partida FROM partida_jugador WHERE id_usuario=:id_usuario";
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(':id_usuario', $id_usuario);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $id_partidas = $stmt->fetchAll(PDO::FETCH_COLUMN);
            $response = array("id_partidas" => $id_partidas);
            header("HTTP/1.1 200 Ok");
            echo json_encode($response);
            exit;
        } else {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("mensaje" => "No hay sesión iniciada"));
            exit;
        }
    } else {
        // Código para manejar las solicitudes GET con solo el nombre de la tabla
        $query = "SELECT * FROM $tabla";
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 Ok");
        echo json_encode($stmt->fetchAll());
        exit;
    }
}

/**********************************/
/************** POST **************/
/**********************************/

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
    // Comprobar si ya está registrado en una partida
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

    //Códido para insertar una partida nueva en la tabla partidas
    if ($tabla == 'partidas') {
        $query = "INSERT INTO partidas (juego, fecha, hora, ubicacion, max_jugadores, id_creador) VALUES(:juego, :fecha, :hora, :ubicacion, :max_jugadores, :id_creador)";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':juego', $data['juego']);
        $stmt->bindValue(':fecha', $data['fecha']);
        $stmt->bindValue(':hora', $data['hora']);
        $stmt->bindValue(':ubicacion', $data['ubicacion']);
        $stmt->bindValue(':max_jugadores', $data['max_jugadores']);
        $stmt->bindValue(':id_creador', $_SESSION['usuario']['id_usuarios']); // se asigna el id_creador
        $stmt->execute();
        // $idPartida = $pdo->lastInsertId();
        // //echo json_encode(intval($idPartida));
        // echo (intval($idPartida));
        // exit;

    } elseif ($tabla == 'usuarios') {

        // Validar nombre
        $nombreRegex = '/^[a-zA-Z]+\s[a-zA-Z]+$/';
        // Ejemplo error solo acepta números
        // $nombreRegex = '/^\d+$/';

        if (!preg_match($nombreRegex, $data['nombre'])) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("mensaje" => "Nombre inválido"));
            exit();
        }

    
        // Validar dirección
        $direccionRegex = '/^\S+\s\S+\s\d+$/';
        if (!preg_match($direccionRegex, $data['direccion'])) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("mensaje" => "Dirección inválida"));
            exit();
        }
    
        // Validar email
        $emailRegex = '/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/';
        if (!preg_match($emailRegex, $data['email'])) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("mensaje" => "Email inválido"));
            exit();
        }
    
        // Validar contraseña
        $contrasenaRegex = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/';
        if (!preg_match($contrasenaRegex, $data['contrasena'])) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("mensaje" => "Contraseña inválida"));
            exit();
        }

        $query = "INSERT INTO usuarios (nombre, direccion, email, contrasena) VALUES(:nombre, :direccion, :email, :contrasena)";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':nombre', $data['nombre']);
        $stmt->bindValue(':direccion', $data['direccion']);
        $stmt->bindValue(':email', $data['email']);
        $stmt->bindValue(':contrasena', $data['contrasena']);
        $stmt->execute();
        //Codigo para hacer un insert en la tabla partida_jugador
    } elseif ($tabla == 'partida_jugador') {
        $query = "INSERT INTO partida_jugador (id_partida, id_usuario) VALUES(:id_partida, :id_usuario)";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id_partida', $data['id_partida']);
        $stmt->bindValue(':id_usuario', $data['id_usuario']);
        $stmt->execute();
        header("HTTP/1.1 200 Ok");
        exit;
    }
    $idPost = $pdo->lastInsertId();
    if($idPost) {
        header("HTTP/1.1 200 Ok");
        header("content-type:aplication/json");
        echo json_encode($idPost);
        exit;
    }
}

/**********************************/
/*************** PUT **************/
/**********************************/

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

/**********************************/
/************* DELETE *************/
/**********************************/

if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    if($tabla == 'partidas') {
        // $query = "DELETE FROM partidas WHERE id_partidas=:id";
        // $stmt = $pdo->prepare($query);
        // $stmt->bindValue(':id', $_GET['id']);
        // $stmt->execute();
        $query = "DELETE FROM partidas WHERE id_partidas=:id AND id_creador=:id_creador";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id', $_GET['id']);
        $stmt->bindValue(':id_creador', $_SESSION['usuario']['id_usuarios']); // se comprueba el id_creador
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

