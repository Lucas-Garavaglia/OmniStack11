import React,{ useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';


import './styles.css';
import logoImg from '../../assets/logo.svg'

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();
    async function handleRegister(event) {
        event.preventDefault();
        
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        console.log(data);
        try{
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        }
        catch(err) {
            alert('Erro no cadastro, tente novamente!');
        }
        

    
    }

    return (
        <div className="register-container">
            <div className="content">
                <section> 
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude  pessoas e encontraremos os casos da usa ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"> 

                        </FiArrowLeft>
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Nome da ONG"/>

                    <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="E-mail"/>

                    <input 
                    placeholder="whatsapp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Cidade"/>
                        <input 
                        value={uf}
                        onChange={e => setUF(e.target.value)}
                        placeholder="UF" style={{ width: 80}}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}