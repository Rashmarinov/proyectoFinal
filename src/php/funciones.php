<?php

class Conexion extends PDO
	{
		private $hostBd = 'localhost';
		private $nombreBd = 'proyectoFinal';
		private $usuarioBd = 'edib';
		private $passwordBd = 'edib';
		
		public function __construct()
		{
			try
			{
				parent::__construct('mysql:host=' . $this->hostBd . ';dbname=' . $this->nombreBd . ';charset=utf8', $this->usuarioBd, $this->passwordBd, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
				
				// echo "<b>¡Conexión a BBDD MySQL mediante PDO correcta!</b><br>";
				
			}catch(PDOException $e){
				echo 'Error: ' . $e->getMessage();
			exit;
			}
		}
	}


// 	function obtenerPartidaId($id)
// {
//     $bd = obtenerConexion();
//     $sentencia = $bd->prepare("SELECT id_partida, juego, jugadores, fecha, hora, ubicacion FROM partidas WHERE id_partida = ?");
//     $sentencia->execute([$id]);
//     return $sentencia->fetchObject();
// }

// // Función para obtener todas las partidas
// function obtenerPartidas() {
// 	global $pdo;
// 	$stmt = $pdo->query("SELECT * FROM partidas");
// 	return $stmt->fetchAll(PDO::FETCH_ASSOC);
// }

// function registrarPartida(){}

// function modificarPartida(){}

// function eliminarPartida(){}

// function apuntarsePartida(){}

// function crearPartida(){}

// function obtenerPartidaJuego($juego){}

// function abandonarPartida(){}



// function registrarUsuario(){}

// function obtenerUsuario(){}


?>