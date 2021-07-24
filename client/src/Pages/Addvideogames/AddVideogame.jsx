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
import './Addvideogame.css';

function AddVideogame({platforms, getPlatforms, genres,getGenres,selectedPlatforms,addPlatform,removePlatform,selectedGenres,addGenre,removeGenre,removeAll}) {
    
    const [inputPlatform, setInputPlatform] = useState("")
    const [inputGenre, setInputGenre] = useState("")
    // const [error, setError] = useState({})
    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: 0,
        background_image: ''
    })

    useEffect(() => {
        if(!platforms.length) getPlatforms()
        if(!genres.length) getGenres();
        // removeAll();
    }, [])
    const handleInputChange = (event)=>{
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
        <form onSubmit ={(event)=> handleSubmit(event)}>
            <div>
                <h2>Created Video Game</h2>
                <label htmlFor = "title">Name of Game(max 40 characters)<span>*</span></label>
                <input
                    className = "title-option"
                    type = "text"
                    id = "title"
                    name = "name"
                    value = {input.name}
                    onChange = {(e)=>handleInputChange(e)}
                />
                <p>mensaje de error</p>
                <label>Description(max 300 characters)<span>*</span></label>
                <textarea
                    className = "description-option"
                    placeholder = "It is a new beginning for Kratos..."
                    name = "description"
                    value = {input.description}
                    onChange = {(e) => handleInputChange(e)}
                />
                <p>mansaje de error</p>
                <label htmlFor= "rating-select" >Rating (0 to 5)<span>*</span></label>
                <input
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
                <p>mensaje de error</p>
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
                <p>mensaje de error</p>
                <label htmlFor = "bg-img">Background Video Game<span>*</span></label>
                <input
                    className = "bg-option"
                    type = "text"
                    id = "bg-img"
                    name = "background_image"
                    placeholder = "https://i.blogs.es/4185d3/godofwar2/1366_2000.jpg"
                    value = {input.background_image}
                    onChange = {(e)=>handleInputChange(e)}
                />
                <p>mensaje de error</p>
            </div>
            <div>
                <div>
                    <label htmlFor = "gnre-select">Genres<span>*</span></label>
                    <select value = {inputGenre}  onChange = {(e) => handleGenreSelect(e.target.value)}>
                        <option hidden selected >Genre</option>
                            {
                                genres.map(element => 
                                    <option key ={element.id} value = {element.id}>{element.name}</option>
                                )
                            }
                    </select>
                    <div>
                        {
                            selectedGenres.map(element =>{
                                var genreFind = genres.find(value => value.id === element);
                                return(
                                    <div>
                                        <p key ={genreFind.id}>{genreFind.name}</p>
                                        <button onClick ={() => removeGenre(genreFind.id)}>x</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <label htmlFor = "gnre-select">Platforms<span>*</span></label>
                    <select value = {inputPlatform} onChange = {(e) => handlePlatformSelect(e.target.value)}>
                        <option hidden selected >Platform</option>
                            {
                                platforms.map(element => 
                                    <option key ={element.id} value = {element.id}>{element.name}</option>
                                )
                            }
                    </select>
                    <div>
                        {
                            selectedPlatforms.map(element =>{
                                var platformFind = platforms.find(value => value.id === element);
                                return(
                                    <div>
                                        <p key ={platformFind.id}>{platformFind.name}</p>
                                        <button onClick ={() => removePlatform(platformFind.id)}>x</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
                {
                    input.background_image && <img id = "asdasd" src={input.background_image} alt="present videogame"/> 
                }
            </div>
            <div>
                <button type = 'submit'>CREATED</button>
            </div>
        </form>
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
