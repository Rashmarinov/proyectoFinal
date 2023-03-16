function loginOk() {
  // Buscar la cookie "user_session"
  const cookie = document.cookie.split(";").find((cookie) => cookie.includes("user_session"));

  // Si se encuentra la cookie "user_session" y su valor es "true", el usuario ha iniciado sesión
  if (cookie && cookie.includes("user_session=true")) {
    console.log("La cookie 'user_session' EXISTE y su valor es 'true'");
    return true;
  } else {
    console.log("La cookie 'user_session' NO EXISTE o su valor no es 'true'");
    return false;
  }
}
export default loginOk;

// if(loginOk()){  

// } else {
//   // Redireccionar al usuario a la página de inicio de sesión
//   window.location.href = "/logIn";
// }