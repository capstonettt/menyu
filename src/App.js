/* src/App.js */
import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';

import Welcome from './components/Pages/Welcome';
import Home from './components/Pages/Home';
import Menu from './components/Pages/Menu';
import AuthPage from './components/Pages/AuthPage';
import AuthProcessContext from './context/auth-process-context';

import Amplify, { Auth } from 'aws-amplify';

import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const S3_BUCKET_REGION = awsconfig.aws_user_files_s3_bucket_region
const S3_BUCKET_NAME = awsconfig.aws_user_files_s3_bucket

/*
const client = new AWSAppSyncClient({
  url: GRAPHQL_API_ENDPOINT_URL,
  region: GRAPHQL_API_REGION,
  auth: {
    type: AUTH_TYPE,
    // Get the currently logged in users credential.
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
  // Amplify uses Amazon IAM to authorize calls to Amazon S3. This provides the relevant IAM credentials.
  complexObjectsCredentials: () => Auth.currentCredentials()
});

*/
const bucket_info = {bucket_name: S3_BUCKET_NAME, bucket_region: S3_BUCKET_REGION}


const App = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  const [inAuthProcess, setInAuthProcess] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const signinHandler = () => {
    setInAuthProcess(true);
    setIsSigningUp(false);
  }

  const signupHandler = () => {
    setInAuthProcess(true);
    setIsSigningUp(true);
  }

  useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          console.log("hello from onAuthUIStateChange");
          setUser(authData)
      });
  }, []);

  useEffect(() => {
    if (authState === AuthState.SignedIn) {
      setInAuthProcess(false);
      setIsSigningUp(false);
    }
  },[authState]);

  useEffect(() => {
    fetchSession()
  }, [])

  const resetAuthState = () => {
    setInAuthProcess(false);
    setIsSigningUp(false);
  }

  async function fetchSession() {
    try {
      console.log('from fetchSession');
      const session = await Auth.currentSession();
      const authUser = await Auth.currentAuthenticatedUser();
      if (session && authUser) {
        console.log("here")
        setAuthState(AuthState.SignedIn);
        setUser(authUser.username)
      }
      console.log(session);
      console.log(authUser);
    } catch(err) {
      console.log("error fetching session");
    }
  }

  /*
        <Home user={user} client={client} bucket_info={bucket_info}/>
        */
       /*
    return authState === AuthState.SignedIn && user ? (
        <Home user={user} bucket_info={bucket_info}/>
    ) : (
      <AuthProcessContext.Provider
        value={{
          onSignIn: signinHandler,
          onSignUp: signupHandler,
        }}
      >
        {!inAuthProcess && <Welcome />}
        {inAuthProcess && 
          <AmplifyAuthenticator 
            initialAuthState={isSigningUp ? AuthState.SignUp : AuthState.SignIn }
          ></AmplifyAuthenticator>
        }
      </AuthProcessContext.Provider>
  );
  */
  return (
    <Switch>
      <Route path='/' exact>
        {
          (authState === AuthState.SignedIn && user ) ? (
            <Home user={user} bucket_info={bucket_info} />
          ) : (
            <AuthProcessContext.Provider
              value={{
                onSignIn: signinHandler,
                onSignUp: signupHandler,
              }}
            >
              {!inAuthProcess && <Welcome />}
              {inAuthProcess && <AuthPage isSigningUp={isSigningUp} onResetAuthState={resetAuthState}/>}
            </AuthProcessContext.Provider>
          )
        }
      </Route>
      <Route path='/menu/:restrantId'>
        <Menu />
      </Route>
    </Switch>
  );
}

export default App