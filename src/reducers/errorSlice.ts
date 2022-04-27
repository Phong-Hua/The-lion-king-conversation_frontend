import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface ErrorState {
    hasError: boolean,
    title: string,
    body: string
}

const initialState : ErrorState = {
    hasError: false,
    title: '',
    body: ''
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<{title: string, body: string}>) => {
            state.hasError = true
            state.title = action.payload.title
            state.body = action.payload.body
        },
        clearError: (state) => {
            state.hasError = false
            state.title = ''
            state.body = ''
        }
    }
})

export const {setError, clearError} = errorSlice.actions

export const selectHasError = (state: RootState) => state.error.hasError

export const selectErrorTitle = (state: RootState) => state.error.title

export const selectErrorBody = (state: RootState) => state.error.body

export default errorSlice.reducer