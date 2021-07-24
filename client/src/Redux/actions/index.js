//* DINAMICA DE LA PAGINA 
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_ORDER = "GET_VIDEOGAMES_BY_ORDER";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const DEF_GENRE = "DEF_GENRE";
export const DEF_STATUS = "DEF_STATUS";
export const DEF_PAGE = "DEF_PAGE";
export const DEF_NAME = "DEF_NAME";
export const GET_VIDEOGAMES_BY_ENDPOINT = "GET_VIDEOGAMES_BY_ENDPOINT";
//* CREAR UN VIDEOJUEGO
export const ADD_GENRE = "ADD_GENRE";
export const REMOVE_GENRE = "REMOVE_GENRE"
export const ADD_PLATFORM = "ADD_PLATFORM";
export const REMOVE_PLATFORM = "REMOVE_PLATFORM";
export const SEND_VIDEOGAME = "SEND_VIDEOGAME";
export const REMOVE_ALL = "REMOVE_ALL";
//! Borrar este estado y ver donde esta lo restante
export const RESET_PAGE = "RESET_PAGE";

export const LOCALHOST = "http://localhost:3001";

export function getVideoGameDetail(id) {
    return function(dispatch) {
        return fetch(`${LOCALHOST}/videogame/${id}`)
            .then(response => response.json())
            .then(json => {
                console.log("el videojuego es",json)
                dispatch({ type: GET_VIDEOGAME_DETAIL, payload: json });
            });
    };
}

export function getVideoGames(page,name,genre,status) {
    // * casos de navegacion
    let request = `${LOCALHOST}/videogames?page=${page}`
    if(name) request += `&name=${name}`;
    if(genre) request += `&genre=${genre}`;
    if(status) request += `&status=${status}`;
    return function(dispatch) {
        return fetch(request)
            .then(response => response.json())
            .then(json => {
            dispatch({ type: GET_VIDEOGAMES, payload: json });
            });
    };
}

export function getVideoGamesByOrder(page,name,genre,status,order,way) {
    // * casos de navegacion en orden
    let request = `${LOCALHOST}/videogames?page=${page}`
    if(name) request += `&name=${name}&order=${order}&way=${way}`;
    else if(genre) request += `&genre=${genre}&order=${order}&way=${way}`;
    else if(status) request += `&status=${status}&order=${order}&way=${way}`;
    else request += `&order=${order}&way=${way}`
    return function(dispatch) {
        return fetch(request)
            .then(response => response.json())
            .then(json => {
            dispatch({ type: GET_VIDEOGAMES_BY_ORDER, payload: json });
            });
    };
}

export function getGenres() {
    return function(dispatch) {
        return fetch(`${LOCALHOST}/genres`)
            .then(response => response.json())
            .then(json => {
                console.log("la json de generos es:",json)
                dispatch({ type: GET_GENRES, payload: json });
            });
    };
}
export function getPlatforms() {
    return function(dispatch) {
        return fetch(`${LOCALHOST}/platforms`)
            .then(response => response.json())
            .then(json => {
                console.log("la json de plataformas es:",json)
                dispatch({ type: GET_PLATFORMS, payload: json });
            });
    };
}
export function getVideoGameByEndPoint(link) {
    return function(dispatch) {
        return fetch(link)
            .then(response => response.json())
            .then(json => {
                console.log("el videojuego es",json)
                dispatch({ type: GET_VIDEOGAMES_BY_ENDPOINT, payload: json });
            });
    };
}

export function defGenre(selectValue){
    return {type: DEF_GENRE ,payload: selectValue}
}
export function defStatus(selectValue){
    return {type: DEF_STATUS ,payload: selectValue}
}
export function defPage(selectValue){
    return {type: DEF_PAGE ,payload: selectValue}
}
export function defName(selectValue){
    return {type: DEF_NAME ,payload: selectValue}
}
export function resetPage(boolean){
    return {type: RESET_PAGE ,payload: boolean}
}
//* ADD VIDEOGAMES
//*Select and remove genre of videogame
export function addGenre(idGenre){
    return {type: ADD_GENRE ,payload: idGenre}
}
export function removeGenre(idGenre){
    return {type: REMOVE_GENRE ,payload: idGenre}
}
//*Select and remove platform of videogame 
export function addPlatform(idPlatform){
    return {type: ADD_PLATFORM ,payload: idPlatform}
}
export function removePlatform(idPlatform){
    return {type: REMOVE_PLATFORM ,payload: idPlatform}
}
export function removeAll(){
    return {type: REMOVE_ALL ,payload: ''}
}
