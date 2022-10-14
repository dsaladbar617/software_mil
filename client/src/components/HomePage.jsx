import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import CardList from './CardList';
import { ShopContext } from '../ShopContext';

const HomePage = () => {
	const { values, setters } = useContext(ShopContext);

	useEffect(() => {
		axios.get('http://localhost:8080/api').then((res) => {
			setters.setShops(res.data);
		});
	}, []);

	return <CardList cards={values.shops} />;
};

export default HomePage;
