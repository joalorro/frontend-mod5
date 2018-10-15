import React, { Component } from 'react';
import { connect } from 'react-redux'

class ExerciseContainer extends Component {

	componentDidMount(){

	}

	render() {
		return (
			<div>
				<h1>
					
				</h1>
				Exercise Container
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state = {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ExerciseContainer);
