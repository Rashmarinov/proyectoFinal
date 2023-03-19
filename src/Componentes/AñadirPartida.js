import React, { useState } from "react";
import Navbar from "./Navbar";
import loginOk from "./LoginOk";
import axios from 'axios';
import Cookies from "js-cookie";

const AñadirPartida = () => {
  
  const [juego, setJuego] = useState("");
  const [maxJugadores, setMaxJugadores] = useState(2);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario
    if (
      juego.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      ubicacion.trim() === ""
    ) {
      setMensaje("Por favor, completa todos los campos.");
      return;
    }

    // Enviar formulario
    try {
      const response = await axios.post('/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partidas', {
        juego,
        max_jugadores: maxJugadores,
        fecha,
        hora,
        ubicacion
      });

      const id_Partida = response.data;
      const id_Usuario = JSON.parse(Cookies.get('usuario')).id_usuarios;

      console.log(id_Partida);
      console.log(id_Usuario);
      
      //await axios.post('/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partida_jugador',
      axios.post('/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partida_jugador', {
        id_partida: id_Partida,
        id_usuario: id_Usuario
      });
      
      setMensaje('Partida creada correctamente!');
      setJuego("");
      setMaxJugadores(2);
      setFecha("");
      setHora("");
      setUbicacion("");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setMensaje("Error al enviar el formulario.");
    }
  };
  
  //Condición para usuarios logeados
  if(loginOk()){

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
            <select
              className="SignIn--input"
              id="max_jugadores"
              value={maxJugadores}
              onChange={(e) => setMaxJugadores(e.target.value)}
            >
              <option value="">Número de jugadores</option>
              {Array.from(Array(9), (e, i) => (
                <option key={i} value={i + 2}>
                  {i + 2}
                </option>
              ))}
            </select>
            {mensaje && <p className="mensaje">{mensaje}</p>}
            <button className="SignIn--button" type="submit">
              Crear Partida
            </button>
          </form>
          
        </section>
        <Navbar />
      </div>
    );
    

  } else {
    // Redireccionar al usuario a la página de inicio de sesión
    window.location.href = "/logIn";
  }
};

export default AñadirPartida;
