import React from 'react';

import classes from './Footer.module.css';
import MenyuButton from './MenyuButton';

const Footer = () => {
    const menyuButtonClickHandler = () => {
        // do nothing
    }

    return (
        <div className={classes.body}>
            <div className={classes.text}>Got any questions?</div>
            <button className={classes.contactButton}>Contact us</button>
            <div className={classes.buttons}>
                <MenyuButton classes={classes.menyuButton} onClickHandler={menyuButtonClickHandler} />
                <button className={classes.aboutButton}>About</button>
            </div>
            <hr color="#FFDA9D" className={classes.line}></hr>
            <div className={classes.bottoms}>
                <h6 className={classes.bottomsText}>
                    © 2021 MENYU | Disclosures | Accessibility
                </h6>
            </div>

        </div>
    )

}

export default Footer;