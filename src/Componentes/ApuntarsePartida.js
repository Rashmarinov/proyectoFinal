import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from 'axios';
import loginOk from "./LoginOk";
import Cookies from 'js-cookie';


function ApuntarsePartida() {
  const [partida, setPartida] = useState({});
  const [jugadores, setJugadores] = useState([]);
  const [idJugadores, setIdJugadores] = useState([]);
  const [numJugadores, setNumJugadores] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [esCreador, setEsCreador] = useState(false); 
  const { id } = useParams();
  const usuarioCookie = Cookies.get('usuario');
  const usuarioId = usuarioCookie ? JSON.parse(usuarioCookie).id_usuarios : null;


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const responseJugadores = await axios.get(`/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partida_jugador&id=${id}`);
        //Almacenamos los nombres de los usuarios apuntados
        setJugadores(responseJugadores.data.map(jugador => jugador.nombre));
        //Almacenamos los ids de los usuarios apuntados
        setIdJugadores(responseJugadores.data.map(idJugadores => idJugadores.id_usuarios));
        const responsePartida = await axios.get(`/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partidas&id=${id}`);
        setPartida(responsePartida.data[0]);
        setNumJugadores(responseJugadores.data.length);

        // Verificar si el usuario logueado es el creador de la partida
        if (partida.id_creador === usuarioId) {
          setEsCreador(true);
        }

      } catch (error) {
        console.log(error);
      }
    };

    
    fetchData();
  }, [id, usuarioId, partida]);

  //Busca el idUsuario entre los ids de los usuarios apuntados para comprobar si ya está registrado
  const jugadorRegistrado = idJugadores.includes(usuarioId);

  const handleEliminar = async () => {
    try {
      const response = await axios.delete(`/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partidas&id=${id}`);
      console.log(response);
      // Redireccionar al usuario a la página de "Mis partidas"
      window.location.href = "/misPartidas";
    } catch (error) {
      console.error("Error al eliminar la partida:", error);
      setMensaje("Error al eliminar la partida.");
    }
  };

  const handleModificar = () => {
    // Redireccionar al usuario a la página de "Modificar partida"
    window.location.href = `/editarPartida/${id}`;
  };
  
  const handleAbandonar = async () => {
    try {
      const response = await axios.delete(`/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partida_jugador&id_partida=${id}&id_usuario=${usuarioId}`);
      console.log(response);
      // Refrescar la página
      window.location.reload();
      setMensaje("Te has abandonado la partida.");
    } catch (error) {
      console.error("Error al abandonar la partida:", error);
      setMensaje("Error al abandonar la partida.");
    }
  };

  const handleApuntarse = async () => {  

  if(loginOk()){  

  if (numJugadores >= partida.max_jugadores) {
    setMensaje('La partida está llena. No se pueden apuntar más jugadores.');
  } else {
    try {
  const response = await axios.post('/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partida_jugador', {
      id_partida: id,
      id_usuario: usuarioId
  });
  console.log(response);
  //Refrescamos la página
  window.location.reload(); 
  setMensaje('Te has apuntado a la partida!');
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

const renderBotones = () => {
  if (esCreador) {
    return (
      <>
        <button className="SignIn--button" onClick={handleModificar}>Modificar</button>
        <button className="SignIn--button" onClick={handleEliminar}>Eliminar</button>
      </>
    );
  } else if (jugadorRegistrado) {
    return (
      <button className="SignIn--button" onClick={handleAbandonar}>Abandonar partida</button>
    );
  } else {
    return (
      <button className="SignIn--button" onClick={handleApuntarse}>Apuntarse</button>
    );
  }
};


            
            return (
            <div className="containerApuntarse">
            <section className="apuntarsePartida">
            <p className="apuntarsePartida--Info">Juego: {partida.juego}</p>
            <p className="apuntarsePartida--Info">Jugadores [{numJugadores}/{partida.max_jugadores}]: {jugadores.join(', ')}</p>
            <p className="apuntarsePartida--Info">Fecha: {partida.fecha}</p>
            <p className="apuntarsePartida--Info">Hora: {partida.hora}</p>
            <p className="apuntarsePartida--Info">Ubicación: {partida.ubicacion}</p>
            <p className="mensaje">{mensaje}</p>
            {renderBotones()}
            </section>
            <Navbar></Navbar>
            </div>
            );
            }
            
            export default ApuntarsePartida;




