import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import heroesImg from '../../assets/hero_image.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();
        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Falha no login tente novamente');
        }
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img className="headimage" src={logoImg} alt="be the Hero" />
                <form onSubmit={ handleLogon }>
                    <h1>Faca o logon</h1>

                    <input
                        placeholder="Your ID"
                        value={id}
                        onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Enter</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Not registered
                    </Link>
                </form>
            </section>
            <img className="mainimage" src={ heroesImg } alt="Heroes"/>
        </div>
    )
}
