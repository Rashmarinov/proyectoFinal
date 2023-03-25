const Navbar = () => (
  <div class="navlist">
    <img className="logoAzul_Nav" src="/img/svg/logoAzulDesktop.svg" alt="logoAzul" />
    <a href="/">
      <div class="navButons">
        <img className="navButons__img" src="/img/svg/botonInicio.svg" alt="" />
      </div>
      <span className="navButons__span">Inicio</span>
    </a>

    <a href="/añadirPartida">
      <div class="navButons">
        <img className="navButons__img" src="/img/svg/botonMesa.svg" alt="" />
      </div>
      <span className="navButons__span">Añadir Partida</span>
    </a>

    <a href="/logIn">
      <div class="navButons">
        <img className="navButons__img" src="/img/svg/botonPerfil.svg" alt="" />
      </div>
      <span className="navButons__span">Perfil</span>
    </a>

    <a href="/misPartidas">
      <div class="navButons">
        <img
          className="navButons__img"
          src="/img/svg/botonDesplegable.svg"
          alt=""
        />
      </div>
      <span className="navButons__span">Mis Partidas</span>
    </a>
  </div>
);

export default Navbar;
