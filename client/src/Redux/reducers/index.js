import {
    GET_VIDEOGAMES, 
    GET_VIDEOGAME_DETAIL, 
    GET_GENRES,
    GET_VIDEOGAMES_BY_ORDER,
    DEF_GENRE,
    DEF_STATUS
} from '../actions/index';

const inicialState ={
    videogames : [],
    videogameDetail: {},
    genres:[],
    platforms:[],
    genre : "",
    status: "",
}

const reducerVideogame = function(state = inicialState, action){
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames : action.payload.results
            }
        case GET_VIDEOGAMES_BY_ORDER:
            return {
                ...state,
                videogames: action.payload.results
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
        case DEF_GENRE:
            return {
                ...state,
                genre: action.payload
            }
        case DEF_STATUS:
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }
}

export default reducerVideogame;