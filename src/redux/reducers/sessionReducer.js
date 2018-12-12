let initialState = {}

export const sessionReducer = (state = initialState, action) => {
	switch(action.type){
		case "CREATE_PATIENT_SESSION":
			let patient = action.patient 
			return {
				patient: {
					id: patient.id,
					first_name: patient.first_name,
					last_name: patient.last_name,
					email: patient.email
				}
			}
		case "CREATE_THERAPIST_SESSION":
			let therapist = action.therapist
			return {
				therapist: {
					id: therapist.id,
					first_name: therapist.first_name,
					last_name: therapist.last_name,
					email: therapist.email
				}
			}
		case "SET_PATIENTS":
			return {
				...state,
				therapist: {
					...state.therapist,
					patients: action.patients
				}
			}
		case "CHOOSE_MODEL":
			return {
				...state,
				model: action.model
			}
		case "CREATE_ERROR":
			return {
				...state,
				error: action.error
			}
		case "SET_MODEL":
			return {
				...state,
				model: action.model
			}
		case "LOGOUT":
			localStorage.removeItem('token')
			return initialState
		default: 
			return state 
	}
}