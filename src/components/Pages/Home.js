import React, { useEffect, useState } from 'react';

import { listRestrants } from '../../graphql/queries';
import { createRestrant } from '../../graphql/mutations';
import { AmplifySignOut } from '@aws-amplify/ui-react';

import Storage from '@aws-amplify/storage';
import { API } from '@aws-amplify/api';
import { graphqlOperation } from '@aws-amplify/api-graphql';

import {v4 as uuid} from 'uuid';

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
          /*
          const restrantsState = await Promise.all(restrants.map(async (restrant) => {
              return {
                  id: restrant.id,
                  name: restrant.name,
                  logoUrl: logoUrl
              }
          }));
          console.log(restrantsState);
          setRestrants(restrantsState)
          */
        } catch (err) { console.log('error fetching restrants') }
    }

    /*
    async function fetchLogoUrl(bucket, region, key) {
        try {
            
        } catch (err) { console.log('error fetching images ')}
        const [, , keyWithoutPrefix] = /([^/]+\/){2}(.*)$/.exec(key) || key;
        
        const url = await Storage.get(keyWithoutPrefix, {bucket, region, })
    }
    */


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

            /*
            let file;

            const { name, type: mimeType } = selectedLogo;
            const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(name);

            const bucket = props.bucket_info.bucket_name;
            const region = props.bucket_info.bucket_region;
            const visibility = 'public';
            const { identityId } = await Auth.currentCredentials();

            const key = `${visibility}/${identityId}/${uuid()}${extension && '.'}${extension}`;

            file = {
                bucket,
                key,
                region,
                mimeType,
                localUri: selectedLogo,
            };

            await props.client.mutate({
                mutation: gql(createRestrant),
                variables: {
                    input: {
                        name: nameState,
                        logo: file,
                    }
                }
            })
            */
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

export default Home;