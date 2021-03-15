import React, { Component } from "react";
import { connect } from "react-redux";
import letter from "../../letter.webp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

class CreateNewGroup extends Component {
	state = {
		groupName: "",
		name: "",
		email:"",
		userIds: [],
		completeUserList: [],
		selectedPerson: '',
		userIdToNameMap: {},
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id] : e.target.value
		});
	}
	componentDidMount() {
		console.log(this.props.userInfo, `Bearer ${this.props.userInfo.token}`)
		axios.get('http://localhost:8000/user/all', {
			headers: {
				authorization: `Bearer ${this.props.userInfo.token}`,
			}
		}).then(res => {
			if (res.data.success) {
				this.setState({
					...this.state,
					completeUserList: res.data.data.map(user => {
						return {
							label: user.name,
							id: user.id,
							email: user.email,
						}
					}),
				})
			} else {
				toast.error(res.data.message);
			}
		})
	}

	// here we are submitting the store data to db
	createNewGroup = (e) => {
		e.preventDefault();
		if (this.state.groupName === '') {
			toast.error("Please add a name to your group");
		} else {
			axios.post('http://localhost:8000/groups/create', {
				name: this.state.groupName,
				invitedUsers: this.state.userIds.map(user => user.id),
			}, {
				headers: {
					authorization: `Bearer ${this.props.userInfo.token}`,
				}
			}).then((res) => {
				if (res.data.success) {
					this.props.addAPersonToGroup(this.state);
					toast.success(`Group "${this.state.groupName}" has been created successfully!`);
				} else {
					toast.error(res.data.message);
				}
			})
		}
	}

 	addAPersonToGroup = () => {
		console.log(this.state.selectedPerson, this.state.userIds);
		 this.setState({
			 ...this.state,
			 userIds: [...this.state.userIds, this.state.selectedPerson],
			 selectedPerson: '',
		 });
	}

	render() {
		console.log(this.state.userIds)
		return (
			<div className="container row new-group">
				<div className="col m4 center-align" id="groupLeftSide">
					<img className="responsive-img" src={letter} alt="letter"/>
					<div className="change-avatar center-align">
						<p>Change Group Image</p>
						<input className="center-align" type="file"/>
					</div>
				</div>
				<div className="col m7" id="groupRightSide">
					<h5 className="grey-text">Start a new group</h5>
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
									<img className="responsive-img" src="https://img.icons8.com/nolan/64/user-male-circle.png" alt={'i'}/>
									({this.props.userInfo.name}) ({this.props.userInfo.email})
								</span>
							</div>
						</div>
						{
							this.state.userIds.length > 0 &&
							(
								this.state.userIds.map((user)=>{
									return(
										<div className="row group-member valign-wrapper">
											<div className="col m12" id="usersList">
												<span className="center-align valign-wrapper">
													<img
														className="responsive-img"
														src="https://img.icons8.com/nolan/64/user-male-circle.png"
														alt=""
													/>
													({user.name}) ({user.email})
												</span>
											</div>
										</div>
									)
								})
							)
						}
					</div>
					<div className="row" id="addAPersonToGroup">
						<select
							value={this.state.selectedPerson}
							name={'selectAPerson'}
							onChange={(value) => {
								this.setState({
									...this.state,
									selectedPerson: {
										name: value.target.options[value.target.selectedIndex].text,
										id: value.target.options[value.target.selectedIndex].value,
										email: value.target.options[value.target.selectedIndex].id
									}})
							}}
						>
							{
								this.state.completeUserList.map(user => {
									return (
										<option value={user.value} id={user.email}>{user.label}</option>
									)
								})
							}
						</select>
						<button className="btn orange darken-3" onClick={this.addAPersonToGroup}>Add a person</button>
					</div>
					<div className="row">
						<button className="btn btn-large green darken-1" onClick={this.createNewGroup}>Create Group</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state)=>{
    return {
        userInfo : state.userState.user,
    }
}

const mapDispatchToProps = (dispatch)=>{
	return {
		addAPersonToGroup : (state)=>{
			dispatch({
				type : 'ADD_USER',
				payload : state
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewGroup);
