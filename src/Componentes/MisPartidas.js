import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import { Link } from "react-router-dom"; // importar el componente Link

function MisPartidas() {
  const [data, setData] = useState([]);

  const baseUrl="/edib/proyectoFinal/src/php/apiRest.php?tabla=partidas";

  const peticionGet=async()=>{
      await axios.get(baseUrl)
      .then(response=>{
          setData(response.data);
      })
  }

  useEffect(()=>{
      peticionGet();
  },[])

  return (
    <div className="container">

      {data.map((juego) => (
        <section  className="misPartidas" key={juego.id}>
          <div className="misPartidas-juego">Juego: {juego.juego}</div>
          <div className="misPartidas-jugadores">Jugadores: {juego.jugadores.split(',').length}</div>
          <div className="misPartidas-fecha">Fecha: {juego.fecha}</div>
          <div className="misPartidas-hora">Hora: {juego.hora}</div>
          <div className="misPartidas-ubicacion">Ubicación: {juego.ubicacion}</div>
          <Link to={`/apuntarsePartida/${juego.id_partidas}`}>
            <button className="misPartidas-boton">Eliminar</button>
          </Link>
          <Link to={`/apuntarsePartida/${juego.id_partidas}`}>
            <button className="misPartidas-boton">Modificar</button>
          </Link>
          <Link to={`/apuntarsePartida/${juego.id_partidas}`}>
            <button className="misPartidas-boton">Abandonar</button>
          </Link>

        </section>
      ))}
      <Navbar></Navbar>
    </div>
  );
}

export default MisPartidas;
