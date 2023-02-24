import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/main.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HeaderMovil from './Componentes/HeaderMovil';
import Partidas from './Componentes/Juegos';
import LogIn from './Componentes/LogIn';
import Registrar from './Componentes/Registrar';
import Apuntarse from './Componentes/ApuntarsePartida';


const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Partidas></Partidas>
  },
  {
    path: '/logIn',
    element: <LogIn></LogIn>
  },
  {
    path: '/Registrar',
    element: <Registrar></Registrar>
  },
  {
    path: '/apuntarsePartida/:id',
    element: <Apuntarse></Apuntarse>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <HeaderMovil></HeaderMovil>
      <RouterProvider router={browserRouter} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
