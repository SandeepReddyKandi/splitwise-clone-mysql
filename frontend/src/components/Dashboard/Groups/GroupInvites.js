import React, {useState, useEffect} from 'react';
import {useSelector, connect} from 'react-redux';
import '../dashboard.css'
import axios from 'axios';
import {toast} from "react-toastify";

const Invites = (props)=>{
    const [searchString, setSearchString] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('token'));
        axios.get('http://localhost:8000/groups/all',{
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res=>{
            if(res.data.success){
                props.addActiveGroups(res.data.data.acceptedGroups);
                props.addInvites(res.data.data.invitedGroups);
            }else{
                console.log(res.data)
            }
        })
    },[]);

    const acceptInvitation = (invite)=>{
        if (!invite.id) {
            toast.error('Please select a group to accept invitation!');
        }
        const token = JSON.parse(localStorage.getItem('token'));
        axios.put(`http://localhost:8000/groups/accept-invite/${invite.id}`, null,{
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res=>{
            if(res.data.success){
                toast.success(`Invite for the ${invite.name} accepted successfully!`)
                props.acceptGroupInvite([invite]);
            } else {
                toast.error(res.data.message);
            }
        })

    }

    const leaveGroup = (invite, isInvitedGroup)=>{
        if (!invite.id) {
            toast.error('Please select a group to leave!');
        }
        const token = JSON.parse(localStorage.getItem('token'));
        axios.put(`http://localhost:8000/groups/leave/${invite.id}`,null,{
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res=>{
            if(res.data.success){
                toast.success(`Invite for the ${invite.name} accepted successfully!`);
                if (isInvitedGroup) {
                    props.removeInvites(invite);
                } else {
                    props.removeActiveGroups(invite);
                }
            }else{
                toast.error(res.data.message);
            }
        })
    }

    const handleSearch = (e) => {
        setSearchString(e.target.value);
        if (!e.target.value) {
            setSearchResult([]);
        } else {
            searchGroup();
        }
    }

    const searchGroup = () => {
        const updatedSearchResult = [...props.invitedGroups, ...props.activeGroups].filter(group => {
            return group.name.toLowerCase().includes(searchString);
        });
        setSearchResult(updatedSearchResult);
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
                    {
                        props.invitedGroups ?
                        (
                            (
                                <div>
                                    <div className="search-box center-align">
                                        <div className="row center-align">
                                            <div className="input-field col s9">
                                                <input
                                                    id="groupName"
                                                    type="text"
                                                    className="validate"
                                                    value={searchString}
                                                    onChange={handleSearch}
                                                />
                                                <label htmlFor="groupName">Group Name</label>
                                            </div>
                                            <div className="col s3 valign-wrapper">
                                                <a className="btn-floating waves-light blue add" onClick={searchGroup}><i class="material-icons">search</i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="centered highlight expenses-list-table">
                                        <tbody>
                                            {
                                                props.invitedGroups.length > 0 && searchResult.length === 0 &&
                                                (
                                                    props.invitedGroups.map((invite)=>{
                                                        return(
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
                                                                    <span style={{marginLeft:"10px"}}/>
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
                                                )
                                            }
                                            {
                                                searchResult.length > 0 ?
                                                (
                                                    searchResult.map((invite)=>{
                                                        return(
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
                                                                    <span style={{marginLeft:"10px"}}/>
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

                                                )
                                                :
                                                (
                                                    props.activeGroups.length > 0 && searchResult.length === 0 ?
                                                    (
                                                        props.activeGroups.map((invite, index)=>{
                                                        return(
                                                                <tr className="left-align" key={props.activeGroups.id}>
                                                                    <td className="grey-text text-darken-2">
                                                                        <h6>{invite.name}</h6>
                                                                    </td>
                                                                    <td className="left-align">
                                                                        <a class="btn-floating waves-light red delete" onClick={() => leaveGroup(invite)}><i class="material-icons">clear</i></a>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    )
                                                    :
                                                    (
                                                        <div>
                                                            <h6>You are not in any group</h6>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        ):
                        (
                            <div className="row container">
                                <div className="col m12 s12">
                                    No recent activity
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        activeGroups: state.userState.activeGroups,
        invitedGroups: state.userState.invitedGroups
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
