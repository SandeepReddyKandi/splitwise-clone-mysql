import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {connect, useSelector} from 'react-redux';
import './user.scss';
import userIcon from './img/user_1.png';

const User = (props)=>{
    const initUser = useSelector(state => state.userState.user);
    const [user, setUser] = useState(initUser);
    const [userCurrency, setUserCurrency] = useState('');
    const [userTimezone, setuserTimezone] = useState('');
    const [userLanguage, setUsetLanguage] = useState('');

    const fileUploadInputRef = useRef();

    const handleChange = (e) => {

    }

    return(
        <div className="user-info">
            <nav className="nav-wrapper teal accent-4 navbar user-header">
                <div className="container">
                    <Link to="/" className="brand-logo black-text">
                        {/*<img className="responsive-img" src="https://img.icons8.com/fluent/48/000000/love-letter.png" alt="letter" style={{ marginTop: "10px" }}/>*/}
                        <button className="btn" onClick={() => props.logout()}>Log Out</button>
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
            <div className="row" id="user-data-container">
                <div className="container">
                <div className="col m6 s6">
                    <div className="row center-align">
                        <div className="col personal-img-info grey-text text-darken-1">
                            <h4 className="center-align">Your account</h4>
                            <img className="responsive-img" src={userIcon} alt={'user-img'}/>
                            <span>Change your avatar</span>
                            <div className="container center-align">
                                <input className="center-align hide" type="file" ref={fileUploadInputRef}/>
                                <button
                                    className="btn waves-effect waves-light"
                                    name="upload-img"
                                    onClick={() => fileUploadInputRef.current.click()}
                                >
                                    Upload <i className="material-icons right">file_upload</i>
                                </button>
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
                                        <label htmlFor="currency">User Name:</label>
                                        <input value={user.name} name="name" type="text" className="validate" onChange={handleChange}/>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="currency">Email:</label>
                                        <input value={user.email} name="email" type="email" className="validate" onChange={handleChange}/>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="currency">Phone Number:</label>
                                        <input value={user.phone} name="phone" type="tel" className="validate" onChange={handleChange}/>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="currency">Currency :</label>
                                        <select defaultValue="USD" name="currency" id="currency" onChange={(e)=>{
                                            setUserCurrency(e.target.options[e.target.selectedIndex].text);
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
                                        <select
                                            defaultValue="New York, NY, USA EST (UTC -5)"
                                            name="timezones"
                                            id="timezones"
                                            onChange={(e) => {
                                                setuserTimezone(e.target.options[e.target.selectedIndex].text);
                                                props.setUserVariables({
                                                    currency: userCurrency,
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
                                                currency: userCurrency,
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
                                    <div className="row">
                                        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                            <i className="material-icons right">send</i>
                                        </button>
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
        },

        logout: ()=>{
            dispatch({
                type: 'LOG_OUT',
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(User);
