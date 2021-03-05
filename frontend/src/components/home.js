import React from "react";
import "./home.css";
import airplane from "../airplane.png";
import { Link, NavLink } from "react-router-dom";

const home = () =>{
  return(
    <div className="homePage">
      <nav className="nav-wrapper white navbar">
        <div className="container">
          <Link to="/" className="brand-logo black-text">
            <img className="responsive-img" src="https://img.icons8.com/fluent/48/000000/love-letter.png" alt="letter" style={{ marginTop: "10px" }}/>
          </Link>
          <ul className="right">
            <li><Link to="/login" className="green-text text-darken-3">
                            login
            </Link></li>
            <li><NavLink to="/signup" className="black-text">
              <button className="waves-effect waves-light btn">sign up</button>
            </NavLink></li>
          </ul>
        </div>
      </nav>
      <div className="container home">
        <div className="row box1 center-align">
          <div className="col s7">
            <div className="row">
              <div className="container top-heading"> 
                <h1 className="grey-text text-darken-3">Less stress when sharing expenses on trips.</h1>
              </div>
              <div className="container">
                <ul className="icons">
                  <li>
                    <img className="responsive-img" src="https://img.icons8.com/nolan/96/home.png" alt="home"/>
                  </li>
                  <li>
                    <img className="responsive-img" src="https://img.icons8.com/nolan/96/airplane-take-off.png" alt="airplane"/>
                  </li>
                  <li>
                    <img className="responsive-img" src="https://img.icons8.com/nolan/96/like.png" alt="heart"/>
                  </li>
                  <li>
                    <img className="responsive-img" src="https://img.icons8.com/nolan/96/star.png" alt="health"/>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row left-align">
              <div className="container footerContent">
                <p>Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.</p>
                <Link to="/signup" className="waves-effect waves-light btn btn-large">Sign up</Link>
              </div>
            </div>
            <div className="row left-align">
              <div className="container deviceIcons">
                <p>Free for <span> </span> 
                  <i className="fab fa-apple"></i> iPhone ,
                  <i className="fab fa-android"></i> android 
                                    and web
                </p>
              </div>
            </div>
          </div>
          <div className="col s5 airplane">
            <img className="responsive-img" alt="airplane" src={airplane}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default home;
