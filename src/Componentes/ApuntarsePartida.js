// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "./Navbar";

// const ApuntarsePartida = (props) =>{

//     const [partida, setPartida] = useState();
//     const { id } = useParams();

//     const fetchApi = () => {
//         fetch("data.json" + id)
//             .then((response) => response.json())
//             .then((data) => {
//                 setPartida(data);
//             });
//     };

//     useEffect(() => {
//         fetchApi();
//     }, [props]);

//         return (
//     <div className="containerApuntarse">   
//     <section className="apuntarsePartida" >
//       <p className="apuntarsePartida--Info">Juego: {partida.juego[id]}</p>
//       <p className="apuntarsePartida--Info">Jugadores: {partida.jugadores}</p>
//       <p className="apuntarsePartida--Info">Fecha: {partida.fecha}</p>
//       <p className="apuntarsePartida--Info">Hora: {partida.hora}</p>
//       <p className="apuntarsePartida--Info">Ubicación: {partida.ubicacion}</p>
//       <button className="SignIn--button">Apuntarse</button>
//     </section>
    
//     <Navbar></Navbar>
//   </div>
// );
      
// }
// export default ApuntarsePartida;



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function ApuntarsePartida() {
  const [partida, setPartida] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        const partidaEncontrada = data.find((juego) => juego.id === id);
        setPartida(partidaEncontrada);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="containerApuntarse">   
      <section className="apuntarsePartida" key={partida.id}>
        <p className="apuntarsePartida--Info">Juego: {partida.juego}</p>
        <p className="apuntarsePartida--Info">Jugadores: {partida.jugadores}</p>
        <p className="apuntarsePartida--Info">Fecha: {partida.fecha}</p>
        <p className="apuntarsePartida--Info">Hora: {partida.hora}</p>
        <p className="apuntarsePartida--Info">Ubicación: {partida.ubicacion}</p>
        <button className="SignIn--button">Apuntarse</button>
      </section>
      
      <Navbar></Navbar>
    </div>
  );
}

export default ApuntarsePartida;
