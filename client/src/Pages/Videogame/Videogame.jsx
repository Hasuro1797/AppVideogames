import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux';
import { getVideoGameDetail } from '../../Redux/actions/index.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './Videogame.css'
import Spinner from '../../Components/Spinner/Spinner.jsx';

function Videogame(props) {
    const [loading, setloading] = useState(true)
    useEffect(() => {
        let gameId = props.match.params.id;
        if(typeof parseInt(gameId) === "number") props.getVideoGame(gameId);
        setloading(false);
    }, [props])
    
    return (
        <>
            {
                loading? <div className = "box-spinner"> <Spinner/> </div>
                :
                <>
                    {props.videoGame.hasOwnProperty("genres")?
                    <div id="image-detail" style={{ backgroundImage: `url(${props.videoGame.background_image})`, objectFit: 'cover' }}>
                        <div id = "container-global">
                            <div id = "container-details">
                                <div id="background-box">
                                    <img id= 'bg-image'src ={props.videoGame.background_image} alt={'image ' + props.videoGame.id}/>
                                </div>
                                <div id="box-info">
                                    <div id= "title-of-game">
                                            <h1>{props.videoGame.name}</h1>
                                    </div>
                                    <div id ="description">
                                        <h3>Description:</h3>
                                        <p id= "text-description">{props.videoGame.description}</p>
                                    </div>
                                    <div id = "released">
                                        <h3>Released:</h3>
                                        <p>{props.videoGame.released}</p>
                                    </div>
                                    <div id = "rating-game">
                                        <h3>Rating:</h3>
                                        <div id='box-date'>
                                            <p>{props.videoGame.rating}</p>
                                            <FontAwesomeIcon icon={faStar} id="icon-start"/>
                                        </div>
                                    </div>
                                    <div id ="platforms-detail">
                                        <h3>Platforms:</h3>
                                        <div className= 'type-list'>
                                            {
                                                props.videoGame.platforms.map(platform=>(
                                                    <p key={platform.id}>{platform.name}</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div id ="genres-detail">
                                        <h3>Genres:</h3>
                                        <div className="type-list">
                                            {
                                                props.videoGame.genres.map(genre =>(
                                                    <p key= {genre.id}>{genre.name}</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :<div id="no-elements">
                        <h2> No Found Results </h2>            
                    </div>            
                    }
                </>
            }
        </>
    )
}
const mapStateToProps = (state) =>{
    return {
        videoGame: state.videogameDetail
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getVideoGame: (id) => dispatch(getVideoGameDetail(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Videogame)




