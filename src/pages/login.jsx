import React, { useState, useContext } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './login.css';
import logo from '../assets/img/logo.svg';
import '../firebase';
import { UserContext } from '../components/UserContext';
// import { Container } from './styles';

function Login() {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    function logar(event) {
        event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                setError("");
                setUser(user);
                window.localStorage.setItem("user", JSON.stringify(user));
                navigate('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                /* const errorMessage = error.message; */
                switch (errorCode) {
                    case 'auth/user-not-found':
                        setError('Usuário não encontrado.');
                        break;
                    case 'auth/wrong-password':
                        setError('Senha incorreta.');
                        break;
                    case 'auth/internal-error':
                        setError('Usuário ou senha incorretos.');
                        break;
                    case 'auth/invalid-email':
                        setError('Email inválido.');
                        break;
                    default:
                        setError(errorCode);
                        break;
                }
            });
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