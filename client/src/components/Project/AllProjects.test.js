import { render, screen } from '@testing-library/react';
import AllProjects from './AllProjects';
import { ShopProvider } from '../../ShopContext';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: () => ({
		pathname: 'http://localhost:3000/shop'
	})
}));

jest.mock('useContext', () => {
	return {
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
	};
});

test('render the list', () => {
	render(
		<ShopProvider>
			<AllProjects />
		</ShopProvider>
	);

	let cards = screen.getAllByRole('listitem');

	expect(cards).toHaveLength(4);
});
