import React , { useContext } from 'react';

import AuthProcessContext from '../../context/auth-process-context';

import classes from './HeaderLoginButton.module.css'

const HeaderLoginButton = () => {
    const ctx = useContext(AuthProcessContext);

    const ClickHandler = () => {
        console.log("login button pressed");
        ctx.onSignIn();
    }
    return (
        <button className={classes.button} onClick={ClickHandler}>
            Log in
        </button>
    )

}

export default HeaderLoginButton;