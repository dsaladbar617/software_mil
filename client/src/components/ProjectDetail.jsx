import { useContext } from 'react';
import { ShopContext } from '../ShopContext';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../styles/ShopDetail.module.css';
import axios from 'axios';
import { Card, useMantineTheme, createStyles, Badge } from '@mantine/core';
import toast from 'react-hot-toast';

const useStyles = createStyles((theme) => ({
	root: {
		backgroundColor: theme.colors.gray
	}
}));

const ProjectDetail = () => {
	const { values, setters } = useContext(ShopContext);
	const loc = useLocation();
	const { name, short_desc, img } = values.selectedProject;
	const theme = useMantineTheme();
	const { classes } = useStyles();
	const [nameOfShop, setNameOfShop] = useState('');

	useEffect(() => {
		let shopName = loc.pathname.split('/')[2];
		let urlName = loc.pathname.split('/')[4];
		let projectName = urlName.includes('%20')
			? urlName.replace('%20', ' ')
			: urlName;

		if (values.selectedProject.name === '') {
			axios
				.get(`http://localhost:8080/api/get/${shopName}/${projectName}`)
				.then((res) => {
					console.log(res.data);
					setNameOfShop(res.data.shopName);
					console.log(nameOfShop);
					setters.setSelectedProject(res.data.project);
				});
		} else {
			setNameOfShop(values.selectedShop.name);
		}
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

	console.log(nameOfShop);
	return (
		<div className={styles.scroll}>
			<Card style={{ root: classes.root }} className={styles.allcontain}>
				<h1 className={styles.name}>{name}</h1>
				<img src={`/${img}.png`} alt="Shop Logo" />
				<h3>Shop: {nameOfShop}</h3>
				<h3>
					Contact:&nbsp;
					<span
						onClick={(e) => {
							notify();
							navigator.clipboard.writeText(
								e.currentTarget.innerText.replace('Contact: ', '')
							);
						}}>
						{values.selectedProject.contact}
					</span>
				</h3>
			</Card>
			<Card style={{ root: classes.root }} className={styles.desc_container}>
				<div>
					<h3>{`Description:`}</h3>
					<p>{short_desc}</p>
				</div>
			</Card>
			<Card style={{ root: classes.root }} className={styles.tags}>
				<ul className={styles.tagList}>
					{values.selectedProject.tags.map((tag, index) => (
						<li key={index} className={styles.tagItem}>
							<Badge>{tag}</Badge>
						</li>
					))}
				</ul>
			</Card>
		</div>
	);
};

export default ProjectDetail;
