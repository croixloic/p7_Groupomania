import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <nav>
                <ul>
                    <NavLink to='/' className={(nav) => (nav.isActive ? 'nav-active' : '')}><li>Accueil</li></NavLink>
                    <NavLink to='/signup' className={(nav) => (nav.isActive ? 'nav-active' : '')}><li>Inscription</li></NavLink>
                    <NavLink to='/login' className={(nav) => (nav.isActive ? 'nav-active' : '')}><li>Connexion</li></NavLink>
                </ul>
            </nav>
            <h1>Groupomania</h1>
            
        </div>
    );
};

export default Header;