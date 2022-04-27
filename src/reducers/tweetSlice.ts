import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import Tweet from "../models/Tweet"

export interface TweetState {
    tweets: {
        [id: string]: Tweet
    }
}

const initialState: TweetState = {
    tweets: {}
}

export const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {
        receiveTweets: (state, action: PayloadAction<Tweet[]>) => {
            action.payload.forEach(tweet => state.tweets[tweet.id] = tweet)
        },
        addTweet: (state, action:PayloadAction<Tweet>) => {
            state.tweets[action.payload.id] = action.payload
            if (action.payload.replyingTo) {
                state.tweets[action.payload.replyingTo].replies.push(action.payload.id)
            }
        },
        toggleTweet: (state, action: PayloadAction<{tweetId: string, authUser: string}>) => {
            // User has liked already, remove the like button
            const tweet = state.tweets[action.payload.tweetId]
            const userIndex = tweet.likes.indexOf(action.payload.authUser)
            // user already like the tweet => remove the like
            if (userIndex > -1) {
                tweet.likes.splice(userIndex, 1)
            } else {
                tweet.likes.push(action.payload.authUser)
            }
        }
    }
})

export const selectTweets = (state: RootState) => state.tweet.tweets

export const {receiveTweets, addTweet, toggleTweet } = tweetSlice.actions;

export default tweetSlice.reducer