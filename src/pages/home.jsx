import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './home.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
// import {UserContext} from '../components/UserContext';
// import { Container } from './styles';

function Home() {
  
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  axios.interceptors.request.use(function (config) {
    config.baseURL = "http://localhost:4000"
    config.withCredentials = true
    config.validateStatus = false
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  async function confidencial(event){
    event.preventDefault();
    const response = await axios.get('private');
    if (response.status !== 200){
      setMessage("")
      setError(response.data.message)
    }else{
      setError("")
      setMessage("Página autenticada com sucesso")
    }
  }
  
  async function renovaToken(event){
    event.preventDefault();
    const response = await axios.post('token', {});
    if (response.status !== 200) {
      window.localStorage.clear()
      navigate('/login');
    }
    setMessage("Novo codigo de acesso")
    setError("")
  }

  async function confidenticalERenovaTokenAutomaticamente(event){
    event.preventDefault();
    let response = await axios.get('private');
      if (response.status !== 200){
        response = await axios.post('token', {});
        if (response.status !== 200) {
          window.localStorage.clear()
          navigate('/login');
        }
      setMessage("Novo codigo de acesso")
      response = await axios.get('private');
      if (response.status !== 200){
        setMessage("")
        setError(response.data.message)
      }else{
        setError("")
        setMessage("Página autenticada com sucesso")
      }
    }else{
      setError("")
      setMessage("Página autenticada com sucesso")
    }
  }

  async function logout(event){
    event.preventDefault();
    const response = await axios.post('logout',{})
    if (response.status !== 200) {
      setError(response.data.message)
      setMessage("")
    }
    if (! response.data.auth){
      window.localStorage.clear()
      navigate('/login');
    }
  }
  
  //const {user} = useContext(UserContext);
  return <div className="App">
    <header className="App-header">
    <div className='user-image'><i className="fas fa-user-circle"></i></div>
    
    <button className="btn btn-primary" onClick={confidencial}>Acessa página privada</button>
    <button className="btn btn-secondary" onClick={renovaToken}>Renova token de atualização</button>
    <button className="btn btn-primary" onClick={confidenticalERenovaTokenAutomaticamente}>Acessa página privada e Renova token de atualização automaticamente</button>
    <button className="btn btn-danger" onClick={logout}>Logout</button>
    
      <p>
        Seja bem vindo {window.localStorage.getItem('user')}!
      </p>
      <div>{error !== "" ? (
          <p className="text-danger">{error}</p>
          ) : null}
      </div>
      <div>{message !== "" ? (
          <p className="text-primary">{message}</p>
          ) : null}
      </div>   
      {/* <Link to="/" className='btn btn-danger btn-lg'>Logout</Link> */}
    </header>
  </div>;
}

export default Home;