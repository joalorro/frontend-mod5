import { fetchExercises } from '../../redux/actions/fetchExercises'
import { connect } from 'react-redux'

import React, { Component } from 'react';

class PatientCard extends Component {
	
	componentDidMount() {
		this.props.fetchExercises(this.props.patient.id)
	}
	
	renderPatientExercises = () => {
		return this.props.exercises.map( e => {
			return (
				<li key={e.id}>
					<h1>Name: {e.name}</h1>
					<h3>Desc: {e.desc}</h3>
					<h5>Flagged? {e.flagged ? "yes" : "no"}</h5>
				</li>
			)
		})
	}
	
	render() {
		return (
			<div>
				<h1>{this.props.patient.last_name}, {this.props.patient.first_name}</h1>
				<ul>
					{this.props.exercises ? this.renderPatientExercises() : null}
				</ul>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchExercises: (patientId) => dispatch(fetchExercises(patientId))
	}
}

const mapStateToProps = state => {
	return {
		...state,
		exercises: state.exercises.exercises
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PatientCard);
