/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { defPage, getVideoGames } from '../../Redux/actions/index.js';
import './Pagination.css';

//* variables para darle dinamismo a la paginación
const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
//* funcion que me dara el rango que necesito
const range = (from, to) => {
    let i = from;
    const range = [];
    while (i <= to) {
        range.push(i);
        i++;
    }
    return range;
}

function Pagination({defPage,totalPages,getVideoGames,genre,status}) {
    const [pageCurrent, setpageCurrent] = useState(1);
    // const [input, setinput] = useState("")
    //* El numero de vecinos de la pagina actual (1)<<{4,5}[6]{7,8}>>(12)
    const pageNeighbords = 1 //* decido darle solo un vecino;
    //* Funcion fetchNumbers: da el dinamismo al la paginacion
    const fecthPagesNumbers = () =>{
        //* total de numeros que se van a renderizar (+3 por el pagina incial,pagina actuak,paginafinal)
        const totalNumbers = (pageNeighbords * 2) + 3;
        //* total de bloques que se renderizan (+2 se refiere al previus(<<) y al next(>>))
        const totalBlocks = totalNumbers + 2;
        //* ¿el total de paginas es mayor al numero de bloques? (tiene que ser mayor a 7)
        if(totalPages > totalBlocks){
            //* Defino el vecino izquierdo
            const startPage = Math.max(2,pageCurrent - pageNeighbords);
            console.log("el startPage es",startPage);
            //* defino al vecino derecho
            const endPage= Math.min(totalPages - 1,pageCurrent + pageNeighbords);
            console.log("el endPage es",endPage);
            console.log("-----------------")
            //* creo un array con limites entre el vecino izquierdo y derecho([startpage,currentpage,endpage])
            let pages = range(startPage,endPage);
            
            //* ¿Hay paginas ocultas en la izquierda?
            const hasLeftSpill = startPage > 2;
            console.log("el hasleftspill es", hasLeftSpill);
            //* ¿Hay paginas ocultas en la deracha?
            const hasRightSpill = (totalPages - endPage) > 1;
            console.log("el hasRightspill es", hasRightSpill);
            //* Numero de paginas a la izquierda o la derecha
            const spillOffset = totalNumbers - (pages.length + 1);
            console.log("el spillOffset es",spillOffset);
            console.log("++++++++++++++++++++")

            switch (true) {
                //* (1)<<{4,5}[6]{7,8}(12)
                case (hasLeftSpill && !hasRightSpill):{
                    //*valores extra si no hay paginas ocultas
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    console.log("las extrapages caso 1 son",extraPages);
                    //* concateno todo al array
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    console.log("las nuevas pages caso 1 es",pages);
                    console.log("*****************")
                    break;
                }
                //* (1){4,5}[6]{7,8}>>(12)
                case (!hasLeftSpill && hasRightSpill): {
                    //*valores extra si no hay paginas ocultas
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    console.log("las extrapages caso 2 son ",extraPages);
                    //* concateno todo al array
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    console.log("las nuevas pages caso 2 es",pages);
                    console.log("*****************");
                    break;
                }
                //* (1)<<{4,5}[6]{7,8}>>(12)
                case (hasLeftSpill && hasRightSpill):
                default:{
                    //* concateno tanto el previus como el next
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
                    console.log("la pages del caso dafault ",pages);
                    console.log("*****************");
                    break;
                }
            }
            //* retorno un nuevo array con las modificaciones
            return [1, ...pages, totalPages];
        }
        //* No es mayor al numero de bloques
        return range(1,totalPages);
    }
    //* creo el array deacuerdo a la situacion
    const arrayPages = fecthPagesNumbers()

    //*evento del previus
    const handleMoveLeft = (page)=>(event) =>{
        event.preventDefault();
        console.log("la pagina actual es----------",page);
        //* actualizo a la nueva pagina
        setpageCurrent(page);
        //* actualizo el estado de redux
        defPage(page);
        //* request con la page requerida
        getVideoGames(page,null,genre,status);
        
    }
    //* evento del next
    const handleMoveRight = (page) =>(event)=>{
        event.preventDefault();
        //*actualizo a la nueva pagina
        setpageCurrent(page);
        console.log("la pagina actual es--------",page);
        //* actualizo el estado de redux
        defPage(page);
        //* request con la page requerida
        getVideoGames(page,null,genre,status);
    }
    //* evento de click en una pagina especifica
    const handleClick = (value) =>(event)=>{
        event.preventDefault();
        setpageCurrent(value);
        defPage(value);
        //*request con la page requerida
        getVideoGames(value,null,genre,status)
    }
    return (
        <>
        {
            //* ¿Hay videojuegos sobre que paginar?
            totalPages ?
                //* Si solo hay una pagina
                totalPages === 1? null 
                : 
                <div id = "box-pagination">
                    {/* numero de paginas */}
                    <h3>Page: {pageCurrent} from {totalPages}</h3>
                    <ul id = "pagination">
                        {
                            arrayPages.map((page,index)=>{
                                if(page === LEFT_PAGE)return(
                                    <li key={index} className="page-item">
                                        <a className="page-link" href="#" onClick={handleMoveLeft(pageCurrent - 1)}>
                                            <span>&laquo;</span>
                                        </a>
                                    </li>
                                );
                                if(page === RIGHT_PAGE) return (
                                    <li key={index} className="page-item">
                                        <a className="page-link" href="#" onClick={handleMoveRight(pageCurrent + 1)}>
                                            <span>&raquo;</span>
                                        </a>
                                    </li>
                                );
                                return (
                                    <li key={index} className={`page-item${ pageCurrent === page ? ' active' : ''}`}>
                                        <a className="page-link" href="#" onClick={ handleClick(page) }>{ page }</a>
                                    </li>
                                )
                            }
                            )
                        }
                    </ul>
                </div> 
            : null 
        }
        </>
    )      
}
const mapStateToProps = (state) =>{
    return {
        totalPages: state.totalPages,
        genre: state.genre,
        status: state.status
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        defPage: (currentPage) => dispatch(defPage(currentPage)),
        getVideoGames: (page,name,genre,status) => dispatch(getVideoGames(page,name,genre,status))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Pagination)
