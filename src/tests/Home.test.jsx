import React from 'react';
import { Home } from '../generalviews/Home'
import { shallow, mount } from 'enzyme'

import { BrowserRouter } from 'react-router-dom';
import { shape } from 'prop-types'

// Instantiate router context
const router = {
	history: new BrowserRouter().history,
	route: {
		location: {},
		match: {},
	},
};

const createContext = () => ({
	context: { router },
	childContextTypes: { router: shape({}) },
});

function mountWrap(node) {
	return mount(node, createContext());
}

describe('Home component', () =>  {
	let wrapper
	const patient = {
		id: 1,
		first_name: 'patient',
		last_name: 'one',
	}
	const therapist = {
		id: 5,
		first_name: 'jane',
		last_name: 'doe'
	}

	beforeAll( () => {
		wrapper = shallow( <Home /> )
	}) 

	it('renders without error', () => {
		expect(wrapper.exists()).toBe(true)
	})

	it('provides the correct link if user is logged in', () => {
		const Component = mountWrap(<Home sessionUser={ patient } />)
		expect(Component.children() )
	})

})