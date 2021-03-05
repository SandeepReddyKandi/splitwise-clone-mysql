import React,  {Component} from 'react';
import {Link} from 'react-router-dom';
import './login.css';
import letter from '../letter.webp';
import {connect} from 'react-redux';
import axios from 'axios';
// import Modal from './loginModal';
// import M from 'materialize-css';

import { ToastContainer, toast } from 'react-toastify';

class login extends Component{
    state = {
        email: '',
        password: '',
        loginStatus: ''
    }

    // saving log to redux store
    // making an fetch call to the user in db
    userLoginDetails = (e)=>{
        e.preventDefault();

        axios.post('http://localhost:8000/user/login/', {
            email: this.state.email,
            password: this.state.password
        }).then((res)=>{
            console.log(res.data.data);

            if(res.data.success === true){
                // alert("You are logged in!");
                toast.success("Successfully logged in");
                console.log("You are logged in!");

                this.props.userInfo(res.data.data);        // string user data to redux store
                this.setState({
                    email: '',
                    password: '',
                    loginStatus: ''
                });
            }else{
                // alert("Please sign-Up first");
                toast.error("Sign up first");
                console.log("Please sign-Up first");
            }

            this.setState({
                loginStatus : res.data.success
            })
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
                <nav className="nav-wrapper teal accent-4 navbar">
                    <div className="container">
                        <Link to="/" className="brand-logo black-text">
                            <img className="responsive-img" src="https://img.icons8.com/fluent/48/000000/love-letter.png" alt="letter" style={{marginTop:"10px"}}/>
                        </Link>
                        <ul className="right">
                            <li>
                                <Link to="/login" className="green-text text-darken-3">
                                    <button className="waves-effect waves-light btn">login</button>
                                </Link>
                            </li>
                            <li> <span className="green-text text-darken-3">or</span> </li>
                            <li>
                                <Link to="/signup" className="black-text">
                                    <button className="waves-effect waves-light btn orange darken-4">sign up</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
    
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
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        userInfo: (state)=>{
            dispatch({
                type: 'LOGIN_INFO',
                payload: state
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(login); 