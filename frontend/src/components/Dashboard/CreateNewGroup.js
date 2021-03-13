import React, { Component } from "react";
import { connect } from "react-redux";

class CreateNewGroup extends Component {
	state = {

	}

	render() {
		return (
			<div className="row">
				<div className="col m4">

				</div>
				<div className="col m8">
					
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch)=>{
    return {
        addExpense : (state)=>{
            dispatch({
                type : "ADD_NEW_EXPENSE",
                payload: state
            })
        }
    }
}

export default CreateNewGroup;
// export default connect(null, mapDispatchToProps)(Modal);
