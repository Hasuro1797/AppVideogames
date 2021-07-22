import {
    GET_VIDEOGAMES, 
    GET_VIDEOGAME_DETAIL, 
    GET_GENRES,
    GET_VIDEOGAMES_BY_ORDER,
    DEF_GENRE,
    DEF_STATUS,
    DEF_PAGE
} from '../actions/index';

const inicialState ={
    videogames : [],
    videogameDetail: {},
    genres:[],
    platforms:[],
    genre : "",
    status: "",
    page: 1,
    totalPages: null,
    count:null,
    actualEndPoint: ""
}

const reducerVideogame = function(state = inicialState, action){
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                count: action.payload.count,
                totalPages: action.payload.pages,
                actualEndPoint: action.payload.actualEndPoint,
                videogames : action.payload.results
            }
        case GET_VIDEOGAMES_BY_ORDER:
            return {
                ...state,
                count: action.payload.count,
                totalPages: action.payload.pages,
                actualEndPoint: action.payload.actualEndPoint,
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
        case DEF_PAGE:
            return {
                ...state,
                page: action.payload
            }
        default:
            return state;
    }
}

export default reducerVideogame;