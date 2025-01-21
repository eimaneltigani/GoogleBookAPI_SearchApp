import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        favorites: []
    },
    reducers: {
        addBook: (state,action) => {
            return { ...state, favorites: [...state.favorites, action.payload]};
        },
        deleteBook: (state,action) => {
            const favorites = state.favorites.filter(book =>
                book.id !== action.payload)
            return {...state,favorites: [...favorites]};
        }
    }
})

export const { addBook, deleteBook } = favoritesSlice.actions;

export default favoritesSlice.reducer;