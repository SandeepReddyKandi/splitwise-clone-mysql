import React from 'react';
import letter from '../letter.webp';
import './signup.css';
import {Link} from 'react-router-dom';

const signUp = () =>{
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
                                        <input id="text" type="text" className="validate"></input>
                                        <label htmlFor="text">Hey there! my name is</label>
                                    </div>
                                </div>
                                <button className="waves-effect waves-light btn-large orange darken-4">Sign me up!</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default signUp;