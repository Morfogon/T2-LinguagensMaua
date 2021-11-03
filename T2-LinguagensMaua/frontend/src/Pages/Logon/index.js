import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
 
import './styles.css';


import api from '../../services/api';

export default function Logon() {
  const history = useHistory(); 
  const [id, setid] = useState('');

  async function handleLogin(e){
    e.preventDefault();

    const data= { // controlar oque mandar
      id,
    };
    
    try {
      const response = await api.post('sessions', data); //chamada do banco
      localStorage.setItem('usersId',id); // guardar o id
      localStorage.setItem('usersName',response.data.name); // guardar nome
      history.push('/profile'); // redirecionar 
    } catch (err) {
      alert ('Erro no Login, tente novamente');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <h1> Faça seu Login </h1>
          <input 
            required
            placeholder="Sua ID" 
            value={id}
            onChange={e => setid(e.target.value)} 
          />
          <button className="button" type="submit"> Entrar </button>
          <Link className="back-link" to="/register">
            Não tenho cadastro
          </Link>
        </form>
        
      </section>
    </div>
  )
}