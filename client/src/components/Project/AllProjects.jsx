import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import CardList from '../UI/CardList';
const AllProjects = () => {
	const location = useLocation();

	const [cards, setCards] = useState([]);

	useEffect(() => {
		const url = location.pathname.split('/');
		const query = url[url.length - 1];
		axios.get(`http://localhost:8080/api/getprojects/${query}`).then((res) => {
			// res.data.forEach();
			let test = res.data.map((elem) => elem.projects);
			console.log(test.flat());
			setCards(test.flat());
		});
	}, []);

	// Pass data along to cards to navigate to correct project detail page

	return <CardList cards={cards} />;
};

export default AllProjects;
