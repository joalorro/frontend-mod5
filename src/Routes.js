import Home from './generalviews/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Fragment } from 'react'
import Login from './generalviews/Login'
import Signup from './generalviews/Signup'
import PatientSignup from './patientviews/components/PatientSignup'
import TherapistSignup from './therapistviews/components/TherapistSignup'
import ExerciseContainerForPatient from './patientviews/containers/ExerciseContainerForPatient'
import PatientsContainer from './therapistviews/containers/PatientsContainer'
import PageNotFound from './generalviews/PageNotFound'

const Routes = () => {
	return (
		<Router>
			<Fragment>
				<Switch>
					<Route exact path="/:slug/exercises" render={(routeProps) => <ExerciseContainerForPatient {...routeProps} />} />
					<Route exact path="/:slug/patients" render={(routeProps) => <PatientsContainer {...routeProps} />} />
					<Route path="/login" render={(routeProps) => <Login {...routeProps} />}/>
					<Route exact path="/signup" render={(routeProps) => <Signup {...routeProps} />} />
					<Route exact path="/signup/patient" render={(routeProps) => <PatientSignup {...routeProps} />} />
					<Route exact path="/signup/therapist" render={(routeProps) => <TherapistSignup {...routeProps} />} />
					<Route exact path="/" render={(routeProps) => <Home {...routeProps} />} />
					<Route component={PageNotFound} />
				</Switch>
			</Fragment>
		</Router>
	);
}

export default Routes;
