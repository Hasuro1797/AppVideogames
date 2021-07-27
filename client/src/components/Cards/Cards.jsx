import React from 'react'
import Card from '../Card/Card';
import {Link} from 'react-router-dom';
import './Cards.css';
function Cards({videogames}) {
    if (videogames.length) {
        return (
            <>
                {videogames.map(game =>
                    <Link to = {`/home/videogame/${game.id}`} key={game.id}>
                        <Card
                            className = "Link-cards"
                            id={game.id}
                            background_image={game.background_image}
                            name={game.name}
                            genres={game.genres}
                            rating={game.rating}
                        />
                    </Link>
                )}
            </>
        )

    } else {
        return (
            <div id="box-message">
                <div id="no-result">No results found for the search</div>
            </div>
        )
    }
}

export default Cards
