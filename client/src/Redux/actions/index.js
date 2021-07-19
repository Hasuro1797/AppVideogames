export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_GENRES = "GET_GENRES";

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

export function getVideoGameByName(name,page) {
    if(name || name === "") LOCALHOST += `&name=${name}`;
    return function(dispatch) {
        return fetch(`${LOCALHOST}/videogames?page=${page}`)
            .then(response => response.json())
            .then(json => {
            console.log("los juegos son", json)
            dispatch({ type: GET_VIDEOGAMES_BY_NAME, payload: json });
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