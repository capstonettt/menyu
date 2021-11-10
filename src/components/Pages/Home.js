import React, { useEffect, useState } from 'react';

import { listRestaurants } from '../../graphql/queries';
import { getRestaurant } from '../../graphql/queries';

import { API } from '@aws-amplify/api';
import { graphqlOperation } from '@aws-amplify/api-graphql';

import {v4 as uuid} from 'uuid';

import classes from './Home.module.css'
import HomeHeader from '../Layout/HomeHeader';
import Footer from '../Layout/Footer';


import CreateRestaurant from '../Layout/CreateRestaurant';
import EditMenu from '../Layout/EditMenu';
import EditRestaurant from '../Layout/EditRestaurant';

const Home = (props) => {
    const bucket = props.bucket_info.bucket_name;
    const region = props.bucket_info.bucket_region;

    const [restaurant, setRestaurant] = useState({id: '', name: '', logo: '', categories: {items: []}});

    console.log('rendering Home');

    useEffect(() => {
        console.log("useEffect of Home called")
        fetchRestaurants()
    }, [])

    async function fetchRestaurants() {
        try {
          const restrantsData = await API.graphql(graphqlOperation(listRestaurants))
          const restrants = restrantsData.data.listRestaurants.items
          const restrantByGetData = await API.graphql(graphqlOperation(getRestaurant, {id: restrants[0].id}));
          console.log("Restaurant by Get", restrantByGetData);
          console.log('restrant id:', restrants[0].id)
          console.log("from fetchRestrant");
          console.log(restrants);
          setRestaurant(restrantByGetData.data.getRestaurant);
        } catch (err) {
            console.log('error fetching restrants', err);
            setRestaurant(null);
        }
    }

    return (
        <div className={classes.container}>
            <HomeHeader />
            <div>Hello, {props.user.username}</div>
            {
                (restaurant) ? (
                    <div>
                        <EditRestaurant bucket={bucket} region={region} restaurant={restaurant} restaurantSetter={setRestaurant}/>
                        <EditMenu bucket={bucket} region={region} restaurant={restaurant} restaurantSetter={setRestaurant} />
                    </div>
                ) : (
                    <CreateRestaurant bucket={bucket} region={region} restaurantSetter={setRestaurant}/>
                )
            }
            <Footer />
        </div>
    );
}

export default Home;

/*
const Home = (props) => {
    const [nameState, setNameState] = useState('');
    const [selectedLogo, setSelectedLogo] = useState(null);

    const [restrants, setRestrants] = useState([]);

    const bucket = props.bucket_info.bucket_name;
    const region = props.bucket_info.bucket_region;

    useEffect(() => {
        fetchRestrants()
    }, [])


    async function fetchRestrants() {
        try {
          const restrantsData = await API.graphql(graphqlOperation(listRestrants))
          const restrants = restrantsData.data.listRestrants.items
          console.log("from fetchRestrant");
          console.log(restrants);
          setRestrants(restrants);
        } catch (err) { console.log('error fetching restrants') }
    }



    async function addRestrantHandler() {
        if (!nameState || !selectedLogo) return
        
        //first add image to s3
        const extension = selectedLogo.name.split(".")[1];
        const { type: mimeType } = selectedLogo;
        const key = `${uuid()}${nameState}.${extension}`
        const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
        const inputData = { name: nameState, image: url }
        try {
            await Storage.put(key, selectedLogo, {contentType: mimeType})
            await API.graphql(graphqlOperation(createRestrant, { input: inputData }))

            setNameState('');
            setSelectedLogo(null);
            setRestrants(() => {
                return [...restrants, {name: nameState, image: url}]
            })

        } catch (err) {
            console.log('error creating restrants:', err);
        }
    }


    const nameChangeHandler = (event) => {
        event.preventDefault();
        setNameState(event.target.value);
    }

    const logoChangeHandler = (event) => {
        setSelectedLogo(event.target.files[0]);
    }



    return (
        <div>
            <div>Hello, {props.user.username}</div>
                <div>
                    <input type='text' value={nameState} onChange={nameChangeHandler}/>
                </div>
                <div>
                    <input type='file' onChange={logoChangeHandler} accept="image/png, image/jpeg"/>
                </div>
                <button onClick={addRestrantHandler}>Add Restrant</button>
                {
                    restrants.map((restrant, index) => (
                        <div key={restrant.id ? restrant.id : index}>
                            <p>{restrant.name}</p>
                            <img src={restrant.image}></img>
                        </div>
                    ))
                }
                <AmplifySignOut />
        </div>
    );
}
*/