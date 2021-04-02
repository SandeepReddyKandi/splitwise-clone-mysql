import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {connect, useSelector} from 'react-redux';
import './user.scss';
import placeHolderImage from './img/user_1.png';
import UserBackendAPIService from "../../../services/UserBackendAPIService";

const User = (props)=>{
    const initUser = useSelector(state => {
        const { user } = state.userState;
        return  {
            name: user.name,
            email: user.email,
            phone: user.phone,
            timezone: user.timezone,
            language: user.language,
            currency: user.currency,
        }
    });
    const [user, setUser] = useState(initUser);
    const [fileData, setFileData] = useState();
    const [localImageUrl, setLocalImageUrl] = useState();

    const fileUploadInputRef = useRef();

    const handleChange = (e) => {
        setUser((prevUser) => {
            return {
                ...prevUser,
                [e.target.name]: e.target.value,
            }
        })
    }

    const onFileUpload = (e) => {
        setLocalImageUrl(URL.createObjectURL(e.target.files[0]))
        setFileData(e.target.files[0]);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(user).map(userField => {
            formData.set(userField, user[userField]);
        });
        if (fileData) {
            formData.set('image',fileData);
        }
        UserBackendAPIService.updateUserDetails(formData).then(({data, success})=>{
            if (success) {
                console.log('data : ',data);

            } else {
                toast.error('Could Not Update Your Info, Please Try Again!')
            }
        });
    }

    return(
        <div className="user-info">
            <nav className="nav-wrapper teal accent-4 navbar user-header">
                <div className="container">
                    <Link to="/" className="brand-logo black-text">
                        <button className="btn" onClick={() => props.logout()}>Log Out</button>
                    </Link>
                    <ul className="right">
                        <li className="navbarBtnGrp">
                            <Link to="/user/home/" className="green-text text-darken-3">
                                <button className="btn teal">Home</button>
                            </Link>
                            <Link to="/user">
                                <span>
                                    <i className="fas fa-user" />
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="row" id="user-data-container">
                <div className="container">
                    <h4 className="center-align">Your account</h4>
                    <div className="col m6 s6">
                        <div className="row center-align">
                            <div className="col personal-img-info grey-text text-darken-1">
                                <img className="responsive-img" src={localImageUrl ? localImageUrl: placeHolderImage} alt={'user-img'}/>
                                <span className={'image-info-text'}>
                                    { localImageUrl
                                        ? "Click on 'Update' to save your changes!"
                                        : "Change your profile image"
                                    }
                                </span>
                                <div className="container center-align">
                                    <input
                                        className="center-align hide"
                                        type="file"
                                        onChange={onFileUpload}
                                        ref={fileUploadInputRef}
                                    />
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
                            <div className="">
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
                                            <select defaultValue="USD" name="currency" onChange={handleChange}>
                                                <option>Select your default Currency</option>
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
                                                name="timezone"
                                                onChange={handleChange}
                                            >
                                                <option>Select your timezone</option>
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
                                            <select defaultValue="English" name="language" onChange={handleChange}>
                                                <option>Select your default Language</option>
                                                <option value="english">English</option>
                                                <option value="arabic">Arabic</option>
                                                <option value="french">French</option>
                                                <option value="german">German</option>
                                                <option value="chinese">chinese</option>
                                            </select>
                                        </div>
                                        <div className="row">
                                            <button
                                                className="btn waves-effect waves-light"
                                                type="submit"
                                                name="action"
                                                onClick={handleUpdate}
                                            >
                                                Submit <i className="material-icons right">send</i>
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
    return {
        logout: ()=>{
            dispatch({
                type: 'LOG_OUT',
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(User);
