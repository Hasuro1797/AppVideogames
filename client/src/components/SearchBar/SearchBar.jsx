import React, { useState } from "react";
import { connect } from "react-redux";
//import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { getVideoGameByName } from '../../Redux/actions/index.js';
import './SearchBar.css'

function SearchBar({ videoGames,getVideoGameByName }) {
    const [name, setname] = useState("");
    
    
    const handleChange = (event) =>{
        setname(event.target.value);
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        setname("");

    
    }
    return (
        <form id="SearchName">
            <label id ="Title" htmlFor = "name"> Search: </label>
            <input
            className = "inputNavBar"
            type="text"
            id="name"
            spellCheck="false"
            autoComplete="off"
            placeholder = "Videogame..."
            value={name}
            onChange = {handleChange}
            />
            <div id = "buttonSearch">
                <FontAwesomeIcon id = 'icon' icon ={faSearch} onClick = {handleSubmit}/>
            </div>
            
        </form>
    )
}

const mapStateToProps = (state) =>{
    return {
        videoGames: state.videogamesLoaded
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getVideoGameByName: name => dispatch(getVideoGameByName(name))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
