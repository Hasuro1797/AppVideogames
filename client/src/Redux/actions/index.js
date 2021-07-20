export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_ORDER = "GET_VIDEOGAMES_BY_ORDER";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const DEF_GENRE = "DEF_GENRE";
export const DEF_STATUS = "DEF_STATUS";

let LOCALHOST = "http://localhost:3001";

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
    if(genre) request += `&genre=${name}`;
    if(status) request += `&status=${name}`;
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
    else if(genre) request += `&genre=${name}&order=${order}&way=${way}`;
    else if(status) request += `&status=${name}&order=${order}&way=${way}`;
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

export function defGenre(selectValue){
    return {type: DEF_GENRE ,payload: selectValue}
}
export function defStatus(selectValue){
    return {type: DEF_STATUS ,payload: selectValue}
}