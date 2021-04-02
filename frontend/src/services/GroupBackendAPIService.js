import axios from "axios";
import {toast} from "react-toastify";

const API_ENDPOINT = `${process.env.REACT_APP_ENDPOINT}/groups`

class GroupBackendAPIService {
    static getToken = () => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;

    static async getAllGroups() {
        const url = `${API_ENDPOINT}/all`;
        try {
            const response = await axios.get(url, {
                headers: {
                    authorization: `Bearer ${this.getToken()}`
                }
            })
            return response.data;
        } catch (e) {
            toast.error('Something went wrong while getting all groups!');
            return {
                success: false,
            }
        }
    }

    static async acceptInvitation(invite) {
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

    static async createGroup(payload) {
        try {
            const {data} = await axios.post(`${API_ENDPOINT}/create`, {
                ...payload,
            }, {
                headers: {
                    authorization: `Bearer ${this.getToken()}`,
                }
            })
            if (data.reason) {
                return {
                    data,
                    success: false
                }
            }
            return {
                data: {
                    ...data.data,
                },
                success: true
            }
        } catch (e) {
            return {
                data: {
                    reason: 'Something went wrong while creating new group',
                },
                success: false
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
            // console.log(response);
            return response;
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

}

export default GroupBackendAPIService;
