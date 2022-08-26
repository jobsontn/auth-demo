import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './home.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { windows } from 'fontawesome';
// import {UserContext} from '../components/UserContext';
// import { Container } from './styles';

const URL_PRIVATE = 'http://127.0.0.1:4000/private'
const URL_TOKEN = 'http://127.0.0.1:4000/token'
const URL_LOGOUT = 'http://127.0.0.1:4000/logout'

function Home() {
  
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  async function confidencial(event){
    event.preventDefault();
    const accessToken = window.localStorage.getItem('accessToken')
    const response = await axios.get(
        URL_PRIVATE, 
        { headers: { 'Authorization': `Bearer ${accessToken}`}, validateStatus: false },
    );
    if (response.status !== 200){
      const refreshToken = window.localStorage.getItem('refreshToken')
    const response = await axios.post(
      URL_TOKEN,
      {token: refreshToken},
      { validateStatus: false },
    );
    if (response.status !== 200) {
      window.localStorage.clear()
      navigate('/login');
    }
    setAccessToken(response.data.accessToken)
    window.localStorage.setItem("accessToken", response.data.accessToken);
    setRefreshToken(response.data.refreshToken)
    window.localStorage.setItem("refreshToken", response.data.refreshToken);
    setMessage("Novo codigo de acesso")
    setError("")
    
    }else{
      setAccessToken(window.localStorage.getItem('accessToken'))
      setRefreshToken(window.localStorage.getItem('refreshToken'))
      setError("")
      setMessage("Pagina autenticada")
    }
    console.log(response)
  }
  
  async function renovaToken(event){
    event.preventDefault();
    const refreshToken = window.localStorage.getItem('refreshToken')
    const response = await axios.post(
      URL_TOKEN,
      {token: refreshToken},
      { validateStatus: false },
    );
    if (response.status !== 200) {
      window.localStorage.clear()
      navigate('/login');
    }
    setAccessToken(response.data.accessToken)
    window.localStorage.setItem("accessToken", response.data.accessToken);
    setRefreshToken(response.data.refreshToken)
    window.localStorage.setItem("refreshToken", response.data.refreshToken);
    setMessage("Novo codigo de acesso")
    setError("")
    console.log(response)

  }

  async function logout(event){
    event.preventDefault();
    const refreshToken = window.localStorage.getItem('refreshToken')
    const response = await axios.post(
      URL_LOGOUT,
      {token: refreshToken},
      { validateStatus: false },
    );
    if (response.status !== 200) {
      setError(response.data.message)
    }
    if (!response.data.auth){
      window.localStorage.clear()
      navigate('/login');
    }
    console.log(response)

  }
  
  //const {user} = useContext(UserContext);
  //console.log(user);
  return <div className="App">
    <header className="App-header">
    <div className='user-image'><i className="fas fa-user-circle"></i></div>
    
    <button className="btn btn-primary" onClick={confidencial}>Pagina privada</button>
    <button className="btn btn-primary" onClick={renovaToken}>Renova token</button>
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
      <p>
        Token de acesso: {accessToken}
      </p>
      <p>
        Token de atualização: {refreshToken}
      </p>
      
      {/* <Link to="/" className='btn btn-danger btn-lg'>Logout</Link> */}
    </header>
  </div>;
}

export default Home;