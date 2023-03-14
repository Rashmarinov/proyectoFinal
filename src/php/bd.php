<?php
// Incluimos el archivo de conexión mediante PDO
include 'funciones.php';
include_once "cors.php";
// Instanciamos un objeto Conexion (PDO)


// function metodoGet($query){
//     try{
//         $pdo = new Conexion();
//         $stmt = $pdo->prepare($query);
//         $stmt->setFetchMode(PDO::FETCH_ASSOC);
//         $stmt->execute();
//         $pdo = null;
//         return $stmt;

//     }catch(Exception $e){
//         die("Error: " . $e);
//     }
// }

// function metodoPost($query, $queryAutoIncrement){
//     try{
//         $pdo = new Conexion();
//         $stmt = $pdo->prepare($query);
//         $stmt->execute();
//         $idAutoIncrement = metodoGet($queryAutoIncrement)->fetch(PDO::FETCH_ASSOC);
//         $resultado = array_merge($idAutoIncrement, $_POST);
//         $stmt->closeCursor();
//         $pdo = null;
//         return $resultado;

//     }catch(Exception $e){
//         die("Error: " . $e);
//     }
// }

// function metodoPut($query){
//     try{
//         $pdo = new Conexion();
//         $stmt = $pdo->prepare($query);
//         $stmt->execute();
//         $resultado = array_merge($_GET, $_POST);
//         $stmt->closeCursor();
//         $pdo = null;
//         return $resultado;

//     }catch(Exception $e){
//         die("Error: " . $e);
//     }
// }

// function metodoDelete($query){
//     try{
//         $pdo = new Conexion();
//         $stmt = $pdo->prepare($query);
//         $stmt->execute();
//         $stmt->closeCursor();
//         $pdo = null;
//         return $_GET['id'];

//     }catch(Exception $e){
//         die("Error: " . $e);
//     }
// }






?>