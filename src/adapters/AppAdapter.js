import { API_ROOT, HEADERS } from '../constants'

class AppAdapter {

	static signUp = ({body, model}) => {
		// debugger
		return (
			fetch(API_ROOT + model, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify(body)
			}).then(res => res.json())
		)
	}

	static login = ({body}) => {
		return (
			fetch(API_ROOT + 'sessions/create', {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify(body)
			})
		)
	}

	static fetchExercises = () => {
		return (
			fetch(API_ROOT + '/exercises')
			.then(res => res.json())
		)
	}

	static fetchPatients = (therapist) => {

		return (
			fetch(API_ROOT + 'therapists/' + therapist.id + '/patients')
				.then(res => res.json())
		)
	}

	static sortExercises = () => {
		AppAdapter.fetchExercises().then(exercises => console.log(exercises))
	}

	static sayHi = () => {
		console.log('hi')
	}
}



export default AppAdapter