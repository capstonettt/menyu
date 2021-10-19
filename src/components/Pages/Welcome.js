import React from 'react';

import Header from '../Layout/Header';
import BodyTop from '../Layout/BodyTop';
import BodyBottom from '../Layout/BodyBottom';
import Footer from '../Layout/Footer';

import classes from './Welcome.module.css';

const Welcome = () => {
    return (
        <>
            <Header />
            <BodyTop />
            <BodyBottom />
            <Footer />
        </>
    );
}

export default Welcome;