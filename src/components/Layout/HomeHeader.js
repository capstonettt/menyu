import React from 'react';

import MenyuButton from './MenyuButton';
import DropDownMenu from './DropDownMenu';

import classes from './HomeHeader.module.css';

const HomeHeader = () => {
    const buttonClickHandler = () => {
        // do nothing
    }

    return (
        <div className={classes.container}>
            <MenyuButton classes={classes.button} onClickHandler={buttonClickHandler} />
            <DropDownMenu />
        </div>
    );

}

export default HomeHeader;