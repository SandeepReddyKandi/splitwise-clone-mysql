import React, { Component } from "react";
import { connect } from "react-redux";
import letter from "../../letter.webp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateNewGroup extends Component {
	state = {
		groupName: "",
		name: "",
		email:""
	}

	handleChange = (e)=>{
		this.setState({
			[e.target.id] : e.target.value
		});
	}	

 	addGroup = (e)=>{
		e.preventDefault();

		console.log(this.state);

		if(this.state.groupName === ''){
			toast.error("Fill the Groupname");
		}else if(this.state.name === ''){
			toast.error("Fill name");
		}else if(this.state.email === ''){
			toast.error("Fill email");
		}else{
			this.props.addGroup(this.state);
			toast.success("User added!");
		}
	}

	render() {
		return (
			<div className="container row new-group">
				<div className="col m4 center-align" id="groupLeftSide">
					<img className="responsive-img" src={letter} alt="letter"/>
					<div className="change-avatar center-align">
						<p>change your avatar</p> 
						<input className="center-align" type="file"/>
					</div>
				</div>
				<div className="col m7" id="groupRightSide">
					<h5 className="grey-text">start a new group</h5>
					<div className="row group-name">
						<div className="input-field col m12">
							<input id="groupName" type="text" className="validate" onChange={this.handleChange} required/>
							<label htmlFor="groupName">My group shall be called</label>
						</div>
					</div>
					<div className="row group-members">
						<p className="grey-text">Group members</p> 
						<div className="row group-member valign-wrapper">
							<div className="col m12" id="usersList">
								<span className="center-align valign-wrapper">
									<img className="responsive-img" src="https://img.icons8.com/nolan/64/user-male-circle.png"/>
									({this.props.userInfo.name}) ({this.props.userInfo.email})
								</span>
							</div>
						</div>
						{
							this.props.getUsersInfo.length > 0 ?
							(
								this.props.getUsersInfo.map((user)=>{
									return(
										<div className="row group-member valign-wrapper">
											<div className="col m12" id="usersList">
												<span className="center-align valign-wrapper">
													<img className="responsive-img" src="https://img.icons8.com/nolan/64/user-male-circle.png"/>
													({user.name}) ({user.email})
												</span>
											</div>
										</div>
									)
								})
							):
							(
								null
							)
						}
					</div>
					<div className="row" id="addGroup">
						<form className="grey lighten-3 center-align">
							<div className="row">
								<div className="input-field col s6">
									<input id="name" type="text" className="validate" onChange={this.handleChange}/>
									<label htmlFor="name">name</label>
								</div>
								<div className="input-field col s6">
									<input id="email" type="email" className="validate" onChange={this.handleChange}/>
									<label htmlFor="email">email</label>
								</div>
							</div>
							<button className="btn orange darken-3" onClick={this.addGroup}>Add a person</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state)=>{
    return {
		// this user info
        userInfo : state.auth.signupInfo,
		getUsersInfo : state.newGroup.users
    }
}

const mapDispatchToProps = (dispatch)=>{
	return {
		addGroup : (state)=>{
			dispatch({
				type : 'ADD_USER',
				payload : state
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewGroup);
