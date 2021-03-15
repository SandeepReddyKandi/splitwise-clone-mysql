import React, {useEffect} from 'react';
import { useSelector, connect } from 'react-redux';
import '../dashboard.css'

const Invites = ()=>{
    const groupData = useSelector(state => {
        return {
            activities: state.allGroups, 
            token : state.auth.signupInfo.token
        }
    });

    const existingGroups = groupData.activities.existingGroups;
    const invites = groupData.activities.groupInvites;

    // console.log(invites);

    const acceptInvitation = (e)=>{
        const groupName = e.target.parentElement.parentElement.previousSibling.children[0].innerText;

    }

    const rejectInvitation = (e)=>{
        const groupName = e.target.parentElement.parentElement.previousSibling.children[0].innerText;
    }

    const deleteGroup = (e)=>{
        const groupName = e.target.parentElement.parentElement.previousSibling.children[0].innerText;
        
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
                        invites ?
                        (
                            (
                                <div>
                                    <table className="centered highlight expenses-list-table">
                                        <tbody>

                                            {/* list of invitatiosn */}
                                            {   
                                                invites.length ?
                                                (
                                                    invites.map((invite)=>{
                                                        return(
                                                            <tr className="left-align grey lighten-4" key={invites.id}>
                                                                <td className="grey-text text-darken-2">
                                                                    <h6>{invite.name}</h6>
                                                                </td>
                                                                <td className="left-align">
                                                                    <a class="btn-floating waves-light green add" onClick={acceptInvitation}><i class="material-icons">add</i></a>
                                                                    <span style={{marginLeft:"10px"}}></span>
                                                                    <a class="btn-floating waves-light red delete" onClick={rejectInvitation}><i class="material-icons">clear</i></a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                                :
                                                (
                                                    <div>Loading...</div>
                                                )
                                            }

                                            {/* list of already existing groups */}
                                            {   
                                                existingGroups.length ?
                                                (
                                                    existingGroups.map((invite)=>{
                                                        return(
                                                            <tr className="left-align" key={existingGroups.id}>
                                                                <td className="grey-text text-darken-2">
                                                                    <h6>{invite.name}</h6>
                                                                </td>
                                                                <td className="left-align">
                                                                    <a class="btn-floating waves-light red delete" onClick={deleteGroup}><i class="material-icons">clear</i></a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                                :
                                                (
                                                    <div>Loading...</div>
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

export default Invites;