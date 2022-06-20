import React from 'react';

import Header from "../components/Header";
import FormLogin from '../components/FormLogin';

const login = () => {
    return (
        <div className='login-page'>
            <Header />
            <h2> Connexion</h2>
            < FormLogin />
        </div>
    );
};

export default login;