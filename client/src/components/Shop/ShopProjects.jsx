import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../../ShopContext';
import axios from 'axios';
import CardList from '../UI/CardList';

const ShopProjects = () => {
	const loc = useLocation();
	const { values, setters } = useContext(ShopContext);

	// Check the global context for the selectedShop. If it does not exist use the url to get the correct shop data.
	useEffect(() => {
		if (values.selectedShop.name === '') {
			let url = loc.pathname.replace('/shop/', '').replace('/projects', '');
			console.log(url);
			axios.get(`http://localhost:8080/api/get/${url}`).then((res) => {
				console.log(res.data[0]);
				setters.setSelectedShop(res.data[0]);
			});
		}
	}, []);

	// Get all of the projects from the selected shop to populate a list of project cards.
	let projects = values.selectedShop.projects;

	return <CardList cards={projects} />;
};

export default ShopProjects;
