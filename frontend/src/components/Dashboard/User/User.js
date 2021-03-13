import React, {useEffect}from 'react';
import { Link , Switch } from "react-router-dom";
import { useSelector} from 'react-redux';
import '../dashboard.css';
import userIcon from './img/user_1.png';

const User = ()=>{  
    const userInfo = useSelector(state => state.auth);
    const currentUser = userInfo.signupInfo.name;
    const currEmail = userInfo.signupInfo.email;
    const currPhone = userInfo.signupInfo.phone;

    return(
        <div className="user-info">
            <nav className="nav-wrapper teal accent-4 navbar user-header">
                <div className="container">
                    <Link to="/" className="brand-logo black-text">
                        <img className="responsive-img" src="https://img.icons8.com/fluent/48/000000/love-letter.png" alt="letter" style={{ marginTop: "10px" }}/>
                    </Link>
                    <ul className="right">
                        <li className="navbarBtnGrp">
                            <Link to="/user/home/" className="green-text text-darken-3">
                                <button className="btn teal">Home</button>
                            </Link>
                            <Link to="/user">
                                <span>
                                    <i className="fas fa-user"></i>   
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container row">
                <div className="col m6 s6">
                    <div className="row">
                        <div className="col m6 s6 personal-img-info">
                            <h4>Your account</h4>
                            <img className="responsive-img" src={userIcon}/>
                            <span>Change your avatar</span>
                            <div className="container center-align">
                                <input className="center-align" type="file"/>
                            </div>
                        </div>
                        <div className="col m6 s6 personal-info left-align valign-wrapper">
                            <div className="row">
                                <div className="info">
                                    <div>
                                        <p>Your Name</p>
                                        <div>   <b>{currentUser}  </b> 
                                            <span>
                                                <i className="fas fa-pencil-alt"></i>
                                                Edit
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p>Your email address</p>
                                        <div>   <b>{currEmail}  </b> 
                                            <span>
                                                <i className="fas fa-pencil-alt"></i>
                                                Edit
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p>Your phone number</p>
                                        <div>   <b>{currPhone}  </b> 
                                            <span>
                                                <i className="fas fa-pencil-alt"></i>
                                                Edit
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col m6 s6">
                    <div className="row">
                        <div className="col m12">
                            <div>
                                <form>
                                    <label htmlFor="cars">Choose a car:</label>
                                    <select defaultValue="volvo" name="cars" id="cars">
                                        <option value="volvo" className="selected">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="opel">Opel</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </form>
                            </div>
                            <div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default User;