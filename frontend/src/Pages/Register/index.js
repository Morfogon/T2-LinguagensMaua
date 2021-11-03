import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import api from '../../services/api';
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Register() {

  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  
  const [redirect, setRedirect] = useState(false);
  function handleReset() {
    setRedirect(true);
  };


  async function handleRegister(e){
    e.preventDefault();

    const data= {
      name,
      email
    };
    try {
      const response = await api.post('users', data); //chamada do banco
      alert (`Seu ID de acesso: ${response.data.id}`);
      setRedirect(response.status);
    } catch (err) {
      alert ('Erro no cadastro, tente novamente');
    }
  }
  
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1> Cadastro </h1>
          <p> HALA HALA MANITO </p>
          <Link className="back-link" to="/">
            Tenho cadastro
          </Link>
        </section>
        {redirect && <Redirect to="/" />}
        <form onSubmit={handleRegister} onReset={handleReset} >
          <input
            required
            placeholder="Nickname"
            value={name}
            onChange={e => setname(e.target.value)}
          />
          <input 
            required
            type="email" 
            placeholder="Email"  
            value={email} 
            onChange={e => setemail(e.target.value)}
          />
          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  )
}