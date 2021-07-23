import React, { useState } from 'react'
import { connect } from 'react-redux';
import { getVideoGamesByOrder, getVideoGames } from '../../Redux/actions';
import SearchBar from '../SearchBar/SearchBar'
import './OrderBy.css';

const OrderBy = ({getVideoGamesByOrder, getVideoGames, genre,status,name,page}) => {
    const [order, setOrder] = useState("")
    const orderBy = ["Default","Name A-Z", "Name Z-A", "Rating high", "Rating low"];

    const handleSearch = (order) =>{
        console.log("el valor de genero es",genre);
        console.log("el valor de status es",status);
        setOrder(order);
        searchByOrder(order,name,genre,status,page);
        setOrder("");
    }
    //*page,name,genre,status,order,way
    const searchByOrder = (input,name,genre,status,page)=>{
        if(input === "Name A-Z"){
            // if(name){
            //     getVideoGamesByOrder(1,name,null,null,"name","asc")
            // }else if(genre){
            //     getVideoGamesByOrder(1,null,genre,null,"name","asc")
            // }else if(status){
            //     getVideoGamesByOrder(1,null,null,status,"name","asc")
            // }else{
            //     getVideoGamesByOrder(1,null,null,null,"name","asc")
            // }
            setOptions(page,"name","asc")
        }else if(input === "Name Z-A"){
            // if(name){
            //     getVideoGamesByOrder(1,name,null,null,"name","desc")
            // }else if(genre){
            //     getVideoGamesByOrder(1,null,genre,null,"name","desc")
            // }else if(status){
            //     getVideoGamesByOrder(1,null,null,status,"name","desc")
            // }else{
            //     getVideoGamesByOrder(1,null,null,null,"name","desc")
            // }
            setOptions(page,"name","desc");
        }else if(input === "Rating high"){
            setOptions(page,"rating","desc")
        }else if(input === "Rating low"){
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
                <label id='titleOrder'>Order By:</label>
                <select className='select-order' value ={order} onChange={(event)=>handleSearch(event.target.value)}>
                    <option value="" >--/---/--</option>
                    {orderBy.map(orden =>
                        (<option key={orden} value={orden}>{orden}</option>))
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
