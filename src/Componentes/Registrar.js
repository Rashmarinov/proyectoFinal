import React, { useState } from "react";
import Navbar from "./Navbar";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar formulario
    if (
      nombre.trim() === "" ||
      direccion.trim() === "" ||
      email.trim() === "" ||
      contrasena.trim() === "" ||
      repetirContrasena.trim() === ""
    ) {
      // Mostrar mensaje de error o realizar alguna acción
      return;
    }

    if (contrasena !== repetirContrasena) {
      // Mostrar mensaje de error o realizar alguna acción
      return;
    }

    // Enviar formulario
    console.log("Formulario enviado");
  };

  return (
    <div className="container">
      <h1>Registrate</h1>
      <section className="SignIn">
        <form className="SignIn--form" onSubmit={handleSubmit}>
          <input
            className="SignIn--input"
            placeholder="Nombre"
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            className="SignIn--input"
            placeholder="Dirección"
            type="text"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <input
            className="SignIn--input"
            placeholder="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="SignIn--input"
            placeholder="Contraseña"
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <input
            className="SignIn--input"
            placeholder="Repetir Contraseña"
            type="password"
            id="repetirContrasena"
            value={repetirContrasena}
            onChange={(e) => setRepetirContrasena(e.target.value)}
          />
          <button className="SignIn--button" type="submit">
            Sign Up
          </button>
        </form>
      </section>
      <Navbar></Navbar>
    </div>
  );
};

export default Registrar;
