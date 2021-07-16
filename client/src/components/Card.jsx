import React from 'react'

function Card({id,name ,genre ,rating ,background_image ,}) {
    return (
        <div>
            <div>
                <img src ={`${background_image}`} alt ={`image ${id}`}/>
            </div>
            <div>
                {name}
            </div>
            <div>
                <div>
                    {genre.map(element =>{
                        return (
                            <span key ={element.id}>{element.name}</span>
                            )
                    })}
                </div>
                <div>
                    {rating}
                </div>
            </div>
        </div>
    )
}

export default Card
