import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.token;
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path= '/login' element = {<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;