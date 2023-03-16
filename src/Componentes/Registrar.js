import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");
  const [errores, setErrores] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar formulario
    const erroresValidacion = validarFormulario();
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    if (contrasena !== repetirContrasena) {
      setErrores({ repetirContrasena: "Las contraseñas no coinciden" });
      return;
    }

    // Enviar formulario
    axios.post("edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=usuarios", {
      nombre,
      direccion,
      email,
      contrasena
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log("Respuesta de la API:", response);
      //Si el registro se realiza correctamente, redireccionamos al login
      window.location.href = "/logIn";
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
      if (error.response && error.response.status === 400 && error.response.data.mensaje === "El correo electrónico ya está registrado.") {
        setErrores({ email: "El correo electrónico ya está registrado." });
      } else {
        setErrores({ formulario: "Error al enviar el formulario." });
      }
    });
  };


  const validarFormulario = () => {
    const erroresValidacion = {};
    const nombreRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    const direccionRegex = /^\S+\s\S+\s\d+$/;
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const contrasenaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

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

    // Validar contraseña
    if (!contrasenaRegex.test(contrasena)) {
      erroresValidacion.contrasena = "Contraseña inválida";
    }

    // Validar repetir contraseña
    if (contrasena !== repetirContrasena) {
      erroresValidacion.repetirContrasena = "Las contraseñas no coinciden";
    }

    setErrores(erroresValidacion); // actualizar errores al momento

    return erroresValidacion;
  };
  return (
    <div className="container">
      <h1>Registrate</h1>
      <section className="SignIn">
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

          {/* Input Contraseña */}
          <input
            className={`SignIn--input ${
              errores.contrasena ? "SignIn--input-error" : ""
            }`}
            placeholder="Contraseña"
            type=""
            id="contrasena"
            value={contrasena}
            name="contrasena"
            onChange={(e) => setContrasena(e.target.value)}
          />
          {errores.contrasena && (
            <span className="SignIn--error">{errores.contrasena}</span>
          )}
          
          {/* Input Repetir Contraseña */}
          <input
            className={`SignIn--input ${
              errores.repetirContrasena ? "SignIn--input-error" : ""
            }`}
            placeholder="Repetir Contraseña"
            type=""
            id="repetirContrasena"
            value={repetirContrasena}
            name="repetirContrasena"
            onChange={(e) => setRepetirContrasena(e.target.value)}
          />
          {errores.repetirContrasena && (
            <span className="SignIn--error">{errores.repetirContrasena}</span>
          )}

          <button className="SignIn--button" type="submit">
            Registrarse
          </button>
        </form>
      </section>
      <Navbar></Navbar>
    </div>
  );
};

export default Registrar;


