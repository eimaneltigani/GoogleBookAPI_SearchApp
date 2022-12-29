import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
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
                book.id != action.payload)
            return {...state,favorites: [...favorites]};
        }
    }
})

export const { addBook, deleteBook } = listSlice.actions;
//Selector 
export const selectFavorites = (state) => state.favorites.favorites;

export default listSlice.reducer;