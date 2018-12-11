export const createPatientSession = (patient) => {
	return {
		type: "CREATE_PATIENT_SESSION",
		patient: patient.patient
	}
}

export const createTherapistSession = (therapist) => {
	return {
		type: "CREATE_THERAPIST_SESSION",
		therapist: therapist.therapist
	}
}

export const updateExercise = (exercise) => {
	return {
		type: "UPDATE_EXERCISE",
		exercise
	}
}

export const selectPatient = (patient) =>{
	return {
		type: "SELECT_PATIENT",
		selectedPatient: patient
	}
}

export const chooseModel = (model) => {
	return {
		type: "CHOOSE_MODEL",
		model
	}
}

export const createError = (error) => {
	return {
		type: "CREATE_ERROR",
		error
	}
}

export const setModel = (model) => {
	return {
		type: "SET_MODEL",
		model
	}
}

export const logout = () => {
	return {
		type: "LOGOUT"
	}
}