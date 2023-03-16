import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from 'axios';
import loginOk from "./LoginOk";
loginOk();

function ApuntarsePartida() {
  const [partida, setPartida] = useState({});
  const [jugadores, setJugadores] = useState([]);
  const [numJugadores, setNumJugadores] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const responseJugadores = await axios.get(`/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partida_jugador&id=${id}`);
        setJugadores(responseJugadores.data.map(jugador => jugador.nombre));

        const responsePartida = await axios.get(`/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partidas&id=${id}`);
        setPartida(responsePartida.data[0]);
        setNumJugadores(responseJugadores.data.length);

      } catch (error) {
        console.log(error);
      }
    };
    

    fetchData();
  }, [id]);

  const handleApuntarse = () => {
    if (numJugadores >= partida.max_jugadores) {
      alert('La partida está llena. No se pueden apuntar más jugadores.');
    } else {
      // Aquí se debería agregar la lógica para apuntarse a la partida
      alert('Te has apuntado a la partida!');
    }
  }

  return (
    <div className="containerApuntarse">   
      <section className="apuntarsePartida" >
        <p className="apuntarsePartida--Info">Juego: {partida.juego}</p>
        <p className="apuntarsePartida--Info">Jugadores [{numJugadores}/{partida.max_jugadores}]: {jugadores.join(', ')}</p>
        <p className="apuntarsePartida--Info">Fecha: {partida.fecha}</p>
        <p className="apuntarsePartida--Info">Hora: {partida.hora}</p>
        <p className="apuntarsePartida--Info">Ubicación: {partida.ubicacion}</p>
        <button className="SignIn--button" onClick={handleApuntarse}>Apuntarse</button>
      </section>
      <Navbar></Navbar>
    </div>
  );
}

export default ApuntarsePartida;





