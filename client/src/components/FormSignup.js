import React, { useState } from "react";
import axios from "axios";

const FormSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const firstNameError = document.querySelector(".firstName.error");
    const lastNameError = document.querySelector(".lastName.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    if (!firstName || !lastName || !email || !password) {
      alert("veuillez remplir tous les champs du formulaire");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}user/signup`, {
          firstName,
          lastName,
          email,
          password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            firstNameError.innerHTML = res.data.firstNameError;
            lastNameError.innerHTML = res.data.lastNameError;
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
    <form action="" onSubmit={handleSignup} id="form-signup">
      <label htmlFor="firstName">Prénom</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        placeholder="Entrer votre prénom"
      />
      <div className="firstName error"></div>
      <br />
      <label htmlFor="lastName">Nom</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        onChange={(e) => setLastName(e.target.value)}
        value= {lastName}
        placeholder="Entrer votre nom"
      />
      <div className="lastName error"></div>
      <br />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value= {email}
        placeholder="Entrer votre email"
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value= {password}
        placeholder="Entrer votre mot de passe"
      />
      <div className="password error"></div>
      <input type="submit" value="S'incrire" />
    </form>
  );
};

export default FormSignup;
