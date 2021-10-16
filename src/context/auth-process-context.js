import React from 'react';

const AuthProcessContext = React.createContext({
    onSignIn: () => {},
    onSignUp: () => {}
});

export default AuthProcessContext;