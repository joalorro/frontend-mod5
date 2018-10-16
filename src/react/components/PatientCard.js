// import { fetchExercises } from '../../redux/actions/fetchExercises'
// import { connect } from 'react-redux'
import React, { Component } from 'react';
import '../../stylesheets/style.css'

class PatientCard extends Component {

	
	renderPatientExercises = () => {
		debugger
		return this.props.exercises.map( e => {
			return (
				<div key={e.id}>
					<h4>Name: {e.name}</h4>
					<p>Desc: {e.desc}</p>
					<p>Flagged? {e.flagged ? "yes" : "no"}</p>
				</div>
			)
		})
	}
	
	render() {
		console.log(this.props)
		return (
			<div className="patient-card">
				<h3 className="patient-name">{this.props.patient.last_name}, {this.props.patient.first_name}</h3>
					{this.renderPatientExercises()}
			</div>
		);
	}
}

// const mapDispatchToProps = dispatch => {
// 	return {
// 		fetchExercises: (patientId) => dispatch(fetchExercises(patientId))
// 	}
// }

// const mapStateToProps = state => {
// 	return {
// 		...state,
// 		exercises: state.exerciseReducer.exercises
// 	}
// }

// export default connect(mapStateToProps,mapDispatchToProps)(PatientCard);
export default PatientCard
