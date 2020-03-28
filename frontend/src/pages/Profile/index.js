import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import './styles.css';

export default function Profile() {
  const history = useHistory();

  const ongID = localStorage.getItem('ongID');
  const ongName = localStorage.getItem('ongName');

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongID,
      }
    }).then(res => {
      setIncidents(res.data);
    })
  }, [ongID]);

  async function handleDeleteIncident(id){
    try{
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongID,
        }
      })

      setIncidents(incidents.filter(incident => incident.id !=  id))
    } catch (e) {
      alert(e)
    }
  }

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} tpe="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
          <strong>CASO:</strong>
          <p>{incident.title}</p>

          <strong>DESCRICAO:</strong>
          <p>{incident.description}</p>

          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(incident.value)} euros</p>

          <button onClick={() => handleDeleteIncident(incident.id)} type="button">
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
