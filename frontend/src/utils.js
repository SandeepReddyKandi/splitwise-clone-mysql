import axios from "axios";
import React from "react";
import {toast} from "react-toastify";

const API_ENDPOINT = process.env.REACT_APP_ENDPOINT;

class Utils {

    static async getLoggedInUser() {
        const token = JSON.parse(localStorage.getItem('token'));
        let userData = {};
        try {
            const {data} = await axios.post(`${API_ENDPOINT}/user/me`, null,  {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });
            if (data.success) {
                userData = data;
            }
            return userData;
        } catch (e) {
            return userData;
        }
    }

}

export default Utils;
