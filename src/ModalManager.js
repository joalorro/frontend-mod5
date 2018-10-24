import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'

import { closeModal } from './redux/actions/actions'

class ModalManager extends Component {
	render() {

		const { modalConfiguration } = this.props
		const defaultProps = {
			defaultOpen: true,
			closeIcon: true,
			onClose: this.props.closeModal
		}

		let renderedComponent

		if (modalConfiguration) {
			const { modalProps = {} } = modalConfiguration
			renderedComponent = (
				<Modal {...Object.assign({}, modalProps,defaultProps)} />
			)
		}
		return (
			<span>
				{renderedComponent}
			</span>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('from modal manager: ', state)
	return { modalConfiguration: state.modalReducer }
}

export default connect(mapStateToProps, { closeModal })(ModalManager);
