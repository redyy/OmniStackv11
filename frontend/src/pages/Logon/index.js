import React, {useState} from 'react';
import api from '../../services/api'

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import notification from '../../components/noti'
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';
import './styles.css'

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){
  const [id, setId] = useState('');
  const history = useHistory();
  const [success, setSuccess] = useState(false);

  async function handleLogin(e){
    e.preventDefault();

    try{
      const res = await api.post('sessions', { id });
      localStorage.setItem('ongID', id);
      localStorage.setItem('ongName', res.data.name);
      setSuccess(true)
      setTimeout(() => {
        history.push('/profile');
      }, 2000);
    } catch (e){
      alert(e)
    }
  }

  return(
    <div className="logon-container">
    <ReactNotification />
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>
      
        <form onSubmit={handleLogin}>
          <h1>Faca seu logon</h1>

          <input 
          placeholder="Sua ID"
          value={id}
          onChange={e => setId(e.target.value)}
          />
          {!success &&
          <button className="button" type="submit">Entrar</button>
          }
          {success &&
          <button className="button" style={{ cursor: 'default', opacity: 0.8 }} disabled><ClipLoader
          sizeUnit={"px"}
          size={40}
          color={'#fff'}
          loading={success}
          /></button>
          }
        
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