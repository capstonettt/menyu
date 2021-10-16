import Auth from '@aws-amplify/auth';
import React, { useContext } from 'react';

import AuthProcessContext from '../../context/auth-process-context';

import classes from './GetStartedButton.module.css';

const GetStartedButton = () => {
    const ctx = useContext(AuthProcessContext);

    const ClickHandler = () => {
        console.log("get started button pressed");
        ctx.onSignUp();
    }
    return (
        <button className={classes.button} onClick={ClickHandler}>
            Get started
        </button>
    )

}

export default GetStartedButton;