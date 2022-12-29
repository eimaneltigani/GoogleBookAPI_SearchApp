import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addBook, selectFavorites } from '../redux/listSlice';


const apiKey = 'AIzaSyC0v5dWP4ZOKdznwi3L-Q5UsgzK37P1hVs';
const apiURL = `https://www.googleapis.com/books/v1/volumes`;

function Home() {
    const [search, setSearch] = useState("");
    const [bookList, setBookList] = useState([]);
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();
    
    const fetchBooks = async () => {
        // Ajax call to API using Axios
        const result = await axios.get(`${apiURL}?q=${search}&key=${apiKey}`);
        setBookList(result.data.items);
        console.log(result.data.items);
    }
    
    const handleSubmit = (e) => {
        //prevent browser refresh after each submission 
        e.preventDefault();
        fetchBooks();
    }
    
    const handleAdd = (id, author, title, publisher) => {
        let previouslyAdded = favorites.find((favorite) => favorite.id == id);
        if(!previouslyAdded) {
            dispatch(addBook({
                "id": id,
                "author": author,
                "title": title,
                "publisher" : publisher})
            );
        } else {
            console.log("Already added");
        }
        
    }
    
    return (
        <div className="text-center">
            {console.log(favorites)}
            <h1 className="text-center mt-5">Book Finder</h1>
            <div className="m-5">
                <div className="input">
                    <input id="search-box" 
                        type="text" 
                        className="regField" 
                        placeholder="Search book!"
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Search</button>
                </div>
                <div className="mt-5">
                    <h2>Search Result</h2>
                        {bookList.length > 0 ? 
                            <ul className="list-unstyled">
                                {bookList.slice(0,5).map((book) => {
                                    return (
                                        <li className="mt-3" key={book.id}>
                                            <div>
                                                <p>Author: {book.volumeInfo.authors[0]}, Title: {book.volumeInfo.title}, Publisher: {book.volumeInfo.publisher}</p>
                                            </div>
                                            <button onClick={() => handleAdd(book.id, book.volumeInfo.authors[0],book.volumeInfo.title,book.volumeInfo.publisher)}>
                                                Add to Favorites
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul> 
                            : <p>No book results yet! Search the author or title to view available books.</p>
                        }
                    
                </div>
            </div>
        </div>
    ) 
}

export default Home;