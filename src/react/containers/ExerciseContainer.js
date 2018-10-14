import React, { Component } from 'react';
import { connect } from 'react-redux'

class ExerciseContainer extends Component {

	componentDidMount(){

	}

	render() {
		return (
			<div>
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
