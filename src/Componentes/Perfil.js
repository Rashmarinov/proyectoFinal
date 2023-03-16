import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import Cookies from 'js-cookie';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Obtener el id de usuario de la cookie
    const usuarioCookie = JSON.parse(Cookies.get('usuario'));
    const usuarioId = usuarioCookie.id_usuarios;
    // Obtener los datos completos del usuario desde la base de datos
    axios.get(`edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=usuarios&id=${usuarioId}`)
      .then((response) => {
        setUsuario(response.data[0]);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, []);

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  const handleLogOut = () => {
    // Eliminar la cookie "user_session"
    Cookies.remove("user_session");
    Cookies.remove("usuario");
  
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = "/login";
  };
  

  return (
    <div className="container">
      <h1>Perfil de {usuario.nombre}</h1>
      <section className="perfil">
        <p>Nombre: {usuario.nombre}</p>
        <p>Dirección: {usuario.direccion}</p>
        <p>Email: {usuario.email}</p>

        <button className="logIn--button" onClick={handleLogOut}>
          <a href="/Login">Cerrar Sesión</a>
        </button>

      </section>
      <Navbar></Navbar>
    </div>
  );
};

export default Perfil;
