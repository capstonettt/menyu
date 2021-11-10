import React from 'react';

import classes from './Header.module.css';
import GetStartedButton from './GetStartedButton';
import HeaderLoginButton from './HeaderLoginButton';
import MenyuButton from './MenyuButton';

const Header = () => {
    const buttonClickHandler = () => {
        // do nothing
    }
    return (
        <header className={classes.header}>
            <MenyuButton classes={classes.menyuButton} onClickHandler={buttonClickHandler}/>
            <span className={classes.buttons}>
                <HeaderLoginButton />
                <GetStartedButton/>
            </span>
        </header>
    );
}

export default Header;