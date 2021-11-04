import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'

import api from '../../services/api';


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
      const response = await api.post('reviews',data,{ 
        headers:{
          Authorization: usersId, 
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
          <h1> Criar Novo Review </h1>
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
          <input type="number" step="0.1" min="0" max="10" placeholder="Nota"  
          required
          value={rate}
          onChange={e=> setRate(e.target.value)}
          />
          <button className="button" type="submit"> Cadastrar </button>
          <Link className="back-link" to="/profile">
            Voltar
          </Link>
        </form>
      </div>
    </div>
  )
}