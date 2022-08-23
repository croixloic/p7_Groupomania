import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';



const Header = () => {

    const logout = () => {
        localStorage.clear();
        // location.reload();
    }
    return (
        <div className='header'>
            <Logo />
            
            <nav>
                <ul className='navBar'>
                    <NavLink to='/' className={(nav) => (nav.isActive ? 'nav-active' : '')}><li>Accueil</li></NavLink>
                    <NavLink to='/signup' className={(nav) => (nav.isActive ? 'nav-active' : '')}><li>Inscription</li></NavLink>
                    <NavLink to='/login' className={(nav) => (nav.isActive ? 'nav-active' : '')}><li>Connexion</li></NavLink>
                    <button onClick={() => { logout()}}>Déconnexion</button>
                </ul>
            </nav>
            
        </div>
    );
};

export default Header;