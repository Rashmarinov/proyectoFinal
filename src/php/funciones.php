<?php

include 'cors.php';

class Conexion extends PDO
	{
		private $hostBd = '127.0.0.1';
		private $nombreBd = 'mallorcaGames';
		private $usuarioBd = 'root';
		private $passwordBd = '';
		
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

	function partidasPorId($pdo, $ids) {
		$placeholders = rtrim(str_repeat('?,', count($ids)), ',');
		$query = "SELECT * FROM partidas WHERE id_partida IN ($placeholders)";
		$stmt = $pdo->prepare($query);
		$stmt->execute($ids);
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		return $stmt->fetchAll();
	}
	
?>