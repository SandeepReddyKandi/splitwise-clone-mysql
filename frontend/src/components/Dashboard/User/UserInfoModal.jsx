import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './Modal.css'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

const UserInfoModal = ()=>{
    const [username, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');

    useEffect(()=>{
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: true,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);
    });


    return (
        <div>
                {/* <a
          className=" btn modal-trigger"
          data-target="modal1"
        >
          Settle
        </a> */}

            <div ref={Modal => {
                this.Modal = Modal;
            }}
                 id="modal1"
                 className="modal"
            >
                <div className="modal-content center-align">
                    <div className="modal-title">
                        <h5 className="orange-text text-darken-2">Settle Balance</h5>
                    </div>
                    <div className="row center-align">
                        <div className="input-field col m12 s12">
                            <input placeholder="user to settle balance with" id="userName" type="text" className="validate center-align"
                                   onChange={this.setUserName}
                            />
                        </div>
                    </div>
                </div>
                <div className="row modal-footer">
                    <div className="col m12 center-align">
                        <a className="modal-close btn btn-success" onClick={this.settleBalance}>
                            Settle
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default UserInfoModal;
