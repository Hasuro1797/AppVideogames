import React from 'react'
import {NavLink} from 'react-router-dom'
import Logo from '../../images/logo-principal.png'
import './Landing.css';

function Landing() {
    return (
        <div id='backgroundImage'>
            <div id = 'LogoItem'>
                <NavLink to = '/home'>
                    <img src={Logo} alt="asd" />
                </NavLink>
            </div>
            <NavLink to = '/home'>
                <button id ='BtnToHome'>TRY IT NOW</button>
            </NavLink>   
        </div>
    )
}

export default Landing
