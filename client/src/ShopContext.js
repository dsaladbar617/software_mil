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
	const [selectedProject, setSelecetedProject] = useState({
		name: '',
		tags: [],
		lang: [],
		proj_link: '',
		short_desc: ''
	});

	const values = { searchValue, selectedShop, selectedProject };

	const setters = { setSearchValue, setSelectedShop, setSelecetedProject };

	return (
		<ShopContext.Provider value={{ values, setters }}>
			{children}
		</ShopContext.Provider>
	);
};

export { ShopContext, ShopProvider };
