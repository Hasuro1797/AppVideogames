import React, { useState } from 'react'
import { defGenre,defStatus,getVideoGames,defPage } from '../../Redux/actions/index.js';
import { connect } from 'react-redux';
import './FilterBox.css';

function FilterBox({typeOfFilter,defPage,listOfElement,defGenre,defStatus,getVideoGames,genre,status}) {
    //const [select, setSelect] = useState("element")
    const handleSelect = (event) =>{
        const value = event.target.innerText;
        if(value === "All Games"){
            getVideoGames(1)
            defGenre("");
            defStatus("");
            defPage(1);
        }else{
            if(typeOfFilter === "Genres"){
                defGenre(value);
                getVideoGames(1,null,value,null)
                defPage(1)
            } 
            else{
                defStatus(value);
                getVideoGames(1,null,null,value)
                defPage(1)
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
                    <div 
                        className= {element.name === genre|| element.name === status?"active":"element"} 
                        key={element.id} 
                        onClick ={handleSelect}>
                            {element.name}
                    </div>
                    )
                }
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>{
    return {
        genre: state.genre,
        status: state.status
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        defPage: (value)=> dispatch(defPage(value)),
        defGenre: (value)=> dispatch(defGenre(value)),
        defStatus: (value) => dispatch(defStatus(value)),
        getVideoGames: (page,name,genre,status) => dispatch(getVideoGames(page,name,genre,status))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FilterBox)
