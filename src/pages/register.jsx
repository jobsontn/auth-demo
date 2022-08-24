import React, { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import './login.css';
import logo from '../assets/img/logo.svg';
import '../firebase';

// import { Container } from './styles';

function Login() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [error, setError] = useState("");

    function cadastrar(event) {
        setError("");
        event.preventDefault();
        if(senha !== confirmarSenha){
            setError('As senhas não conferem.');
            return;
        }
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, senha)
          .then((userCredential) => {
            // Signed in
            updateProfile(auth.currentUser, {
                displayName: nome, photoURL: ""
              }).then(() => {
                // Profile updated!
                // ...
              }).catch((error) => {
                // An error occurred
                // ...
                setError(error);
              });
            const user = userCredential.user;
            console.log(auth.currentUser);
            navigate('/home');
          })
          .catch((error) => {
            const errorCode = error.code;
            /* const errorMessage = error.message; */
            switch (errorCode) {
                case 'auth/missing-email':
                    setError('Email inválido.');
                    break;
                case 'auth/weak-password':
                    setError('A senha deve conter no mínimo 6 caracteres.');
                    break;
                case 'auth/internal-error':
                    setError('A senha é obrigatória.');
                    break;
                default:
                    setError(errorCode);
                    break;
            }
          });
    }

    return <div >
        <div className="card card-login">
            <h5 className="card-header text-center"><img src={logo} className="App-logo1" alt="logo" /></h5>
            <div className="card-body">
                <h5 className="card-title text-center mb-3">Faça o seu cadastro</h5>
                <form onSubmit={cadastrar}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required/>
                        <span className="input-group-text" id="basic-addon1"><i className='fas fa-user'></i></span>
                    </div>
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required/>
                        <span className="input-group-text" id="basic-addon1"><i className='fas fa-envelope'></i></span>
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required/>
                        <span className="input-group-text" id="basic-addon1"><i className='fas fa-lock'></i></span>
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Confirmar Senha" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} required/>
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
                                    Aceito os termos
                                </label>
                            </div>
                        </div>

                        <div className="col-4 d-grid gap-2">
                            <button className="btn btn-primary" >Registrar</button>
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
                    <Link to="/login">Eu já possuo cadastro</Link>
                </p>
            </div>
        </div>
    </div>;
}

export default Login;