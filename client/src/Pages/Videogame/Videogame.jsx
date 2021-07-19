import { url } from 'node:inspector';
import React, { useEffect } from 'react'
import {connect} from 'react-redux';
import { getVideoGameDetail } from '../../Redux/actions/index.js';

function Videogame(props) {
    useEffect(() => {
        let gameId = props.match.params;
        if(typeof parseInt(gameId) === "number") props.getVideoGame(parseInt(gameId))
    }, [])

    if(props.videoGame.hasOwnToProperty("error")){
        return (
            <div>
                <h2>No results found</h2>
            </div>
        )
    }else{
        return (
            <div id="image-detail" style ={{backgroundImage : url(props.videoGame.background_image)}}>
                <div id = "container-global">
                    <div id= "title-of-game">
                        <h1>{props.videoGame.name}</h1>
                    </div>
                    <div>
                        <div id="background-videogame">
                            <img src ={props.videoGame.background_image} alt={'image ' + props.videoGame.id}/>
                        </div>
                        <div id ="description">
                            <p>{props.videoGame.name}</p>
                        </div>
                        <div id = "released">
                            <h3>Released: {props.videoGame.released}</h3>
                        </div>
                        <div id = "rating-game">
                            <h3>Rating: {props.videoGame.rating}</h3>
                            <div>icono</div>
                        </div>
                        <div>
                            {
                                props.videoGame.platforms.map(platform=>(
                                    <p key={platform.id}>{platform.name}</p>
                                ))
                            }
                        </div>
                        <div>
                            {
                                props.videoGame.genres.map(genre =>(
                                    <p key= {genre.id}>{genre.name}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
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
