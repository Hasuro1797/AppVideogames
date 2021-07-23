import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './Card.css'
import Spinner from '../Spinner/Spinner'

function Card({id,name ,genres ,rating ,background_image }) {
    return (
        <div id ="card">
            <div id = "image-container">
                <img id = "background-image" src={background_image} alt={"image " + {id}} />
            </div>
            <div id = "Name-card">
                <h4>{name}</h4>
            </div>
            <div id="genre-rating">
                <div id = "Genre-card">
                    {genres.map(element =>{
                        return (
                            <p key ={element.id}>{element.name}</p>
                            )
                    })}
                </div>
                <div id = "Rating-card">
                    <h4>{rating}</h4>
                    <FontAwesomeIcon id="icon-start" icon = {faStar}/>
                </div>
            </div>
        </div>
    )
}

export default Card
