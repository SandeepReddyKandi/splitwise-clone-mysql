import React, { Component, useEffect } from "react";
import {connect, useSelector} from "react-redux";
import './Modal.css'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";
import {toast} from "react-toastify";
import ExpenseBackendAPIService from "../../../services/ExpenseBackendAPIService";

class Modal extends Component {
    state = {
        userId: this.props.userInfo.id,
        name: "",
        completeUserList: [],
        selectedPerson: '',
    }

  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);

      // getting all the users
      const token = JSON.parse(localStorage.getItem('token'));
      axios.get('http://localhost:8000/user/all', {
          headers: {
              authorization: `Bearer ${token}`,
          }
      }).then(res => {
          if (res.data.success) {
              console.log('users : ', res.data.data);
              this.setState({
                  ...this.state,
                  completeUserList: res.data.data.map(user => {
                      return {
                          label: user.name,
                          id: user.id,
                          email: user.email,
                          isAdded: this.props.userInfo.id === user.id,
                      }
                  }),
              })
          } else {
              toast.error(res.data.reason);
          }
      })
  }

  setUserName = (e)=>{
      this.setState({
        [e.target.id] : e.target.value
      })
  }

  settleBalance = ()=>{
    console.log(this.state.userName);
    this.props.deleteUser(this.state);
  }

    onSelectPersonHandler = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        if (selectedOption.id) {
            this.setState({
                ...this.state,
                selectedPerson: {
                    name: selectedOption.getAttribute('name'),
                    id: selectedOption.value,
                    email: selectedOption.id
                }})
        }
    }

    addAPersonToGroup = () => {
        // console.log('selected person : ',this.state.selectedPerson.id, '  _user : ', this.state.userId);
        ExpenseBackendAPIService.settleExpenseWithUser2ID({
            user : this.state.userId,
            params : this.state.selectedPerson.id
        }).then(({data, success})=>{
            if(success){
                console.log('settled expense : ',data);
            }
        });

        this.Modal;
    }

  render() {
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
                        <select
                            value={this.state.selectedPerson ? this.state.selectedPerson.id : null}
                            name={'select-person'}
                            onChange={this.onSelectPersonHandler}
                        >
                            <option>Select a person</option>
                            {
                                this.state.completeUserList.filter(user => !user.isAdded).map(user => {
                                    return (
                                        <option
                                            value={user.id}
                                            id={user.email}
                                            name={user.label}
                                        >
                                            {user.label.toUpperCase()} ({user.email})
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className="row modal-footer">
                <div className="col m12 center-align">
                    <button
                        className="modal-close btn orange darken-3"
                        onClick={this.addAPersonToGroup}
                        disabled={!this.state.selectedPerson}
                    >
                        Settle Balance
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        deleteUser : (state)=>{
            dispatch({
                type : "DELETE_USER",
                payload: state
            })
        }
    }
}

const mapStateToProps = (state)=>{
    return {
        userInfo : state.userState.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
