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
	const [selectedProject, setSelectedProject] = useState({
		name: '',
		tags: [],
		lang: [],
		proj_link: '',
		short_desc: ''
	});
	const [shops, setShops] = useState([]);

	const values = { searchValue, selectedShop, selectedProject, shops };

	const setters = {
		setSearchValue,
		setSelectedShop,
		setSelectedProject,
		setShops
	};

	return (
		<ShopContext.Provider value={{ values, setters }}>
			{children}
		</ShopContext.Provider>
	);
};

export { ShopContext, ShopProvider };
