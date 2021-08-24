import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../../images/logo-navBar.png';
import './NavBar.css';
function NavBar() {
    return (
        <nav id = 'Navigation'>
            <div id='LogoNavBar'>
                <Link  to = '/' >
                    <img src={Logo} alt="logo_image" />
                </Link>
            </div>
            <ul id ='MenuItems'>
                <Link  to = '/home' >
                    <li>Home</li>
                </Link>
                <Link to ='/home/addvideogame'> 
                    <li>Add</li>
                </Link>
            </ul>
        </nav>
    )
}

export default NavBar