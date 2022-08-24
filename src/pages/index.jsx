import React from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/img/logo.svg';
import './index.css';

// import { Container } from './styles';

function index() {
    return <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Nenhum usuário autenticado
            </p>
            <Link to="/login" className='btn btn-primary btn-lg'>Login</Link>
        </header>
    </div>;
}

export default index;