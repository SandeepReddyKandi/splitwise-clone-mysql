import axios from "axios";
import {toast} from "react-toastify";

const API_ENDPOINT = `${process.env.REACT_APP_ENDPOINT}/user`;

class UserBackendAPIService {
    static TOKEN = JSON.parse(localStorage.getItem('token'));

    static async getAllUsers() {
        const url = `${API_ENDPOINT}/all`;
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
        const url = `${API_ENDPOINT}/accept-invite/${invite.id}`;
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
        const url = `${API_ENDPOINT}/leave/${invite.id}`;
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
        const url = `${API_ENDPOINT}/${groupId}`;
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
        const url = `${API_ENDPOINT}/me`;
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
        const url = `${API_ENDPOINT}/update`;
        try {
            const response = await axios.put(url,
                payload,
                {
                    headers: {
                        authorization: `Bearer ${this.TOKEN}`,
                        contentType: 'multipart/form-data',
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
