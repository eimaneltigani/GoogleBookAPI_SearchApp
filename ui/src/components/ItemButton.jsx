import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addBook, deleteBook } from '../redux/store/favoritesSlice';

const ItemButton = (props) => {
    const favorites = useSelector(state => state.favorites.favorites);
    const dispatch = useDispatch();

    let previouslyAdded = favorites.find((favorite) => favorite.id === props.book.id);

    const handleAdd = (book) => {
        dispatch(addBook(book)); 
    }

    const handleDelete = (id) => {
        dispatch(deleteBook(id));
    }

    return (
        <div className="item-buttons">
            {!previouslyAdded ? (
                <button onClick={() => handleAdd(props.book)}>Add to favorites</button>
            ) : (
                <button onClick={() => handleDelete(props.book.id)}>Remove from favorites</button>
            )}
        </div>
    )
}

export default ItemButton;