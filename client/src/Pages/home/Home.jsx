import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import FilterBox from '../../Components/Filter/FilterBox';
import OrderBy from '../../Components/OrderBy/OrderBy';
import { getGenres, getVideoGames } from '../../Redux/actions/index.js';
import Cards from '../../Components/Cards/Cards';
import './Home.css';
import Pagination from '../../Components/Pagination/Pagination';
import Spinner from '../../Components/Spinner/Spinner';


function Home({genres, videoGames, getGenres, getVideoGames}) {
    const listVideoGames = [{id:1,name:"All Games"},{id:2,name:"Created"},{id:3,name:"On platform"}]
    const [loading, setloading] = useState(true)
    useEffect(() => {
        if(!genres.length)getGenres()
        if(!videoGames.length)getVideoGames(1)
        setloading(false);
    }, [])
    
    return (
        <>
            {
                loading ? <div className = "box-spinner"> <Spinner/> </div> 
                :
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
                            <div>
                                <Pagination/>
                                <div id='list-of-videogames'>   
                                    <Cards videogames = {videoGames} loading={loading}/>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
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
