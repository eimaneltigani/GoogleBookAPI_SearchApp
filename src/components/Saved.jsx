import React from "react";
import { useSelector, useDispatch } from 'react-redux';


function Saved() {
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();
    
    return (
        <div className="m-5">
            {console.log(favorites)}
            <h1>Saved Books</h1>
            {favorites && favorites.length > 0 ? 
                <ul className="mt-4">
                    {favorites.map(favorite => {
                        return (
                            <li key={favorite.id}>
                                <p><b>Author:</b> {favorite.volumeInfo.authors}</p>
                                <p><b>Title:</b> {favorite.volumeInfo.title}</p>
                                <p><b>Publisher:</b> {favorite.volumeInfo.publisher}</p>
                                <button onClick={() => handleDelete(favorite.id)}>Remove from Favorites</button>
                            </li>
                        )
                    })}
                </ul> : 
                <p>You haven't added any favorites yet! Head over to our Home page to search your soon-to-be favorites.</p>
            }
        </div>
    ) 
}

export default Saved;
