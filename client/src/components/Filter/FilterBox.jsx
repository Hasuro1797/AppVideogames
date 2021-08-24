import React  from 'react'
import { defGenre,defStatus,getVideoGames,defPage, defName } from '../../Redux/actions/index.js';
import { connect } from 'react-redux';
import './FilterBox.css';

function FilterBox({
    typeOfFilter,
    defPage,
    listOfElement,
    defGenre,
    defName,
    defStatus,
    getVideoGames,
    genre,
    status,
    setShowMenu
}) {
    const handleSelect = async (event) =>{
        //* Capturo el valor en el componente
        const value = event.target.innerText;
        //* ¿mostrar todos los juegos?
        if(value === "All Games"){
            getVideoGames(1)
            defGenre("");
            defStatus("");
            await defPage(1);
            setShowMenu(false)
            defName("");
        }else{
            //* parametros(page,name,genre,status)
            //* ¿tipo de filtro es por genero?
            if(typeOfFilter === "Genres"){
                defGenre(value);
                getVideoGames(1,null,value,null)
                await defPage(1);
                setShowMenu(false)
                defName("");

            }
            //* ¿tipo de filtro es por juegos? 
            else{
                defStatus(value);
                getVideoGames(1,null,null,value)
                await defPage(1);
                setShowMenu(false)
                defName("");
            } 
        }

        }   
    return (
        <div id="box-filter">
            <div id='type-filter'>
                <h3 id ="h3-title">{typeOfFilter}</h3>
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
        defName: (value) => dispatch(defName(value)),
        getVideoGames: (page,name,genre,status) => dispatch(getVideoGames(page,name,genre,status)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FilterBox)
