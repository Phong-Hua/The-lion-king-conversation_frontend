import React from "react";
import { useAppSelector } from "../app/hooks";
import TweetObj from "../models/Tweet";
import { selectTweets } from "../reducers/tweetSlice";

import Tweet from "./Tweet";

const sortTweets = (tweets: { [id: string]: TweetObj }) => {
    return Object.keys(tweets).map(id => tweets[id])
        .filter(tweet => tweet.replyingTo === null)
        .sort((a, b) => b.timestamp - a.timestamp);
}

const Dashboard: React.FC = (props) => {

    const tweets = sortTweets(useAppSelector(selectTweets));

    return (
        <div>
            <h3 className="center">Your Timeline</h3>

            <ul className="dashboard-list">
                {
                    tweets.map(tweet => (
                        <li key={tweet.id}>
                                <Tweet tweet={tweet} />
                        </li>))
                }
            </ul>
        </div>
    )
}

export default Dashboard