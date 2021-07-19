import React from 'react'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import FilterBox from '../../Components/Filter/FilterBox';
import OrderBy from '../../Components/OrderBy/OrderBy';
import { getGenres, getVideoGameByName } from '../../Redux/actions/index.js';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Cards from '../../Components/Cards/Cards';
import './Home.css';


function Home({genres, videoGames, getGenres, getVideoGames}) {
    const listVideoGames = [{id:1,name:"Created"},{id:2,name:"On platform"}]

    useEffect(() => {
        if(!genres.length)getGenres()
        if(!videoGames.length)getVideoGames(null,1)
    }, [])

    return (
        <div id='Home'>
            <div id ='table-filter'>
                <div id="title-filter">
                    <p>Filter by:</p>
                </div>
                <FilterBox typeOfFilter = "Genres" listOfElement={genres}/>
                <FilterBox typeOfFilter = "Videogames" listOfElement={listVideoGames}/>
            </div>
            <div id ='main-container'>
                <OrderBy/>
                <div id='list-of-videogames'>
                    <Cards videogames = {videoGames}/>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>{
    return {
        genres: state.genres,
        videoGames: state.videogames
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getGenres: ()=> dispatch(getGenres()),
        getVideoGames: (name,page) => dispatch(getVideoGameByName(name,page))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
