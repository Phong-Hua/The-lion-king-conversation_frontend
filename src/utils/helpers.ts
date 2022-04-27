import Tweet from "../models/Tweet"
import User from "../models/User"

export function formatDate (timestamp: number) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatTweet (tweet : Tweet, author: User, authedUser:string, parentTweet: Tweet | null) {
  const { id, likes, replies, text, timestamp } = tweet
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    text,
    avatar: avatarURL,
    likes: likes.length,
    replies: replies.length,
    hasLiked: likes.includes(authedUser),
    parent: !parentTweet ? null : {
      author: parentTweet.authorId,
      id: parentTweet.id,
    }
  }
}

/**
 * Convert tweet from api
 */
export function convertTweet(tweet: any) : Tweet {
  return {
    id: tweet.id,
    text: tweet.text,
    timestamp: tweet.timestamp,
    authorId: tweet.author,
    likes: tweet.likes,
    replies: tweet.replies,
    replyingTo: tweet.replyingTo
  }
}

/**
 * Convert user from api
 * @param user 
 * @returns 
 */
export function convertUser(user: any) : User {
  return {
    id: user.id,
    name: user.name,
    avatarURL: user.avatarURL,
    tweets: user.tweets
  }
}

export function extractErrorMessage(error: unknown) {
  if (typeof(error) === 'string') {
    return error
  } else if (error instanceof Error) {
    return error.message
  } else {
    return "An error has happened. Try again"
  }
}