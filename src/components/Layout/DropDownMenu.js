import React from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';

import classes from './DropDownMenu.module.css'

const DropDownMenu = () => {

    return (
        <div className={classes.container}>
            <AmplifySignOut />
        </div>
    );

}

export default DropDownMenu;