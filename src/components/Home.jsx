import React, { useState, useRef } from "react";
import axios from "axios";

import { Item } from './Item';



const apiKey = 'AIzaSyC0v5dWP4ZOKdznwi3L-Q5UsgzK37P1hVs';
const apiURL = `https://www.googleapis.com/books/v1/volumes`;

function Home({ mainRef, resultsRef}) {
    const [search, setSearch] = useState("");
    const [bookList, setBookList] = useState([]);
    const scrollToRef = useRef();
    
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
        scrollToRef.current.scrollIntoView();
    }
    
    return (
        <div className="text-center">
            <div className="m-5" style={{minHeight:"100vh"}}>
                <h1 className="text-center mt-5">Book Finder</h1>
                <div className="input">
                    <input id="search-box" 
                        type="text" 
                        className="regField" 
                        placeholder="Enter book title..."
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Search</button>
                </div>
            </div>
            <div className="mt-5" ref={scrollToRef} style={{minHeight:"100vh"}}>
                <h2>Search Result</h2>
                {bookList.length > 0 ? 
                    <div>
                        {bookList.slice(0,10).map((book, index) => {
                            return <Item key={index} book={book} />
                        })}
                    </div> : 
                    <p>No book results yet! Search the author or title to view available books.</p>
                }
            </div>
        </div>
    ) 
}

export default Home;