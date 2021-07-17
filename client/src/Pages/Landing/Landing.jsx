import React from 'react'
import {NavLink} from 'react-router-dom'
import Logo from '../../images/logo-principal.png'
import { BackgroundImage, BtnHome, LogoItem } from './Landing'
//import './asdasd.css';

function Landing() {
    return (
        <BackgroundImage>
            <LogoItem>
                <NavLink to = '/home'>
                    <img src={Logo} alt="asd" />
                </NavLink>
            </LogoItem>
            <NavLink to = '/home'>
                <BtnHome>TRY IT NOW</BtnHome>
            </NavLink>   
        </BackgroundImage>
    )
}

export default Landing
