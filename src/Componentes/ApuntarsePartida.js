
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function ApuntarsePartida() {
  const [partida, setPartida] = useState({});
  const { id } = useParams();

useEffect(() => {
  fetch(process.env.PUBLIC_URL + "/data.json")
    .then((response) => response.json())
    .then((data) => {
      const partidaEncontrada = data.find((juego) => juego.id === parseInt(id));
      setPartida(partidaEncontrada);
    })
    .catch((error) => console.log(error));
}, [id]);

  return (
    <div className="containerApuntarse">   
      <section className="apuntarsePartida" >
        <p className="apuntarsePartida--Info">Juego: {partida.juego}</p>
        <p className="apuntarsePartida--Info">Jugadores: {partida.jugadores.join(", ")}</p>
        <p className="apuntarsePartida--Info">Fecha: {partida.fecha}</p>
        <p className="apuntarsePartida--Info">Hora: {partida.hora}</p>
        <p className="apuntarsePartida--Info">Ubicación: {partida.ubicacion}</p>
        <button className="SignIn--button">Apuntarse</button>
      </section>
      <Navbar></Navbar>
    </div>
  );
}

export default ApuntarsePartida;

