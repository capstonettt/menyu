import React from 'react';

import classes from './BodyTop.module.css';
import image from '../../assets/images/meeting.png';

import GetStartedButton from './GetStartedButton';


const BodyTop = () => {
    return (
        <div className={classes.bodytop}>
            <div className={classes.content}>
                <div className={classes.left}>
                    <div className ={classes.textarea}> 
                        <h1 className={classes.boldText}>
                            Never let customers regret with their menu choice.
                        </h1>
                        <h5 className={classes.text}>
                            Simply put your memu.<br></br>
                            You are going to give your costomers the best user experience with memu pick up.
                        </h5>
                    </div>
                    <GetStartedButton />
                </div>
                <div className={classes.right}>
                    <img className={classes.image} src={image}></img>
                </div>
            </div>
        </div>
    );
}

export default BodyTop;