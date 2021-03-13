import React from 'react';
import { useSelector} from 'react-redux';
import '../dashboard.css';

const User = ()=>{

    return(
        <div className="container row">
            <h4 className="col m12 s12">Your account</h4>
            <div className="col m12 s12">
                <div className="row personal-info">
                </div>
            </div>
            <div className="col m6 s12">
                
            </div>
        </div>
    )
}

export default User;