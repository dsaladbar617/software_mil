import { useContext } from 'react';
import { ShopContext } from '../ShopContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from '../styles/ShopDetail.module.css';

const ShopDetail = () => {
	const { values } = useContext(ShopContext);
	const { name, desc, projects, location } = values.selectedShop;
	const nav = useNavigate();

	useEffect(() => {
		if (values.selectedShop.name === '') {
			nav('/');
		}
	}, []);

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.name}>{name}</h1>
				<h3>{`Description: ${desc}`}</h3>
				<h3>{`Location: ${location}`}</h3>
				<div className={styles.projects}>
					<h2>Projects:</h2>
					<ul>
						{projects.map((project, index) => (
							<li key={index}>
								<h2>{project.name}</h2>
								<h3>Tags</h3>
								<ul>
									{project.tags.map((tag, index) => (
										<li key={index}>{tag}</li>
									))}
								</ul>
								<ul>
									{project.lang.map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
								<a href={project.proj_link}>Github Repo</a>
								<p>{project.short_desc}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default ShopDetail;
