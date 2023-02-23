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
      <section className="logIn">
        <form className="logIn--form" onSubmit={handleSubmit}>
          <input className="logIn--input"
            placeholder="Email"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input className="logIn--input"
          placeholder="Contraseña"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="logIn--button" type="submit">Iniciar sesión</button>

          <button className="logIn--button">
          <a href="/Registrar">Crear cuenta</a>
        </button>
        </form>
      </section>
      <Navbar></Navbar>
    </div>
  );
}

export default LogIn;
