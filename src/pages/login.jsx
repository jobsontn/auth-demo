import React from 'react';
import { Link } from "react-router-dom";
import './login.css';
import logo from '../assets/img/logo.svg';

// import { Container } from './styles';

function pages() {
    return <div >
        <div className="card card-login">
            <h5 className="card-header text-center"><img src={logo} className="App-logo1" alt="logo" /></h5>
            <div className="card-body">
                <h5 className="card-title text-center mb-3">Faça login para iniciar sua sessão</h5>

                <form action="../../index3.html" method="post">
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" placeholder="E-mail" />
                        <span class="input-group-text" id="basic-addon1"><i className='fas fa-envelope'></i></span>
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Senha" />
                        <span class="input-group-text" id="basic-addon1"><i className='fas fa-lock'></i></span>
                    </div>
                    <div className="row mb-3">
                        <div className="col-8">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Lembre de mim
                                </label>
                            </div>
                        </div>

                        <div className="col-4 d-grid gap-2">
                            {/* <button type="submit" className="btn btn-primary">Entrar</button> */}
                            <Link to="/home" className='btn btn-primary'>Entrar</Link>
                        </div>

                    </div>
                </form>
                <div className="col-12 d-grid gap-2 mb-3">
                    <button class="btn btn-danger">
                        <i class="fab fa-google me-2"></i> Entrar usando o Google
                    </button>
                </div>
                <p class="mb-1">
                    <Link to='#'>Esqueci a minha senha</Link>
                </p>
                <p class="mb-1">
                    <Link to="#">Não possuo cadastro</Link>
                </p>
            </div>
        </div>
    </div>;
}

export default pages;