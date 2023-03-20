import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import loginOk from "./LoginOk";
import axios from 'axios';
import { useParams } from "react-router-dom";

const EditarPartida = () => {
  
  const [juego, setJuego] = useState("");
  const [max_jugadores, setMax_jugadores] = useState(2);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { id } = useParams();

  useEffect(() => {

    // Obtener los datos completos del usuario desde la base de datos
    axios.get(`/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partidas&id=${id}`)
      .then((response) => {
        setJuego(response.data[0].juego);
        setFecha(response.data[0].fecha);
        setHora(response.data[0].hora);
        setUbicacion(response.data[0].ubicacion);
        setMax_jugadores(response.data[0].max_jugadores);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de la partida:", error);
      });
  }, []);

  
  const handleSubmit = (event) => {
    event.preventDefault();

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
      const respuesta = axios.put('/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=partidas', {
        id: id,
        juego,
        max_jugadores: max_jugadores,
        fecha,
        hora,
        ubicacion
      });
      
      console.log(respuesta);
      setMensaje('Partida modificada correctamente!');
      window.location.href = `/apuntarsePartida/${id}`;
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setMensaje("Error al enviar el formulario.");
    }
  };
  
  //Condición para usuarios logeados
  if(loginOk()){

    return (
      <div className="container">
        <h1>Editar Partida</h1>
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
              value={max_jugadores}
              onChange={(e) => setMax_jugadores(e.target.value)}
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
              Guardar Cambios
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

export default EditarPartida;