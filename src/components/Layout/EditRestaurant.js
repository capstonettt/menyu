import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';

import Storage from '@aws-amplify/storage';
import API from '@aws-amplify/api';
import { graphqlOperation } from '@aws-amplify/api-graphql';

import { updateRestaurant } from '../../graphql/mutations';

import { v4 as uuid } from 'uuid';

import classes from './EditRestaurant.module.css';

const EditRestaurant = (props) => {
    const [logoEditorOpened, setLogoEditorOpened] = useState(false);
    const [nameEditorOpened, setNameEditorOpened] = useState(false);

    const [nameEditted, setNameEditted] = useState('');
    const [logoEditted, setLogoEditted] = useState(null);

    console.log('rendering EditRestaurant')

    useEffect(() => {
    }, [])

    const EditNameButtonClickHandler = () => {
        setNameEditorOpened(true);
    }

    const EditLogoButtonClickHandler = () => {
        setLogoEditorOpened(true);
    }

    const NameChangeHandler = (event) => {
        setNameEditted(event.target.value);
    }

    const LogoChangeHandler = (event) => {
        setLogoEditted(event.target.files[0]);
    }

    const onNameEditConfirm = async() => {
        if (nameEditted === '') {
            return
        }
        const inputData = { id: props.restaurant.id, name: nameEditted }
        console.log('onNameEditConfirm:', nameEditted);
        console.log('restaurant id:', props.restaurant.id)
        // update 
        try {
            await API.graphql(graphqlOperation(updateRestaurant, { input: inputData }))
            props.restaurantSetter((prevRestaurant) => {
               return { ...prevRestaurant, name: nameEditted}
            })
            console.log('onNameEditConfirm Finished');
        } catch (err) {
            console.log('error updating restaurant name:', err);
        }

        setNameEditorOpened(false);
    }
    const onLogoEditConfirm = async() => {
        if (!logoEditted) {
            return
        }
        const extension = logoEditted.name.split(".")[1];
        const { type: mimeType } = logoEditted;
        const key = `${uuid()}${props.restaurant.name}.${extension}`;
        const url = `https://${props.bucket}.s3.${props.region}.amazonaws.com/public/${key}`;
        const inputData = { id: props.restaurant.id, logo: url }
        //delete prev logo from bucket
        try {
            const deletedKey = props.restaurant.logo.replace(`https://${props.bucket}.s3.${props.region}.amazonaws.com/public/`, '');
            await Storage.remove(deletedKey);
        } catch (err) {
            console.log('error deleting logo:', err);
        }
        // update 
        try {
            await Storage.put(key, logoEditted, {contentType: mimeType});
            await API.graphql(graphqlOperation(updateRestaurant, { input: inputData }))
            props.restaurantSetter((prevRestaurant) => {
                //return {name: prevRestaurant.name, logo: url}
                return { ...prevRestaurant, logo: url }
            })
        } catch (err) {
            console.log('error updating restaurant logo:', err);
        }

        setLogoEditorOpened(false);
    }

    const onNameEditCancel = () => {
        setNameEditorOpened(false);
        setNameEditted('');
    }
    const onLogoEditCancel = () => {
        setLogoEditorOpened(false);
        setLogoEditted(null);
    }
    
    return (
        <div>
            {nameEditorOpened && (
                <div>
                    <div className={classes.backdrop} onClick={onNameEditCancel} />
                    <div className={classes.editorContainer}>
                        Restaurant Name: <input type='text' placeholder={props.restaurant.name} onChange={NameChangeHandler} />
                        <button onClick={onNameEditConfirm}>Confirm</button>
                        <button onClick={onNameEditCancel}>Cancel</button>
                    </div>
                </div>
            )}
            {logoEditorOpened && (
                <div>
                    <div className={classes.backdrop} onClick={onLogoEditCancel} />
                    <div className={classes.editorContainer}>
                        Logo: <input type='file' onChange={LogoChangeHandler} />
                        <button onClick={onLogoEditConfirm}>Confirm</button>
                        <button onClick={onLogoEditCancel}>Cancel</button>
                    </div>
                </div>
            )}
            <div>
                <div>
                    Your restaurant : {props.restaurant.name}
                </div>
                <div>
                    <button onClick={EditNameButtonClickHandler}>edit</button>
                </div>
                <div>
                    Logo : 
                    <img src={props.restaurant.logo}></img>
                </div>
                <div>
                    <button onClick={EditLogoButtonClickHandler}>edit</button>
                </div>
            </div>

        </div>
    );
}

export default EditRestaurant;