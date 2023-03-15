import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import { Link } from "react-router-dom"; // importar el componente Link

function Juegos() {
  const [data, setData] = useState([]);
  const [jugadores, setJugadores] = useState({});

  const baseUrl="http://localhost:80/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partidas";

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
  
      // Nueva petición para obtener la información de los jugadores
      axios.get('/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partida_jugador')
      .then(res => {
        const dataJugadores = res.data;
  
        // Crear un objeto para almacenar la cantidad de jugadores por partida
        const jugadoresPorPartida = {};
  
        // Recorrer la información de los jugadores y contar la cantidad de jugadores por partida
        dataJugadores.forEach(jugador => {
          if (!jugadoresPorPartida[jugador.id_partida]) {
            jugadoresPorPartida[jugador.id_partida] = 1;
          } else {
            jugadoresPorPartida[jugador.id_partida]++;
          }
        });
  
        // Actualizar el estado con la información de los jugadores por partida
        setJugadores(jugadoresPorPartida);
      });
    })
  }
  

  useEffect(()=>{
      peticionGet();
  },[])

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
      
      {data.map((juego) => (
  <section  className="partidas" key={juego.id}>
    <div className="partidas-juego">Juego: {juego.juego}</div>
    <div className="partidas-jugadores">Jugadores: {jugadores[juego.id_partidas] || 0}</div>
    <div className="partidas-fecha">Fecha: {juego.fecha}</div>
    <div className="partidas-hora">Hora: {juego.hora}</div>
    <div className="partidas-ubicacion">Ubicación: {juego.ubicacion}</div>
    <Link to={`/apuntarsePartida/${juego.id_partidas}`}>
      <button>Ver partida</button>
    </Link>
  </section>
))}

      <Navbar></Navbar>
    </div>
  );
}

export default Juegos;
