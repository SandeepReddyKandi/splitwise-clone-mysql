import React from 'react';
import {Link} from 'react-router-dom';
import './login.css';
import letter from '../letter.webp';


const login = () =>{
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
                                        <input id="email" type="email" className="validate"></input>
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="input-field inputBar">
                                        <input id="password" type="password" className="validate"></input>
                                        <label htmlFor="password">Passwords</label>
                                    </div>
                                </div>
                                <button className="waves-effect waves-light btn-large orange darken-4">login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default login; 