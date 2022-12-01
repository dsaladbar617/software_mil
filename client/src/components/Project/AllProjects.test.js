import { render, screen } from '@testing-library/react';
import AllProjects from './AllProjects';
import { ShopContext } from '../../ShopContext';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: () => ({
		pathname: 'http://localhost:3000/shop'
	})
}));

let testObj = {
	values: [
		{
			_id: '633af6c9af26f8d44189b8a8',
			name: 'Kessel Run',
			desc: 'Not as good as Bespin',
			projects: [
				{
					name: 'smartsheets',
					tags: ['sheets', 'data'],
					lang: ['react', 'javascript'],
					proj_link: 'https://github.com/dsaladbar617/smartsheets',
					short_desc: 'this is smartsheets',
					img: 'kesselrun'
				}
			],
			img: 'kesselrun',
			location: 'Boston',
			__v: 0,
			contact: 'kr@us.af.mil'
		},
		{
			_id: '633af6c9af26f8d44189b8a8',
			name: 'Kessel Run',
			desc: 'Not as good as Bespin',
			projects: [
				{
					name: 'smartsheets',
					tags: ['sheets', 'data'],
					lang: ['react', 'javascript'],
					proj_link: 'https://github.com/dsaladbar617/smartsheets',
					short_desc: 'this is smartsheets',
					img: 'kesselrun'
				}
			],
			img: 'kesselrun',
			location: 'Boston',
			__v: 0,
			contact: 'kr@us.af.mil'
		}
	]
};

const wrapper = ({ children }) => (
	<ShopContext.Provider
		value={{
			testObj
		}}>
		{children}
	</ShopContext.Provider>
);

test('render the list', () => {
	render(<AllProjects />, { wrapper });

	let cards = screen.getAllByRole('list');

	expect(cards).toHaveLength(1);
});
