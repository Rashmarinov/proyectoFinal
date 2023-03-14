import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import { Link } from "react-router-dom"; // importar el componente Link

function Juegos() {
  const [data, setData] = useState([]);

  const baseUrl="http://localhost:80/edib/proyectoFinal/src/php/apiRest.php?tabla=partidas";

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
          <div className="partidas-jugadores">Jugadores: {juego.jugadores.split(',').length}</div>
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
