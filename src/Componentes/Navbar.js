const Navbar = () => (
  <div class="navlist">
    <div class="navButons">
      <a href="/">
        <img src="/img/svg/botonInicio.svg" alt="" />
      </a>
    </div>

    <div class="navButons">
      <a href="/añadirPartida">
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
      

      <a href="/misPartidas">
          <img src="/img/svg/botonDesplegable.svg" alt="" />
      </a>
      
    </div>
  </div>
);

export default Navbar;
