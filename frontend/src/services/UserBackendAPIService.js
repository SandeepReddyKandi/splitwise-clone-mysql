import axios from "axios";
import {toast} from "react-toastify";

const API_ENDPOINT = `${process.env.REACT_APP_ENDPOINT}/user`;

class UserBackendAPIService {
    static getToken = () => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;

    static async getAllUsers() {
        const url = `${API_ENDPOINT}/all`;
        try {
            const response = await axios.get(url, {
                headers: {
                    authorization: `Bearer ${this.getToken()}`
                }
            })
            return response.data.map(user => {
                return {
                    ...user,
                    imageURL: user.imageURL ? `${process.env.REACT_APP_ENDPOINT}/static/${user.imageURL}` : null,
                }
            });
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
                    authorization: `Bearer ${this.getToken()}`
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
                    authorization: `Bearer ${this.getToken()}`
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
                    authorization: `Bearer ${this.getToken()}`
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
        // if token is not present return the error state
        if (!this.getToken()) {
            return {
                success: false,
                data: {},
            }
        }

        try {
            const {data} = await axios.post(url,
                {
                    ...payload
                },{
                    headers: {
                        authorization: `Bearer ${this.getToken()}`
                    }
            });
            return {
                data: {
                    ...data.data,
                    imageURL: data.data.imageURL ? `${process.env.REACT_APP_ENDPOINT}/static/${data.data.imageURL}` : null,
                },
                success: true,
            };
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
                        authorization: `Bearer ${this.getToken()}`,
                        contentType: 'multipart/form-data',
                    }
                });
            return {
                success: true,
                data: {
                    ...response.data,
                    imageURL: response.data.imageURL ? `${process.env.REACT_APP_ENDPOINT}/static/${response.data.imageURL}` : null,
                }
            };
        } catch (e) {
            toast.error('Something went wrong while getting user info!');
            return {
                success: false,
                data: {},
            }
        }
    }
    static async login(payload) {
        try {
            const {data} = await axios.post(`${API_ENDPOINT}/login/`, {
                ...payload
            });
            if (data.reason) {
                return {
                    data,
                    success: false
                }
            }
            localStorage.setItem('token', JSON.stringify(data.data.token));
            return {
                data: {
                    ...data.data,
                    imageURL: data.data.imageURL ? `${process.env.REACT_APP_ENDPOINT}/static/${data.data.imageURL}` : null,
                },
                success: true,
            }
        } catch (e) {
            toast.error('Something went wrong while Logging you in!');
            return {
                success: false,
                data: {},
            }
        }
    }
}

export default UserBackendAPIService;
