import React, { Component } from "react";
import letter from "../letter.webp";
import "./signup.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

class signUp extends Component {
    state = {
      name: "",
      password: "",
      email: "",
      phone: "",
      signupStatus: ""
    }

    signUpUser = (e)=>{
      e.preventDefault();

      axios.post("http://localhost:8000/user/signup/", {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email, 
        password: this.state.password
      }).then((res)=>{
        if(res.data.success == true) {
          toast.success("You have successfully signed in !");
          this.props.userSignUp(this.state);
        }else{
          toast.error(res.data.reason);
        }
        this.setState({
          signupStatus: res.data.success
        });
      }).catch(()=>{
        toast.error("Somthing went wrong");
      }).then(()=>{
        this.setState({
          name: "",
          password: "",
          email: "",
          phone: "",
          signupStatus: ""
        });
      });
    }

    handleChange = (e)=>{
      this.setState({
        [e.target.id]: e.target.value
      });
    }

    render(){
      return(
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
      );
    }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    userSignUp: (state)=>{
      dispatch({
        type: "SIGNUP_INFO",
        payload: state
      });
    }
  };
};

signUp.propTypes = {
  userSignUp: PropTypes.any
};

export default connect(null, mapDispatchToProps)(signUp);
