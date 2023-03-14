import React, { useState, useEffect } from "react";
import axios from 'axios';

const ConexionApi= () => {

    const [data, setData] = useState([]);

    const peticionGet=async()=>{
        await axios.get("http://localhost:80/edib/proyectoFinal/src/php/apiPartidas.php")
        .then(response=>{
            setData(response.data);
        })
    }

    useEffect(()=>{
        peticionGet();
    },[])

}

export default ConexionApi;

// Const peticionPost=async()=>{
//     var f = new FormData();
//     f.append("nombre", frameworkSeleccionado.nombre);
//     f.append("direccion", frameworkSeleccionado.direccion);
//     f.append("email", frameworkSeleccionado.email);
//     f.append("contrasena", frameworkSeleccionado.contrasena);
//     await axios.post("http://localhost:80/edib/proyectoFinal/src/php/apiRest.php?tabla=usuarios", f)
//     .then(response=>{
//         setData(data.concat(response.data));

//     })
// }


