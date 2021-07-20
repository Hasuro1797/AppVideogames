import React, { useState } from 'react'
import { connect } from 'react-redux';
import { getVideoGamesByOrder, getVideoGames } from '../../Redux/actions';
import SearchBar from '../SearchBar/SearchBar'
import './OrderBy.css';

const OrderBy = ({getVideoGamesByOrder, getVideoGames}) => {
    const [name, setName] = useState("");
    const [order, setOrder] = useState("")
    const orderBy = ["Default","Name A-Z", "Name Z-A", "Rating high", "Rating low"];

    const handleSearch = (order) =>{
        setOrder(order);
        searchByOrder(order,name);
        setOrder("");
    }
    //*page,name,genre,status,order,way
    const searchByOrder = (input,searchName)=>{
        if(input === "Name A-Z"){
            getVideoGamesByOrder(1,searchName,null,null,"name","asc")
        }else if(input === "Name Z-A"){
            getVideoGamesByOrder(1,searchName,null,null,"name","desc")
        }else if(input === "Rating high"){
            getVideoGamesByOrder(1,searchName,null,null,"rating","desc")
        }else if(input === "Rating low"){
            getVideoGamesByOrder(1,searchName,null,null,"rating","asc")
        }else{
            getVideoGames(1,searchName)
        }
    }

    return (
        <div id = "OptionSearch" >
            <SearchBar setName = {setName} />
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
const mapDispatchToProps = (dispatch) =>{
    return{
        getVideoGamesByOrder: (page,name,genre,status,order,way) => dispatch(getVideoGamesByOrder(page,name,genre,status,order,way)),
        getVideoGames: (page,name,genre,status) => dispatch(getVideoGames(page,name,genre,status))
    }
}
export default connect(null,mapDispatchToProps)(OrderBy)
