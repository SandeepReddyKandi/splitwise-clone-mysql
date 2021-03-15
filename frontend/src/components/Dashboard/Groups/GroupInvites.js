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
    let searchedGroup ='';

    const acceptInvitation = (e)=>{
        const groupName = e.target.parentElement.parentElement.previousSibling.children[0].innerText;
    }

    const rejectInvitation = (e)=>{
        const groupName = e.target.parentElement.parentElement.previousSibling.children[0].innerText;
    }

    const deleteGroup = (e)=>{
        const groupName = e.target.parentElement.parentElement.previousSibling.children[0].innerText;
    }

    const searchGroup = (e)=>{
        searchedGroup = e.target.parentElement.parentElement.parentElement.children[0].children[0].value;
        console.log(searchedGroup);
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
                                    <div className="search-box center-align">
                                        <div className="row center-align">
                                            <div className="input-field col s9">
                                                <input id="groupName" type="text" className="validate"/>
                                                <label for="groupName">Group Name</label>
                                            </div>
                                            <div className="col s3 valign-wrapper">
                                                <a className="btn-floating waves-light blue add" onClick={searchGroup}><i class="material-icons">search</i></a>
                                            </div>
                                        </div>
                                    </div>
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
                                                searchedGroup !== '' ?
                                                (    
                                                    <tr className="left-align">
                                                        <td className="grey-text text-darken-2">
                                                            <h6>{searchedGroup}</h6>
                                                        </td>
                                                        <td className="left-align">
                                                            <a class="btn-floating waves-light red delete" onClick={deleteGroup}><i class="material-icons">clear</i></a>
                                                        </td>
                                                    </tr>
                                                        
                                                )
                                                :
                                                (
                                                    existingGroups.length > 0 ?
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

const mapDispatchToProps = (dispatch)=>{
    return{
        
    }
}

export default Invites;