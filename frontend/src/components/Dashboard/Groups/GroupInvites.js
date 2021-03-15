import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import '../dashboard.css'

const Invites = ()=>{
    const [searchString, setSearchString] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    // let searchString = '';
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
    const handleSearch = (e) => {
        setSearchString(e.target.value);
        if (!e.target.value) {
            setSearchResult([]);
        } else {
            searchGroup();
        }
    }
    const searchGroup = () => {
        const updatedSearchResult = [...invitedGroups, ...activeGroups].filter(group => {
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
                        invitedGroups ?
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
                                                invitedGroups.length > 0 && searchResult.length === 0 &&
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
                                                )
                                            }
                                            {
                                                searchResult.length > 0 ?
                                                (
                                                    searchResult.map((invite)=>{
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

                                                )
                                                :
                                                (
                                                    activeGroups.length > 0 && searchResult.length === 0 ?
                                                    (
                                                        activeGroups.map((invite)=>{
                                                        return(
                                                                <tr className="left-align" key={activeGroups.id}>
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

export default Invites;
