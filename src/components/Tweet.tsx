import React from "react";
import { Link } from "react-router-dom";
import { TiArrowBackOutline, TiHeartFullOutline, TiHeartOutline } from 'react-icons/ti'
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectAuthUser, selectUsers } from "../reducers/userSlice";
import { selectTweets } from "../reducers/tweetSlice";
import TweetObj from '../models/Tweet'
import { formatTweet, formatDate } from "../utils/helpers";
import { handleToggleTweet } from '../thunks/tweet'

const Tweet: React.FC<{ tweet: TweetObj }> = (props) => {

    const dispatch = useAppDispatch()

    const tweet = props.tweet
    const tweets = useAppSelector(selectTweets)
    const authUser = useAppSelector(selectAuthUser)
    const users = useAppSelector(selectUsers)
    const author = users[tweet.authorId]
    const parentTweet = tweet.replyingTo ? tweets[tweet.replyingTo] : null

    const formatedTweet = !authUser ? null : formatTweet(tweet, author, authUser, parentTweet);

    const toggleTweet = () => {
        if (formatedTweet && authUser) {
            dispatch(handleToggleTweet(formatedTweet?.id,
                formatedTweet?.hasLiked, authUser))
        }
    }

    return (
        (!formatedTweet)
            ? <div>Oopps... Something went wrong</div>
            :
            <div className="tweet">
                <img
                    src={formatedTweet.avatar}
                    alt={`Avatar of ${formatedTweet.name}`}
                    className='avatar'
                />
                <div className="tweet-info">
                    <div>
                        <span>{formatedTweet.name}</span>
                        <div>{formatDate(formatedTweet.timestamp)}</div>
                        {
                            formatedTweet.parent
                            &&
                            <Link to={`/tweet/${formatedTweet.parent.id}`}>
                                <button className="replying-to">
                                    Replying to {formatedTweet.parent?.author}
                                </button>
                            </Link>
                        }
                    </div>
                    <p>{formatedTweet.text}</p>
                    <div className="tweet-icons">
                        <Link to={`/tweet/${formatedTweet.id}`}>
                            <TiArrowBackOutline className="tweet-icon" />
                        </Link>
                        <span>{formatedTweet.replies}</span>
                        {
                            formatedTweet.hasLiked
                                ?
                                <TiHeartFullOutline
                                    className="tweet-icon"
                                    color="red"
                                    onClick={toggleTweet}
                                />
                                :
                                <TiHeartOutline
                                    className="tweet-icon"
                                    onClick={toggleTweet}
                                />
                        }
                        <span>{formatedTweet.likes}</span>
                    </div>
                </div>
            </div>
    )
}

export default Tweet