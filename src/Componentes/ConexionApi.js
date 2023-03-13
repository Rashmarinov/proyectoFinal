import React, { useState, useEffect } from "react";
import axios from 'axios';

function ConexionApi(){

    const baseUrl="http://localhost:80/edib/proyectoFinal/src/php/apiPartidas.php";
    const [data, setData] = useState([]);

    const peticionGet=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
            console.log(response.data);
        })
    }

    useEffect(()=>{
        peticionGet();
    },[])

    return null;
}

export default ConexionApi;


