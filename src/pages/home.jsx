import React from 'react';
import { Link } from "react-router-dom";
import './home.css';
// import { Container } from './styles';

function home() {
  return <div className="App">
    <header className="App-header">
      <div className='user-image'><i className="fas fa-user-circle"></i></div>
      <p>
        Seja bem vindo Fulano!
      </p>
      <Link to="/" className='btn btn-danger btn-lg'>Logout</Link>
    </header>
  </div>;
}

export default home;