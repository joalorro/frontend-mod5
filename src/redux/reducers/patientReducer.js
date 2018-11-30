export const patientReducer = (state = {patients: []}, action) => {
	switch (action.type){
		case "SELECT_PATIENT":
			return {
				...state,
				selectedPatient: action.selectedPatient
			}
		case "FETCH_PATIENTS":
			return {
				...state,
				patients: action.patients
			}
		default:
			return state 
	}
}