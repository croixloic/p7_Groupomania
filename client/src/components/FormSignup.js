// import React, { useState } from 'react';

const FormSignup = () => {
    return (
        <div className='form-signup'>
            <div className='form-container'>
                <form>
                <label htmlFor='firstName'>Nom</label>
                    <input
                    type="text"
                    placeholder='Entrer votre nom'
                    />
                    <label htmlFor='lastName'>prénom</label>
                    <input
                    type="text"
                    placeholder='Entrer votre prénom'
                    />
                    <label htmlFor='email'>Email</label>
                    <input
                    type="text"
                    placeholder='Entrer votre email'
                    />
                    <label htmlFor='password'>Mot de passe</label>
                    <input
                    type="password"
                    placeholder='Entrer votre mot de passe'
                    />
                    <input
                    type="submit"
                    value="S'incrire"
                    />
                </form>
            </div>
            
        </div>
    );
};

export default FormSignup;