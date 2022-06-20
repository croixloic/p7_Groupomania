import React, { useState } from 'react';
import axios from "axios";

const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        if (!email || !password) {
            alert ("veuillez remplir tous les champs du formulaire");
        } else {
            axios ({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}user/login`,
                withCredentials: true,
                data: {
                  email,
                  password,
                },
              })
              .then ((res) =>{
              console.log(res);
              if (res.data.errors){
                emailError.innerHTML= res.data.emailError;
                passwordError.innerHTML = res.data.passwordError;
              } else {
                window.location="/";
              }
            })
            .catch ((err) => {
                console.log(err);
            })
            }}
        
    return (
        <form action='' onSubmit={handleLogin} id= 'form-signup'>
            <label htmlFor='email'>Email</label>
            <input type='text' name='email' id='email' onChange={(e) => setEmail(e.target.value)} value= {email} />
            <div className='email error'></div>
            <br/>
            <label htmlFor='password'>Mot de passe</label>
            <input type='password' name= 'password' id='password' onChange={(e) => setPassword(e.target.value)} value= {password}/>
            <div className='password error'></div>
            <br/>
            <input type='submit' value="Se connecter" />

        </form>
    );
};

export default FormLogin;