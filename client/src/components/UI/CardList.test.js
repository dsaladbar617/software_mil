import { render, screen } from '@testing-library/react';
import CardList from './CardList';
// import React from 'react';
import { ShopContext } from '../../ShopContext';
import '@testing-library/jest-dom';

let mockObj = {
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
			mockObj
		}}>
		{children}
	</ShopContext.Provider>
);

test('render the card list', () => {
	render(<CardList />, { wrapper });
	let cards = screen.getAllByRole('listitem');
	console.log(cards);
	expect(cards).toHaveLength(2);
});
