import React, { ReactDOM } from 'react';
/* import Redux */
// import { provider } from 'react-redux';
import App from './components/App';
// Importamos las hojas de estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/index.scss';

ReactDOM.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>,
    document.getElementById('root'),
);
