import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface LoadingState {
    loading: boolean
}

const initialState : LoadingState = {
    loading: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers : {
        setLoading: (state, action: PayloadAction<{loading: boolean}>) => {
            state.loading = action.payload.loading
        }
    }
})

export const {setLoading} = loadingSlice.actions

export const selectLoading = (state: RootState) => state.loading.loading

export default loadingSlice.reducer