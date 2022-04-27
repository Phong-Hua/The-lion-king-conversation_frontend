import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import User from "../models/User"

export interface UserState {
    authUser: string | null,
    users : {
        [id: string] : User
    }
}

const initialState: UserState = {
    authUser: null,
    users: {}
}

export const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        receiveUsers : (state, action: PayloadAction<User[]>) => {
            action.payload.map(user => state.users[user.id] = user)
        },
        setAuthUser: (state, action: PayloadAction<string>) => {
            state.authUser = action.payload
        },
        addTweetToUser: (state, action: PayloadAction<{userId: string, tweetId: string}>) => {
            state.users[action.payload.userId].tweets.push(action.payload.tweetId)
        }
    }
})

export const {receiveUsers, setAuthUser, addTweetToUser} = userSlice.actions

export const selectUsers = (state: RootState) => state.user.users

export const selectAuthUser = (state: RootState) => state.user.authUser

export default userSlice.reducer