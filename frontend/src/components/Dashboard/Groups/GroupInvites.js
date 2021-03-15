import React from 'react';
import {useSelector} from 'react-redux';
import '../dashboard.css'

const Invites = ()=>{
    const {activeGroups, invitedGroups, token } = useSelector(state => {
        return {
            activeGroups: state.userState.activeGroups,
            invitedGroups: state.userState.invitedGroups,
            token : state.userState.token
        }
    });

    const acceptInvitation = (invite)=>{
    }

    const rejectInvitation = (invite)=>{
    }

    const deleteGroup = (invite)=>{

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
                        invitedGroups ?
                        (
                            (
                                <div>
                                    <table className="centered highlight expenses-list-table">
                                        <tbody>
                                            {
                                                invitedGroups.length ?
                                                (
                                                    invitedGroups.map((invite)=>{
                                                        return(
                                                            <tr className="left-align grey lighten-4" key={invitedGroups.id}>
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
                                                                        onClick={() => rejectInvitation(invite)}
                                                                    >
                                                                        <i className="material-icons">clear</i>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                ): <div>Loading...</div>
                                            }{
                                                activeGroups.length ? activeGroups.map((invite)=>{
                                                    return(
                                                        <tr className="left-align" key={activeGroups.id}>
                                                            <td className="grey-text text-darken-2">
                                                                <h6>{invite.name}</h6>
                                                            </td>
                                                            <td className="left-align">
                                                                <a
                                                                    className="btn-floating waves-light red delete"
                                                                    onClick={() => deleteGroup(invite)}
                                                                >
                                                                    <i className="material-icons">clear</i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : <div>Loading...</div>
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

export default Invites;
