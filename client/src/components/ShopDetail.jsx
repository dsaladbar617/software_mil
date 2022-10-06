import { useContext, useState } from 'react';
import { ShopContext } from '../ShopContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ProgressBar from './ProgressBar';
import styles from '../styles/ShopDetail.module.css';
import axios from 'axios';
import { Card, useMantineTheme, createStyles } from '@mantine/core';
import toast, { Toaster } from 'react-hot-toast';

const useStyles = createStyles((theme) => ({
	root: {
		backgroundColor: theme.colors.gray
	}
}));

const ShopDetail = () => {
	const { values, setters } = useContext(ShopContext);
	const loc = useLocation();
	const [projLang, setProjLang] = useState([]);
	const { name, desc, location, img, contact } = values.selectedShop;
	const theme = useMantineTheme();

	useEffect(() => {
		if (values.selectedShop.name === '') {
			let url = loc.pathname.replace('/shop/', '');
			axios.get(`http://localhost:8080/api/get/${url}`).then((res) => {
				// console.log(res.data[0]);
				setters.setSelectedShop(res.data[0]);
			});
		}

		axios
			.get('http://localhost:8080/api/repos/hub/dsaladbar617')
			.then((res) => setProjLang(res.data))
			.catch((err) => console.log(err));
	}, []);

	const notify = () => {
		let color =
			theme.colorScheme === 'dark'
				? { back: '#373A40', front: '#F8F9FA' }
				: { back: '#F8F9FA', front: '#373A40' };

		toast('Contact Copied!', {
			duration: 1000,
			position: 'bottom-center',
			style: {
				background: `${color.back}`,
				color: `${color.front}`
			}
		});
	};

	const { classes } = useStyles();

	return (
		<div className={styles.scroll}>
			<Card style={{ root: classes.root }} className={styles.allcontain}>
				<h1 className={styles.name}>{name}</h1>
				<img src={`/${img}.png`} alt="Shop Logo" />
				<h3
					onClick={(e) => {
						notify();
						navigator.clipboard.writeText(
							e.currentTarget.innerText.replace('Contact: ', '')
						);
					}}>{`Contact: ${contact}`}</h3>
				<Toaster />
				<ProgressBar data={projLang} />
			</Card>

			<Card style={{ root: classes.root }} className={styles.desc_container}>
				<div>
					<h3>{`Location:`}</h3>
					<p className="center">{location}</p>
					<h3>{`Description:`}</h3>
					<p>{desc}</p>
				</div>
			</Card>
		</div>
	);
};

export default ShopDetail;
