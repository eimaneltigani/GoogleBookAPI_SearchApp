import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        user: null,
        isDirty: false,
        isSaving: false
    },
    reducers: {
        setAuthUser: (state, action) => {
            return {...state, user: action.payload}
        },
        setDirty: (state, action) => {
            return {...state, isDirty: action.payload}
        },
        setSaving: (state, action) => {
            return {...state, isSaving: action.payload}
        }
    }
});

export const { setAuthUser, setRedirect, setDirty, setSaving } = sessionSlice.actions;

// selectors
export const selectUser = (state) => state.session.user;
export const selectSaving = (state) => state.session.isSaving;

export default sessionSlice.reducer;