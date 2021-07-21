import React from 'react'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import FilterBox from '../../Components/Filter/FilterBox';
import OrderBy from '../../Components/OrderBy/OrderBy';
import { getGenres, getVideoGames } from '../../Redux/actions/index.js';
import Cards from '../../Components/Cards/Cards';
import './Home.css';


function Home({genres, videoGames, getGenres, getVideoGames}) {
    const listVideoGames = [{id:1,name:"All Games"},{id:2,name:"Created"},{id:3,name:"On platform"}]
    useEffect(() => {
        if(!genres.length)getGenres()
        if(!videoGames.length)getVideoGames(1)
    }, [])
    

    return (
        <div id='Home'>
            <div id ='table-filter'>
                <div id="title-filter">
                    <p>Filter by:</p>
                </div>
                <FilterBox typeOfFilter = "Videogames" listOfElement={listVideoGames}/>
                <FilterBox typeOfFilter = "Genres" listOfElement={genres}/>
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
        getVideoGames: (page,name,genre,status) => dispatch(getVideoGames(page,name,genre,status))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
