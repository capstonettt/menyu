/* src/App.js */
import React, { useState, useEffect } from 'react'

import Welcome from './components/Pages/Welcome';
import AuthProcessContext from './context/auth-process-context';

import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

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

  React.useEffect(() => {
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

  return authState === AuthState.SignedIn && user ? (
      <div>
          <div>Hello, {user.username}</div>
          <AmplifySignOut />
      </div>
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
}

export default App