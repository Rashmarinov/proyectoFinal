<?php

// Incluimos el archivo de conexión mediante PDO
// include 'bd.php';
include 'funciones.php';
$pdo = new Conexion();

header('Access-Control-Allow-Origin: *');

// if ($_SERVER['REQUEST_METHOD']=='GET'){
//     if(isset($_GET['id'])){
//         $query = "SELECT * FROM usuarios WHERE id_usuarios =" . $_GET['id'];
//         $resultado = metodoGet($query);
//         echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
//     }else{
//         $query = "SELECT * FROM usuarios";
//         $resultado = metodoGet($query);
//         echo json_encode($resultado->fetchAll());
//     }
//     header("HTTP/1.1 200 OK");
//     exit();
// }

//Listar registros y consultar registro
if($_SERVER['REQUEST_METHOD'] == 'GET'){
    if(isset($_GET['id']))
    {
        $sql = $pdo->prepare("SELECT * FROM usuarios WHERE id_usuarios=:id");
        $sql->bindValue(':id', $_GET['id']);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 hay datos");
                    
        // Mostramos resultados directamente
        /*
        $resultado = $sql->fetchAll();
        
        foreach ($resultado as $row) {
            echo "- <b>" . $row["id"] . " " . $row["nombre"] . " " . $row["telefono"] . " " . $row["email"] . "</b><br>";
        }
        */
        
        // Mostrar resultados en formato JSON
        
        echo json_encode($sql->fetchAll());
        
        
        // Mostramos resultados en formato XML
        /*
        // Ponemos la etiqueta principal "contactos"
        $xml = new SimpleXMLElement('<contactos/>');

        while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
            $obj = $xml->addChild('contacto');
            $obj->addChild('id', $row['id']);
            $obj->addChild('nombre', $row['nombre']);
            $obj->addChild('telefono', $row['telefono']);
            $obj->addChild('email', $row['email']);
        }
        $xml->asXML('contacto.xml');
        
        // Podemos retornar y mostrar directamente el archivo XML creado
        header('Location: http://localhost/edib/webservices/2%20-%20Creación%20Servicio%20Web/contacto.xml');
        */
        /*
        // O mostramos los resultadosd (contactos) abriendo y leyendo el XML
        $cont = simplexml_load_file('contacto.xml');
        
        foreach($cont as $c)
        {
            echo "<b>ID: </b>" . $c->id; echo "<br>";
            echo "<b>Nombre: </b>" . $c->nombre; echo "<br>";
            echo "<b>Teléfono: </b>" . $c->telefono; echo "<br>"; 
            echo "<b>E-Mail: </b>" . $c->email; echo "<br>";				
            echo "<br>";
        }
        */
        
        // Salimos
        exit;				
        
        } else {
        
        $sql = $pdo->prepare("SELECT * FROM usuarios");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 hay datos");
        
        // Mostramos resultados directamente
        /*
        $resultado = $sql->fetchAll();
        
        foreach ($resultado as $row) {
            echo "- <b>" . $row["id"] . " " . $row["nombre"] . " " . $row["telefono"] . " " . $row["email"] . "</b><br>";
        }
        */
        
        // Mostrar resultados en formato JSON
        
        echo json_encode($sql->fetchAll());
        
        
        // Mostramos resultados en formato XML
        /*
        // Ponemos la etiqueta principal "contactos"
        $xml = new SimpleXMLElement('<contactos/>');

        while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
            $obj = $xml->addChild('contacto');
            $obj->addChild('id', $row['id']);
            $obj->addChild('nombre', $row['nombre']);
            $obj->addChild('telefono', $row['telefono']);
            $obj->addChild('email', $row['email']);
        }
        $xml->asXML('contactos.xml');
        
        // Podemos retornar y mostrar directamente el archivo XML creado
        header('Location: http://localhost/edib/webservices/2%20-%20Creación%20Servicio%20Web/contactos.xml');
        */
        /*
        // O mostramos los resultadosd (contactos) abriendo y leyendo el XML
        $cont = simplexml_load_file('contactos.xml');
        
        foreach($cont as $c)
        {
            echo "<b>ID: </b>" . $c->id; echo "<br>";
            echo "<b>Nombre: </b>" . $c->nombre; echo "<br>";
            echo "<b>Teléfono: </b>" . $c->telefono; echo "<br>"; 
            echo "<b>E-Mail: </b>" . $c->email; echo "<br>";				
            echo "<br>";
        }
        */
        
        // Salimos
        exit;
        
    }
}

// if ($_SERVER['REQUEST_METHOD']=='POST'){
//     $nombre = $_POST['nombre'];
//     $direccion = $_POST['direccion'];
//     $email = $_POST['email'];
//     $contrasena = $_POST['contrasena'];
//     $query = "INSERT INTO usuarios(nombre, direccion, email, contrasena) VALUES ('$nombre', '$direccion', '$email', '$contrasena')";
//     $queryAutoIncrement = "SELECT MAX(id_usuarios) AS id FROM usuarios";
//     $resultado = metodoPost($query, $queryAutoIncrement);
//     echo json_encode($resultado);
//     header("HTTP/1.1 200 OK");
//     exit();
// }

//Insertar registro
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $sql = "INSERT INTO usuarios (nombre, direccion, email, contrasena) VALUES(:nombre, :direccion, :email, :contrasena)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':nombre', $_POST['nombre']);
    $stmt->bindValue(':direccion', $_POST['direccion']);
    $stmt->bindValue(':email', $_POST['email']);
    $stmt->bindValue(':contrasena', $_POST['contrasena']);
    $stmt->execute();
    $idPost = $pdo->lastInsertId(); 
    if($idPost)
    {
        header("HTTP/1.1 200 Ok");
        echo json_encode($idPost);
        exit;
    }
}

// if ($_SERVER['REQUEST_METHOD']=='PUT'){
//     $id = $_GET['id'];
//     $nombre = $_POST['nombre'];
//     $direccion = $_POST['direccion'];
//     $email = $_POST['email'];
//     $contrasena = $_POST['contrasena'];
//     $query = "UPDATE usuarios SET nombre='$nombre', direccion='$direccion', email='$email', contrasena='$contrasena' WHERE id_usuarios='$id'";
//     $resultado = metodoPut($query);
//     echo json_encode($resultado);
//     header("HTTP/1.1 200 OK");
//     exit();
// }

//Actualizar registro
if($_SERVER['REQUEST_METHOD'] == 'PUT')
{		
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

// if ($_SERVER['REQUEST_METHOD']=='DELETE'){
//     $id = $_GET['id'];
//     $query = "DELETE FROM usuarios WHERE id_usuarios='$id'";
//     $resultado = metodoDelete($query);
//     echo json_encode($resultado);
//     header("HTTP/1.1 200 OK");
//     exit();
// }

//Eliminar registro
if($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
    $query = "DELETE FROM usuarios WHERE id_usuarios=:id";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':id', $_GET['id']);
    $stmt->execute();
    header("HTTP/1.1 200 Ok");
    exit;
}

header("HTTP/1.1 400 Bad Request");
exit();

?>