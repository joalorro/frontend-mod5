import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createPatientSession, createTherapistSession } from './redux/actions/actions'
import Navbar from './generalviews/Navbar'
import Footer from './generalviews/Footer'
import Routes from './Routes'

import AppAdapter from './adapters/AppAdapter'

class App extends Component {

	componentDidMount() {
		console.log('app already mounted')
		if (localStorage.getItem("token")){
			AppAdapter.persist(localStorage.getItem("token"))
			.then( sessionUser => {
				let model = Object.keys(sessionUser)[0]
				if (model === 'patient') {
					this.props.createPatientSession(sessionUser)
				} else {
					this.props.createTherapistSession(sessionUser)
				}
			})
		}
	}

	render() {
		console.log('render function in app')
		return (
			<div id="App">
				<Navbar />
				<Routes />
				<Footer />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createPatientSession: (patient) => dispatch(createPatientSession(patient)),
		createTherapistSession: (therapist) => dispatch(createTherapistSession(therapist))
	}
}

export default connect(null, mapDispatchToProps)(App);
