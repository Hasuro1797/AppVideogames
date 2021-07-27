import React from 'react'
import {NavLink} from 'react-router-dom'
import Logo from '../../images/logo-landing.png';
import './Landing.css';

function Landing() {
    return (
        <div id='backgroundImage'>
            <div id ="container-landing">
                <div id = 'LogoItem'>
                    <NavLink to = '/home'>
                        <img src={Logo} alt="asd" />
                    </NavLink>
                </div>
                <h2>Discover all the <b>trending games</b> and immerse yourself by registering your <b>favorite games</b></h2>
                <NavLink to = '/home'>
                    <button id ='BtnToHome'>TRY IT NOW</button>
                </NavLink>   
            </div>
        </div>
    )
}

export default Landing
