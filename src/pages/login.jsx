import React, { useState, useContext } from 'react';
import { Link,useNavigate } from "react-router-dom";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './login.css';
import logo from '../assets/img/logo.svg';
// import '../firebase';
import { UserContext } from '../components/UserContext';
// import { Container } from './styles';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const URL_LOGIN = 'http://localhost:4000/login'

    async function logar(event) {
        event.preventDefault();
        const response = await axios.post(
            URL_LOGIN, 
            {email: email, password: senha}, 
            {validateStatus: false, withCredentials: true }
        );
        console.log(response)
        if (response.data.auth){
            setUser(response.data.email);
            window.localStorage.setItem("user", response.data.email);
            navigate('/home');
        }
        else{
            setError(response.data.message)
        }
        
    }

    return <div>
        <div className="card card-login">
            <h5 className="card-header text-center"><img src={logo} className="App-logo1" alt="logo" /></h5>
            <div className="card-body">
                <h5 className="card-title text-center mb-3">Faça login para iniciar sua sessão</h5>
                <form onSubmit={logar}>
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required/>
                        <span className="input-group-text" id="basic-addon1"><i className='fas fa-envelope'></i></span>
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required/>
                        <span className="input-group-text" id="basic-addon1"><i className='fas fa-lock'></i></span>
                    </div>
                    {error !== "" ? (
                        <p className="text-danger">{error}</p>
                    ) : null}


                    <div className="row mb-3">
                        <div className="col-8">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Lembre de mim
                                </label>
                            </div>
                        </div>

                        <div className="col-4 d-grid gap-2">
                            <button className="btn btn-primary" >Entrar</button>
                            {/* <Link to="/home" className='btn btn-primary'>Entrar</Link> */}
                        </div>
                    </div>
                </form>
                <div className="col-12 d-grid gap-2 mb-3">
                    <button className="btn btn-danger">
                        <i className="fab fa-google me-2"></i> Entrar usando o Google
                    </button>
                </div>
                <p className="mb-1">
                    <Link to='#'>Esqueci a minha senha</Link>
                </p>
                <p className="mb-1">
                    <Link to="/register">Não possuo cadastro</Link>
                </p>
            </div>
        </div>
    </div>;
}

export default Login;