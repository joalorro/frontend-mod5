const defaultState = {}

export const modalReducer = ( state = defaultState, action = {} ) => {
	switch(action.type) {
		case "MODAL_OPEN": {
			return {  
				modalProps: action.modalProps
			}
		}
		case "MODAL_CLOSE": {
			return null
		}
		default:
			return state
	}
}