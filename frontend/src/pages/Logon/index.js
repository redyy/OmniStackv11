import React, {useState} from 'react';
import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css'

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();

    try{
      const res = await api.post('sessions', { id });
      localStorage.setItem('ongID', id);
      localStorage.setItem('ongName', res.data.name);
      history.push('/profile');

    } catch (e){
      alert(e);
    }
  }

  return(
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>
      
        <form onSubmit={handleLogin}>
          <h1>Faca seu logon</h1>

          <input 
          placeholder="Sua ID"
          value={id}
          onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
        
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />  
            Nao tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}