import React, { Component } from 'react';
import { connect } from 'react-redux'
import AppAdapter from '../../adapters/AppAdapter'
import { setPatients } from '../../redux/actions/actions'

import PatientCard from '../components/PatientCard'

class PatientsContainer extends Component {

	state = {
		patients: []
	}

	componentDidMount() {
		if (this.props.session) {
			AppAdapter.fetchPatients(this.props.session.therapist)
			.then(patients => 
				this.setState({
					patients
				})
			)
		}
	}

	renderPatients = () => {
		return this.state.patients.map( p => {
			return <PatientCard key={p.id} patient={p} />
		})
	}

	render() {
		return (
			<div>
				Patients Container 
				{this.renderPatients()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		session: state.session
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setPatients: (patients) => {
			return dispatch(setPatients(patients))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PatientsContainer);
