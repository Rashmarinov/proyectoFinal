CREATE TABLE IF NOT EXISTS `proyectoFinal`.`usuarios` (`id_usuarios` INT NOT NULL AUTO_INCREMENT , `nombre` VARCHAR(20) NOT NULL , `direccion` VARCHAR(50) NOT NULL , `email` VARCHAR(50) NOT NULL , `contrasena` VARCHAR(50) NOT NULL , PRIMARY KEY (`id_usuarios`)) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `proyectoFinal`.`partidas` (`id_partida` INT NOT NULL AUTO_INCREMENT , `juego` VARCHAR(50) NOT NULL , `jugadores` VARCHAR(50) NOT NULL , `fecha` DATE NOT NULL , `hora` TIME NOT NULL , `ubicacion` VARCHAR(50) NOT NULL , PRIMARY KEY (`id_partida`)) ENGINE = InnoDB;

CREATE TABLE partidas (
    id INTEGER PRIMARY KEY,
    juego TEXT,
    jugadores TEXT,
    fecha DATE,
    hora TIME,
    ubicacion TEXT
);