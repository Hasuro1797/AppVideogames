import React from 'react'
import {NavLink} from 'react-router-dom';
import { Navigation, LogoNavBar, MenuItems } from './NavBar';
import Logo from '../../images/logo-image.png'
function NavBar() {
    return (
        <Navigation>
            <LogoNavBar>
                <NavLink exact to = '/home' >
                    <img src={Logo} alt="asd" />
                </NavLink>
            </LogoNavBar>
            <MenuItems>
                <NavLink exact to = '/home' activeClassName='active'>
                    <li>Home</li>
                </NavLink>
                <NavLink to ='/home/addvideogame' activeClassName='active'>
                    <li>Create</li>
                </NavLink>
            </MenuItems>
        </Navigation>
    )
}

export default NavBar