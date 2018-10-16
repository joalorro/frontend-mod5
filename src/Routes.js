import App from './App';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Fragment } from 'react'
import Navbar from './react/nav/Navbar'
import Login from './react/components/Login'
// import NotFound from './react/components/NotFound'
import Signup from './react/components/Signup'
import PatientSignup from './react/components/PatientSignup'
import TherapistSignup from './react/components/TherapistSignup'
// import PatientPage from './react/components/PatientPage'
import PatientExerciseContainer from './react/containers/PatientExerciseContainer'
import PatientsContainer from './react/containers/PatientsContainer'


const Routes = () => {
	return (
		<Fragment>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path="/:slug/exercises" component={PatientExerciseContainer} />
					<Route exact path="/:slug/patients" component={PatientsContainer} />
					<Route exact path="/login" component={Login}/>
					<Route exact path="/signup" component={Signup} />
					<Route path="/signup/patient" component={PatientSignup} />
					<Route path="/signup/therapist" component={TherapistSignup} />
					<Route exact path="/" component={App} />
					{/* <Route component={NotFound} /> */}
				</Fragment>
			</Router>
		</Fragment>
	);
}

export default Routes;
