import { useContext, useState } from 'react';
import { ShopContext } from '../../ShopContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ProgressBar from '../UI/ProgressBar';
import styles from '../../styles/ShopDetail.module.css';
import axios from 'axios';
import {
	Card,
	useMantineTheme,
	createStyles,
	Button,
	Loader
} from '@mantine/core';
import toast, { Toaster } from 'react-hot-toast';
import { IconCaretRight } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';

const useStyles = createStyles((theme) => ({
	root: {
		backgroundColor: theme.colors.gray
	}
}));

const ShopDetail = () => {
	const { values, setters } = useContext(ShopContext);
	const nav = useNavigate();
	const loc = useLocation();
	// const [projLang, setProjLang] = useState([]);
	const { name, desc, location, img, contact } = values.selectedShop;
	const theme = useMantineTheme();
	const { classes } = useStyles();

	useEffect(() => {
		// If the selectedShop data doesn't exist in the global context get the correct shop data from the database and set it in context.
		if (values.selectedShop.name === '') {
			let url = loc.pathname.replace('/shop/', '');
			axios.get(`/api/get/${url}`).then((res) => {
				setters.setSelectedShop(res.data[0]);
			});
		}

		/*
		Unsure if language ProgressBar will be used.

		if (projLang.length === 0) {
			axios
				.get('http://localhost:8080/api/repos/hub/dsaladbar617')
				.then((res) => {
					setProjLang(res.data);
					console.log(res.data);
					// sessionStorage.setItem('lang_data', res.data);
				})
				.catch((err) => console.log(err));
		}
		*/
	}, []);

	/*
	Used with ProgressBar

	const { data: langs, isLoading } = useQuery(['langData'], async () => {
		let returned = await axios
			.get('http://localhost:8080/api/repos/hub/dsaladbar617')
			.then((res) => {
				// setProjLang(res.data);
				return res.data;
			})
			.catch((err) => console.log(err));

		return returned;
	});
	*/

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

	return (
		<div className={styles.scroll}>
			<Card style={{ root: classes.root }} className={styles.allcontain}>
				<h1 className={styles.name}>{name}</h1>
				<img src={`/${img}.png`} alt="Shop Logo" />
				<h3>
					Contact:&nbsp;
					<span
						onClick={(e) => {
							notify();
							navigator.clipboard.writeText(
								e.currentTarget.innerText.replace('Contact: ', '')
							);
						}}>
						{contact}
					</span>
				</h3>
				<Toaster />
				{/* {langs ? (
					<ProgressBar data={langs} />
				) : (
					<Loader
						sx={{
							margin: 20
						}}
						variant="bars"
						color="gray"
					/>
				)} */}

				<Button
					sx={{
						marginLeft: 'auto',
						paddingRight: 6
					}}
					color="gray"
					onClick={() => {
						nav(`${loc.pathname}/projects`);
					}}>
					Projects
					<IconCaretRight style={{ padding: 0, margin: 0 }} />
				</Button>
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
