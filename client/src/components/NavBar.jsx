import React from 'react'
import {NavLink} from 'react-router-dom';

function NavBar() {
    return (
        <div>
            <NavLink to = '/home'>
                <div>Logo</div>
            </NavLink>
            <NavLink to = '/home'>
                <div>Home</div>    
            </NavLink>
            <NavLink to ='/addvideogame'>
                <div>Create Video Game</div>
            </NavLink>
        </div>
    )
}

export default NavBar