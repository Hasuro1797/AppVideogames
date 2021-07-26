import React from 'react'
import {NavLink, Link} from 'react-router-dom';
import Logo from '../../images/logo-navBar.png';
import './NavBar.css';
function NavBar() {
    return (
        <nav id = 'Navigation'>
            <div id='LogoNavBar'>
                <Link exact to = '/' >
                    <img src={Logo} alt="logo_image" />
                </Link>
            </div>
            <ul id ='MenuItems'>
                <Link exact to = '/home' ClassName='active'>
                    <li>Home</li>
                </Link>
                <Link to ='/home/addvideogame' ClassName='active'>
                    <li>Create</li>
                </Link>
            </ul>
        </nav>
    )
}

export default NavBar