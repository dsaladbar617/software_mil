import { useContext } from 'react';
import { ShopContext } from '../../ShopContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../../styles/ShopDetail.module.css';
import axios from 'axios';
import { Card, useMantineTheme, createStyles, Badge } from '@mantine/core';
import toast, { Toaster } from 'react-hot-toast';

// Sets the background color through mantine depending on light/dark mode.
const useStyles = createStyles((theme) => ({
	root: {
		backgroundColor: theme.colors.gray
	}
}));

const ProjectDetail = () => {
	const { values, setters } = useContext(ShopContext);
	const loc = useLocation();
	const nav = useNavigate();
	// Deconstruct the selectedProject object from the global context.

	// const {
	// 	shopName = '',
	// 	projects = {},
	// 	shopContact = ''
	// } = values.selectedProject;

	const { name, short_desc, img } = values.selectedProject;
	const theme = useMantineTheme();
	const { classes } = useStyles();
	// Format used to display shop name and contact.
	const [currentShop, setCurrentShop] = useState({
		name: '',
		contact: ''
	});

	useEffect(() => {
		let shopName = loc.pathname.split('/')[2];

		let rawProjectName = loc.pathname.split('/')[4];

		let projectName = rawProjectName.includes('%20')
			? rawProjectName.replace('%20', ' ')
			: rawProjectName;

		// If there is no selectedProject, or page is reloaded/directly navigated to get the correct project data to display
		if (values.selectedProject.name === '') {
			axios
				.get(`http://localhost:8080/api/get/${shopName}/${projectName}`)
				.then((res) => {
					setCurrentShop({
						name: res.data.shopName,
						contact: res.data.contact
					});
					setters.setSelectedProject(res.data.project);
				});
		}
		// If the selectedProject data is present, assign shop data from global context.
		else {
			if (values.selectedProject.shopName === undefined) {
				setCurrentShop({
					name: values.selectedShop.name,
					contact: values.selectedShop.contact
				});
			} else {
				setCurrentShop({
					name: values.selectedProject.shopName,
					contact: values.selectedProject.shopContact
				});
			}
		}
	}, []);

	// Function used to create pop up notification when contact is copied.
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
				<div className={styles.projectData}>
					<h3>Shop: {currentShop.name}</h3>
					<h3>
						Contact:&nbsp;
						<span
							onClick={(e) => {
								notify();
								navigator.clipboard.writeText(e.currentTarget.innerText);
							}}>
							{currentShop.contact}
						</span>
					</h3>
					<Toaster />
				</div>
			</Card>
			<Card style={{ root: classes.root }} className={styles.desc_container}>
				<div>
					<h3>{`Description:`}</h3>
					<p>{short_desc}</p>
				</div>
			</Card>
			<Card style={{ root: classes.root }} className={styles.tags}>
				<ul className={styles.tagList}>
					{
						// Create list of tags from the project data.
						values.selectedProject.tags.map((tag, index) => (
							<li key={index} className={styles.tagItem}>
								<Badge
									className={styles.badge}
									onClick={() => {
										let clickedTag = tag.replace(' ', '%20');
										nav(`/projects/${clickedTag}`);
									}}>
									{tag}
								</Badge>
							</li>
						))
					}
				</ul>
			</Card>
		</div>
	);
};

export default ProjectDetail;
