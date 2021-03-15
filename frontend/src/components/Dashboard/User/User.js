import React, {useEffect, useState}from 'react';
import { Link , Switch } from "react-router-dom";
import { useSelector, connect } from 'react-redux';
import '../dashboard.css';
import userIcon from './img/user_1.png';

const User = (props)=>{  
    const userInfo = useSelector(state => state.auth);
    const currentUser = userInfo.signupInfo.name;
    const currEmail = userInfo.signupInfo.email;
    const currPhone = userInfo.signupInfo.phone;

    const [userCurreny, setUserCurreny] = useState('');
    const [userTimezone, setuserTimezone] = useState('');
    const [userLanguage, setUsetLanguage] = useState('');

    // console.log(props);

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
            <div className="row" id="userContent">
                <div className="container">
                <div className="col m6 s6">
                    <div className="row center-align">
                        <div className="col m6 s6 personal-img-info grey-text text-darken-1">
                            <h4 className="center-align">Your account</h4>
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
                        <div className="col m8">
                            <div>
                                <form>
                                    <div className="row">
                                        <label htmlFor="currency">Currency :</label>
                                        <select defaultValue="USD" name="currency" id="currency" onChange={(e)=>{
                                            setUserCurreny(e.target.options[e.target.selectedIndex].text);
                                            props.setUserVariables({
                                                currency: e.target.options[e.target.selectedIndex].text,
                                                timezone: userTimezone,
                                                language: userLanguage
                                            });
                                        }}>
                                            <option value="USD">USD</option>
                                            <option value="KWD">KWD</option>
                                            <option value="BHD">BHD</option>
                                            <option value="GBP">GBP</option>
                                            <option value="EUR">EUR</option>
                                            <option value="CAD">CAD</option>
                                        </select>
                                    </div>

                                    <div className="row">
                                        <label htmlFor="timezones">Timezone : </label>
                                        <select defaultValue="New York, NY, USA EST (UTC -5)" name="timezones" id="timezones" onChange={(e)=>{
                                            console.log("value : ", e.target.options[e.target.selectedIndex].text);
                                            setuserTimezone(e.target.options[e.target.selectedIndex].text);
                                            props.setUserVariables({
                                                currency: userCurreny,
                                                timezone: e.target.options[e.target.selectedIndex].text,
                                                language: userLanguage
                                            });
                                        }}>
                                            <option value="USD">New York, NY, USA EST (UTC -5)</option>
                                            <option value="KWD">Kuwait City, Kuwait AST (UTC +3)</option>
                                            <option value="BHD">Manama, Bahrain AST (UTC +3)</option>
                                            <option value="GBP">London, United Kingdom GMT (UTC +0)</option>
                                            <option value="EUR">Central European Time, CET (UTC +1) </option>
                                            <option value="CAD">Toronto, Canada EST (UTC -5)</option>
                                        </select>
                                    </div>
                                    
                                    <div className="row">
                                        <label htmlFor="languages">Language :</label>
                                        <select defaultValue="English" name="languages" id="languages" onChange={(e)=>{
                                            setUsetLanguage(e.target.options[e.target.selectedIndex].text);
                                            props.setUserVariables({
                                                currency: userCurreny,
                                                timezone: userTimezone,
                                                language: e.target.options[e.target.selectedIndex].text
                                            });
                                        }}>
                                            <option value="english">English</option>
                                            <option value="arabic">Arabic</option>
                                            <option value="french">French</option>
                                            <option value="german">German</option>
                                            <option value="chinese">chinese</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setUserVariables: (state)=>{
            dispatch({
                type: 'SET_USER_VARIABLES',
                payload: state
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(User);