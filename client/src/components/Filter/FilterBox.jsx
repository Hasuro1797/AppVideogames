import React, { useState } from 'react'
import './FilterBox.css';

function FilterBox({typeOfFilter , listOfElement}) {
    const [select, setSelect] = useState("element")
    const handleSelect = (event)=>{
        console.log(event)
        console.log(event.textContent);
        console.log(event.target)
        setSelect("active")
    }
    return (
        <div id="box-filter">
            <div id='type-filter'>
                <h3>{typeOfFilter}:</h3>
            </div>
            <ul id='list-of-element'>
                {
                    listOfElement.map(element =>
                    <li key ={element.id} className="element">
                        {element.name}
                    </li>)
                }
            </ul>
        </div>
    )
}

export default FilterBox
