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