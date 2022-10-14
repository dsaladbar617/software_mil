import { useContext, useState } from 'react';
import { ShopContext } from '../ShopContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ProgressBar from './ProgressBar';
import styles from '../styles/ShopDetail.module.css';
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

const ProjectDetail = () => {
	const { values, setters } = useContext(ShopContext);
	const nav = useNavigate();
	const loc = useLocation();
	const [projLang, setProjLang] = useState([]);
	const { name, short_desc, img } = values.selectedProject;
	const theme = useMantineTheme();

	useEffect(() => {
		if (values.selectedShop.name === '') {
			let url = loc.pathname.replace('/shop/', '');
			axios.get(`http://localhost:8080/api/get/${url}`).then((res) => {
				setters.setSelectedShop(res.data[0]);
			});
		}

		if (values.selectedProject.name === '') {
			let urlName = loc.pathname.split('/')[4];

			let projectName = urlName.includes('%20')
				? urlName.replace('%20', ' ')
				: urlName;

			console.log(projectName);
		}
	}, []);

	const { data: langs, isLoading } = useQuery(['langData'], async () => {
		let returned = await axios
			.get('http://localhost:8080/api/repos/hub/dsaladbar617')
			.then((res) => {
				setProjLang(res.data);
				// console.log(res.data);
				return res.data;
				// sessionStorage.setItem('lang_data', res.data);
			})
			.catch((err) => console.log(err));

		return returned;
	});

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
				<h3>Shop: {values.selectedShop.name}</h3>
				<h3>
					Contact:&nbsp;
					<span
						onClick={(e) => {
							notify();
							navigator.clipboard.writeText(
								e.currentTarget.innerText.replace('Contact: ', '')
							);
						}}>
						{values.selectedShop.contact}
					</span>
				</h3>
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
			</Card>

			<Card style={{ root: classes.root }} className={styles.desc_container}>
				<div>
					{/* <h3>{`Location:`}</h3>
					<p className="center">{location}</p> */}
					<h3>{`Description:`}</h3>
					<p>{short_desc}</p>
				</div>
			</Card>
		</div>
	);
};

export default ProjectDetail;
