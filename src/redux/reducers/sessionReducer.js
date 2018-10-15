let initialState = {}

export const sessionReducer = (state= initialState, action) => {
	switch(action.type){
		case "CREATE_PATIENT_SESSION":
			return {
				patient: action.patient
			}
		case "CREATE_THERAPIST_SESSION":
			return {
				therapist: action.therapist
			}
		case "SET_PATIENTS":
			return {
				...state,
				therapist: {
					...state.therapist,
					patients: action.patients
				}
			}
		default: 
			return state 
	}
}