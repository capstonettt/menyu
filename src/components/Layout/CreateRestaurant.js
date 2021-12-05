import React from 'react';
import { useState } from 'react';

import Storage from '@aws-amplify/storage';
import API from '@aws-amplify/api';
import { graphqlOperation } from '@aws-amplify/api-graphql';
import { createRestaurant } from '../../graphql/mutations';
import classes from './CreateRestaurant.module.css';

import { v4 as uuid } from 'uuid';

const CreateRestaurant = (props) => {
    const [name, setName] = useState('');
    const [logo, setLogo] = useState(null);

    const nameChangeHandler = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const logoChangeHandler = (event) => {
        event.preventDefault();
        setLogo(event.target.files[0]);
    }

    const addRestaurantHandler = async() => {
        if (name === '' || !logo) {
            return
        }

        const extension = logo.name.split(".")[1];
        const { type: mimeType } = logo;
        const key = `${uuid()}${name}.${extension}`;
        const url = `https://${props.bucket}.s3.${props.region}.amazonaws.com/public/${key}`;
        const inputData = { name: name, logo: url }
        try {
            await Storage.put(key, logo, {contentType: mimeType});
            const newRestaurant = await API.graphql(graphqlOperation(createRestaurant, { input: inputData }))
            props.restaurantSetter({id: newRestaurant.data.createRestaurant.id, name: name, logo: url});
            console.log('addRestaurantHandler: newly created restaurant:' , newRestaurant);
            console.log('addRestaurantHandler: newly created restaurant:' , newRestaurant.data.createRestaurant.id);
        } catch (err) {
            console.log('error creating restaurant:', err);
        }
    }
    
    return (
        <div className={classes.content}>
            <p className={classes.titleText}>Create your Restaurant</p>
            <div className={classes.nameArea}>
                <p className={classes.defaltText}>Restaurant Name:</p>
                <input className={classes.input} type='text' value={name} onChange={nameChangeHandler}/>
            </div>
            <div className={classes.logoArea}>
                <p className={classes.defaltText}>Restaurant Logo:</p>
                <input className={classes.input} type='file' onChange={logoChangeHandler} accept="image/png, image/jpeg"/>
            </div>
            <button className={classes.button} onClick={addRestaurantHandler}>Add Restrant</button>
        </div>

    );
}

export default CreateRestaurant;