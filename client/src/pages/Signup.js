import React from 'react';

import Header from '../components/Header';
import FormSignup from "../components/FormSignup";

const Signup = () => {
    return (
        <div className='signup-page'>
            <Header />
            <h2> Inscription</h2>
            <FormSignup />
        </div>
    );
};

export default Signup;