import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'

import api from '../../services/api';

import logoImg from '../../assets/logo.svg' 

export default function NewIncident() {

  const usersId = localStorage.getItem('usersId')

  const [name, setTitle] = useState("");
  const [description, setDescription] = useState(""); 
  const [rate, setRate] = useState("");
  const history = useHistory(); 

  
  async function handleNewIncident(e){
    e.preventDefault();
    const data = {
      name,
      description,
      rate,
    };
    try {
      const response = await api.post('reviews',data,{ // chamar api com rota
        headers:{
          Authorization: usersId, // passando para a api a autorizacao com base no header
        }
      })
      history.push('/profile');
      
    } catch (error) {
      alert('Erro ao cadastrar caso, Tente novamante. ')
    }
  }
  
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1> Cadastrar Novo Caso </h1>
          <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso. </p>
          <Link className="back-link" to="/profile">
            Voltar
          </Link>
        </section>
        <form onSubmit={handleNewIncident} >
          <input placeholder="Nome do Filme"  
          required
          value={name}
          onChange={e=> setTitle(e.target.value)}
          />
          <textarea placeholder="Descrição" 
          required
          value={description}
          onChange={e=> setDescription(e.target.value)}
          />
          <input placeholder="Nota"  
          required
          value={rate}
          onChange={e=> setRate(e.target.value)}
          />
          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  )
}