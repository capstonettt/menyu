import React from 'react';

import classes from './Header.module.css';
import GetStartedButton from './GetStartedButton';
import HeaderLoginButton from './HeaderLoginButton';

const Header = () => {
    return (
        <header className={classes.header}>
            <h1 className={classes.text}>MENYU</h1>
            <span className={classes.buttons}>
                <HeaderLoginButton />
                <GetStartedButton/>
            </span>
        </header>
    );
}

export default Header;