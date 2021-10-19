import React from 'react';

import classes from './Footer.module.css';

const Footer = () => {
    return (
        <div className={classes.body}>
            <div className={classes.text}>Got any questions?</div>
            <button className={classes.contactButton}>Contact us</button>
            <div className={classes.buttons}>
                <button className={classes.menyuButton}>MENYU</button>
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