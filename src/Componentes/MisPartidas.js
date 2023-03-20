import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import loginOk from './LoginOk';

function MisPartidas() {
  const [idPartidas, setIdPartidas] = useState([]);
  const [partidas, setPartidas] = useState([]);
  const [jugadores, setJugadores] = useState({});

  useEffect(() => {
    fetch('/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partida_jugador&sesionUsuario=ok', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al obtener las partidas');
      }
    })
    .then(data => {
      console.log(data.id_partidas);
      setIdPartidas(data.id_partidas);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);


  useEffect(() => {
    // Obtener la información de las partidas correspondientes
    if (idPartidas && idPartidas.length > 0) {
      const id_partidas = idPartidas.join(',');
      axios.get(`/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partidas&id=${id_partidas}`)
      
        .then(response => {
          console.log(response.data)
          setPartidas(response.data);
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
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [idPartidas]);

if(loginOk()){  
  
  return (
    <div className='container'>
      <h1>Mis partidas</h1>
      <ul>
        {partidas && partidas.length > 0 ? (
          partidas.map(partida => (
            <section  className="partidas" key={partida.id_partida}>
  <div className="partidas-juego">Juego: {partida.juego}</div>
  <div className="partidas-jugadores">Jugadores: {jugadores[partida.id_partidas] || 0}</div>
  <div className="partidas-fecha">Fecha: {partida.fecha}</div>
  <div className="partidas-hora">Hora: {partida.hora}</div>
  <div className="partidas-ubicacion">Ubicación: {partida.ubicacion}</div>
  <Link to={`/apuntarsePartida/${partida.id_partidas}`}>
    <button>Ver partida</button>
  </Link>
</section>

            
          ))
        ) : (
          <p>No se encontraron partidas</p>
        )}
      </ul>
      <Navbar></Navbar>
    </div>

  );

  } else {
    // Redireccionar al usuario a la página de inicio de sesión
    window.location.href = "/logIn";
  }
}

export default MisPartidas;
