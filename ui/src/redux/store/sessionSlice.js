import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        authUser: null,
        isDirty: false,
        isSaving: false
    },
    reducers: {
        setAuthUser: (state, action) => {
            return {...state, authUser: action.payload}
        },
        setDirty: (state, action) => {
            return {...state, isDirty: action.payload}
        },
        setSaving: (state, action) => {
            return {...state, isSaving: action.payload}
        }
    }
});

export const { setAuthUser, setDirty, setSaving } = sessionSlice.actions;

// selectors
export const selectUser = (state) => state.session.authUser;
export const selectSaving = (state) => state.session.isSaving;


export default sessionSlice.reducer;