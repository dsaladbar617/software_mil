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
			<div className={styles.allcontain}>
				<img src="/Conjure.png" alt="Shop Logo" />
				<div className={styles.container}>
					<h1 className={styles.name}>{name}</h1>
					<h3>{`Description: ${desc}`}</h3>
					<h3>{`Location: ${location}`}</h3>
				</div>
			</div>
			<div className={styles.project_container}>
				<div className={styles.projects}>
					<h2>Projects:</h2>
					<ul>
						{projects.map((project, index) => (
							<li key={index}>
								<h3>{project.name}</h3>
								<p>Tags:</p>
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
								<br />
								<p>Link:</p>
								<a href={project.proj_link}>Github Repo</a>
								<br />
								<br />
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
