import React, {useState, useEffect} from 'react';
import {Redirect, Route} from "react-router-dom";
import Utils from "../utils";

const ProtectedRoute = ({ Component, ...rest}) => {
    // Access the token from userReducer
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    const getUserInfo = () => {
        Utils.getLoggedInUser().then(({data, success}) => {
            if (success) {
                setUser(data);
                localStorage.setItem('token', JSON.stringify(data.token));
            } else {
               setUser(null);
            }
            setIsLoading(false);
        });
    }

    useEffect( () => {
        getUserInfo();
    }, []);

    return !isLoading ? (
        <Route {...rest} render={
            props => {
               return user ? <Component /> : <Redirect to={'/login'} />
            }
        } />
    ) : null;
}

export default ProtectedRoute;

