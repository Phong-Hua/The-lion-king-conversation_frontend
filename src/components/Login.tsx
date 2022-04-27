import React, { ChangeEvent, useEffect, useState } from "react"

import classes from './Login.module.css'
import { CgProfile } from 'react-icons/cg'
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectUsers, setAuthUser } from "../reducers/userSlice"
import UserObj from '../models/User'
import { Redirect, RouteComponentProps } from "react-router-dom"
import { StaticContext } from "react-router"


const sortUsersByName = (userFromStore : {[id: string]: UserObj}) => {
    console.log('Sorted')
    return Object.keys(userFromStore).map(id => userFromStore[id])
    .sort((a, b) => a.name.localeCompare(b.name))
}

const Login : React.FC<RouteComponentProps<{}, StaticContext, any>> = (props) => {

    const previousPage = (props.location.state) ? props.location.state.from : '/'

    const dispatch = useAppDispatch()
    const userFromStore = useAppSelector(selectUsers)
    const [allUsers, setAllUsers] = useState<UserObj[]>([])
    const [selectedUser, setSelectedUser] = useState<UserObj | null>(null)
    const [hasSubmit, setHasSubmit] = useState(false)

    useEffect(()=> {
        setAllUsers(sortUsersByName(userFromStore))
    }, [userFromStore])

    const handleChangeUser = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedUserId = e.target.value
        setSelectedUser(userFromStore[selectedUserId])
    }



    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedUser)
        {
            dispatch(setAuthUser(selectedUser.id))
            setHasSubmit(true)
        }    
        
    }

    return (
        (hasSubmit)
        ? <Redirect to={previousPage}/>
        :
        <div className={classes.container}>
            <div className={classes['profile-info']}>
                {
                    selectedUser && selectedUser.avatarURL
                    ? <img 
                        src={selectedUser.avatarURL} 
                        className={classes.avatar}
                        alt={`Avatar of ${selectedUser.name}`}/>
                    : <CgProfile size={200} className={classes.avatar} />
                }
                <span className={`${classes['profile-info']} ${classes['profile-name']}`}>{selectedUser?.name}</span>
                <span className={`${classes['profile-info']} ${classes['profile-id']}`}>{selectedUser?.id}</span>
            </div>
            <form 
                className={classes['profile-selection']} 
                onSubmit={onSubmit}
                >
                <select 
                    value={selectedUser?.id} 
                    onChange={handleChangeUser}
                >
                    <option />
                    {allUsers.map(user => <option key={user.id} value={user.id}>
                        {user.name}
                    </option>)}
                </select>
                <button
                    type='submit'
                    className={classes.btn}
                    disabled={!selectedUser}>Login</button>
            </form>

        </div >
    )
}

export default Login