import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from 'axios';

function ApuntarsePartida() {
  const [partida, setPartida] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:80/edib/proyectoFinal/src/php/apiRest.php?tabla=partidas&id=${id}`);
        console.log(response.data)
        setPartida(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="containerApuntarse">   
      <section className="apuntarsePartida" >
        <p className="apuntarsePartida--Info">Juego: {partida.juego}</p>
        <p className="apuntarsePartida--Info">Jugadores: {partida.jugadores?.split(',').length || 0}</p>
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



