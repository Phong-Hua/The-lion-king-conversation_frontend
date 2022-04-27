import React, {Suspense} from "react";
import { Redirect, Route } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import Nav from "./components/Nav";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { handleInitialData } from "./thunks/shared";
import { useEffect } from "react";
import { selectHasError } from "./reducers/errorSlice";
import { selectAuthUser } from "./reducers/userSlice";
import { selectLoading } from "./reducers/loadingSlice";

const Login = React.lazy(()=> import('./components/Login'));
const Dashboard = React.lazy(()=> import('./components/Dashboard'))
const NewTweet = React.lazy(() => import('./components/NewTweet'))
const TweetPage = React.lazy(() => import('./components/TweetPage'))
const ErrorModal = React.lazy(() => import('./components/ErrorModal'))

function App() {

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  const hasError = useAppSelector(selectHasError)
  const authUser = useAppSelector(selectAuthUser)
  const loading = useAppSelector(selectLoading)

  const redirectToLogin = (from: string) => {
    return <Redirect
      to={{
        pathname: "/login",
        state: { from, }
      }}
    />
  }

  return (

    <div className="container">
      {
        loading
          ? <LinearProgress />
          :
          <Suspense 
            fallback={
              <LinearProgress />
            }
          >
            {hasError && <ErrorModal />}
            {authUser && <Nav />}

            <Route
              exact={true}
              path='/login'
              component={Login}
            />
            <Route
              exact={true}
              path='/'
              render={(props) => (!authUser)
                ? redirectToLogin(props.location.pathname)
                : <Dashboard />}
            />
            <Route
              exact={true}
              path='/new-tweet'
              render={(props) => (!authUser)
                ? redirectToLogin(props.location.pathname)
                : <NewTweet replyingTo={null} />}
            />
            <Route
              exact={true}
              path='/tweet/:id'
              render={(props) => (!authUser)
                ? redirectToLogin(props.location.pathname)
                : <TweetPage id={props.match.params.id} />
              }
            />
          </Suspense>
      }
    </div>
  );
}

export default App;