import axios from "axios";
import {toast} from "react-toastify";

class UserBackendAPIService {
    static API_ENDPOINT = 'http://18.219.242.1:8000/user';
    static TOKEN = JSON.parse(localStorage.getItem('token'));

    static async getAllUsers() {
        const url = `${this.API_ENDPOINT}/all`;
        try {
            const response = await axios.get(url, {
                headers: {
                    authorization: `Bearer ${this.TOKEN}`
                }
            })
            return response.data;
        } catch (e) {
            // toast.error('Something went wrong while getting all users!');
            return {
                success: false,
            }
        }
    }

    static async createGroup(invite) {
        if (!invite.id) {
            toast.error('Please select a group to accept invitation!');
        }
        const url = `${this.API_ENDPOINT}/accept-invite/${invite.id}`;
        try {
            const response = await axios.put(url, null,{
                headers: {
                    authorization: `Bearer ${this.TOKEN}`
                }
            })
            return response.data;
        } catch (e) {
            toast.error('Something went wrong while creating group!');
            return {
                success: false,
            }
        }
    }

    static async leaveGroup(invite) {
        if (!invite.id) {
            toast.error('Please select a group to accept invitation!');
        }
        const url = `${this.API_ENDPOINT}/leave/${invite.id}`;
        try {
            const response = await axios.put(url, null,{
                headers: {
                    authorization: `Bearer ${this.TOKEN}`
                }
            });
            return response.data;
        } catch (e) {
            toast.error('Something went wrong while leaving group!');
            return {
                success: false,
            }
        }
    }

    static async getGroupInfo(groupId) {
        if (!groupId) {
            toast.error('Cannot get group info without group Id!');
        }
        const url = `${this.API_ENDPOINT}/${groupId}`;
        try {
            const response = await axios.get(url,{
                headers: {
                    authorization: `Bearer ${this.TOKEN}`
                }
            });
            return response.data;
        } catch (e) {
            toast.error('Something went wrong while getting group info!');
            return {
                success: false,
            }
        }
    }

    static async getUserDetails(payload) {
        const url = `${this.API_ENDPOINT}/me`;
        try {
            const response = await axios.post(url,
                {
                    ...payload
                },{
                    headers: {
                        authorization: `Bearer ${this.TOKEN}`
                    }
            });
            return response.data;
        } catch (e) {
            return {
                success: false,
                data: {},
            }
        }
    }

    static async updateUserDetails(payload) {
        const url = `${this.API_ENDPOINT}/update`;
        try {
            const response = await axios.put(url,
                {
                    ...payload
                },{
                    headers: {
                        authorization: `Bearer ${this.TOKEN}`
                    }
                });
            return response.data;
        } catch (e) {
            toast.error('Something went wrong while getting user info!');
            return {
                success: false,
            }
        }
    }

}

export default UserBackendAPIService;
