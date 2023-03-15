import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    // Validar el correo electrónico
    if (!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      setEmailError("El correo electrónico no es válido");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    // Validar la contraseña
    if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula y un número");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Si hay errores, no enviar el formulario
    if (emailError || passwordError) {
      return;
    }

    // Enviar formulario
    axios.post("edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=usuarios", {
      email,
      contrasena: password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log("Respuesta de la API:", response);
      const token = response.data.token;
      localStorage.setItem('token', token); // Almacenar el token en localStorage
      // Aquí puedes redireccionar a la página de inicio, una vez que el usuario ha iniciado sesión correctamente
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
      // Aquí puedes mostrar un mensaje de error al usuario, si es que hubo un problema al iniciar sesión
    });
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
          {emailError && <div className="error">{emailError}</div>}
          <input className="logIn--input"
          placeholder="Contraseña"
            type="text"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <div className="error">{passwordError}</div>}
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
