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

    // Cerrar la sesión en PHP
    axios.get("edib/proyectoFinal/src/php/cerrarSesion.php");
  
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = "/";
  };
  

  return (
    <div className="container__Form separar">
      <h4 className="pagina__titulo">Mi Perfil</h4>
      <picture className="imagen">
        <source srcset="
          /img/desktop/ImagenProfile.webp 1x,
          /img/desktop/ImagenProfile@2x.webp 2x"
          media="(min-width:1000px)"/>

      <img className="imagenPerfil" src="" alt="Imagen perfil" />
    </picture>
      <section className="perfil">
      <h4 className="pagina__titulo__desktop">Mi Perfil</h4>
        <p className="apuntarsePartida--Info">Nombre: {usuario.nombre}</p>
        <p className="apuntarsePartida--Info">Dirección: {usuario.direccion}</p>
        <p className="apuntarsePartida--Info">Email: {usuario.email}</p>

        <button className="logIn--button">
          <a href="/editarPerfil">Editar Perfil</a>
        </button>

        <button className="logIn--button" onClick={handleLogOut}>
          <a href="/logIn">Cerrar Sesión</a>
        </button>

      </section>
      <Navbar></Navbar>
    </div>
  );
};

export default Perfil;
