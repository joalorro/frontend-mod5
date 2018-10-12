import React from 'react'
import { connect } from 'react-redux'
import { testReducer } from './redux/reducers/testReducer'

const Sup = () => {
	return (
		<div>
			sup
		</div>
	)
}

const mapStateToProps = state => {
	return state 
}

const mapDispatchToProps = dispatch => {
	return {
		reduce: () => dispatch(testReducer)
	}
}

export default connect(mapStateToProps ,mapDispatchToProps)(Sup)