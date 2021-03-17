import React, {useState, useEffect} from 'react';
import {useSelector, connect} from 'react-redux';
import '../dashboard.css'
import axios from 'axios';
import {toast} from "react-toastify";
import GroupBackendAPIService from "../../../services/GroupBackendAPIService";
import SearchComponent from "./SearchComponent";

const Invites = (props)=>{
    const [invitedGroups, setInvitedGroups] = useState(props.invitedGroups || []);
    const [acceptedGroups, setAcceptedGroups] = useState(props.acceptedGroups || []);

    useEffect(() => {
        GroupBackendAPIService.getAllGroups().then(({data, success})=>{
            console.log(data, success);
            if (success){
                props.addActiveGroups(data.acceptedGroups);
                props.addInvites(data.invitedGroups);
                setInvitedGroups(data.invitedGroups.map(group => {
                    return {
                        ...group,
                        show: true,
                    }
                }));
                setAcceptedGroups(data.acceptedGroups.map(group => {
                    return {
                        ...group,
                        show: true,
                    }
                }))
            } else {
                toast.error(data.reason);
            }
        })
    },[]);

    const acceptInvitation = (invite)=>{
        GroupBackendAPIService.createGroup(invite).then(({data, success})=>{
            if(success){
                toast.success(`Invite for the ${invite.name} accepted successfully!`)
                props.acceptGroupInvite([invite]);
                setInvitedGroups(invitedGroups.filter(group => group.id !== invite.id))
                setAcceptedGroups([...acceptedGroups, invite]);
            } else {
                toast.error(data.message);
            }
        })

    }

    const leaveGroup = (invite, isInvitedGroup)=>{
        GroupBackendAPIService.leaveGroup(invite).then(({data, success})=>{
            if(success){
                toast.info(`Successfully Left the group ${invite.name}!`);
                if (isInvitedGroup) {
                    props.removeInvites(invite);
                    setInvitedGroups(invitedGroups.filter(group => group.id !== invite.id))
                } else {
                    props.removeActiveGroups(invite);
                    setAcceptedGroups(acceptedGroups.filter(group => group.id !== invite.id))
                }
            } else {
                toast.error(data.message);
            }
        })
    }


    const searchGroup = (searchString) => {
        setAcceptedGroups([...acceptedGroups.map(group => {
            return {
                ...group,
                show: group.name.toLowerCase().includes(searchString),
            }
        })]);
        setInvitedGroups([...invitedGroups.map(group => {
            return {
                ...group,
                show: group.name.toLowerCase().includes(searchString),
            }
        })])

    }

    return(
        <div className="container user-groups">
            <div className="row">
                <div className="col m8 z-depth-1">
                    <div className="header row valign-wrapper grey lighten-2">
                        <div className="col m12 valign-wrapper">
                            <span className="center-align">My Groups</span>
                        </div>
                    </div>
                    <div>
                        <SearchComponent searchGroup={searchGroup}/>
                        <table className="centered highlight expenses-list-table">
                            <tbody>
                            {
                                invitedGroups.filter(group => group.show).map((invite) => {
                                    return (
                                        <tr className="left-align grey lighten-4" key={props.invitedGroups.id}>
                                            <td className="grey-text text-darken-2">
                                                <h6>{invite.name}</h6>
                                            </td>
                                            <td className="left-align">
                                                <a
                                                    className="btn-floating waves-light green add"
                                                    onClick={() => acceptInvitation(invite)}
                                                >
                                                    <i className="material-icons">add</i>
                                                </a>
                                                <span style={{marginLeft: "10px"}}/>
                                                <a
                                                    className="btn-floating waves-light red delete"
                                                    onClick={() => leaveGroup(invite, true)}
                                                >
                                                    <i className="material-icons">clear</i>
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            {
                                acceptedGroups.filter(group => group.show).map((invite) => {
                                    return (
                                        <tr className="left-align" key={props.activeGroups.id}>
                                            <td className="grey-text text-darken-2">
                                                <h6>{invite.name}</h6>
                                            </td>
                                            <td className="left-align">
                                                <a
                                                   className="btn-floating waves-light red delete"
                                                   onClick={() => leaveGroup(invite)}
                                                >
                                                    <i className="material-icons">clear</i>
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        activeGroups: state.userState.activeGroups.map(group => {
            return {
                ...group,
                show: true,
            }
        }),
        invitedGroups: state.userState.invitedGroups.map(group => {
            return {
                ...group,
                show: true,
            }
        })
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        addActiveGroups : (state)=>{
            dispatch({
                type : 'ADD_ACTIVE_GROUPS',
                payload: state
            });
        },
        acceptGroupInvite : (state)=>{
            dispatch({
                type : 'ACCEPT_GROUP_INVITE',
                payload: state
            });
        },
        addInvites: (state)=>{
            dispatch({
                type : 'ADD_INVITES',
                payload: state
            })
        },
        removeActiveGroups : (state)=>{
            dispatch({
                type : 'REMOVE_ACTIVE_GROUPS',
                payload: state
            });
        },
        removeInvites: (state)=>{
            dispatch({
                type : 'REMOVE_INVITES',
                payload: state
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invites);
