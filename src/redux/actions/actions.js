export const createPatientSession = (patient) => {
	return {
		type: "CREATE_PATIENT_SESSION",
		patient
	}
}

export const createTherapistSession = (therapist) => {
	return {
		type: "CREATE_THERAPIST_SESSION",
		therapist
	}
}

export const setPatients = (patients) =>{
	return {
		type: "SET_PATIENTS",
		patients
	}
}