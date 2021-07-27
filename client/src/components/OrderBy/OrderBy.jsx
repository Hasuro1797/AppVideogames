import React, { useState } from 'react'
import { connect } from 'react-redux';
import { getVideoGamesByOrder, getVideoGames } from '../../Redux/actions';
import SearchBar from '../SearchBar/SearchBar'
import './OrderBy.css';

const OrderBy = ({getVideoGamesByOrder, getVideoGames, genre,status,name,page}) => {
    //* estado del order
    const [order, setOrder] = useState("")
    //* array de los tipos de order
    const orderBy = ["Default","Name A-Z", "Name Z-A", "Rating high", "Rating low"];
    //* funcion que cambia con el evento click
    const handleSearch = (order) =>{
        //* cambio el estado
        setOrder(order);
        //* ejecuto la funcion searchByOrder
        searchByOrder(order,name,genre,status,page);
        //* seteo el order a su estado incial
        setOrder("");
    }
    //* defino la funcion searchByOrder
    //*page,name,genre,status,order,way
    const searchByOrder = (input,name,genre,status,page)=>{
        if(input === "Name A-Z"){
            //* ejecuto la funcion setOptions
            setOptions(page,"name","asc")
        }else if(input === "Name Z-A"){
            //* ejecuto la funcion setOptions
            setOptions(page,"name","desc");
        }else if(input === "Rating high"){
            //* ejecuto la funcion setOptions
            setOptions(page,"rating","desc")
        }else if(input === "Rating low"){
            //* ejecuto la funcion setOptions
            setOptions(page,"rating","asc")
        }else if(input === "Default")
            if(name){
                getVideoGames(page,name)
            }else if(genre){
                getVideoGames(page,null,genre)
            }else if(status) {
                getVideoGames(page,null,null,status)
            }else{
                getVideoGames(page)
            }
    }
    //* defino la funcion SetOptions
    const setOptions =(page,mode,way) =>{
        if(name){
            getVideoGamesByOrder(page,name,null,null,mode,way)
        }else if(genre){
            getVideoGamesByOrder(page,null,genre,null,mode,way)
        }else if(status){
            getVideoGamesByOrder(page,null,null,status,mode,way)
        }else{
            getVideoGamesByOrder(page,null,null,null,mode,way)
        }
    }
    

    return (
        <div id = "OptionSearch" >
            <SearchBar/>
            <div id= 'electionsOfOrder'>
                <select className='select-order' value ={order} onChange={(event)=>handleSearch(event.target.value)}>
                    <option hidden selected >Order By</option>
                    {orderBy.map(orden =>
                        (<option className = "option-select" key={orden} value={orden}>{orden}</option>))
                    }
                </select>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>{
    return {
        genre: state.genre,
        status: state.status,
        name: state.name,
        page: state.page
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getVideoGamesByOrder: (page,name,genre,status,order,way) => dispatch(getVideoGamesByOrder(page,name,genre,status,order,way)),
        getVideoGames: (page,name,genre,status) => dispatch(getVideoGames(page,name,genre,status))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(OrderBy)
