import { AppThunk } from "../app/store";
import { getInitialData, saveTweet } from "../utils/api";
import { convertTweet, convertUser, extractErrorMessage } from "../utils/helpers";
import { receiveTweets, addTweet } from "../reducers/tweetSlice";
import { receiveUsers, addTweetToUser } from "../reducers/userSlice";
import { setError } from "../reducers/errorSlice";
import { setLoading } from "../reducers/loadingSlice";

export const handleInitialData = () : AppThunk => async (
    dispatch,
    getState
) => {
    try {
        dispatch(setLoading({loading: true}))

        const {users: userData, tweets: tweetData} = await getInitialData();
        const users = Object.keys(userData).map(id => convertUser(userData[id]))
        const tweets = Object.keys(tweetData).map(id => convertTweet(tweetData[id]))
        
        dispatch(receiveUsers(users))
        dispatch(receiveTweets(tweets))

    } catch (e) {
        const error = extractErrorMessage(e)
        dispatch(setError({title: 'Error at loading data', body: error}))
    } finally {
        dispatch(setLoading({loading: false}))
    }
}

export const handleAddTweet = (text:string, authorId:string, replyingTo: string | null): AppThunk => async (
    dispatch,
    getState
) => {
    try {
        const data = await saveTweet({text: text, author: authorId, replyingTo: replyingTo})
        const tweet = convertTweet(data)
        dispatch(addTweet(tweet))
        dispatch(addTweetToUser({userId: authorId, tweetId: tweet.id}))
        
    } catch (e) {
        const error = extractErrorMessage(e)
        dispatch(setError({title: 'Error at adding tweet', body: error}))
    }
}