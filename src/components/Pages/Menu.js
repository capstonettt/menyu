import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import API from '@aws-amplify/api';
import { graphqlOperation } from '@aws-amplify/api-graphql';

const Menu = () => {
    /*
    const params = useParams();

    const [restrantLogo, setRestrantLogo] = useState(null);

    useEffect(() => {
        fetchRestrant();
    }, [])

    const fetchRestrant = async () => {
        try {
          const restrantData = await API.graphql({
              query: getRestrant,
              variables: {id: params.restrantId},
              authMode: 'API_KEY'
          });
          setRestrantLogo(restrantData.data.getRestrant.image)
          console.log("from fetchRestrant");
          console.log(restrantData);
        } catch(err) {
            console.log('error fetching restrants from menu:', err)
        }

    }

    console.log(params.restrantId);

    */
    return (
        <div>
            hello this is menu
        </div>
    )
}

export default Menu;