import React, { useState } from "react";
import { selectAuthUser } from "../reducers/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { handleAddTweet } from "../thunks/shared";
import { Redirect } from "react-router-dom";

const NewTweet: React.FC<{replyingTo: string|null}> = (props) => {

    const authUser = useAppSelector(selectAuthUser)
    const dispatch = useAppDispatch()
    const [inputState, setInputState] = useState('')
    const [backToHome, setBackToHome] = useState(false)

    const handleInputChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputState(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (authUser) {
            dispatch(handleAddTweet(inputState, authUser, props.replyingTo))
            if (!props.replyingTo)
                setBackToHome(true)
        }
        setInputState('')
    }

    const inputLength = inputState.length

    return (
        backToHome
        ?
        <Redirect to='/'/>
        :
        <div>
            <h3 className="center">Compose New Tweet</h3>
            <form className="new-tweet" 
                onSubmit={handleSubmit}
            >
                <textarea
                    placeholder="What's happening"
                    className="textarea"
                    maxLength={280}
                    value={inputState}
                    onChange={handleInputChange}
                />
                <div className="tweet-length">
                    {
                        280 - inputLength < 100
                        && 280 - inputLength
                    }
                </div>
                <button
                    type='submit'
                    className="btn"
                    disabled={inputState.trim().length === 0}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default NewTweet