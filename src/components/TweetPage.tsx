import React, { Fragment } from "react";
import NewTweet from "./NewTweet";
import Tweet from "./Tweet";
import TweetObj from '../models/Tweet';
import { useAppSelector } from "../app/hooks";
import { selectTweets } from "../reducers/tweetSlice";
import { Redirect } from "react-router-dom";

const sortedReplies = (tweetFromStore: {[id: string]: TweetObj}, replyIds: string[]) => {
    return replyIds.map(id => tweetFromStore[id]).sort((a, b) => b.timestamp - a.timestamp)
}

const TweetPage: React.FC<{id: string}> = (props) => {
    
    const tweetFromStore = useAppSelector(selectTweets)
    const tweet = tweetFromStore[props.id]
    const replies = (!tweet) ? [] : sortedReplies(tweetFromStore, tweet.replies)

    return (
        (!tweet)
        ?
            <Redirect to='/'/>
        :
        <div>
            <Tweet tweet={tweet} />
            <NewTweet replyingTo={tweet.id}/>
            {
                replies.length > 0
                &&
                <Fragment>
                    <h3 className="center">Replies</h3>
                    <ul>
                        {
                            replies.map(reply => <li key={reply.id}>
                                <Tweet tweet={reply}/>
                            </li>)
                        }
                    </ul>
                </Fragment>
            }
        </div>
    )
}

export default TweetPage