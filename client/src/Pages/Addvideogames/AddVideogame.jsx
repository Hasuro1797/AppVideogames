import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { addGenre, 
        addPlatform, 
        getGenres, 
        getPlatforms, 
        LOCALHOST,
        removeAll,
        removeGenre, 
        removePlatform } from '../../Redux/actions';
import { validate } from './validate';
import './Addvideogame.css';

function AddVideogame({platforms, getPlatforms, genres,getGenres,selectedPlatforms,addPlatform,removePlatform,selectedGenres,addGenre,removeGenre,removeAll}) {
    
    const [inputPlatform, setInputPlatform] = useState("")
    const [inputGenre, setInputGenre] = useState("")
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        background_image: ''
    })

    useEffect(() => {
        if(!platforms.length) getPlatforms()
        if(!genres.length) getGenres();
        // removeAll();
    }, [])
    const handleInputChange = (event)=>{
        setErrors(validate({
            ...input,
            [event.target.name] : event.target.value
        }))
        setInput({
            ...input,
            [event.target.name] : event.target.value
        })
        
    }
    const handleGenreSelect = (value) =>{
        addGenre(Number(value));
        setInputGenre("")
    }
    const handlePlatformSelect = (value) =>{
        addPlatform(Number(value));
        setInputPlatform("")
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        const url = `${LOCALHOST}/videogame`;
        fetch(url, {
            method: 'POST', 
            body: JSON.stringify({
                ...input,
                genres: selectedGenres,
                platform: selectedPlatforms
            }), 
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            setInput({
                name: '',
                description: '',
                released: '',
                rating: '',
                background_image: ''
            })
            removeAll()
            alert("creado con exito")
        })
        .catch(error => console.error('Error:', error))
    }
    return (
        <main id = "main">
            <form className= "form-data" onSubmit ={(event)=> handleSubmit(event)}>
                <h1>Created Video Game</h1>
                <div id="box1-principal">
                    <div id = "column1-box">
                        <label htmlFor = "title">Name of Game(max 60 characters)<span>*</span></label>
                        <input
                            className = "title-option"
                            autoComplete = "off"
                            spellCheck="false"
                            placeholder= "God of war"
                            maxLength = "60"
                            // minLength = "10"
                            type = "text"
                            id = "title"
                            name = "name"
                            value = {input.name}
                            onChange = {(e)=>handleInputChange(e)}
                        />
                        {errors.name &&
                            (<p>{errors.name}</p>
                        )}
                        <label htmlFor="description-vg">Description(max 1400 characters)<span>*</span></label>
                        <div id = "container-text-tarea">
                            <textarea
                                className = "description-option"
                                placeholder = "It is a new beginning for Kratos..."
                                id = "description-vg"
                                name = "description"
                                value = {input.description}
                                spellCheck = "false"
                                maxLength = "1400"
                                onChange = {(e) => handleInputChange(e)}
                            />
                        </div>
                        {errors.description &&
                            (<p>{errors.description}</p>
                        )}
                        <label htmlFor= "rating-select" >Rating (0 to 5)<span>*</span></label>
                        <input
                            className = "rating-option"
                            type = "number"
                            step = "0.1"
                            min = "0"
                            max = "5"
                            id = "rating-select"
                            placeholder = "4.5"
                            name = "rating"
                            value = {input.rating}
                            onChange = {(e) => handleInputChange(e)}
                        />
                        {errors.rating &&
                            (<p>{errors.rating}</p>
                        )}
                        <label htmlFor = "start">Released<span>*</span></label>
                        <input
                            className = "released-option"
                            type = "date"
                            id = "start"
                            value = {input.released}
                            name = "released"
                            max = {new Date().toISOString().split("T")[0]}
                            onChange = {(e) => handleInputChange(e)}
                        />
                        {errors.released &&
                            (<p>{errors.released}</p>
                        )}
                        <label htmlFor = "bg-img">Background Video Game<span>*</span></label>
                        <input
                            className = "bg-option"
                            type = "text"
                            id = "bg-img"
                            name = "background_image"
                            autoComplete = "off"
                            placeholder = "https://i.blogs.es/4185d3/godofwar2/1366_2000.jpg"
                            value = {input.background_image}
                            onChange = {(e)=>handleInputChange(e)}
                        />
                        {errors.background_image &&
                            (<p>{errors.background_image}</p>
                        )}
                    </div>
                    <div id = "img-prensentation">
                        {
                            input.background_image && <img id = "asdasd" src={input.background_image} alt="present videogame"/> 
                        }
                    </div>
                    <div className = "box-selected">
                        <div className ="container-label-select">
                            <label >Genres<span>*</span></label>
                            <select value = {inputGenre}  onChange = {(e) => handleGenreSelect(e.target.value)}>
                                <option hidden selected >Genre</option>
                                    {
                                        genres.map(element => 
                                            <option key ={element.id} value = {element.id}>{element.name}</option>
                                        )
                                    }
                            </select>
                        </div>
                        <div className = "box-items">
                            {
                                selectedGenres.map(element =>{
                                    var genreFind = genres.find(value => value.id === element);
                                    return(
                                        <div className="item">
                                            <p key ={genreFind.id}>{genreFind.name}</p>
                                            <button type ="button" onClick ={() => removeGenre(genreFind.id)}>x</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className = "box-selected">
                        <div className = "container-label-select">           
                            <label>Platforms<span>*</span></label>
                            <select value = {inputPlatform} onChange = {(e) => handlePlatformSelect(e.target.value)}>
                                <option hidden selected >Platform</option>
                                    {
                                        platforms.map(element => 
                                            <option key ={element.id} value = {element.id}>{element.name}</option>
                                        )
                                    }
                            </select>
                        </div>
                        <div className = "box-items">
                            {
                                selectedPlatforms.map(element =>{
                                    var platformFind = platforms.find(value => value.id === element);
                                    return(
                                        <div className="item">
                                            <p key ={platformFind.id}>{platformFind.name}</p>
                                            <button type = "button" onClick ={() => removePlatform(platformFind.id)}>x</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            </div>
            <div id = "box2-principal">
                <button type = 'submit'>CREATED</button>
            </div>
        </form>
        </main>
        
    )
}
const mapStateToProps = (state)=>{
    return{
        platforms: state.platforms,
        genres: state.genres,
        selectedGenres: state.selectedGenres,
        selectedPlatforms: state.selectedPlatforms
    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        getPlatforms: () => dispatch(getPlatforms()),
        getGenres : () => dispatch(getGenres()),
        addGenre: (id) => dispatch(addGenre(id)),
        removeGenre: (id) => dispatch(removeGenre(id)),
        addPlatform: (id) => dispatch(addPlatform(id)),
        removePlatform: (id) => dispatch(removePlatform(id)),
        removeAll: () => dispatch(removeAll())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddVideogame)
