
import React from "react"
import ReactDOM from "react-dom"
import classes from './ErrorModal.module.css'
import { selectErrorTitle, selectErrorBody } from "../reducers/errorSlice"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { clearError } from "../reducers/errorSlice"


const Backdrop: React.FC<{onConfirm : ()=> void}> = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm}/>
}

const ModalOverlay : React.FC<{onConfirm : ()=> void}> = (props) => {
    
    const body = useAppSelector(selectErrorBody)
    const title = useAppSelector(selectErrorTitle)

    return (
        <div className={classes.modal}>
            <header className={classes.header}>
                {title && <h2>{title}</h2>}
            </header>
            <div className={classes.content}>
                {body && <p>{body}</p>}
            </div>
            <footer className={classes.center}>
                <button 
                    className={classes.btn}
                    onClick={props.onConfirm}
                >
                    Close
                </button>
            </footer>
        </div>
    )
}

const ErrorModal : React.FC = () => {
    const backdropRoot = document.getElementById('backdrop-root')
    const overlayRoot = document.getElementById('overlay-root')
    const dispatch = useAppDispatch()
    
    const onConfirm = () => {
        dispatch(clearError())
    }

    return (
        <React.Fragment>
            {backdropRoot && ReactDOM.createPortal(<Backdrop onConfirm={onConfirm}/>, backdropRoot)}
            {overlayRoot && ReactDOM.createPortal(<ModalOverlay onConfirm={onConfirm}/>, overlayRoot)}
        </React.Fragment>
    )
}

export default ErrorModal