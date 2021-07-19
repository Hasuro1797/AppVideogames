import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import './OrderBy.css';

const OrderBy = () => {

    const orderBy = ["Name A-Z", "Name Z-A", "Rating high", "Rating low"];
    return (
        <div id = "OptionSearch" >
            <SearchBar/>
            <div id= 'electionsOfOrder'>
                <label id='titleOrder'>Order By:</label>
                <select className='select-order'>
                    <option value="" >Aleatorio</option>
                    {orderBy.map(orden =>
                        (<option key={orden} value={orden}>{orden}</option>))
                    }
                </select>
            </div>
        </div>
    )
}

export default OrderBy
