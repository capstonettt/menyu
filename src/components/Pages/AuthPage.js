import React from 'react';
import { Link } from 'react-router-dom';

import MenyuButton from '../Layout/MenyuButton';

import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState } from '@aws-amplify/ui-components';

import classes from './AuthPage.module.css';

const AuthPage = (props) => {
    const buttonClickHandler = () => {
        props.onResetAuthState();
    }

    return (
        <div>
            <MenyuButton classes={classes.button} onClickHandler={buttonClickHandler} />
            <AmplifyAuthenticator 
                initialAuthState={props.isSigningUp ? AuthState.SignUp : AuthState.SignIn }
            >
            </AmplifyAuthenticator>

        </div>

    );
}

export default AuthPage;