import React, { useState, useEffect } from 'react'
import { Link ,useHistory} from 'react-router-dom'


import api from '../../services/api';

import './styles.css'


export default function Profile() {
  const [reviews, setReviews] = useState ([]); 

  const history = useHistory();
  const usersName = localStorage.getItem('usersName')
  const usersId = localStorage.getItem('usersId')

  useEffect(()=> { 
    api.get('profile',{ 
      headers:{
        Authorization: usersId, 
      }
    }).then(response => {
      setReviews(response.data) 
    })
  },[usersId]);

  async function handleDeleteIncitend(id){ 
    try {
      await api.delete(`reviews/${id}`,{ 
        headers:{
          Authorization: usersId, 
        }
      });
      setReviews(reviews.filter(reviews => reviews.id !== id )) 
    } catch (err) {
      alert ('Erro ao deletar review, tente novamente');
    }
  }

  //function handlelogout(){
    //localStorage.clear();
    //history.push('/');
  //}

  return (
    <div className="profile-container">
      <header>
        <span> Bem Vindo(a), {usersName}</span>
        <div className="gap">
          <div className="BruninhaAjudou">
            <Link className="button" to="/review/new"> Novo Review </Link>
          </div>
          <div className="BruninhaAjudou">
            <Link className="buttonLogout" to="/"> Logout </Link>
          </div>
        </div>
      </header>
      <h1> Todos os Reviews </h1>
      <ul>
          {reviews.map(reviews =>(
            

            <li key={reviews.id}>
              
              <strong> Nome do Filme: </strong>
              <p> {reviews.name} </p>
      
              <strong> Descrição: </strong>
              <p> {reviews.description} </p>
      
              <strong> Nota: </strong>
              <p> {reviews.rate} </p>
              <button  onClick={ () => handleDeleteIncitend (reviews.id) } type="button">
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}