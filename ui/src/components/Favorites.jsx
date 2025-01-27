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
    const favorites = useSelector(state => state.favorites.favorites);
    const prevAuthUser = usePrevious(authUser);
    console.log(favorites);
    
    useEffect(() => {
        if(prevAuthUser !== authUser) {
            authUser 
                ? syncFavoritesFromDatabase() // User just logged in: Sync database favorites to Redux
                : persistFavoritesToDatabase();  // User just logged out: Save Redux favorites to database
            
            prevAuthUser.current = authUser;
        }
    }, [authUser, dispatch])

    const syncFavoritesFromDatabase = async () => {
        console.log('auth state changed from null to user');
        
        // fetch favorites
        try {
            const response = await fetch(`${API_URL}/favorites/${authUser}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (response.status == 404) {
                console.error("User not found, adding to database");
                await addUserToDatabase();
                return;
            }
    
            const { favorites: dbFavorites } = await response.json();

            // Merge favorites, avoiding duplicates
            const mergedFavorites = [
                ...favorites,
                ...dbFavorites.filter(
                    (dbFavorite) => !favorites.some((fav) => fav.id === dbFavorite.id)
                ),
            ];

            dispatch(setFavorites(mergedFavorites))
        } catch (error) {
            console.error("Error syncing favorites from database:", error);
        }
    }

    const addUserToDatabase = async () => {
        try {
            const response = await fetch(`${API_URL}/favorites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ authUser }),
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
        // update favorites in database
        // reset favorites to empty array
        console.log('auth state changed from user to null')

        try {
            const response = await fetch(`${API_URL}/favorites/${authUser}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favorites }),
            });
    
            if (!response.ok) {
                console.error("Failed to persist favorites to database");
                return;
            }
    
            // Reset Redux state for favorites
            dispatch(setFavorites([]));
        } catch (error) {
            console.error("Error persisting favorites to database:", error);
        }
    }
    
    return (
        <div className="m-5">
            <h1 className="text-center">Saved Books</h1>
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
