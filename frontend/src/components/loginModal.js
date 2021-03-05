import React from 'react';

const LoginModal = ({loginStatus})=>{
    if(loginStatus === null){
        return <div></div>;
    }else if(loginStatus === true){
        return (
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>Success !</h4>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
          </div>
        )
    }else {
        <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>Failure !</h4>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
          </div>
    }
}

export default LoginModal;