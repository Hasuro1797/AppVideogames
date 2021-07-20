import React, { useRef, useState } from 'react'
import { defGenre,defStatus } from '../../Redux/actions/index.js';
import { connect } from 'react-redux';
import './FilterBox.css';

function FilterBox({typeOfFilter , listOfElement,defGenre,defStatus}) {
    const [select, setSelect] = useState("element")
    const handleSelect = (event) =>{
        const value = event.target.innerText;
        console.log("el valor es",event.target.innerText);
        if(typeOfFilter === "Genres") defGenre(value)
        else defStatus(value)
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
        defStatus: (value) => dispatch(defStatus(value))
    }
}

export default connect(null,mapDispatchToProps)(FilterBox)
