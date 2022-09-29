import React, { useState } from 'react';

const ShopContext = React.createContext();

const ShopProvider = ({ children }) => {
	const [searchValue, setSearchValue] = useState('');
	const [selectedShop, setSelectedShop] = useState({
		_id: '',
		name: '',
		desc: '',
		projects: [],
		location: ''
	});

	const values = { searchValue, selectedShop };

	const setters = { setSearchValue, setSelectedShop };

	return (
		<ShopContext.Provider value={{ values, setters }}>
			{children}
		</ShopContext.Provider>
	);
};

export { ShopContext, ShopProvider };
