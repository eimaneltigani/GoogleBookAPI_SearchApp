import React from "react";
import axios from "axios";
import { useState } from "react";
// import { addBook } from '../redux/listSlice';

import { Item } from './Item';


const apiKey = 'AIzaSyC0v5dWP4ZOKdznwi3L-Q5UsgzK37P1hVs';
const apiURL = `https://www.googleapis.com/books/v1/volumes`;

function Home() {
    const [search, setSearch] = useState("");
    const [bookList, setBookList] = useState([]);
    
    
    const fetchBooks = async () => {
        // Ajax call to API using Axios
        const result = await axios.get(`${apiURL}?q=${search}&key=${apiKey}`);
        setBookList(result.data.items);
        // console.log(result.data.items);
    }
    
    const handleSubmit = (e) => {
        //prevent browser refresh after each submission 
        e.preventDefault();
        fetchBooks();
    }
    
    // const handleAdd = (book) => {
    //     let previouslyAdded = favorites.find((favorite) => favorite.id === book.id);
    //     if(!previouslyAdded) {
    //         dispatch(addBook(book));
    //     } else {
    //         console.log("Already added");
    //     }  
    // }
    
    return (
        <div className="text-center">
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
                            <div>
                                {bookList.slice(0,10).map((book, index) => {
                                    return (
                                        <div>
                                            <Item key={index} book={book} />
                                            {/* <button onClick={handleAdd(book)}></button> */}
                                        </div> 
                                    )
                                })}
                            </div> 
                            : <p>No book results yet! Search the author or title to view available books.</p>
                        }
                </div>
            </div>
        </div>
    ) 
}

export default Home;