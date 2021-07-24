import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { defName, getVideoGames } from '../../Redux/actions/index.js';
import { connect } from "react-redux";
import './SearchBar.css'

function SearchBar({getVideoGames,defName}) {
    const [input, setInput] = useState("");

    const handleChange = (event) =>{
        setInput(event.target.value);
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        getVideoGames(1,input);
        defName(input);
        //setName(input);
        setInput("");

    
    }
    return (
        <form id="SearchName">
            <input
            className = "inputNavBar"
            type="text"
            spellCheck="false"
            autoComplete="off"
            placeholder = "Search Game"
            value={input}
            onChange = {handleChange}
            />
            <button id = "buttonSearch" onClick = {handleSubmit}>
                <FontAwesomeIcon id = 'icon' icon ={faSearch}/>
            </button>
            
        </form>
    )
}
const mapDispatchToProps = (dispatch) =>{
    return{
        getVideoGames: (page,name,genre,status) => dispatch(getVideoGames(page,name,genre,status)),
        defName: (value) => dispatch(defName(value))
    }
}

export default connect(null,mapDispatchToProps)(SearchBar);
