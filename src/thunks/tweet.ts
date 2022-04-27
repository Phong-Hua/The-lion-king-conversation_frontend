import { AppThunk } from "../app/store";
import { saveLikeToggle } from "../utils/api";
import { toggleTweet } from "../reducers/tweetSlice";
import { extractErrorMessage } from "../utils/helpers";
import { setError } from "../reducers/errorSlice";



export const handleToggleTweet = (tweetId: string, hasLiked: boolean, authUser:string): AppThunk => async (
    dispatch,
    getState
) => {
    try {
        dispatch(toggleTweet({tweetId, authUser}))
        await saveLikeToggle({id: tweetId, hasLiked, authedUser: authUser})
    } catch (e) {
        const error = extractErrorMessage(e)
        dispatch(toggleTweet({tweetId, authUser}))
        dispatch(setError({title: 'Error when toggle tweet', body: error}))
    }
}