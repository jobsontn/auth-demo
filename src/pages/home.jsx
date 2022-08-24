import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import './home.css';
import {UserContext} from '../components/UserContext';
// import { Container } from './styles';

function Home() {
  const {user} = useContext(UserContext);
  console.log(user);
  return <div className="App">
    <header className="App-header">
      <div className='user-image'><i className="fas fa-user-circle"></i></div>
      <p>
        Seja bem vindo {user.displayName}!
      </p>
      <Link to="/" className='btn btn-danger btn-lg'>Logout</Link>
    </header>
  </div>;
}

export default Home;