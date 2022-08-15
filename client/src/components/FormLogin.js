import React, { useState } from "react";
import axios from "axios";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    if (!email || !password) {
      alert("veuillez remplir tous les champs du formulaire");
    } else {
      axios
      .post(`${process.env.REACT_APP_API_URL}user/login`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.emailError;
          passwordError.innerHTML = res.data.passwordError;
        } else {
           window.location = "/";
          localStorage.token = res.data.token;
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
  
  
  
  return (
    <>
    <form action="" onSubmit={handleLogin} id="form_signup">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        className="input_signup"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder= "Entrer votre email"
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        className="input_signup"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder= "Entrer votre mot de passe"
      />
      <div className="password error"></div>
      <br />
      <input type="submit" className="submit" value="Se connecter" />
    </form>
        </>
  );
};

export default FormLogin;


