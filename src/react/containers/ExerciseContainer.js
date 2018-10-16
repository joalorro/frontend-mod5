import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchExercises } from '../../redux/actions/fetchExercises'

class ExerciseContainer extends Component {

	componentDidMount(){
		this.props.fetchExercises(this.props.patient.id)
	}

	renderExercises = () => {
		debugger
		return this.props.exercises.map( e => {
			return (
				<div key={e.id}>
					<h4>{e.name}</h4>
					<p>{e.desc}</p>
					<p>Flagged? {e.flagged ? "yes" : "no"}</p>
				</div>
			)
		})
	}

	render() {
		return (
			<div>
				Exercise Container
				<h1>{this.props.patient.last_name + ", " + this.props.patient.first_name}</h1>
				<h3>Exercises: </h3>
				{this.props.exercises ? this.renderExercises() : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	
	return {
		patient: state.sessionReducer.patient,
		exercises: state.exerciseReducer.exercises
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchExercises: (patientId) => {
			return dispatch(fetchExercises(patientId))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ExerciseContainer);
