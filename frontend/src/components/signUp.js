import React, {Component} from 'react';
import letter from '../letter.webp';
import './signup.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class signUp extends Component {
    state = {
        name: null,
        password: null,
        email: null,
        phone: null,
        signupStatus: null
    }

    signUpUser = (e)=>{
        e.preventDefault();

        axios.post('http://localhost:8000/user/signup/', {
            name:this.state.name,
            phone: this.state.phone,
            email: this.state.email, 
            password: this.state.password
        }).then((res)=>{
            // sending data to redux stor
            this.props.userSignUp(this.state);

            if(res.data.success == true) {
                console.log("You have successfully signed in !");
                // alert("You have successfully signed in !");
                toast.success("You have successfully signed in !");
            }else{
                console.log(res.data.reason);
                // alert(res.data.reason);
                toast.error(res.data.reason);
            }

            this.setState({
                signupStatus : res.data.success
            });
        }).catch((err)=>{
            console.log(err);
        });
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.id] : e.target.value
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
                                            <input id="name" type="text" className="validate" onChange={this.handleChange}></input>
                                            <label htmlFor="name">username</label>
                                        </div>
                                        <div className="input-field inputBar">
                                            <input id="password" type="password" className="validate" onChange={this.handleChange}></input>
                                            <label htmlFor="password">password</label>
                                        </div>
                                        <div className="input-field inputBar">
                                            <input id="email" type="email" className="validate" onChange={this.handleChange}></input>
                                            <label htmlFor="email">email id</label>
                                        </div>
                                        <div className="input-field inputBar">
                                            <input id="phone" type="tel" className="validate" onChange={this.handleChange}></input>
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
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        userSignUp: (state)=>{
            dispatch({
                type: 'SIGNUP_INFO',
                payload: state
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(signUp);