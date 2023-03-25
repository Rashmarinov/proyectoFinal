const Footer = () => (
    <div className="footer">

        <footer className="footerSimple">

        <div className="footerSimple__svg">
            <hr></hr>
            <img src="img/svg/logoTwitter.svg" alt=""></img>
            <img src="img/svg/logoFacebook.svg" alt=""></img>
            <img src="img/svg/logoInstagram.svg" alt=""></img>
            <hr></hr>
        </div>
            
            <img className="logoGris" src ="/img/svg/logoGris.svg" alt="logoGris"/>
            
            <h5 className="footerSimple__copy"> Copyright &copy; 2023 MallorcaGames</h5>

            <ul className="footerSimple__links">
                <li>Información legal  </li>
                <li>Política de privacidad </li>
                <li>Seguridad</li>
                <li>Contactar</li>
            </ul>
        </footer>

    </div>
);

export default Footer;