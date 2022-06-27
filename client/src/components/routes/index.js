import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import Home from '../../pages/Home';
import Signup from '../../pages/Signup';
import Login from '../../pages/Login';

const index = () => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.token;
    console.log(axios.defaults.headers.common['Authorization']);
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


export default index;