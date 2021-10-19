import React from 'react';

import classes from './BodyBottom.module.css';
import phoneImage from '../../assets/images/phone.png';
import QRcodeImage from '../../assets/images/QRcode.png';



const BodyBottom = () => {
    return (
        <div className={classes.bodybottom}>
            <div className={classes.content}>
                <div className={classes.left}>
                    <div className={classes.textarea}>
                        <h1 className={classes.boldtext}>
                            You will no longer let customers think about what they should get.
                        </h1>
                        <h5 className={classes.text}>
                            Your customers will scan a QR chip at a table, and they will see all the menu items in a familiar template.
                        </h5>
                    </div>
                    <img className={classes.QRcodeImage} src={QRcodeImage}></img>
                    <button className ={classes.button}>Check out sample menyu</button>
                </div>
                <div className={classes.right}>
                    <img className={classes.phoneImage} src={phoneImage}></img>
                </div>
            </div>
        </div>
    );
}

export default BodyBottom;