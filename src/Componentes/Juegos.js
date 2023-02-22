import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Juegos() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => setJuegos(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <picture>
        <source
          srcSet="
            /img/smartphone/Banner.webp 1x,
            /img/smartphone/Banner@2x.webp 2x,
            /img/smartphone/Banner@3x.webp 3x"
        />
        <img className="imagenBanner" src="" alt="Imagen tablero" />
      </picture>
      <h4 className="textoBanner">Lorem ipsum dolor sit amet consectetur Amet nibh egestas </h4>
      
      {juegos.map((juego) => (
        <section  className="partidas" key={juego.id}>
          <div className="partidas-juego">Juego: {juego.juego}</div>
          <div className="partidas-jugadores">Jugadores: {juego.jugadores.length}</div>
          <div className="partidas-fecha">Fecha: {juego.fecha}</div>
          <div className="partidas-hora">Hora: {juego.hora}</div>
          <div className="partidas-ubicacion">Ubicación: {juego.ubicacion}</div>
          
        </section>
      ))}
      <Navbar></Navbar>
    </div>
  );
}

export default Juegos;
