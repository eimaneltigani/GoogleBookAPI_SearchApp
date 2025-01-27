import React from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from "../redux/store/sessionSlice";
import { setFavorites } from "../redux/store/favoritesSlice";
import { API_URL } from "../utils";

import { Item } from './Item';


function Favorites() {
    const dispatch = useDispatch();
    const authUser = useSelector(selectUser);
    const stateFavorites = useSelector(state => state.favorites.favorites);
    const prevAuthUser = useRef(authUser);
    console.log(stateFavorites)

    useEffect(() => {
        const handleAuthChange = async () => {
            if(prevAuthUser.current !== authUser) {
                authUser 
                ? syncFavoritesFromDatabase() // User just logged in: Sync database favorites to Redux
                : persistFavoritesToDatabase()  // User just logged out: Save Redux favorites to database    
            
                prevAuthUser.current = authUser;
            }
        }
        handleAuthChange();
    }, [authUser])

    const syncFavoritesFromDatabase = async () => {
        console.log('auth state changed from null to user');
        console.log(authUser);
        
        // fetch favorites
        try {
            const response = await fetch(`${API_URL}/${authUser}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const { favorites: dbFavorites } = await response.json();
                // Merge favorites, avoiding duplicates
                const mergedFavorites = [
                    ...stateFavorites,
                    ...dbFavorites.filter(
                        (dbFavorite) => !stateFavorites.some((fav) => fav.id === dbFavorite.id)
                    ),
                ];
                dispatch(setFavorites(mergedFavorites))
            } else if (response.status == 404) {
                console.error("User not found, adding to database");
                await addUserToDatabase();
            } else {
                console.error(
                    `Unexpected error: ${response.status} - ${response.statusText}`
                );
            }     
        } catch (error) {
            console.error("Error syncing favorites from database:", error);
        }
    }

    const addUserToDatabase = async () => {
        try {
            const response = await fetch(`${API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: authUser }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Log success message
            } else {
                const error = await response.json();
                console.error("Failed to add user:", error.error);
            }
        } catch (err) {
            console.error("Error adding user to the database:", err);
        }
    };

    const persistFavoritesToDatabase = async () => {
        console.log('auth state changed from user to null');
        console.log(prevAuthUser);
        console.log(prevAuthUser.current);
        console.log(authUser);

        try {
            // persist local favorites in database
            const response = await fetch(`${API_URL}/${prevAuthUser.current}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favorites: stateFavorites }),
            });
            console.log(response);
    
            if (!response.ok) {
                console.error("Failed to persist favorites to database");
                return;
            }
    
            // Reset local favorites 
            dispatch(setFavorites([]));
        } catch (error) {
            console.error("Error persisting favorites to database:", error);
        }
    }
    
    return (
        <div className="m-5">
            <h1 className="text-center">Saved Books</h1>
            {stateFavorites && stateFavorites.length > 0 ? 
                <div className="favorites">
                    {stateFavorites.map((favorite, index) => {
                        return <Item key={index} book={favorite} />
                    })}
                </div> : 
                <p>You haven't added any favorites yet! Head over to our Home page to search your soon-to-be favorites.</p>
            }
        </div>
    ) 
}

export default Favorites;
