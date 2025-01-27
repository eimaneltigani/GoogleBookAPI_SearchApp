import React, { useState, useRef } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import './Home.css';
import { Item } from './Item';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from "./LoadingIndicator";


const apiKey = 'AIzaSyC0v5dWP4ZOKdznwi3L-Q5UsgzK37P1hVs';
const apiURL = `https://www.googleapis.com/books/v1/volumes`;

function Home() {
    const [search, setSearch] = useState("");
    const [bookList, setBookList] = useState([]);
    // add scroll functionality to results section
    const scrollToRef = useRef();
    
    const fetchBooks = async () => {
        // add error handling if user doesnt type anything

        // Ajax call to API using Axios
        try {
            const result = await trackPromise(
                axios.get(`${apiURL}?q=${search}&key=${apiKey}`)
            );
            setBookList(result.data.items);
        } catch (err) {
            console.log(err);
        }
        
        // console.log(result.data.items);
    }
    
    const handleSubmit = (e) => {
        //prevent browser refresh after each submission 
        e.preventDefault();
        fetchBooks();
        //scroll to results section
        scrollToRef.current.scrollIntoView();
    }

    //styling for main search 
    const myStyle = {
        backgroundImage: "url('https://wallpaperaccess.com/full/4506133.jpg')",
        height: '100vh',
        marginTop: '-70px',
        backgroundSize: 'cover',
        backgroundRepreat: 'no-repeat',
        minHeight: '100vh'
    }
    
    return (
        <>
            <div id="search-engine">
                <div className="search-content">
                    <h1>Google Book Search</h1>
                    <div className="input">
                        <input id="search-input" 
                            type="text" 
                            required
                            placeholder="Enter book title..."
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <button id="search"onClick={handleSubmit}>Search</button>
                    </div>
                </div>
                <LoadingIndicator />
            </div>
            <div id="results" ref={scrollToRef} >
                <h2 className="pt-5">Search Results</h2>
                {bookList.length > 0 ? 
                    <Container fluid>
                        {bookList.slice(0,10).map((book, index) => {
                            return <Item key={index} book={book} />
                        })}
                    </Container> : 
                    <p>No book results yet! Search the author or title to view available books.</p>
                }
            </div>
        </>
    ) 
}

export default Home;