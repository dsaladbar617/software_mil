import { Card, Image, Box } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ShopContext } from '../../ShopContext';
import styles from '../../styles/TestCard.module.css';

const CardTemplate = ({ data, shopName = '' }) => {
	const location = useLocation();
	const { setters } = useContext(ShopContext);
	const nav = useNavigate();
	// Deconstruct the data prop to get the name and img property
	const { name, img } = data;
	// Get the value of the url
	const url = location.pathname.split('/');
	// const lastUrl = url[url.length - 1];
	const [lastUrl, setLastUrl] = useState(url[url.length - 1]);

	return (
		<Box>
			<Card
				onClick={() => {
					// Depending on users location navigate to the correct details page and set the correct shop/project in the global context.
					if (lastUrl === 'projects') {
						setters.setSelectedProject(data);
						nav(`${url.join('/')}/${name}`);
					} else if (lastUrl === 'shop') {
						setters.setSelectedShop(data);
						nav(`/shop/${name}`);
					} else {
						setters.setSelectedProject(data);
						nav(`/shop/${shopName}/projects/${name}`);
					}
				}}
				shadow="xl"
				radius="lg"
				withBorder>
				<Box
					className={styles.ar_image}
					sx={{
						padding: 10,
						textAlign: 'center'
					}}>
					<Image
						className={styles.article_image}
						src={`/${img}.png`}
						height={285}
						fit="contain"
						alt={`${name}'s logo`}></Image>
					<p className={styles.name}>{name}</p>
				</Box>
			</Card>
		</Box>
	);
};

export default CardTemplate;
