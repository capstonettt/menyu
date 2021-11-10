import React from 'react';
import { Link } from 'react-router-dom';

const MenyuButton = (props) => {
    return (
        <Link to='/'>
            <button className={props.classes} onClick={props.onClickHandler} >
                MENYU
            </button>
        </Link>
    )
}

export default MenyuButton;