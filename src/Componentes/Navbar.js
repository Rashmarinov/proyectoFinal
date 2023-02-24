const Navbar = () => (
  <div class="navlist">
    <div class="navButons">
      <a href="/">
        <img src="/img/svg/botonInicio.svg" alt="" />
      </a>
    </div>

    <div class="navButons">
      <a href="/partidas">
        <img src="/img/svg/botonMesa.svg" alt="" />
      </a>
    </div>

    <div class="navButons">
      <a href="/logIn">
        <img src="/img/svg/botonPerfil.svg" alt="" />
      </a>
    </div>

    <div class="navButons">
      <input class="inputDesplegable" type="checkbox" id="boton"></input>
      <img src="/img/svg/botonDesplegable.svg" alt="" />

      <ul class="desplegable">
        <li>Buscar</li>
        <li>
          <a class="inicio" href="/privacidad">
            Privacidad
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default Navbar;
