import {GET_VIDEOGAMES_BY_NAME, GET_VIDEOGAME_DETAIL, GET_GENRES} from '../actions/index';

const inicialState ={
    videogames : [],
    videogameDetail: {},
    genres:[]
}

const reducerVideogame = function(state = inicialState, action){
    switch (action.type) {
        case GET_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                videogames : action.payload.results
            }
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        default:
            return state;
    }
}

export default reducerVideogame;