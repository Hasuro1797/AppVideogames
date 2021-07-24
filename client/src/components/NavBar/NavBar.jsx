import React from 'react'
import {NavLink, Link} from 'react-router-dom';
import Logo from '../../images/logo-image.png'
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
                <NavLink exact to = '/home' ClassName='active'>
                    <li>Home</li>
                </NavLink>
                <NavLink to ='/home/addvideogame' ClassName='active'>
                    <li>Create</li>
                </NavLink>
            </ul>
        </nav>
    )
}

export default NavBar