import React, {Component} from "react";
import letter from "../letter.webp";
import "./signup.css";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";
import {toast} from "react-toastify";
import Utils from "../utils";
import NavigationBarComponent from "./NavigationBarComponent";
import UserBackendAPIService from "../services/UserBackendAPIService";

const API_ENDPOINT = process.env.REACT_APP_ENDPOINT;

class SignUpComponent extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    phone: "",
    signupStatus: ""
  }

  getRedirections = async () => {
    const { data, success } = await UserBackendAPIService.getUserDetails();
    if (success) {
      this.props.addUserData(data)
      this.props.history.push('/user/home');
    }
  }

  componentDidMount() {
    this.getRedirections();
  }

  signUpUser = (e) => {
      e.preventDefault();

      if (!(this.state.name && this.state.email && this.state.phone && this.state.password)) {
        toast.error('Please fill in all the fields correctly!');
        return;
      }

      axios.post(`${API_ENDPOINT}/user/signup/`, {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password
      }).then((res)=>{
        if (res.data.success) {
          toast.success("You have successfully signed in !");
          this.props.history.push('/login');
        } else {
          toast.error(res.data.reason);
        }
        this.setState({
          signupStatus: res.data.success
        });
      }).catch(() => {
        toast.error("Something went wrong, Please try again!");
      });
    }

    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      });
    }

    render(){
      return(
          <>
            <NavigationBarComponent />
            <div className="container box1">
              <div className="signUpArea">
                <div className="row signUpBay center">
                  <div className="col s6 right-align">
                    <Link to="/">
                      <img className="responsive-img" alt="letter" src={letter}/>
                    </Link>
                  </div>
                  <div className="col s6 left-align">
                    <h5 className="grey-text">INTRODUCE YOURSELF</h5>
                    <div className="signUpDetails">
                      <form className="signUpForm">
                        <div className="inputBox">
                          <div className="input-field inputBar">
                            <input id="name" type="text" className="validate" onChange={this.handleChange} value={this.state.name}></input>
                            <label htmlFor="name">username</label>
                          </div>
                          <div className="input-field inputBar">
                            <input id="password" type="password" className="validate" onChange={this.handleChange} value={this.state.password}></input>
                            <label htmlFor="password">password</label>
                          </div>
                          <div className="input-field inputBar">
                            <input id="email" type="email" className="validate" onChange={this.handleChange} value={this.state.email}></input>
                            <label htmlFor="email">email id</label>
                          </div>
                          <div className="input-field inputBar">
                            <input id="phone" type="tel" className="validate" onChange={this.handleChange} value={this.state.phone}></input>
                            <label htmlFor="phone">Phone Number</label>
                          </div>
                        </div>
                        <button className="waves-effect waves-light btn-large orange darken-4 submitBtn" onClick={this.signUpUser}>
                          Sign me up!
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
      );
    }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    addUserData: (state) => {
      dispatch({
        type: "ADD_USER",
        payload: state
      });
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(SignUpComponent));
