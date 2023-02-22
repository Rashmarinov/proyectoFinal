import React, { useState, useEffect } from "react";
import HeaderMovil from "./HeaderMovil";
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
        <img src="" alt="Imagen tablero" />
      </picture>
      <h4>Lorem ipsum dolor sit amet consectetur Amet nibh egestas </h4>
      <section className="partidas">
        <ul>
          {juegos.map((juego) => (
            <li key={juego.id}>
              <h2>{juego.juego}</h2>
              <p>Jugadores: {juego.jugadores.length}</p>
              <p>Fecha: {juego.fecha}</p>
              <p>Hora: {juego.hora}</p>
              <p>Ubicación: {juego.ubicacion}</p>
            </li>
          ))}
        </ul>
      </section>
      <Navbar></Navbar>
    </div>
  );
}

export default Juegos;
