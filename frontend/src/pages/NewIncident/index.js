import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongID = localStorage.getItem('ongID');

  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    }

    try{
      await api.post('incidents', data, {
        headers: {
          Authorization: ongID,
        }
      })

      history.push('/profile');
    } catch (err){
      alert(err)
    }

  }


  return (
    <div className="new-incident">
      <div className="content">
        <section>
        <img src={logoImg} alt="Be The Hero"/>
        <h1>Cadastrar novo caso</h1>
        <p>Descreva o caso detalhamente para encontrar um heroi para resolver isso.</p>
        
        <Link className="back-link" to="/profile">
          <FiArrowLeft size={16} color="#E02041" />  
           Voltar para home
        </Link>
        </section>
        
        <form onSubmit={handleNewIncident}>
          <input 
          placeholder="Titlu do Caso"
          value={title}
          onChange={e =>setTitle(e.target.value)}
          />
          <textarea 
          placeholder="Descrisao"
          value={description}
          onChange={e => setDescription(e.target.value)}
          />
 
          <input 
          placeholder="Valor em euros"
          value={value}
          onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
