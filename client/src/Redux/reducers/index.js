import {
    GET_VIDEOGAMES, 
    GET_VIDEOGAME_DETAIL, 
    GET_GENRES,
    GET_PLATFORMS,
    GET_VIDEOGAMES_BY_ORDER,
    GET_VIDEOGAMES_BY_ENDPOINT,
    DEF_GENRE,
    DEF_STATUS,
    DEF_PAGE,
    DEF_NAME,
    ADD_GENRE,
    REMOVE_GENRE,
    ADD_PLATFORM,
    REMOVE_PLATFORM,
    REMOVE_ALL,
    //!eliminar esta parte
    RESET_PAGE,
} from '../actions/index';

const inicialState ={
    videogames : [],
    videogameDetail: {},
    genres:[],
    platforms:[],
    genre : "",
    status: "",
    name: "",
    page: 1,
    totalPages: null,
    actualEndPoint: "",
    //* addvideogame
    selectedGenres: [],
    selectedPlatforms: [],
    //!BORRAR ESTE ESTADO
    reset:false,
}

const reducerVideogame = function(state = inicialState, action){
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                totalPages: action.payload.pages,
                actualEndPoint: action.payload.actualEndPoint,
                videogames : action.payload.results
            }
        case GET_VIDEOGAMES_BY_ORDER:
            return {
                ...state,
                totalPages: action.payload.pages,
                actualEndPoint: action.payload.actualEndPoint,
                videogames: action.payload.results
            }
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: action.payload
            }
        case GET_VIDEOGAMES_BY_ENDPOINT:
        return {
            ...state,
            totalPages: action.payload.pages,
            actualEndPoint: action.payload.actualEndPoint,
            videogames : action.payload.results
        }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
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
        case DEF_NAME:
            return {
                ...state,
                name: action.payload
            }
        case DEF_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case ADD_GENRE:
            return {
                ...state,
                selectedGenres: [...state.selectedGenres,action.payload]
            }
        case REMOVE_GENRE:
            return {
                ...state,
                selectedGenres: state.selectedGenres.filter(element => element !== action.payload)
            }
        case ADD_PLATFORM:
            return {
                ...state,
                selectedPlatforms: [...state.selectedPlatforms,action.payload]
            }
        case REMOVE_PLATFORM:
            return {
                ...state,
                selectedPlatforms: state.selectedPlatforms.filter(element => element !== action.payload)
            }
        case REMOVE_ALL:
            return {
                ...state,
                selectedPlatforms: [],
                selectedGenres: []
            }
        case RESET_PAGE:
            return {
                ...state,
                reset: action.payload
            }
        default:
            return state;
    }
}

export default reducerVideogame;