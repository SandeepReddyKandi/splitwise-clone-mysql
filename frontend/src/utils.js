import axios from "axios";
import React from "react";
import {toast} from "react-toastify";

class Utils {

    static async getLoggedInUser() {
        const token = JSON.parse(localStorage.getItem('token'));
        let userData = {};
        try {
            const {data} = await axios.post(`http://18.219.242.1:8000/user/me`, null,  {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });
            if (data.success) {
                userData = data;
            }
            return userData;
        } catch (e) {
            toast.error('Something went wrong, please log in again!')
            return userData;
        }
    }

}

export default Utils;
