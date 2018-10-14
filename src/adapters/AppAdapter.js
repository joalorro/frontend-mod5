const API_ROOT = 'http://localhost:3000/'
const HEADERS = {
	'Content-Type': 'application/json'
}

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

	static fetchExercises = () => {
		return (
			fetch(API_ROOT + '/exercises')
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