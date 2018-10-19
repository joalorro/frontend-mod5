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
			fetch(API_ROOT + 'login', {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify(body)
			})
		)
	}

	static persist = (token) => {
		return (
			fetch(API_ROOT + '/persist', {
				method: "GET",
				headers: {
					"Authorization": token
				}
			}).then(res => res.json() )
		)
	}

	static createNewExercise = exercise => {
		return (
			fetch(API_ROOT + 'exercises', {
				method: "POST",
				headers: HEADERS,
				body: JSON.stringify({exercise})
			})
		)
	}

	static addComment = (comment,commenter_id,commenter_type) => {
		return (
			fetch(API_ROOT + 'comments', {
				method: "POST",
				headers: HEADERS,
				body: JSON.stringify({
					comment,
					commenter_id,
					commenter_type
				})
			})
		)
	}

	static toggleFlag = (exerciseId) => {
		return ( 
			fetch(API_ROOT + 'exercises/' + exerciseId + '/flag', {
				method: "POST",
				headers: HEADERS
			}).then( res => res.json() )
		)
	}
}



export default AppAdapter