import React from 'react'
import {NavLink} from 'react-router-dom'

function Landing() {
    return (
        <div>
            <NavLink to = '/home'>
                <h1>Logo</h1>
            </NavLink>
            <NavLink to = '/home'>
                <div>To Home</div>
            </NavLink>
            
        </div>
    )
}

export default Landing
