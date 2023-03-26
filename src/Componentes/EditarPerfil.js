import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import Cookies from 'js-cookie';

const EditarPerfil = () => {
    const [usuario, setUsuario] = useState(null);
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [errores, setErrores] = useState({});

  useEffect(() => {
    // Obtener el id de usuario de la cookie
    const usuarioCookie = JSON.parse(Cookies.get('usuario'));
    const usuarioId = usuarioCookie.id_usuarios;
    // Obtener los datos completos del usuario desde la base de datos
    axios.get(`edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=usuarios&id=${usuarioId}`)
      .then((response) => {
        setUsuario(response.data[0]);
        setNombre(response.data[0].nombre);
        setDireccion(response.data[0].direccion);
        setEmail(response.data[0].email);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, []);



  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar formulario
    const erroresValidacion = validarFormulario();
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    // Obtener el id de usuario de la cookie
    const usuarioCookie = JSON.parse(Cookies.get('usuario'));
    const usuarioId = usuarioCookie.id_usuarios;
    console.log(usuarioId)
    // Enviar formulario
    axios.put(`/edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=usuarios`, {
      nombre,
      direccion,
      email,
      id: usuarioId
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log("Respuesta de la API:", response);
      
      //Si la actualización se realiza correctamente, redireccionamos al perfil
      window.location.href = "/perfil";
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
      setErrores({ formulario: "Error al enviar el formulario." });
    });
  };

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  const validarFormulario = () => {
    const erroresValidacion = {};
    const nombreRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    const direccionRegex = /^\S+\s\S+\s\d+$/;
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    // Validar nombre
    if (!nombreRegex.test(nombre.trim())) {
      erroresValidacion.nombre = "Nombre inválido";
    }

    // Validar dirección
    if (!direccionRegex.test(direccion.trim())) {
      erroresValidacion.direccion = "Dirección inválida";
    }

    // Validar email
    if (!emailRegex.test(email.trim())) {
      erroresValidacion.email = "Email inválido";
    }

    setErrores(erroresValidacion); // actualizar errores al momento

    return erroresValidacion;
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
      <section className="logIn">
      <h4 className="pagina__titulo__desktop">Editar Perfil </h4>
      <form className="SignIn--form" onSubmit={handleSubmit}>

        {/* Input Nombre */}
        <input
        className={`SignIn--input ${
            errores.nombre ? "SignIn--input-error" : ""
        }`}
        placeholder="Nombre"
        type="text"
        id="nombre"
        value={nombre}
        name="nombre"
        onChange={(e) => setNombre(e.target.value)}
        
        />
        {errores.nombre && (
        <span className="SignIn--error">{errores.nombre}</span>
        )}
        {/* Input Direccion */}
        <input
        className={`SignIn--input ${
            errores.direccion ? "SignIn--input-error" : ""
        }`}
        placeholder="Dirección"
        type="text"
        id="direccion"
        value={direccion}
        name="direccion"
        onChange={(e) => setDireccion(e.target.value)}
        />
        {errores.direccion && (
        <span className="SignIn--error">{errores.direccion}</span>
        )}
        {/* Input Email */}
        <input
        className={`SignIn--input ${
            errores.email ? "SignIn--input-error" : ""
        }`}
        placeholder="Email"
        type="email"
        id="email"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        />
        {errores.email && (
        <span className="SignIn--error">{errores.email}</span>
        )}

        <button className="SignIn--button" type="submit">
        Guardar Cambios
        </button>
        </form>
      </section>
      <Navbar></Navbar>
    </div>
  );
  
};

export default EditarPerfil;

