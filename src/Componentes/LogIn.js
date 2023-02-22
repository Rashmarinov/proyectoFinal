import React, { useState } from "react";
import Navbar from "./Navbar";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario al servidor o validar los campos.
  };

  return (
    <div className="container">
      <h1>Iniciar sesión</h1>
      <section className="container--logIn">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Iniciar sesión</button>
        </form>
        <button>
          <a href="/Registrar">Crear cuenta</a>
        </button>
      </section>
      <Navbar></Navbar>
    </div>
  );
}

export default LogIn;
