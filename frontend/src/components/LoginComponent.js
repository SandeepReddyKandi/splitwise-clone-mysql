import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import "./login.css";
import letter from "../letter.webp";
import {connect} from "react-redux";
import axios from "axios";
import {toast} from "react-toastify";
import Utils from "../utils";
import NavigationBarComponent from "./NavigationBarComponent";

class LoginComponent extends Component {
	state = {
		email: "",
		password: "",
	}
	getRedirections = async () => {
		const {data, success} = await Utils.getLoggedInUser();
		if (success) {
			this.props.addUserData(data);
			localStorage.setItem('token', JSON.stringify(data.token));
			this.props.history.push('/user/home');
		}
	}

	componentDidMount() {
		this.getRedirections();
	}

	// making an fetch call to the user in db
	userLoginDetails = (e) => {
		e.preventDefault();

		axios.post("http://18.219.242.1:8000/user/login/", {
			email: this.state.email,
			password: this.state.password
		}).then((res)=>{
			if(res.data.success) {
				const token = res.data.data.token;
				toast.success("Successfully logged in!");
				this.props.addUserData(res.data.data);
				localStorage.setItem('token', JSON.stringify(token));
				this.props.history.push('/user/home');
			} else {
				console.log(res);
				toast.error(res.data.reason);
			}
		}).catch((err)=>{
			console.log(err);
		});
	}
	handleChange = (e)=>{
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	render(){
		return(
			<div className="login-page">
				<NavigationBarComponent />
				<div className="container loginArea">
					<div className="row loginBay center">
						<div className="col s6 right-align">
							<Link to="/">
								<img className="responsive-img" alt="letter" src={letter}/>
							</Link>
						</div>
						<div className="col s6 left-align">
							<h5 className="grey-text">WELCOME TO SPLITWISE</h5>
							<div className="loginDetails">
								<form className="loginForm">
									<div className="inputBox">
										<div className="input-field inputBar">
											<input id="email" type="email" className="validate" onChange={this.handleChange} value={this.state.email}></input>
											<label htmlFor="email">Email</label>
										</div>
										<div className="input-field inputBar">
											<input id="password" type="password" className="validate" value={this.state.password} onChange={this.handleChange}></input>
											<label htmlFor="password">Passwords</label>
										</div>
									</div>
									<button className="waves-effect waves-light btn-large orange darken-4" onClick={(e)=>{
										this.userLoginDetails(e);
									}}>
										Login
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) =>{
	return {
		addUserData: (payload)=>{
			dispatch({
				type: "ADD_USER",
				payload
			});
		}
	};
};

export default withRouter(connect(null, mapDispatchToProps)(LoginComponent));
