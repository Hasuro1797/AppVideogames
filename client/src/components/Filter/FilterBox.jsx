import React, { useState } from 'react'
import { defGenre,defStatus,getVideoGames } from '../../Redux/actions/index.js';
import { connect } from 'react-redux';
import './FilterBox.css';

function FilterBox({typeOfFilter , listOfElement,defGenre,defStatus,getVideoGames}) {
    //const [select, setSelect] = useState("element")
    const handleSelect = (event) =>{
        const value = event.target.innerText;
        if(value === "All Games"){
            getVideoGames(1)
            defGenre("");
            defStatus("");
        }else{
            if(typeOfFilter === "Genres"){
                defGenre(value);
                getVideoGames(1,null,value,null)
            } 
            else{
                defStatus(value);
                getVideoGames(1,null,null,value)
            } 
        }

        }   
    return (
        <div id="box-filter">
            <div id='type-filter'>
                <h3>{typeOfFilter}:</h3>
            </div>
            <div id='list-of-element'>
                {
                    listOfElement.map((element)=>
                    <div className="element" key={element.id} onClick ={handleSelect}>
                        {element.name}
                    </div>
                    )
                }
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) =>{
    return{
        defGenre: (value)=> dispatch(defGenre(value)),
        defStatus: (value) => dispatch(defStatus(value)),
        getVideoGames: (page,name,genre,status) => dispatch(getVideoGames(page,name,genre,status))
    }
}

export default connect(null,mapDispatchToProps)(FilterBox)
