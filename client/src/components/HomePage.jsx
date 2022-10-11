import { useEffect, useState } from 'react';
import axios from 'axios';
import CardList from './CardList';

const HomePage = () => {
	const [shops, setShops] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:8080/api').then((res) => {
			setShops(res.data);
		});
	}, []);

	return <CardList cards={shops} />;
};

export default HomePage;
