import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import Cookies from 'js-cookie';
import loginOk from "./LoginOk";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

    axios.get("edib/proyectoFinal/src/php/apiRestActualizada.php?tabla=usuarios", {
      params: {
        email: email,
        contrasena: password
      }
    })
    .then((response) => {
      console.log("Respuesta de la API:", response);
      const usuario = response.data;
    
      if(usuario && usuario.email === email && usuario.contrasena === password) {
        // Si se encuentra el usuario, se puede establecer una cookie de sesión y redireccionar a la página de perfil
        Cookies.set('user_session', 'true', { expires: 1, path: '/' });
        Cookies.set('usuario', JSON.stringify(usuario), { expires: 1, path: '/' });
        console.log(usuario)
        window.location.href = "/perfil";
        console.log("Usuario encontrado")
      } else {
        // Si no se encuentra el usuario, se muestra un mensaje de error
        console.error("No se encontró ningún usuario con el email y contraseña proporcionados.");
        setErrorMessage("Email o contraseña incorrectos");
      }
    })
    .catch((error) => {
      console.error("Error al enviar la solicitud:", error);
      // Aquí puedes mostrar un mensaje de error al usuario, si es que hubo un problema al iniciar sesión
    });
  };
if(loginOk()){  
  // Redireccionar al usuario a la página de inicio de sesión
  window.location.href = "/perfil";
} else {

  return (
    <div className="container">
      <h1>Iniciar sesión</h1>
      <section className="logIn">
        <form className="logIn--form" onSubmit={handleSubmit}>
          <input
            className="logIn--input"
            placeholder="Email"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <div className="error">{emailError}</div>}
          <input
            className="logIn--input"
            placeholder="Contraseña"
            type="text"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <div className="error">{passwordError}</div>}
          {errorMessage && <div className="error">{errorMessage}</div>}
          <button className="logIn--button" type="submit">Iniciar sesión</button>
          <button className="logIn--button">
            <a href="/Registrar">Crear cuenta</a>
          </button>
        </form>
      </section>
      <Navbar />
    </div>
  );
}

};

  export default LogIn;

