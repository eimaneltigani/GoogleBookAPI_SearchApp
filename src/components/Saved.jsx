import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, selectFavorites } from '../redux/listSlice';


function Saved() {
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();
    
    const handleDelete = (id) => {
        dispatch(deleteBook(id));
    }
    
    return (
        <div className="m-5">
            {console.log(favorites)}
            <h1>Saved Books</h1>
            {favorites && favorites.length > 0 ? 
                <ul className="mt-4">
                    {favorites.map(favorite => {
                        return (
                            <li key={favorite.id}>
                                <p><b>Author:</b> {favorite.author}</p>
                                <p><b>Title:</b> {favorite.title}</p>
                                <p><b>Publisher:</b> {favorite.publisher}</p>
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
