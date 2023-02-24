import React, { useState } from "react";
import Navbar from "./Navbar";

const AñadirPartida = () => {
  const [juego, setJuego] = useState("");
  const [jugadores, setJugadores] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar formulario
    if (
      juego.trim() === "" ||
      jugadores.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      ubicacion.trim() === ""
    ) {
      // Mostrar mensaje de error o realizar alguna acción
      return;
    }

    if (hora !== ubicacion) {
      // Mostrar mensaje de error o realizar alguna acción
      return;
    }

    // Enviar formulario
    console.log("Formulario enviado");
  };

  return (
    <div className="container">
      <h1>Añade una partida</h1>
      <section className="SignIn">
        <form className="SignIn--form" onSubmit={handleSubmit}>
          <input
            className="SignIn--input"
            placeholder="Juego"
            type="text"
            id="juego"
            value={juego}
            onChange={(e) => setJuego(e.target.value)}
          />
          <input
            className="SignIn--input"
            placeholder="Jugadores"
            type="text"
            id="jugadores"
            value={jugadores}
            onChange={(e) => setJugadores(e.target.value)}
          />
          <input
            className="SignIn--input"
            placeholder="Fecha"
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          <input
            className="SignIn--input"
            placeholder="Hora"
            type="time"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
          <input
            className="SignIn--input"
            placeholder="Ubicación"
            type="text"
            id="ubicacion"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
          <button className="SignIn--button" type="submit">
            Crear
          </button>
        </form>
      </section>
      <Navbar></Navbar>
    </div>
  );
};

export default AñadirPartida;
