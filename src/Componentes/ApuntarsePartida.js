import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from 'axios';
import loginOk from "./LoginOk";
import Cookies from 'js-cookie';


function ApuntarsePartida() {
  const [partida, setPartida] = useState({});
  const [jugadores, setJugadores] = useState([]);
  const [numJugadores, setNumJugadores] = useState(0);
  const [mensaje, setMensaje] = useState("");
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

  const handleApuntarse = async () => {  
  
    if(loginOk()){  
    
  
    const usuarioCookie = JSON.parse(Cookies.get('usuario'));
    const usuarioId = usuarioCookie.id_usuarios;
  
    if (numJugadores >= partida.max_jugadores) {
      setMensaje('La partida está llena. No se pueden apuntar más jugadores.');
    } else {
      try {
    const response = await axios.post('/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partida_jugador', {
        id_partida: id,
        id_usuario: usuarioId
    });
    console.log(response);
    setMensaje('Te has apuntado a la partida!');
    // window.location.href = "/apuntarsePartida/:id";
} catch (error) {
    console.error("Error al enviar el formulario:", error);
    if (error.response && error.response.status === 400 && error.response.data.mensaje === "Ya estás apuntado en esta partida.") {
        setMensaje("Ya estás apuntado en esta partida.");
    } else {
        setMensaje("Error al enviar el formulario.");
    }
}

    }
  } else {
    // Redireccionar al usuario a la página de inicio de sesión
    window.location.href = "/logIn";
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
        <p className="mensaje">{mensaje}</p>
        <button className="SignIn--button" onClick={handleApuntarse}>Apuntarse</button>
      </section>
      <Navbar></Navbar>
    </div>
  );
}

export default ApuntarsePartida;





