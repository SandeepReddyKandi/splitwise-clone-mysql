import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import Utils from "../utils";

import {connect} from "react-redux";
import UserBackendAPIService from "../services/UserBackendAPIService";

const ProtectedRoute = ({ userData, addUserData, history, children, ...rest}) => {
    // Access the token from userReducer
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const getUserInfo = () => {
        if (userData.token) {
            setUser(userData);
            setIsLoading(false);
        } else {
            UserBackendAPIService.getUserDetails().then(({data, success}) => {
                if (success) {
                    setUser(data);
                    addUserData(data);
                    setIsLoading(false);
                    localStorage.setItem('token', JSON.stringify(data.token));
                } else {
                    history.push('/login');
                }
            });
        }
    }

    useEffect( () => {
        getUserInfo();
    }, []);

    return !isLoading && user && children;
}


const mapStateToProps = (state) => {
    return {
        userData : state.userState.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUserData : (state) => {
            dispatch({
                type : 'ADD_USER',
                payload : state
            })
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute));


