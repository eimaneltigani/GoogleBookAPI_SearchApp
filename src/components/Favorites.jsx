import React from "react";
import { useSelector } from 'react-redux';

import { Item } from './Item';


function Favorites() {
    const favorites = useSelector(state => state.favorites);
    
    return (
        <div className="m-5">
            <h1>Saved Books</h1>
            {favorites && favorites.length > 0 ? 
                <div className="favorites">
                    {favorites.map((favorite, index) => {
                        return <Item key={index} book={favorite} />
                    })}
                </div> : 
                <p>You haven't added any favorites yet! Head over to our Home page to search your soon-to-be favorites.</p>
            }
        </div>
    ) 
}

export default Favorites;
