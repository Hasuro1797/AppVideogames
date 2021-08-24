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
    const [loading, setloading] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        getGenres()
        getVideoGames(1)
        setloading(false);
    }, [getGenres,getVideoGames])
    
    return ( 
        <>
            {
                loading ? <div className = "box-spinner"> <Spinner/> </div> 
                :
                    <div id='Home'>
                        <div className ={showMenu? 'table-filter-active':'table-filter'}>
                            <FilterBox typeOfFilter = "Videogames" listOfElement={listVideoGames} setShowMenu={setShowMenu}/>
                            <FilterBox typeOfFilter = "Genres" listOfElement={genres} setShowMenu={setShowMenu}/>
                        </div>
                        <div id ='main-container'>
                            <OrderBy showMenu={showMenu} setShowMenu={setShowMenu}/>
                            <div id="pagination-listgames">
                                <Pagination/>
                                <div id='list-of-videogames'>   
                                    <Cards videogames = {videoGames} loading={loading}/>
                                </div>
                                <Pagination/>
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
